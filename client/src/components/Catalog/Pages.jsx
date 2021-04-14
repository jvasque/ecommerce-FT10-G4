import React from 'react'
import '../../scss/components/Catalog/_Pages.scss'
import { useDispatch, useSelector} from "react-redux";
import { increasePage, decreasePage, setPage } from '../../redux/catalogReducer/catalogActions';
import DivText from '../ProductCard/DivText'

function Pages({totalProducts, totalCards}){
    const page = useSelector(state => state.catalogReducer.page)
    const dispatch = useDispatch();

    return (
        // <div>{`< 1 2 3 4 5 6 7 8 9 10 >`}</div>
        <div className='containerPages'>
            <div className='pagesBar'>
                <div className='page' onClick={() => {if(page > 1) dispatch(decreasePage())}}><DivText content='<'/></div>
                <div className='page pageNumber' onClick={() => dispatch(setPage(page))}><DivText content={`${page}`}/></div>
                <div className='page' onClick={() => {if(page < Math.ceil(totalProducts/totalCards)) dispatch(increasePage())}}><DivText content='>'/></div>
            </div>
            <div className="catalogResults">{`Se cargaron ${totalProducts} productos.`}</div>
        </div>
        
    )
}

export default Pages