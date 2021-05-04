const { Review, User, Product } = require('../../db.js');
const tf = require('@tensorflow/tfjs');
const ExcelJS = require('exceljs');
const { cosiCostFunc, normalizeRatings } = require('./mlf')
const { fmincg } = require('./fmincg')

//featured products

module.exports = async (req, res, next) => {
    let reviews = await Review.findAll({
        attributes: ['score'],
        include: [{
            model: User,
            attributes: ['id']
        },{
            model: Product,
            attributes: ['id']
        }],
    })

    let totalProducts = await Product.findAndCountAll()
    let totalUsers = await User.findAndCountAll()
    let nm = totalProducts.count
    let nu = totalUsers.count + 1
    let nf = 10
    let Y = []
    let R = []
    for(let i = 0; i < nm; i++){
        Y.push([])
        R.push([])
        for(let j = 0; j < nu; j++){
            Y[i].push(0)
            R[i].push(0)
        }        
    }

    // let reviewsObj = reviews.map(review => {        
    //     return {
    //         score: review.dataValues.score,
    //         user: review.user.dataValues.id,
    //         product: review.product.dataValues.id,
    //     }
    // })
    
    reviews.forEach(review => {
        let score = parseInt(review.dataValues.score)
        Y[review.product.dataValues.id - 1][review.user.dataValues.id - 1] = score
        R[review.product.dataValues.id - 1][review.user.dataValues.id - 1] = 1
    })

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
    let X = tf.randomNormal([nm, nf])
    let Theta = tf.randomNormal([nu, nf])
    let lambda = 0.1
    let params = tf.concat([X, Theta]).reshape([nu*nf+nm*nf, 1])
    const options = {maxIter: 1000}
    let arguments = {Ynorm, R, nu, nm, nf, lambda}
    let [newParams, costHostory, iteration] = await fmincg(cosiCostFunc, arguments, params, options)
    X = newParams.slice([0],[nm*nf]).reshape([nm, nf])
    Theta = newParams.slice([nm*nf]).reshape([nu, nf])

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

    await workbook.xlsx.writeFile('src/models/FeaturedModel.xlsx')

    let predictions = tf.add(tf.matMul(X, Theta, false, true), Ymean)
    Y.print()
    predictions.print()
  
    res.json('Ok')
}