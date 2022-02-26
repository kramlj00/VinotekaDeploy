import React from "react";

function ContactData() {
  return (
    <form action="#">
      <div className="flexy">
        <input className="inp inp-left" type="text" placeholder="Ulica" />
        <input className="inp" type="number" placeholder="Kućni broj" />
      </div>
      <div className="flexy">
        <input className="inp inp-left" type="text" placeholder="Mjesto" />
        <input className="inp" type="text" placeholder="Poštanski broj" />
      </div>
      <input className="inp" type="text" placeholder="Županija" />
      <input className="inp" type="text" placeholder="Telefon" />
      <button className="btn">Registracija</button>
    </form>
  );
}

export default ContactData;
