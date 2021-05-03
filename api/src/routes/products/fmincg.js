const tf = require('@tensorflow/tfjs');

// Minimize a continuous differentialble multivariate function. Starting point
// is given by "X" (D by 1), and the function named in the string "f", must
// return a function value and a vector of partial derivatives. The Polack-
// Ribiere flavour of conjugate gradients is used to compute search directions,
// and a line search using quadratic and cubic polynomial approximations and the
// Wolfe-Powell stopping criteria is used together with the slope ratio method
// for guessing initial step sizes. Additionally a bunch of checks are made to
// make sure that exploration is taking place and that extrapolation will not
// be unboundedly large. The "length" gives the length of the run: if it is
// positive, it gives the maximum number of line searches, if negative its
// absolute gives the maximum allowed number of function evaluations. You can
// (optionally) give "length" a second component, which will indicate the
// reduction in function value to be expected in the first line-search (defaults
// to 1.0). The function returns when either its length is up, or if no further
// progress can be made (ie, we are at a minimum, or so close that due to
// numerical problems, we cannot get any closer). If the function terminates
// within a few iterations, it could be an indication that the function value
// and derivatives are not consistent (ie, there may be a bug in the
// implementation of your "f" function). The function returns the found
// solution "X", a vector of function values "fX" indicating the progress made
// and "i" the number of iterations (line searches or function evaluations,
// depending on the sign of "length") used.
//
// Usage: [X, fX, i] = fmincg(f, X, options, P1, P2, P3, P4, P5)
//
// See also: checkgrad 
//
// Copyright (C) 2001 and 2002 by Carl Edward Rasmussen. Date 2002-02-13
//
//
// (C) Copyright 1999, 2000 & 2001, Carl Edward Rasmussen
//
//  Translated to TensorFlow JavaScript by jearizaa 2021
// 
// Permission is granted for anyone to copy, use, or modify these
// programs and accompanying documents for purposes of research or
// education, provided this copyright notice is retained, and note is
// made of any changes that have been made.
// 
// These programs and documents are distributed without any warranty,
// express or implied.  As the programs were written for research
// purposes only, they have not been tested to the degree that would be
// advisable in any important application.  All use of these programs is
// entirely at the user's own risk.
//
// [ml-class] Changes Made:
// 1) Function name and argument specifications
// 2) Output display

async function fmincg(f, arguments, X, options){
    let length = 100
    if(options && options.maxIter){
        length = options.maxIter
    }
    let {Ynorm, R, nu, nm, nf, lambda} = arguments
    const RHO = 0.01
    const SIG = 0.5
    const INT = 0.1
    const EXT = 3.0
    const MAX = 20
    const RATIO = 10
    

    let red = 1
    
    let i = 0
    let ls_failed = 0
    let fX = []
    let A = 0
    let B = 0
    let z2 = 0
    let arr = await f(X, Ynorm, R, nu, nm, nf, lambda)
    let f1 = arr[0]
    let df1 = arr[1]
    i = i + (length<0)
    let s = tf.mul(df1, -1)
    let d1 = tf.matMul(tf.mul(s, -1), s, true, false).reshape([])
    let z1 = tf.div(red, tf.sub(1, d1))
    

    while(i < Math.abs(length)){
        i = i + (length>0)
        let X0 = X
        let f0 = f1
        let df0 = df1

        X = tf.add(X, tf.mul(z1, s))
        arr = await f(X, Ynorm, R, nu, nm, nf, lambda)
        let f2 = arr[0]
        let df2 = arr[1]
        i = i + (length<0)
        let d2 = tf.matMul(df2, s, true, false).reshape([])
        let f3 = f1
        let d3 = d1
        let z3 = tf.mul(-1, z1)

        if(length > 0){
            var M = MAX
        }else{
            var M = Math.min(MAX, -length-i)
        }
        let success = 0
        let limit = -1
        while(1){
            while((tf.greater(f2, tf.add(f1, tf.mul(z1, tf.mul(RHO, d1)))).arraySync() || tf.greater(d2, tf.mul(-SIG, d1)).arraySync()) && M > 0){
                limit = z1    
                if(tf.greater(f2, f1).arraySync()){ 
                    z2 = tf.sub(z3, tf.div(tf.mul(0.5, tf.mul(d3, tf.mul(z3, z3))), tf.add(tf.mul(d3, z3), tf.sub(f2, f3))))
                }else{
                    A = tf.add(tf.mul(6, tf.div(tf.sub(f2, f3), z3)), tf.mul(3, tf.add(d2, d3))) 
                    B = tf.sub(tf.mul(3, tf.sub(f3, f2)), tf.mul(z3, tf.add(d3, tf.mul(2, d2))))
                    z2 = tf.div(tf.sub(tf.sqrt(tf.sub(tf.mul(B, B), tf.mul(A, tf.mul(d2, tf.mul(z3, z3))))), B), A)     
                }

                if(tf.isNaN(z2).arraySync() || tf.isInf(z2).arraySync()){
                    z2 = tf.div(z3, 2)
                }

                z2 = tf.maximum(tf.minimum(z2, tf.mul(INT, z3)), tf.mul(tf.sub(1,INT), z3))
                z1 = tf.add(z1, z2)
                X = tf.add(X, tf.mul(z2, s))
                arr = await f(X, Ynorm, R, nu, nm, nf, lambda)
                f2 = arr[0]
                df2 = arr[1]
                M = M - 1
                i = i + (length<0)
                d2 = tf.matMul(df2, s, true, false).reshape([])
                z3 = tf.sub(z3, z2)
            }
            if((tf.greater(f2, tf.add(f1, tf.mul(z1, tf.mul(RHO, d1)))).arraySync() || tf.greater(d2, tf.mul(-SIG, d1)).arraySync())){
                break
            }else if(tf.greater(d2, tf.mul(SIG, d1)).arraySync()){
                success = 1
                break
            }else if(M === 0){
                break
            }  
            A = tf.add(tf.mul(6, tf.div(tf.sub(f2, f3), z3)), tf.mul(3, tf.add(d2, d3))) 
            B = tf.sub(tf.mul(3, tf.sub(f3, f2)), tf.mul(z3, tf.add(d3, tf.mul(2, d2))))
            z2 = tf.div(tf.mul(-1, tf.mul(d2, tf.mul(z3, z3))), tf.add(B, tf.sqrt(tf.sub(tf.mul(B, B), tf.mul(A, tf.mul(d2, tf.mul(z3, z3))))))) 
            if(tf.isNaN(z2).arraySync() || tf.isInf(z2).arraySync() || tf.less(z2, 0).arraySync()){
                if(limit < -0.5){
                    z2 = tf.mul(z1, tf.sub(EXT, 1))
                }else{
                    z2 = tf.div(tf.sub(limit, z1), 2)
                 }
            }else if(limit > -0.5 && tf.greater(tf.add(z2, z1), limit).arraySync()) {
                z2 = tf.div(tf.sub(limit, z1), 2)
            }else if(limit < -0.5 && tf.greater(tf.add(z2, z1), tf.mul(z1, EXT)).arraySync()){
                z2 = tf.mul(z1, tf.sub(EXT, 1.0))
            }else if(tf.less(z2, tf.mul(-1, tf.mul(z3, INT))).arraySync()){
                z2 = tf.mul(-1, tf.mul(z3, INT))
             }else if(limit > -0.5 && tf.less(z2, tf.mul(tf.sub(limit, z1), tf.sub(1.0, INT))).arraySync()) {                        
                z2 = tf.mul(tf.sub(limit, z1), tf.sub(1.0, INT))
            }
            f3 = f2
            d3 = d2
            z3 = tf.mul(-1, z2)
            z1 = tf.add(z1, z2)
            X = tf.add(X, tf.mul(z2, s))
            arr = await f(X, Ynorm, R, nu, nm, nf, lambda)
            f2 = arr[0]
            df2 = arr[1]
            M = M-1
            i = i + (length < 0)
            d2 = tf.matMul(df2, s, true, false).reshape([])
        }
        if(success){
            f1 = f2
            fX.push(f1.arraySync())
            //console.log(`Cost ${i}: ${f1.arraySync()}`)
            s = tf.sub(tf.mul(tf.div(tf.sub(tf.matMul(df2, df2, true, false), tf.matMul(df1, df2, true, false)), tf.matMul(df1, df1, true, false)), s), df2)
            let tmp = df1
            df1 = df2
            df2 = tmp
            d2 = tf.matMul(df1, s, true, false).reshape([])
            if(tf.greater(d2, 0).arraySync()){
                s = tf.mul(-1, df1)
                d2 = tf.matMul(tf.mul(-1, s), s, true, false).arraySync()
            }
            z1 = tf.mul(z1, tf.minimum(RATIO, tf.div(d1, tf.sub(d2, -99999999999999))))
            d1 = d2
            ls_failed = 0
        }else{
            X = X0
            f1 = f0
            df1 = df0
            if(ls_failed || i > Math.abs(length)){
                break
            }
            let tmp = df1
            df1 = df2
            df2 = tmp
            s = tf.mul(-1, df1)
            d1 = tf.matMul(tf.mul(-1,s), s, true, false).reshape([])
            z1 = tf.div(1, tf.sub(1, d1))
            ls_failed = 1
        }
    
    }
    return [X, fX, i]
}

module.exports = fmincg