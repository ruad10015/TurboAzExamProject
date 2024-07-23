import React from "react";
import "./Menu.css";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <section className="menu-section">
      <Link to="/" className="header-h1">
        TURBO.AZ
      </Link>
      <Link to="/" className="h1-des">
        Bütün elanlar
      </Link>
      <h1 className="h1-des">Salonlar</h1>
      <h1 className="h1-des">Moto</h1>
      <h1 className="h1-des">Ehtiyat hissələr və aksesuarlar</h1>
      <h1 className="h1-des">İcarə</h1>
      <Link to="/new_announcement" className="custom-button">
        <h1 className="h1-custom">Yeni elan</h1>
      </Link>
    </section>
  );
}
