import React, {useState} from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import "../../scss/components/Reviews/_CommentaryReviews.scss";
import { deleteCommentary, modifyCommentary } from '../../redux/reviewsReducer/actionsReviews';
import { useDispatch } from 'react-redux';
import swal from "sweetalert";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';


const verdePrincipal="#378A19";
const grisPrincipal= "#EFEFEF";
//const grisClaro= "#F7F7F7";



function CommentaryReviews({ id, content, score, userId, 
  firstName, lastName, fullName, photoURL, productId, state }) {

    const useStyles = makeStyles((theme) =>({
      root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
      },
      purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
      },
      delete: {
        position: "absolute",
        top: "8%",
        right: "10%",
        cursor: "pointer",
        color: "gray"
      },
      settings: {
        position: "absolute",
        top: "8%",
        right: "15%",
        cursor: "pointer",
        color: "gray"
      },
      green: {
        color: grisPrincipal,
        backgroundColor: verdePrincipal,
        backgroundSize: "cover",
        position: "absolute",
        top: "5%",
        right: "2%"
      },
      avaImg: {
        background: `url(${photoURL})`,
        backgroundSize: "cover",
        position: "absolute",
        top: "5%",
        right: "2%"
      },
      checkIcon: {
        color: verdePrincipal,
        backgroundColor: grisPrincipal,
        position: "absolute",
        top: "8%",
        right: "20%",
        cursor: "pointer",
        borderRadius: "50%" 
      },
      cancelIcon: {
        color: "rgb(245, 59, 26)",
        backgroundColor: grisPrincipal,
        position: "absolute",
        top: "8%",
        right: "25%",
        cursor: "pointer",
        borderRadius: "50%" 
      }
  }));

    const dispatch = useDispatch();
    const classes = useStyles();
    const [input, setInput] = useState({
      text:content,
      rate:score
    })
    const [toggle, setToggle] = useState(false);
    const [hidden, setHidden] = React.useState(false);

    const token = localStorage.getItem("token");

    const handleVisibility = () => {
      setHidden((prevHidden) => !prevHidden);
    };
     
    function deleteRev(e, id, token){
      e.preventDefault(e);
      swal({
        title: "Está seguro de borrar el comentario seleccionado?",
        text: "Una vez borrado, desaparecerá de su base de datos!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {  
        if (willDelete) {  
          dispatch(deleteCommentary(id, token))
          
          swal("Su comentario fue borrado con éxito!", 
          {icon: "success"})
          .then(e => window.location.reload())
          
        } else {    
          swal("El comentario NO fue borrado");  
        }});
    }

    function modifRev(e, id, text, rate, token){
      //e.preventDefault();
      swal({
        title: "Está seguro de modificar su comentario?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willModify) => {  
        if (willModify) {  
          dispatch(modifyCommentary(id, text, rate.toString(), token));
          
          swal("Su comentario fue modificado con éxito!", 
          {icon: "success"})
          .then(e => window.location.reload())
          
        } else {    
          swal("El comentario NO fue modificado");  
        }});
    }

    function handleCancelModif (e) {
      setInput({
        text:content,
        rate:score
      });
      setToggle(!toggle)
    } 

    const validateModify = () => {
     /*  console.log(state, "STATEEEEEEE");
      console.log(userId, "ID USUARIO");
      console.log(state.user.id, "STATE USER ID"); */
      if(!state.isLogin) return false;
      if(state.user.type === "superadmin" || state.user.type === "admin") return true;
      if(state.user.id !== userId) return false; 
      return true;
    }

    let firstLast = (firstName[0] && lastName[0])? 
    (firstName[0] + lastName[0]) : ""

  return (
    <div className="CommentaryReviews">
    <i>{fullName}</i>
    {photoURL && 
    <div className={classes.root}>
      <Avatar alt={fullName} src={photoURL}  className={classes.avaImg}>
        {firstLast? firstLast : "A"}
      </Avatar>
    </div>}
    {!photoURL && 
    <Avatar className={classes.green} >
      {firstLast || "A"}
    </Avatar>}
      {!toggle && <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={score} readOnly />
      </Box>}
      {toggle && <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating
          name="simple-controlled"
          value={input.rate}
          onChange={(event, newValue) => {
            setInput({...input, rate: newValue});
          }}
        />
      </Box>}
      {!toggle && content}
      {toggle && <input className="input-textarea" type="textarea" value={input.text} onChange={(e)=> setInput({...input, text:e.target.value})}/>}
      { validateModify() && <DeleteIcon className={classes.delete} 
      onClick ={(e) => deleteRev(e, id, token)}/>}
      {toggle && 
      <div>
        <CheckCircleIcon className={classes.checkIcon} onClick={(e)=>{modifRev(e, id, input.text, input.rate, token)}}/>
        <CancelIcon className={classes.cancelIcon} onClick={(e) => {handleCancelModif(e)}}/>
       
      </div>}
      { validateModify() && <SettingsIcon className={classes.settings} onClick={(e) => {setToggle(!toggle); handleVisibility(); }}/>}
    </div>
  );
}

export default CommentaryReviews;
