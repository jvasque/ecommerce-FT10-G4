const { Product, Review } = require('../../db.js');
const tf = require('@tensorflow/tfjs');
const ExcelJS = require('exceljs');

module.exports = async (req, res, next) => {
    try{
        let userId = parseInt(req.query.userId)
        const workbookX = new ExcelJS.Workbook();
        const workbookTheta = new ExcelJS.Workbook();
        const workbookY = new ExcelJS.Workbook();
        await workbookX.xlsx.readFile('src/models/FeaturedProductsProfiles.xlsx');
        await workbookTheta.xlsx.readFile('src/models/FeaturedUsersProfiles.xlsx');
        await workbookY.xlsx.readFile('src/models/FeaturedYmean.xlsx');
        const worksheetX = workbookX.getWorksheet(1);
        const worksheetTheta = workbookTheta.getWorksheet(1);
        const worksheetY = workbookY.getWorksheet(1);
        let X = []
        let Theta = []
        let Y = []
        let nm = worksheetX.getColumn(1).values.length-1
        let nu = worksheetTheta.getColumn(1).values.length-1
        
        for(let i = 1; i <= nm ; i++){
            let Xrow = worksheetX.getRow(i).values
            Xrow.shift()
            X.push(Xrow)
            let productScore = await Product.findOne({
                where: {
                    id: i
                },
                attributes: ['id'],
                include: {
                    model: Review,  
                    attributes: ['score']
                }
            })
            let meanScore = () => {
                let scores = productScore.dataValues.reviews.map(review => {
                    return parseInt(review.dataValues.score)
                })
                if(scores.length){
                    return scores.reduce((acc, curr) => {return acc + curr})/scores.length
                }else{
                    return 0.01
                }
            }
            let mean = meanScore()
            productScore.score = mean

            await productScore.save() 
            let Yrow = worksheetY.getRow(i).values
            Yrow.shift()
            if(Yrow[0] === mean){
                Y.push(Yrow)
                console.log('iguales')
            }else{
                Y.push([mean])
            }
            
        }  
        let toSend = []

        if(userId && userId < nu && userId > 0){
            let Thetarow = worksheetTheta.getRow(userId).values
            Thetarow.shift()
            Theta.push(Thetarow)
            X = tf.tensor2d(X)
            Theta = tf.tensor2d(Theta)
            let Ymean = tf.tensor2d(Y)
            let predictions = tf.add(tf.matMul(X, Theta, false, true), Ymean)
            toSend = predictions.arraySync()
        }else{// guest or brand new users
            let Thetarow = worksheetTheta.getRow(nu).values
            Thetarow.shift()
            Theta.push(Thetarow)
            X = tf.tensor2d(X)
            Theta = tf.tensor2d(Theta)
            let Ymean = tf.tensor2d(Y)
            let predictions = tf.add(tf.matMul(X, Theta, false, true), Ymean)
            toSend = predictions.arraySync()        
        }
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
        res.json(toSend.slice(0, 5))
    }catch(err){
        res.send(err)
    }
}