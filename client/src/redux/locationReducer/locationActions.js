import axios from 'axios';

export const POST_LOCATION = 'POST_LOCATION';

export function createLocation({ address, postal }) {
  return async function (dispatch) {
    const geo = await axios.get(`http://api.positionstack.com/v1/forward?access_key=7646425119bcb83fee7e9cfd57f641c4&query=${address}`);
    
    let latitud = geo.data[0].latitude;
    let longitud = geo.data[0].longitude;
    let province = geo.data[0].region;
    let country = geo.data[0].country;
    let postalAPI = geo.data[0].postal_code;
    let city = geo.data[0].locality || geo.data[0].county;
    
    const info = await axios.post('http://localhost:3001/locations/', {
      latitud,
      longitud, 
      city,
      country,
      province,
      postal: postalAPI || postal,  
    });
    dispatch({
      type: POST_LOCATION,
      payload: info,
    });
  };
}
