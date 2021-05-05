export function sortById(promotions, sort){
    let promotionsSorted = [...promotions]
        if(!sort.id){            
            promotionsSorted.sort((a, b)=>{
                if (a.id < b.id) {
                    return -1;
                  }
                if (a.id > b.id) {
                    return 1;
                }
                return 0;
            })
            return [promotionsSorted, {
                id: true,
                combo: false,
                discountDate: false,
                active: false,
            }]
        }
        promotionsSorted.sort((a, b)=>{
            if (b.id < a.id) {
                return -1;
              }
            if (b.id > a.id) {
                return 1;
            }
            return 0;
        })
        return [promotionsSorted, {
            id: false,
            combo: false,
            discountDate: false,
            active: false,
        }]
}

export function sortByCombo(promotions, sort){
    let promotionsSorted = [...promotions]
        if(!sort.combo){            
            promotionsSorted.sort((a, b)=>{
                if (a.combo < b.combo) {
                    return -1;
                  }
                if (a.combo > b.combo) {
                    return 1;
                }
                return 0;
            })
            return [promotionsSorted, {
                id: false,
                combo: true,
                discountDate: false,
                active: false,
            }]
        }
        promotionsSorted.sort((a, b)=>{
            if (b.combo < a.combo) {
                return -1;
              }
            if (b.combo > a.combo) {
                return 1;
            }
            return 0;
        })
        return [promotionsSorted, {
            id: false,
            combo: false,
            discountDate: false,
            active: false,
        }]
}

export function sortByDiscountDate(promotions, sort){
    let promotionsSorted = [...promotions]
        if(!sort.discountDate){            
            promotionsSorted.sort((a, b)=>{
                if (a.discountDate < b.discountDate) {
                    return -1;
                  }
                if (a.discountDate > b.discountDate) {
                    return 1;
                }
                return 0;
            })
            return [promotionsSorted, {
                id: false,
                combo: false,
                discountDate: true,
                active: false,
            }]
        }
        promotionsSorted.sort((a, b)=>{
            if (b.discountDate < a.discountDate) {
                return -1;
              }
            if (b.discountDate > a.discountDate) {
                return 1;
            }
            return 0;
        })
        return [promotionsSorted, {
            id: false,
            combo: false,
            discountDate: false,
            active: false,
        }]
}

export function sortByActive(promotions, sort){
    let promotionsSorted = [...promotions]
        if(!sort.active){            
            promotionsSorted.sort((a, b)=>{
                if (a.active < b.active) {
                    return -1;
                  }
                if (a.active > b.active) {
                    return 1;
                }
                return 0;
            })
            return [promotionsSorted, {
                id: false,
                combo: false,
                discountDate: false,
                active: true,
            }]
        }
        promotionsSorted.sort((a, b)=>{
            if (b.active < a.active) {
                return -1;
              }
            if (b.active > a.active) {
                return 1;
            }
            return 0;
        })
        return [promotionsSorted, {
            id: false,
            combo: false,
            discountDate: false,
            active: false,
        }]
}