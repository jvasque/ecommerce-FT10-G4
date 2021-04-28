import axios from "axios";

export const POST_LOCATION = "POST_LOCATION";

export function createLocation({ address, country, province, city, postal }) {
    return async function (dispatch) {
      const info = await axios.post('http://localhost:3001/locations-locationPost', {
          data: {
            address,//latitud y longitud
            country, 
            province, 
            city, 
            postal 
          }
      });
      dispatch({
        type: POST_LOCATION,
        payload: info.data,
      });
    };
}