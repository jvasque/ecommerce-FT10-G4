import React, { useState, useEffect } from "react";
import axios from "axios";

// Material-UI
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { FormControl } from "@material-ui/core";
import Swal from "sweetalert2";

// styles
const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

// Component
export const OptionsLocation = ({ setModalCenters, modalCenters }) => {
  const [value, setValue] = useState("");
  const [centers, setCenters] = useState([]);
  async function getLocations() {
    let data = await axios.get(`http://localhost:3001/locations`);
    setCenters(data.data);
  }
  const handleChange = (event) => {
    setValue(event.target.value);
    setModalCenters(!modalCenters);
    Swal.fire({
      icon: "success",
      title: `Elegiste ${event.target.name}`,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  const radioButtons =
    centers.length !== 0 &&
    centers.map((center) => (
      <FormControlLabel
        checked={value === center.id.toString()}
        value={center.id}
        label={` ${center.address} - ${center.city} - ${center.province}`}
        control={<GreenRadio />}
        name={` ${center.address} - ${center.city} - ${center.province}`}
      />
    ));

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div>
      <FormControl>
        <FormLabel>Centros de distribución</FormLabel>
        <RadioGroup aria-label="centros" value={value} onChange={handleChange}>
          {radioButtons}
        </RadioGroup>
      </FormControl>
    </div>
  );
};
