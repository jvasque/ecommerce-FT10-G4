import axios from "axios";

export const POST_USER = "POST_USER";
// companyName, phone, address, city

export function postUser({firstName, lastName, email, password }) {
    
  return async function (dispatch) {
      var json = await axios.post("http://localhost:3001/users/post", {
          data: {
            firstName, 
            lastName, 
            email, 
            password, 
           
          }
      });
      return dispatch({ type: POST_USER, payload: json.data })
  }
}