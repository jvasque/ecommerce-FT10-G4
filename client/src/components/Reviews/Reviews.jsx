import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { submitCommentary } from '../../redux/reviewsReducer/actionsReviews';
import { useDispatch, useSelector } from 'react-redux';
import "../../scss/components/Reviews/_Reviews.scss";

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}));

function Reviews(props) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
      rate: "",
      text:""
  });
  const classes = useStyles();

  function handleInput(e){
    e.preventDefault();
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
  }

  return (
    <div className="Reviews">
      <h1>LAS REVIEWS BROO</h1>
      <form className="input-container">
        <TextField
          id="outlined-multiline-static"
          label="Review"
          name="text"
          value={input.text}
          onChange= {(e)=>{handleInput(e)}}
          multiline
          rows={4}
          placeholder="Comenta que te parece el producto"
          variant="outlined"
        />
        <Box component="fieldset" mb={3} borderColor="transparent" className="rate-send">
          <Typography component="legend">Valora este producto</Typography>
          <Rating
            name="rate"
            value={input.rate}
            onChange={(e)=>{handleInput(e)}}
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
            type="submit"
            onClick = {()=> dispatch(submitCommentary(input.text, input.rate, props.id))}
          >
            Enviar
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Reviews;
