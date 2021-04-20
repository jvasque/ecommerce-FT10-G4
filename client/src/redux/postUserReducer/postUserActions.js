import axios from "axios";

export const POST_USER = "POST_USER";
export const POST_FAIL = "POST_FAIL";
export const POST_STATUS = "POST_STATUS";
export const POST_SUCCESS = "POST_SUCCESS";

export function postUser({firstName, lastName, email, password }) {
    
  return async function (dispatch) {
      try{var json = await axios.post("http://localhost:3001/users/post", {
          data: {
            firstName, 
            lastName, 
            email, 
            password, 
           
          }
      });
      dispatch({ type: POST_USER, payload: json.data })}
     catch(e){
      dispatch({
        type: POST_FAIL,
        payload: e
      });
    }
  }
}

export const SwalBooC = () => {
  return {
    type: POST_STATUS
  }
}

export const PostSuccess = () => {
  return {
    type: POST_SUCCESS
  }
}