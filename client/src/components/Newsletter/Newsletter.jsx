import React, { useState } from "react";

const Newsletter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      alert("Digita el nombre");

      return;
    }

    if (email === "") {
      alert("Digita el email");

      return;
    }

    var url = "http://localhost:3001/newsLetter";

    let newsLetter = {
        name: name,
        email: email,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newsLetter),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
      })
      .then((response) => {
        console.log("Success:", response);

        if (response.message === "ok") {
          alert("Suscripción realizada");

          setName("");
          setEmail("");
        } else {
          alert("Ese email ya existe");
        }

      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <button>Suscribirse</button>
      </form>
    </>
  );
};

export default Newsletter;
