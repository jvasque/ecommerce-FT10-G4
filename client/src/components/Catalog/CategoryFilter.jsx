import React, { useState, useEffect } from 'react'
import '../../scss/components/Catalog/_Filter.scss'
import { useDispatch, useSelector} from "react-redux";
import { getCategories, filterCategory, getProductCategories } from '../../redux/categoryFilterReducer/categoryFilterActions';
import DivText from '../ProductCard/DivText'


function CategoryFilter(){
    const categories = useSelector(state => state.categoryFilterReducer.categories)
    const categoryFiltered = useSelector(state => state.categoryFilterReducer.categoryFiltered)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
        return
    },[])

    function handleClick(cat){
        dispatch(filterCategory(cat))
    }

    return (
        <div className='containerFilter'>
            <div className='categoriesFilter' onClick={() => handleClick('')}>
                <b><DivText content='Catalogo'/></b>
            </div>     
            {
                categories.map((category, index) => {
                    return (
                        <div className='categoriesLoaded' key={index}  onClick={() => handleClick(category.name)}>               
                            <DivText className='categoryButton' content={category.name}/>                                  
                        </div>
                        )
                })
            }   
        </div>
    )
}

export default CategoryFilter