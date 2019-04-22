import React from "react";
import "./shop-header.css";
import { Link } from "react-router-dom";

const ShopHeader = () => {
  return (
    <header className="shop-header row">
      <Link to="/">
        <div className="logo text-dark">ReStore</div>
      </Link>
    </header>
  );
};

export default ShopHeader;
