import React from 'react'
import '../../scss/components/Catalog/_Pages.scss'
import { useDispatch, useSelector} from "react-redux";
import { increasePage, decreasePage } from '../../redux/catalogReducer/catalogActions';

function Pages({totalProducts}){
    const page = useSelector(state => state.catalogReducer.page)
    const dispatch = useDispatch();

    return (
        // <div>{`< 1 2 3 4 5 6 7 8 9 10 >`}</div>
        <div className='containerPages'>
            <div onClick={() => dispatch(increasePage())}>{'<'}</div>
            <div >{`${page}`}</div>
            <div onClick={() => dispatch(decreasePage())}>{'>'}</div>
            <div className="catalogResults">{`Se cargaron ${totalProducts} productos.`}</div>
        </div>
        
    )
}

export default Pages