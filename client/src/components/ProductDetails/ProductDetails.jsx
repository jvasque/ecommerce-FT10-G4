import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { GetDetail } from "../../actions/GetDetails";
import "../../scss/components/_ProductDetails.scss";

const ProductDetails = (props) => {
  let productId = props.match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetDetail(productId));
  }, []);

  console.log(props.productDetail)
    return (
        <div >
        {props.loading?
            
                <div>
                    <div>

                        <div>
                        <img src={props.productDetail.sprites.other["official-artwork"].front_default} /> 
                        </div>

                        <div>
                            <h1>{props.productDetail.name}</h1>
                            <h7>{props.productDetail.categoryId}</h7>
                            <h7>{props.productDetail.locationId}</h7>
                        <div>
                            <h5>{props.productDetail.vendorId}</h5>
                            <h5>{props.productDetail.score}</h5>
                        </div>
                            <h2>{props.productDetail.unitPrice}</h2>
                        </div> 
                    </div>
                        <div>
                            <h3>Description</h3>
                            <p>{props.productDetail.description}</p>
                        </div>
                </div>
                :
                <div>loading...</div>}
        </div>
    )
};

const mapStateToProps = (state) => {
  return {
    productDetail: state.productDetail,
    loading: state.loadingDetail,
  };
};

export default connect(mapStateToProps, null)(ProductDetails);
