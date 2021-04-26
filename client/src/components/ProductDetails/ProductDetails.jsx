import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import "../../scss/components/ProductDetail/_ProductDetails.scss";
import axios from "axios";

// React Components
import Reviews from "../Reviews/Reviews";
import CommentaryReviews from "../Reviews/CommentaryReviews";
import WishlistButton from "../Wishlist/WishlistButton";
import Carousel from "./Carousel";
import { useHistory } from "react-router";

// Iconify
import { Icon } from "@iconify/react";
import tractorIcon from "@iconify-icons/la/tractor";

// Material UI
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Pagination from '@material-ui/lab/Pagination';
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

// Redux Actions 
import { resetQuery } from "../../redux/searchReducer/searchActions";
import { filterCategory } from "../../redux/categoryFilterReducer/categoryFilterActions";
import { getDetail } from "../../redux/detailReducer/detailActions";
import { modifyCart, modifyFav } from "../../redux/iconReducer/iconActions";
import { addProduct, deleteProduct } from "../../redux/cartReducer/cartActions";

// ------------ Tractor Icon
function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}
IconContainer.propTypes = {
  value: PropTypes.number,
};
const customIcons = {
  1: {
    icon: <Icon icon={tractorIcon} />,
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

// ------------ Component
const ProductDetails = (props) => {  
  const { productDetail, loading } = useSelector((state) => state.detailReducer);
  const { reviews, hasBuyOrderDetail } = useSelector((state) => state.reviewsReducer);
  const iconState = useSelector((state) => state.iconReducer);
  const loggin = useSelector((state) => state.loginReducer);
  
  const [hasComment, setHasComment] = useState([]);
  const [hasBuy, setHasBuy] = useState([]);
  const [productScore, setProductScore] = useState(0);
  const [pagination, setPagination] = useState(1);
  const [state, setState] = useState({
    [`Fav-${productDetail.id}`]: iconState.fav[`Fav-${productDetail.id}}`],
    [`Cart-${productDetail.id}}`]: iconState.cart[`Cart-${productDetail.id}}`],
  });
  
  let productId = props.match.params.id;
  
  const history = useHistory();
  const dispatch = useDispatch();

  
  const Fav = (productId, handleIcons) => {
    console.log(handleIcons)
    return (
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={iconState.fav[`Fav-${productDetail.id}`] || false}
            name={`Fav-${productId}`}
            onChange={(e) => handleFav(e)}
          />
        }
      />
    );
  };


  const Cart = (productId, handleIcons) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            icon={<ShoppingCartOutlinedIcon />}
            checkedIcon={<ShoppingCartIcon style={{ color: "white" }} />}
            checked={iconState.cart[`Cart-${productDetail.id}`] || false}
            name={`Cart-${productId}`}
            onChange={(e) => handleCart(e)}
          />
        }
      />
    );
  };

  
  function handleFav(event) {
    let { name, checked } = event.target;
    setState({ ...state, [name]: checked });

    if (name.includes("Fav")) {
      dispatch(modifyFav({ [name]: checked }));
    }
    // dispatch(modifyFav({ [name]: checked }));   
  }

  function handleCart(event) {
    const test = iconState.cart[`Cart-${productDetail.id}`];
    if (test === false || test === undefined) {
      dispatch(addProduct(productDetail));
    } else {
      dispatch(deleteProduct(productDetail));
    }
    let { name, checked } = event.target;
    setState({ ...state, [name]: checked });
    
    dispatch(modifyCart({ [name]: checked }));
    
  }

  useEffect(() => {
    const fetchData = (async function () {
      let json = await axios.get(
        `http://localhost:3001/products/${parseInt(productId)}/review`,{
          params: {
              pagination: (pagination-1)*2,
          }
        }
      );

      let userHasBuy = await axios.get(
        `http://localhost:3001/products/${parseInt(
          productId
        )}/review-order-details/`
      );
      let resProductScore = await axios.get(
        `http://localhost:3001/products/${parseInt(
          productId
        )}/review-product-score`
      );
      
      dispatch({ type: "GET_COMMENTARY", payload: json.data });
      dispatch({ type: "HAS_BUY", payload: userHasBuy });
      dispatch({ type: "GET_PRODUCT_SCORE", payload: resProductScore });

      setHasComment(json.data.arrUsersCommented); //Saco los ID de los que tienen al menos una review en el producto
      setHasBuy(userHasBuy.data?.map((e) => e.order.userId)); //Saco los ID de los usuarios que tienen una Order Detail con el produco
      setProductScore(resProductScore.data);
    })();    

    dispatch(getDetail(parseInt(productId)));
  }, [productId, dispatch, pagination]);

  const handleClick = (cat) => {
    dispatch(filterCategory(cat));
    dispatch(resetQuery());
    history.push({
      pathname: "/catalog",
    });
  };

  const validateComment = () => {
    if (!loggin.isLogin) return false;
    if (loggin.user.type === "superadmin" || loggin.user.type === "admin")
      return true;
    if (!hasBuy.includes(loggin.user.id)) return false; //Descomentar cuando este bien hecha la pre-carga
    if (hasComment.includes(loggin.user.id)) return false;
    return true;
  };

  function handleButtonChange (event, value){
    setPagination(value)
  }

  return (
    <div className="productDetails">
      {loading ? (
        <div className="containerDetails">
          <div className="firstCard">
            <Carousel img={productDetail.picture} />
            <div className="datos">
              <div className="detailTitle">
                <h2>{productDetail.name}</h2>
                <div className="stars">
                  <Box component="div" borderColor="transparent">
                    <Rating
                      size="large"
                      name="customized-icons"
                      value={productScore ? productScore : 1}
                      getLabelText={(value) => customIcons[value].label}
                      IconContainerComponent={IconContainer}
                      readOnly
                    />
                  </Box>
                </div>
              </div>
              <h4>SKU: {productDetail.SKU}</h4>
              <h4>Precio: {productDetail.unitPrice} USD</h4>
              <h4>Stock: {productDetail.unitsOnStock}</h4>
              <div className="categroy-details">
                {productDetail.categories
                  ? productDetail.categories.map((c) => (
                      <button
                        className="fill"
                        key={productDetail.categories.indexOf(c)}
                        onClick={() => handleClick(c.name)}
                      >
                        {c.name}
                      </button>
                    ))
                  : ""}
              </div>
              <hr />
              <div className="productOptions">
                <div className="favorites">
                  <div className="text">Agregar a Favoritos</div>
                  <div className="icon">
                    {Fav(productId,  handleFav)}
                  </div>
                </div>
                <div className="addCart">
                  <div className="text">Agregar al Carrito</div>
                  <div className="icon">
                    {productDetail.unitsOnStock>0 && Cart(productId,  handleCart)}
                  </div>
                </div>
                <div className="addWishlist">
                  <WishlistButton />
                </div>
              </div>
            </div>
          </div>
          <div className="description">
            <h3>Descripcion</h3>
            <hr />
            <p>{productDetail.description}</p>
          </div>
          {validateComment() && (
            <Reviews userId={loggin.user.id} id={productDetail.id} />
          )}
          <h2>Comentarios de otros usuarios</h2>
          <div>
            <Pagination count={Math.ceil(hasComment?.length/2)} color="primary" page={pagination} onChange={handleButtonChange} />
          </div>
          {reviews[0] &&
            reviews[0][0] &&
            reviews[0].map((e) => {
              let fullName;
              let firstName;
              let lastName;
              let photoURL;
              e.user ? (fullName = e.user.fullName) : (fullName = "Anonymous");
              e.user ? (firstName = e.user.firstName) : (firstName = "");
              e.user ? (lastName = e.user.lastName) : (lastName = "");
              e.user ? (photoURL = e.user.photoURL) : (photoURL = "");
              return (
                <CommentaryReviews
                  key={e.id}
                  id={e.id}
                  state={loggin}
                  score={e.score}
                  content={e.content}
                  userId={e.userId}
                  firstName={firstName}
                  lastName={lastName}
                  fullName={fullName}
                  photoURL={photoURL}
                  productId={productDetail.id}
                />
              );
            })}
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default ProductDetails;
