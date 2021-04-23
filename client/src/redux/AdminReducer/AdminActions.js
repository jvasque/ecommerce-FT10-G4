import axios from "axios";


export const GET_USERS = "GET_USERS";
export const MOD_PASS = "MOD_PASS";
export const CHANGE_TYPE = "CHANGE_TYPE"

export const GetUsers = () => {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const info = await axios.get("http://localhost:3001/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(info.data);
      dispatch({
        type: GET_USERS,
        payload: info.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const ModPass = (id) => {
    console.log(id)
    return async function (dispatch) {
      try {
        const token = localStorage.getItem("token");
        const info = await axios.post(`http://localhost:3001/auth/password/reset/${id}`, {} , {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(info.data);
      dispatch({
        type: MOD_PASS,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const ChangeType = ( id, type) => {
  console.log(type)
//   return async function (dispatch) {
//     try {
//       const token = localStorage.getItem("token");
//       const info = await axios.put(`http://localhost:3001/admin/promote/${type.id}`, {change: type.name} , {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     console.log(info.data);
//     dispatch({
//       type: CHANGE_TYPE,
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };
};
