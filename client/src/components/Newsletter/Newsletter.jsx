import React, { useState } from "react";
import axios from "axios";

// Importaciones Material UI
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  vlado: {
    backgroundColor: "#378a19"
  }
}));

export default function Newsletter() {
  const classes = useStyles();
  const [value, setValue] = React.useState("two");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [boletinesInformativos, setBoletinesInformativos] = useState(true);
  const [promociones, setPromociones] = useState(true);
  const [nuevosLanzamientos, setNuevosLanzamientos] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = localStorage.getItem("user");
    //alert(user);

    if (!boletinesInformativos && !promociones && !nuevosLanzamientos) {
      alert("Para suscribirte seleccion al menos un tipo de suscripción");

      return;
    }

    // if (name === "") {
    //   alert("Digita el nombre");
    //   return;
    // }

    // if (email === "") {
    //   alert("Digita el email");
    //   return;
    // }

    var url = "http://localhost:3001/newsLetter/email";

    let newsLetter = {
      id,
      boletinesInformativos: boletinesInformativos,
      promociones: promociones,
      nuevosLanzamientos: nuevosLanzamientos,
    };

    axios
      .post(url, newsLetter, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((res) => {
        alert(res.data.message);

        //setName("");
        //setEmail("");

        setBoletinesInformativos(false);
        setPromociones(true);
        setNuevosLanzamientos(false);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.vlado}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="one" label="Newsletter" wrapped {...a11yProps("one")} />
          <Tab value="two" label="Whislist" {...a11yProps("two")} />
          <Tab value="three" label="Item Three" {...a11yProps("three")} />
          <Tab value="four" label="Historial de email" {...a11yProps("four")} />
        </Tabs>
      </AppBar>

      {/* Inicio Primera pestaña Newsletter */}
      <TabPanel value={value} index="one">
        <Typography variant="h4" color="initial" align="center">
          Suscribase a nuestros Boletines
        </Typography>

        <form onSubmit={handleSubmit}>
          <br />

          <input
            type="checkbox"
            onChange={(e) => setBoletinesInformativos(!boletinesInformativos)}
            defaultChecked={boletinesInformativos}
          />

          <label>Boletines informativos</label>
          <br />
          <input
            type="checkbox"
            onChange={(e) => setPromociones(!promociones)}
            defaultChecked={promociones}
          />

          <label>Promociones</label>
          <br />
          <input
            type="checkbox"
            onChange={(e) => setNuevosLanzamientos(!nuevosLanzamientos)}
            defaultChecked={nuevosLanzamientos}
          />
          <label>Nuevos lanzamientos</label>
          <br />
          <br />
          <button>Suscribirse</button>

          {/* <Button
            variant="outlined"
            color="secondary"
            className={classes.vlado}
            endIcon={<DoneOutlineIcon 
            onSubmit={handleSubmit}  />}
          >
            Guardar
          </Button> */}
          <br />
          <br />
          <h6>Para de suscribirse de nuestros boletines, se debe hacerse desde los boletines que le llegan al correo que nos suministro </h6>
        </form>
      </TabPanel>
      {/* Cierre Primera pestaña Newsletter */}

      {/* Inicio Segunda pestaña Whislist */}
      <TabPanel value={value} index="two">
        Aquí va la lista de deseos
      </TabPanel>
      {/* Cierre Segunda pestaña Whislist */}

      <TabPanel value={value} index="three">
        aqui va mas información
      </TabPanel>

      <TabPanel value={value} index="four">
        Historial de emails
      </TabPanel>
    </div>
  );
}



// const Newsletter = () => {

  

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
        
//         <br />

//         <input
//           type="checkbox"
//           onChange={(e) => setBoletinesInformativos(!boletinesInformativos)}
//           defaultChecked={boletinesInformativos}
//         />

//         <label>Boletines informativos</label>

//         <input
//           type="checkbox"
//           onChange={(e) => setPromociones(!promociones)}
//           defaultChecked={promociones}
//         />

//         <label>Promociones</label>

//         <input
//           type="checkbox"
//           onChange={(e) => setNuevosLanzamientos(!nuevosLanzamientos)}
//           defaultChecked={nuevosLanzamientos}
//         />
//         <label>Nuevos lanzamientos</label>
//         <br />
//         <button>Suscribirse</button>
//       </form>
//     </div>
//   );
// };

// export default Newsletter;


/////////////////////////////---------- Código sin Material UI -------------//////////////////////

// import React, { useState } from "react";
// import axios from "axios";

// const Newsletter = () => {

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   const [boletinesInformativos, setBoletinesInformativos] = useState(true);
//   const [promociones, setPromociones] = useState(true);
//   const [nuevosLanzamientos, setNuevosLanzamientos] = useState(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!boletinesInformativos && !promociones && !nuevosLanzamientos)
//     {
//         alert("Para suscribirte seleccion al menos un tipo de suscripción");

//         return;
//     }

//     if (name === "") {
//       alert("Digita el nombre");
//       return;
//     }

//     if (email === "") {
//       alert("Digita el email");
//       return;
//     }

//     var url = "http://localhost:3001/newsLetter/email";

//     let newsLetter = {
//       name: name,
//       email: email,
//       boletinesInformativos: boletinesInformativos,
//       promociones: promociones,
//       nuevosLanzamientos: nuevosLanzamientos
//     };

//     axios
//       .post(
//         url,
//         newsLetter,
//         {
//           headers: {
//             "Content-Type": "application/json;charset=utf-8",
//           },
//         }
//       )
//       .then((res) => {

//           alert(res.data.message);

//           setName("");
//           setEmail("");

//           setBoletinesInformativos(true);
//           setPromociones(true);
//           setNuevosLanzamientos(true);

//       });

//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Nombre"
//         />

//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <br />

//         <input
//           type="checkbox"
//           onChange={(e) => setBoletinesInformativos(!boletinesInformativos)}
//           defaultChecked={boletinesInformativos}
//         />

//         <label>Boletines informativos</label>

//         <input
//           type="checkbox"
//           onChange={(e) => setPromociones(!promociones)}
//           defaultChecked={promociones}
//         />

//         <label>Promociones</label>

//         <input
//           type="checkbox"
//           onChange={(e) => setNuevosLanzamientos(!nuevosLanzamientos)}
//           defaultChecked={nuevosLanzamientos}
//         />
//         <label>Nuevos lanzamientos</label>
//         <br />
//         <button>Suscribirse</button>
//       </form>
//     </div>
//   );
// };

// export default Newsletter;
