export function sortById(orders, sort){
    let ordersSorted = [...orders]
        if(!sort.id){            
            ordersSorted.sort((a, b)=>{
                if (a.id < b.id) {
                    return -1;
                  }
                if (a.id > b.id) {
                    return 1;
                }
                return 0;
            })
            return [ordersSorted, {
                id: true,
                firstName: false,
                lastName: false,
                status: false,
                created: false,
                updated: false,
                payment: false,
                total: false,
            }]
        }
        ordersSorted.sort((a, b)=>{
            if (b.id < a.id) {
                return -1;
              }
            if (b.id > a.id) {
                return 1;
            }
            return 0;
        })
        return [ordersSorted, {
            id: false,
            firstName: false,
            lastName: false,
            status: false,
            created: false,
            updated: false,
            payment: false,
            total: false,
        }]
}

export function sortByState(orders, sort){
    let ordersSorted = [...orders]
        if(!sort.state){            
            ordersSorted.sort((a, b)=>{
                if (a.state < b.state) {
                    return -1;
                  }
                if (a.state > b.state) {
                    return 1;
                }
                return 0;
            })
            return [ordersSorted, {
                id: false,
                firstName: false,
                lastName: false,
                status: true,
                created: false,
                updated: false,
                payment: false,
                total: false,
            }]
        }
        ordersSorted.sort((a, b)=>{
            if (b.state < a.state) {
                return -1;
              }
            if (b.state > a.state) {
                return 1;
            }
            return 0;
        })
        return [ordersSorted, {
            id: false,
            firstName: false,
            lastName: false,
            status: false,
            created: false,
            updated: false,
            payment: false,
            total: false,
        }]
}

export function sortByCreation(orders, sort){
    let ordersSorted = [...orders]
        if(!sort.created){            
            ordersSorted.sort((a, b)=>{
                if (a.createdAt < b.createdAt) {
                    return -1;
                  }
                if (a.createdAt > b.createdAt) {
                    return 1;
                }
                return 0;
            })
            return [ordersSorted, {
                id: false,
                firstName: false,
                lastName: false,
                status: false,
                created: true,
                updated: false,
                payment: false,
                total: false,
            }]
        }
        ordersSorted.sort((a, b)=>{
            if (b.createdAt < a.createdAt) {
                return -1;
              }
            if (b.createdAt > a.createdAt) {
                return 1;
            }
            return 0;
        })
        return [ordersSorted, {
            id: false,
            firstName: false,
            lastName: false,
            status: false,
            created: false,
            updated: false,
            payment: false,
            total: false,
        }]
}

export function sortByUpdate(orders, sort){
    let ordersSorted = [...orders]
        if(!sort.updated){            
            ordersSorted.sort((a, b)=>{
                if (a.updatedAt < b.updatedAt) {
                    return -1;
                  }
                if (a.updatedAt > b.updatedAt) {
                    return 1;
                }
                return 0;
            })
            return [ordersSorted, {
                id: false,
                firstName: false,
                lastName: false,
                status: false,
                created: false,
                updated: true,
                payment: false,
                total: false,
            }]
        }
        ordersSorted.sort((a, b)=>{
            if (b.updatedAt < a.updatedAt) {
                return -1;
              }
            if (b.updatedAt > a.updatedAt) {
                return 1;
            }
            return 0;
        })
        return [ordersSorted, {
            id: false,
            firstName: false,
            lastName: false,
            status: false,
            created: false,
            updated: false,
            payment: false,
            total: false,
        }]
}

export function sortByPayment(orders, sort){
    let ordersSorted = [...orders]
        if(!sort.payment){            
            ordersSorted.sort((a, b)=>{
                if (a.paymentMethod.type < b.paymentMethod.type) {
                    return -1;
                  }
                if (a.paymentMethod.type > b.paymentMethod.type) {
                    return 1;
                }
                return 0;
            })
            return [ordersSorted, {
                id: false,
                firstName: false,
                lastName: false,
                status: false,
                created: false,
                updated: false,
                payment: true,
                total: false,
            }]
        }
        ordersSorted.sort((a, b)=>{
            if (b.paymentMethod.type < a.paymentMethod.type) {
                return -1;
              }
            if (b.paymentMethod.type > a.paymentMethod.type) {
                return 1;
            }
            return 0;
        })
        return [ordersSorted, {
            id: false,
            firstName: false,
            lastName: false,
            status: false,
            created: false,
            updated: false,
            payment: false,
            total: false,
        }]
}

export function sortByTotal(orders, sort){
    let ordersSorted = [...orders]
        if(!sort.total){            
            ordersSorted.sort((a, b)=>{
                if (a.totalPrice < b.totalPrice) {
                    return -1;
                  }
                if (a.totalPrice > b.totalPrice) {
                    return 1;
                }
                return 0;
            })
            return [ordersSorted, {
                id: false,
                firstName: false,
                lastName: false,
                status: false,
                created: false,
                updated: false,
                payment: false,
                total: true,
            }]
        }
        ordersSorted.sort((a, b)=>{
            if (b.totalPrice < a.totalPrice) {
                return -1;
              }
            if (b.totalPrice > a.totalPrice) {
                return 1;
            }
            return 0;
        })
        return [ordersSorted, {
            id: false,
            firstName: false,
            lastName: false,
            status: false,
            created: false,
            updated: false,
            payment: false,
            total: false,
        }]
}

export function sortByFirstName(orders, sort){
    let ordersSorted = [...orders]
        if(!sort.firstName){            
            ordersSorted.sort((a, b)=>{
                if (a.user.firstName < b.user.firstName) {
                    return -1;
                  }
                if (a.user.firstName > b.user.firstName) {
                    return 1;
                }
                return 0;
            })
            return [ordersSorted, {
                id: false,
                firstName: true,
                lastName: false,
                status: false,
                created: false,
                updated: false,
                payment: false,
                total: false,
            }]
        }
        ordersSorted.sort((a, b)=>{
            if (b.user.firstName < a.user.firstName) {
                return -1;
              }
            if (b.user.firstName > a.user.firstName) {
                return 1;
            }
            return 0;
        })
        return [ordersSorted, {
            id: false,
            firstName: false,
            lastName: false,
            status: false,
            created: false,
            updated: false,
            payment: false,
            total: false,
        }]
}

export function sortByLastName(orders, sort){
    let ordersSorted = [...orders]
        if(!sort.lastName){            
            ordersSorted.sort((a, b)=>{
                if (a.user.lastName < b.user.lastName) {
                    return -1;
                  }
                if (a.user.lastName > b.user.lastName) {
                    return 1;
                }
                return 0;
            })
            return [ordersSorted, {
                id: false,
                firstName: false,
                lastName: true,
                status: false,
                created: false,
                updated: false,
                payment: false,
                total: false,
            }]
        }
        ordersSorted.sort((a, b)=>{
            if (b.user.lastName < a.user.lastName) {
                return -1;
              }
            if (b.user.lastName > a.user.lastName) {
                return 1;
            }
            return 0;
        })
        return [ordersSorted, {
            id: false,
            firstName: false,
            lastName: false,
            status: false,
            created: false,
            updated: false,
            payment: false,
            total: false,
        }]
}