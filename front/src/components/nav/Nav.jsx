import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div className="nav">
      <div className="nav_grid">
        <div className="nav_sub">
          <Link
            to="/"
            className="a
          "
          >
            <h2 className="nav_lgo">DNION.INC</h2>
          </Link>
        </div>
        <div className="nav_sub">
          <ul className="nav_ul">
            <li className="nav_li">proects</li>

            <Link className="a" to="/about">
              <li className="nav_li">aboutus</li>
            </Link>
            <li className="nav_li">services</li>
          </ul>
        </div>
        <div className="nav_sub">
          <button className="get">get started</button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
