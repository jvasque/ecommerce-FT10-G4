import React, { useEffect } from "react";

import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import PropTypes from "prop-types";

// import { Icon, InlineIcon } from '@iconify/react';
// import tractorIcon from '@iconify-icons/fa-solid/tractor';



import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/detailReducer/detailActions";

import "../../scss/components/ProductDetail/_ProductDetails.scss";

import Carousel from "./Carousel";

// npm install --save-dev @iconify/react @iconify-icons/la
import { Icon } from '@iconify/react';
import tractorIcon from '@iconify-icons/la/tractor';


const customIcons = {
  1: {
    icon: <Icon icon={tractorIcon}  />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <Icon icon={tractorIcon} />,
    label: "Dissatisfied",
  },
  3: {
    icon: <Icon icon={tractorIcon} />,
    label: "Neutral",
  },
  4: {
    icon: <Icon icon={tractorIcon} />,
    label: "Satisfied",
  },
  5: {
    icon: <Icon icon={tractorIcon} />,
    label: "Very Satisfied",
  },
};
function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number,
};

const ProductDetails = (props) => {
  let productId = props.match.params.id;
console.log(productId)
  const dispatch = useDispatch();
  const { productDetail, loading } = useSelector((state) => state.detailReducer);
  useEffect(() => {
    dispatch(getDetail(parseInt(productId)));
  }, [productId, dispatch]);

  return (
    <div className="productDetails">
      {console.log(productDetail, "PRODUCT DETAIL" )}
      {loading ? (
        <div className="containerDetails">
          <div className='firstCard'>
            <Carousel img={productDetail.data.picture} />
            <div className="datos">
              <div className="detailTitle">
                <h2>{productDetail.data.name}</h2>
              </div>
              <h4>Precio: {productDetail.data.unitPrice} USD</h4>

              <h4>Stock: {productDetail.data.unitsOnStock}</h4>

              <div className="stars">
                <Box component="div"  borderColor="transparent">
                  <Typography component="legend"><h3>Score:</h3></Typography>
                  <Rating
                  size="large"
                    name="customized-icons"
                    value={productDetail.data.score ? productDetail.data.score : 1}
                    getLabelText={(value) => customIcons[value].label}
                    IconContainerComponent={IconContainer}
                    readOnly
                  />
                </Box>
              </div>
            </div>
          </div>
          <div className="description">
            <h3>Descripcion</h3>
            <hr/>
            <p>{productDetail.data.description}</p>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default ProductDetails;
