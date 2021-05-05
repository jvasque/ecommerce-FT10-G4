const { OrderDetail, User, Product, Favorite, Wishlist, Order } = require('../../db.js');
const tf = require('@tensorflow/tfjs');
const ExcelJS = require('exceljs');
const { normalizeRatings } = require('./mlf')

module.exports = async (req, res, next) => {
    try{
        let userId = parseInt(req.query.userId)
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile('src/models/RecommendedModel.xlsx');
        const worksheetX = workbook.getWorksheet('ProductProfiles');
        const worksheetTheta = workbook.getWorksheet('UserProfiles');
        let X = []
        let Theta = []
        let Y = []
        let R = []
        let nm = worksheetX.getColumn(1).values.length-1
        let nu = worksheetTheta.getColumn(1).values.length-1

        for(let i = 0; i < nm; i++){
            Y.push([])
            R.push([])
            for(let j = 0; j < nu; j++){
                Y[i].push(0)
                R[i].push(0)
            }        
        }

        for(let i = 1; i <= nm ; i++){
            let Xrow = worksheetX.getRow(i).values
            Xrow.shift()
            X.push(Xrow)
        }
        
        for(let i = 0; i < nu-1; i++){//Recalculate Ymean for dynamic predictions
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
        let [Ynorm, Ymean] = normalizeRatings(nm, Y, R)
        let toSend = []
        
        if(userId && userId < nu && userId > 0){
            let Thetarow = worksheetTheta.getRow(userId).values
            Thetarow.shift()
            Theta.push(Thetarow)
            X = tf.tensor2d(X)
            Theta = tf.tensor2d(Theta)
            let predictions = tf.add(tf.matMul(X, Theta, false, true), Ymean)
            toSend = predictions.arraySync()
        }else{// guest or brand new users
            let Thetarow = worksheetTheta.getRow(nu).values
            Thetarow.shift()
            Theta.push(Thetarow)
            X = tf.tensor2d(X)
            Theta = tf.tensor2d(Theta)
            let predictions = tf.add(tf.matMul(X, Theta, false, true), Ymean)
            toSend = predictions.arraySync()        
        }

        //filter the ones that are already marked and promote other products
        R = R.arraySync()

        toSend = toSend.map((product, index) => {
            return {
                id: index+1,
                score: product[0],
            }
        }).sort((a, b) => {
            if (a.score > b.score) {
                return -1;
            }
            if (a.score < b.score) {
                return 1;
            }
            return 0;
        })
        
        let backup = [...toSend]

        if(userId && userId < nu && userId > 0){
            toSend = toSend.filter(p => {
                if(R[p.id-1][userId-1] === 0){
                    return true
                }
                return false
            })
        }   

        if(toSend.length > 0){
            res.json(toSend.slice(0, Math.min(toSend.length, 5)))
        }else{
            res.json(backup.slice(0, Math.min(backup.length, 5)))
        }     
        
    }catch(err){
        res.send(err)
    }
}