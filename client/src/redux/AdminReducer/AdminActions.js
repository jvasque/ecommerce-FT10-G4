import axios from "axios";
import jwtDecode from "jwt-decode";

// export const GET_USERS= 'GET_USERS'


// export const getUsers = ()=> {
    
//     return async function (dispatch) {
//         try {
//             const token = localStorage.getItem("token");
//             const info = await axios.get("http://localhost:3001/admin", {
//                 headers: { Authorization: `Bearer ${token}` },
//               });
//           //console.log(info.data);
          
    
//           console.log(info.data);
//           dispatch({
//             type: GET_USERS,
//             payload: info.data,
//           });
//         } catch (e) {
//          console.log(e)
//         }
//       };
// }