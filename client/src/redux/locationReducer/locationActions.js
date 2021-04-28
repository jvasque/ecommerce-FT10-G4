import axios from 'axios';

export const POST_LOCATION = 'POST_LOCATION';

export function createLocation({ address, country, province, city, postal }) {
  return async function (dispatch) {
    //cuadrar latitud y longitud en base a address con google api
    const info = await axios.post('http://localhost:3001/locations/', {
      address,
      latitud: '',
      longitud: '',
      country,
      province,
      city,
      postal,
    });
    dispatch({
      type: POST_LOCATION,
      payload: info,
    });
  };
}
