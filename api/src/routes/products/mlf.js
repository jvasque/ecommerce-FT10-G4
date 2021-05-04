const tf = require('@tensorflow/tfjs');

function cosiCostFunc(params, Y, R, nu, nm, nf, lambda){
    let X = params.slice([0], [nm*nf]).reshape([nm, nf])
    let Theta = params.slice([nm*nf]).reshape([nu, nf])

    let J = tf.scalar(0)
    let X_grad = tf.zerosLike(X)
    let Theta_grad = tf.zerosLike(Theta)

    let temp = tf.sub(tf.matMul(X, Theta, false, true), Y)
  
    let reg1 = tf.sum(tf.pow(Theta, 2))
    
    let reg2 = tf.sum(tf.pow(X, 2))
    
    J = tf.div(tf.sum(tf.mul(tf.pow(temp, 2), R)),2)
    let reg = tf.mul(tf.div(lambda, 2), tf.add(reg1, reg2))
    J = tf.add(J, reg)
    X_grad = tf.add(tf.matMul(tf.mul(temp, R), Theta), tf.mul(lambda, X))
    
    Theta_grad = tf.add(tf.matMul(tf.mul(temp, R), X, true, false), tf.mul(lambda, Theta))
    
    let grad = tf.concat([X_grad, Theta_grad]).reshape([nu*nf+nm*nf, 1])
    
    return [J, grad]   
}

function cosiCostFuncContent(params, Y, R, F, nu, nm, nf, lambda){
    let X = F
    let Theta = params.reshape([nu, nf])
    let J = tf.scalar(0)
    let Theta_grad = tf.zerosLike(Theta)

    let temp = tf.sub(tf.matMul(X, Theta, false, true), Y) 
   
    J = tf.div(tf.sum(tf.mul(tf.pow(temp, 2), R)),2)

    let reg = tf.mul(tf.div(lambda, 2), tf.sum(tf.pow(Theta, 2)) )

    J = tf.add(J, reg)
    
    Theta_grad = tf.add(tf.matMul(tf.mul(temp, R), X, true, false), tf.mul(lambda, Theta))
    
    let grad = Theta_grad.reshape([nu*nf, 1])
    
    return [J, grad]   
}

function normalizeRatings(nm, Y, R){
    let Ysum = tf.sum(Y, 1).reshape([nm, 1])
    let Rsum = tf.sum(R, 1).reshape([nm, 1])
    let Ymean = tf.div(Ysum, Rsum).reshape([nm, 1])
    let Ysub = tf.mul(R, Ymean)
    let Ynorm = tf.sub(Y, Ysub)
    return [Ynorm, Ymean]
}

module.exports = { cosiCostFunc, cosiCostFuncContent, normalizeRatings }