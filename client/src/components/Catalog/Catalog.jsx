import React, { useState, useEffect } from 'react'
import ProductCard from '../ProductCard/ProductCard.jsx'
import { getQuery } from '../../redux/searchReducer/searchActions';
import { getCatalog } from '../../redux/catalogReducer/catalogActions';
import { useDispatch, useSelector} from "react-redux";
import Pages from './Pages.jsx'
import Filter from './Filter.jsx'
import '../../scss/components/Catalog/_Catalog.scss'

function Catalog(){
    const query = useSelector(state => state.searchReducer.query)
    const queryStatus = useSelector(state => state.searchReducer.queryStatus)
    const products = useSelector(state => state.catalogReducer.products)
    const dispatch = useDispatch();
    let catalog = queryStatus ? query : products;

    useEffect(() => {
        dispatch(getCatalog())
        return
    },[queryStatus])

    return (
        <div className='catalogContainer'>
            <div className='filterScreen'>
                <Filter/>
            </div>
            <div className='catalogScreen'>
                <div className='catalogMatrix'>
                    {
                        catalog.map((product) => {
                            return (                             
                                <ProductCard product={product} key={product.productId}/>             
                            )
                        })
                    }
                </div>
                <Pages/>
            </div>
        </div>        
    )
}

export default Catalog;