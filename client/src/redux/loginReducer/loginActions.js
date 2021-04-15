import axios from "axios";

export const LOGIN_ACTION_KEY = "LOGIN_ACTION_KEY";


export const LoginAction = (email) =>{
    return async function (dispatch) {
        const info = await axios.get(`http://localhost:3001/users/login?email=${email}`);
        console.log(info.data)
        dispatch({
          type: LOGIN_ACTION_KEY,
          payload: info.data,
        });
      };
}