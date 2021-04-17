export function sortByName(ordersDetails, sort){
    let ordersDetailsSorted = [...ordersDetails]
        if(!sort.name){            
            ordersDetailsSorted.sort((a, b)=>{
                if (a.product.name > b.product.name) {
                    return -1;
                  }
                if (a.product.name < b.product.name) {
                    return 1;
                }
                return 0;
            })
            return [ordersDetailsSorted, {
                name: true,
                quantity: false,
                price: false,
                cost: false,
            }]
        }
        ordersDetailsSorted.sort((a, b)=>{
            if (b.product.name > a.product.name) {
                return -1;
              }
            if (b.product.name < a.product.name) {
                return 1;
            }
            return 0;
        })
        return [ordersDetailsSorted, {
            name: false,
            quantity: false,
            price: false,
            cost: false,
        }]
}

export function sortByQuantity(ordersDetails, sort){
    let ordersDetailsSorted = [...ordersDetails]
        if(!sort.quantity){            
            ordersDetailsSorted.sort((a, b)=>{
                if (a.quantity > b.quantity) {
                    return -1;
                  }
                if (a.quantity < b.quantity) {
                    return 1;
                }
                return 0;
            })
            return [ordersDetailsSorted, {
                name: false,
                quantity: true,
                price: false,
                cost: false,
            }]
        }
        ordersDetailsSorted.sort((a, b)=>{
            if (b.quantity > a.quantity) {
                return -1;
              }
            if (b.quantity < a.quantity) {
                return 1;
            }
            return 0;
        })
        return [ordersDetailsSorted, {
            name: false,
            quantity: false,
            price: false,
            cost: false,
        }]
}

export function sortByPrice(ordersDetails, sort){
    let ordersDetailsSorted = [...ordersDetails]
        if(!sort.price){            
            ordersDetailsSorted.sort((a, b)=>{
                if (a.product.unitPrice > b.product.unitPrice) {
                    return -1;
                  }
                if (a.product.unitPrice < b.product.unitPrice) {
                    return 1;
                }
                return 0;
            })
            return [ordersDetailsSorted, {
                name: false,
                quantity: false,
                price: true,
                cost: false,
            }]
        }
        ordersDetailsSorted.sort((a, b)=>{
            if (b.product.unitPrice > a.product.unitPrice) {
                return -1;
              }
            if (b.product.unitPrice < a.product.unitPrice) {
                return 1;
            }
            return 0;
        })
        return [ordersDetailsSorted, {
            name: false,
            quantity: false,
            price: false,
            cost: false,
        }]
}

export function sortByCost(ordersDetails, sort){
    let ordersDetailsSorted = [...ordersDetails]
        if(!sort.cost){            
            ordersDetailsSorted.sort((a, b)=>{
                if (a.quantity*a.product.unitPrice > b.quantity*b.product.unitPrice) {
                    return -1;
                  }
                if (a.quantity*a.product.unitPrice < b.quantity*b.product.unitPrice) {
                    return 1;
                }
                return 0;
            })
            return [ordersDetailsSorted, {
                name: false,
                quantity: false,
                price: false,
                cost: true,
            }]
        }
        ordersDetailsSorted.sort((a, b)=>{
            if (b.quantity*b.product.unitPrice > a.quantity*a.product.unitPrice) {
                return -1;
              }
            if (b.quantity*b.product.unitPrice < a.quantity*a.product.unitPrice) {
                return 1;
            }
            return 0;
        })
        return [ordersDetailsSorted, {
            name: false,
            quantity: false,
            price: false,
            cost: false,
        }]
}
