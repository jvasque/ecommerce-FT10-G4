import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import "../../scss/components/Reviews/_CommentaryReviews.scss";

function CommentaryReviews({ id, content, score, userId }) {
  return (
    <div className="CommentaryReviews">
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={score} readOnly />
      </Box>
      {content}
    </div>
  );
}

export default CommentaryReviews;
