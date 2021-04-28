import axios from 'axios';

export const POST_LOCATION = 'POST_LOCATION';
export const GET_ADDRESS = 'GET_ADDRESS';

export function createLocation({ address, postal }) {
  return async function (dispatch) {
    const geo = await axios.get(`http://api.positionstack.com/v1/forward?access_key=7646425119bcb83fee7e9cfd57f641c4&query=${address}`);
    console.log(geo)
    let latitud = geo.data.data[0].latitude;
    let longitud = geo.data.data[0].longitude;
    let province = geo.data.data[0].region;
    let country = geo.data.data[0].country;
    let postalAPI = geo.data.data[0].postal_code;
    let city = geo.data.data[0].locality || geo.data.data[0].county;
    
    const info = await axios.post('http://localhost:3001/locations/', {
      latitud,
      longitud, 
      city,
      country,
      province,
      postal: postalAPI || postal, 
      address, 
    });
    dispatch({
      type: POST_LOCATION,
      payload: info,
    });
  };
}

export function getAddress(input) {
  return async function (dispatch) {
    const info = await axios.get('http://api.positionstack.com/v1/forward?access_key=7646425119bcb83fee7e9cfd57f641c4&query=' + input);
    dispatch({
      type: GET_ADDRESS,
      payload: info.data.data,
    });
  };
}
