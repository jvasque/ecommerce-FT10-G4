const { OrderDetail, User, Product, Category, SubCategory, Favorite, Wishlist, Order } = require('../../db.js');
const tf = require('@tensorflow/tfjs');
const ExcelJS = require('exceljs');
const { cosiCostFuncContent, normalizeRatings } = require('./mlf')
const { fmincgT } = require('./fmincg')

//recommended products

module.exports = async (req, res, next) => {
    let categories = await Category.findAll({
        attributes: ['name']
    })

    let subCategories = await SubCategory.findAll({
        attributes: ['name']
    })

    let productFeatures = []

    categories.forEach(category => {
        productFeatures.push(category.dataValues.name)
    })

    subCategories.forEach(subCategory => {
        productFeatures.push(subCategory.dataValues.name)
    })

    let totalProducts = await Product.findAndCountAll()
    let totalUsers = await User.findAndCountAll()
    let nm = totalProducts.count
    let nu = totalUsers.count + 1
    let nf = productFeatures.length
    let Y = []
    let R = []
    let X = []
    for(let i = 0; i < nm; i++){
        Y.push([])
        R.push([])
        for(let j = 0; j < nu; j++){
            Y[i].push(0)
            R[i].push(0)
        }        
    }
    for(let i = 0; i < nm; i++){
        X.push([])
        for(let j = 0; j < nf; j++){
            X[i].push(0)
        }        
    }

    for(let i = 0; i < nm ; i++){
        let product = await Product.findOne({
            where: {
                id: i+1
            },
            attributes: ['name'],
            include: [{
                model: Category,
                attributes: ['name']
            },{
                model: SubCategory,
                attributes: ['name']
            }]
        })
        let productCategories = product.dataValues.categories.map(category => {
            return productFeatures.findIndex(productFeature => {
                return productFeature === category.dataValues.name
            })
        })
        let productSubCategories = product.dataValues.subCategories.map(subCategory => {
            return productFeatures.findIndex(productFeature => {
                return productFeature === subCategory.dataValues.name
            })
        })

        let features = productCategories.concat(productSubCategories)
        features.forEach(f => {
            X[i][f] = 1
        })
    }

    for(let i = 0; i < nu-1; i++){
        let user = await User.findOne({
            where: {
                id: i+1
            },
            attributes: ['id'],
            include: [{
                model: Order,
                attributes: ['id', 'state'],
                include: {
                    model: OrderDetail,
                    attributes: ['id'],
                    include: {
                        model: Product,
                        attributes: ['id']
                    }
                }
            },{
                model: Favorite,
                include: {
                    model: Product,
                    attributes: ['id']
                } 
            }, {
                model: Wishlist,
                attributes: ['name'],
                include: {
                    model: Product,
                    attributes: ['id']
                }, 
            }]
        })
        let purchasedProducts = user.dataValues.orders.map(order => {
            return order.dataValues.orderDetails.map(orderDetail => {
                return orderDetail.dataValues.product.dataValues.id
            })
        });
        purchasedProducts.forEach(order => {
            order.forEach(product => {
                R[product-1][i] = 1
                Y[product-1][i] = 1
            })
        })

        let favoriteProducts = user.dataValues.favorite.dataValues.products.map(product => {
            return product.dataValues.id
        });
        favoriteProducts.forEach(product => {
            R[product-1][i] = 1
            if(Y[product-1][i] < 1){
                Y[product-1][i] = 0.5
            }            
        })

        let wishlistProducts = user.dataValues.wishlists.map(wishlist => {
            return wishlist.dataValues.products.map(product => {
                return product.dataValues.id
            })
        });
        wishlistProducts.forEach(order => {
            order.forEach(product => {
                R[product-1][i] = 1
                if(Y[product-1][i] < 1){
                    Y[product-1][i] = 0.5
                }
            })
        })
    }

    R.forEach((row, index) => {
        let r = row.reduce((accum, curr) => {
            return accum+curr
        })
        if(r === 0){
            Y[index][nu-1] = 0.01
            R[index][nu-1] = 1
        }        
    })

    Y = tf.tensor2d(Y)
    R = tf.tensor2d(R)
    X = tf.tensor2d(X)
    let [Ynorm, Ymean] = normalizeRatings(nm, Y, R)
    let Theta = tf.randomNormal([nu, nf])
    let lambda = 0.02
    let params = Theta.reshape([nu*nf, 1])
    const options = {maxIter: 5000}
    let arguments = {Ynorm, R, F:X, nu, nm, nf, lambda}
    let [newParams, costHostory, iteration] = await fmincgT(cosiCostFuncContent, arguments, params, options)
    Theta = newParams.reshape([nu, nf])

    let modelX = X.arraySync()
    let modelTheta = Theta.arraySync()
    let modelY = Ymean.arraySync()

    const workbook = new ExcelJS.Workbook()
    workbook.creator = 'Julian'
    workbook.properties.date1904 = true
    const sheetX = workbook.addWorksheet('ProductProfiles')
    modelX.forEach(row => {
        sheetX.addRow(row)
    })
    const sheetTheta = workbook.addWorksheet('UserProfiles')
    modelTheta.forEach(row => {
        sheetTheta.addRow(row)
    })
    const sheetY = workbook.addWorksheet('Ymean')
    modelY.forEach(row => {
        sheetY.addRow(row)
    })
    await workbook.xlsx.writeFile('src/models/RecommendedModel.xlsx')

    let predictions = tf.add(tf.matMul(X, Theta, false, true), Ymean)
    Y.print()
    predictions.print()

    res.json('Ok')
}