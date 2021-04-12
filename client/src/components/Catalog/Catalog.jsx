import React, { useState, useEffect } from 'react'
import ProductCard from '../ProductCard/ProductCard.jsx'
import { useDispatch, useSelector} from "react-redux";
import Pages from './Pages.jsx'
import CategoryFilter from './CategoryFilter.jsx'
import '../../scss/components/Catalog/_Catalog.scss'


function Catalog(){
    const query = useSelector(state => state.searchReducer.query)
    const queryStatus = useSelector(state => state.searchReducer.queryStatus)
    const products = useSelector(state => state.catalogReducer.products)
    const categoryFiltered = useSelector(state => state.categoryFilterReducer.categoryFiltered)
    const categories = useSelector(state => state.categoryFilterReducer.categories)
    const [catalog, setCatalog] = useState(queryStatus ? query : products)

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
                        catalog?.map((product) => {
                            return (                             
                                <ProductCard product={product} key={product.productId}/>             
                            )
                        })
                    }
                </div>
                <Pages totalProducts={catalog.length}/>
            </div>
        </div>        
    )
}

export default Catalog;