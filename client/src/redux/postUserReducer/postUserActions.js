import axios from "axios";

export const    POST_USER = "POST_USER";

export const postUser = ({firstName, lastName, email, password, companyName, phone, address, city}) => {
    
    return (dispatch) => {
        dispatch({ type: POST_USER });
        axios({
          method: 'post',
          url: `http://localhost:3001/users/post`,
          data: {
            firstName, 
            lastName, 
            email, 
            password, 
            companyName, 
            phone, 
            address, 
            city
          },
        }).catch(e=> dispatch(e))
    }
}