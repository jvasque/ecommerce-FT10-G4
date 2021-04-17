import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import "../../scss/components/Reviews/_CommentaryReviews.scss";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

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
}));

function CommentaryReviews({ id, content, score, userId, firstName, lastName, fullName, photoURL }) {
    const classes = useStyles();

    let firstLast = (firstName[0] && lastName[0])? (firstName[0] + lastName[0]) : ""
  return (
    <div className="CommentaryReviews">
    <i>{fullName}</i>
    {photoURL && <div className={classes.root}><Avatar alt={fullName} src={photoURL}>{firstLast? firstLast : "A"}</Avatar></div>}
    {!photoURL && <Avatar className={classes.purple}>{firstLast || "A"}</Avatar>}
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={score} readOnly />
      </Box>
      {content}
    </div>
  );
}

export default CommentaryReviews;
