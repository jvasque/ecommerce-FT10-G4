import axios from 'axios';

export const POST_LOCATION = 'POST_LOCATION';
export const POST_LOCATION_ERROR = 'POST_LOCATION_ERROR';
export const PUT_LOCATION = 'PUT_LOCATION';
export const RESET_LOCATION = 'RESET_LOCATION';
export const RESET_ERROR = 'RESET_ERROR';
export const RESET_DELETED = 'RESET_DELETED';
export const GET_CENTERS = 'GET_CENTERS';
export const DELETE_CENTER = 'DELETE_CENTER';
export const GET_TIMES = 'GET_TIMES';
export const CREATE_TIMESLOT = 'CREATE_TIMESLOT';
export const RESET_TIMESLOT = 'RESET_TIMESLOT';
export const GET_APPOINTMENTS = 'GET_APPOINTMENTS';

export function createLocation({ street, city, addressNumber, userId }) {
  return async function (dispatch) {
    const geo = await axios.get(
      `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=83JHNoayKi3lxdvx66GW-T8z0UfKtTdKdn3eB40rKcM&searchtext=${city} ${street} ${addressNumber}`
    );

    if (geo.data.Response.View.length !== 0) {
      let result = geo.data.Response.View[0].Result[0].Location;

      let latitud = result.DisplayPosition.Latitude;
      let longitud = result.DisplayPosition.Longitude;
      let ciudad = result.Address.City;
      let address = result.Address.Label;
      let country = result.Address.Country;
      let postal = result.Address.PostalCode;
      let province = result.Address.State;

      console.log(result);

      const info = await axios.post('http://localhost:3001/locations/', {
        latitud,
        longitud,
        ciudad,
        country,
        province,
        postal,
        address,
        street,
        addressNumber,
        userId,
      });

      console.log(info);

      dispatch({
        type: POST_LOCATION,
        payload: info.data,
      });
    } else {
      dispatch({
        type: POST_LOCATION_ERROR,
        payload: {
          error:
            'No se encontró esa locación, por favor ingrese los datos nuevamente.',
        },
      });
    }
  };
}

export function modifyLocation({ id, label, street, city, addressNumber }) {
  return async function (dispatch) {
    const geo = await axios.get(
      `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=83JHNoayKi3lxdvx66GW-T8z0UfKtTdKdn3eB40rKcM&searchtext=${city} ${street} ${addressNumber}`
    );

    if (geo.data.Response.View.length !== 0) {
      let result = geo.data.Response.View[0].Result[0].Location;

      let latitud = result.DisplayPosition.Latitude;
      let longitud = result.DisplayPosition.Longitude;
      let ciudad = result.Address.City;
      let address = result.Address.Label;
      let country = result.Address.Country;
      let postal = result.Address.PostalCode;
      let province = result.Address.State;

      const info = await axios.put(`http://localhost:3001/locations/${id}`, {
        label,
        address,
        street,
        addressNumber,
        ciudad,
        country,
        province,
        postal,
        latitud,
        longitud,
      });

      console.log(info);

      dispatch({
        type: PUT_LOCATION,
        payload: info.data,
      });
    } else {
      dispatch({
        type: POST_LOCATION_ERROR,
        payload: {
          error:
            'No se encontró esa locación, vuelva a intentar la modificación.',
        },
      });
    }
  };
}

export function resetLocation() {
  return function (dispatch) {
    dispatch({
      type: RESET_LOCATION,
    });
  };
}

export function getCenters() {
  return async function (dispatch) {
    let centers = await axios.get('http://localhost:3001/locations');
    dispatch({
      type: GET_CENTERS,
      payload: centers.data,
    });
  };
}

export function deleteCenter(id) {
  return async function (dispatch) {
    let center = await axios.post(
      `http://localhost:3001/locations/delete/${id}`
    );
    dispatch({
      type: DELETE_CENTER,
      payload: center.data,
    });
  };
};
export function getTimes(id, day) {
  return async function (dispatch) {
    let times = await axios.get(
      `http://localhost:3001/locations/${id}/timeslots`
    );
    // console.log(times)// 12/08/2019
    // console.log("DB: ",times.data[0].date, typeof times.data[0].date,"\n","Param: ", day, typeof day)

    let unavailablePerDay = null;    
    
    if (day) {
      //setting day to the right format
      day = day.toString();
      console.log(day);
      day = day.split(" ").splice(1,3);
      console.log(day);
      
      let months = {
        "Jan": "01",
        "Feb": "02",
        "Mar": "03",
        "Apr": "04",
        "May": "05",
        "Jun": "06",
        "Jul": "07",
        "Aug": "08",
        "Sep": "09",
        "Oct": "10",
        "Nov": "11",
        "Dec": "12",  
      }
      day[0] = months[day[0]];
      day = day[2]+'-'+day[0]+'-'+day[1]
      
      console.log(day)
      
      if (times.data && times.data.length)
      { unavailablePerDay = times.data.filter((time) => time.date===day) }
    };

    let obj = {
      oneDay: unavailablePerDay,
      allDays: times.data,
    }    

    console.log(obj);
    dispatch({
      type: GET_TIMES,
      payload: obj
    });
  };
};

export function createTimeslot(input) {
  return async function (dispatch) {
    let timeslot = await axios.post(
      `http://localhost:3001/locations/${input.locationId}/timeslots`, input
    );
      console.log("timeslot: ", timeslot)
      console.log('input: ', input)

    dispatch({
      type: CREATE_TIMESLOT,
      payload: timeslot.data,
    });
  };
};

export function resetTimeslot() {
  return function (dispatch) {
    dispatch({
      type: RESET_TIMESLOT,
    });
  };
}

export function getAppointments(id) {
  return async function (dispatch) {
    let appointments = await axios.get(
      `http://localhost:3001/users/${id}/timeslots`
    );

    dispatch({
      type: GET_APPOINTMENTS,
      payload: appointments.data,
    });
  };
}