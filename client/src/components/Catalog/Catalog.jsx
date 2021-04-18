import React, { useState, useEffect } from 'react'
import ProductCard from '../ProductCard/ProductCard.jsx'
import { useSelector} from "react-redux";
import Pages from './Pages.jsx'
import CategoryFilter from './CategoryFilter.jsx'
import '../../scss/components/Catalog/_Catalog.scss'




function Catalog(){
    const query = useSelector(state => state.searchReducer.query)
    const queryStatus = useSelector(state => state.searchReducer.queryStatus)
    const products = useSelector(state => state.catalogReducer.products)
    const page = useSelector(state => state.catalogReducer.page)
    const categoryFiltered = useSelector(state => state.categoryFilterReducer.categoryFiltered)
    const categories = useSelector(state => state.categoryFilterReducer.categories)
    
    const [catalog, setCatalog] = useState(queryStatus ? query : products)
    const totalCards = 12
  
    
    
    useEffect(() => {     
        if(queryStatus){
            if(categoryFiltered.length > 0 && query.length > 0){
                let filteredCatalog = query.filter(product => {
                    let filteredProducts = product.categories.map(category => {
                        return category.name
                    })
                    return filteredProducts.includes(categoryFiltered)
                })
                setCatalog(filteredCatalog)
            }else{
                setCatalog(query) 
            }
        }else if(categoryFiltered.length > 0){
            let filteredCatalog = categories.filter(category => {
                return category.name === categoryFiltered
            })[0].products
            setCatalog(filteredCatalog)
        }else{
            setCatalog(products) 
        }     
        return
    },[categoryFiltered, queryStatus, query, products, categories])

    
    return (
        <div className='catalogContainer'>
            <div className='filterScreen'>
                <CategoryFilter/>
            </div>
            <div className='catalogScreen'>
                <div className='catalogMatrix'>                    
                    {
                        !catalog[0]?.error && catalog?.map((product) => {
                            if(product.unitsOnStock === 0) return
                            return (                             
                                <ProductCard product={product} key={product.id}/>             
                            )
                        }).slice((page-1)*totalCards, (page-1)*totalCards+totalCards)
                    }
                </div>
                {
                   !catalog[0]?.error &&  <Pages totalProducts={catalog.length} totalCards={totalCards}/>
                }
            </div>
        </div>        
    )
}

export default Catalog;