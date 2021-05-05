import React, { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Swal from "sweetalert2";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../../scss/components/Newsletter/_Newsletter.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    color: "white",
  },
}));

const Newsletter = () => {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const [show, setShow] = useState(true);
  const [news, setNews] = useState({
    suscribe: false,
    promotion: false,
    off: false,
    information: false,
  });
  const [newsE, setNewsE] = useState({
    suscribe: false,
    promotion: false,
    off: false,
    information: false,
  });

  const stateNews = async () => {
    const info = await axios.get(`http://localhost:3001/newsletter`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNews({
      suscribe: info.data.newsLetter,
      promotion: info.data.promotion,
      off: info.data.off,
      information: info.data.information,
    });
    setNewsE({
      suscribe: info.data.newsLetter,
      promotion: info.data.promotion,
      off: info.data.off,
      information: info.data.information,
    });
  };

  useEffect(() => {
    stateNews();
  }, []);

  const newsChange = (e) => {
    setNews({
      ...news,
      [e.target.name]: e.target.checked,
    });
  };

  const newsSubmit = async (e) => {
    e.preventDefault();
    if (
      newsE.suscribe !== news.suscribe ||
      newsE.promotion !== news.promotion ||
      newsE.off !== news.off ||
      newsE.information !== news.information
    ) {
      setShow(false);
      console.log(show)
      const info = await axios.post(
        `http://localhost:3001/newsletter/suscribe`,
        { news: news },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewsE({
        suscribe: news.suscribe,
        promotion: news.promotion,
        off: news.off,
        information: news.information,
      });
      setShow(true);
      Swal.fire({
        text: info.data.message,
        confirmButtonColor: "#378a19",
      });
    }
  };

  return (
    <div className="container-newsletter">
      <div className="newsletter-form">
        {show ? (
          <form onSubmit={newsSubmit}>
            <div>
              <Checkbox
                color="primary"
                name="suscribe"
                checked={news.suscribe}
                onChange={newsChange}
              />
              <label>NewsLetter</label>
            </div>
            <div>
              <Checkbox
                color="primary"
                name="promotion"
                checked={news.promotion}
                onChange={newsChange}
              />
              <label>Promociones</label>
            </div>
            <div>
              <Checkbox
                color="primary"
                name="off"
                checked={news.off}
                onChange={newsChange}
              />
              <label>Ofertas</label>
            </div>
            <div>
              <Checkbox
                color="primary"
                name="information"
                checked={news.information}
                onChange={newsChange}
              />
              <label>Productos</label>
            </div>
            <div>
              <Button
                type="submit"
                variant="contained"
                size="medium"
                color="primary"
                className={classes.margin}
              >
                Enviar
              </Button>
            </div>
          </form>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default Newsletter;
