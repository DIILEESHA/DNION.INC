import React, { useState } from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="nav">
      <div className="nav_grid">
        <div className="nav_sub">
          <Link to="/" className="a">
            <h2 className="nav_lgo">APC</h2>
          </Link>
        </div>

        <div className="nav_sub two">
          <ul className="nav_ul">
            <Link className="a" to="/about">
              <li className="nav_li">about us</li>
            </Link>
            <Link className="a" to="/projects">
              <li className="nav_li">projects</li>
            </Link>
            <Link className="a" to="/service">
              <li className="nav_li">services</li>
            </Link>
          </ul>
        </div>

        <div className="nav_sub">
          <Link className="a" to="/contact-us">
            <button className="get">Contact Us</button>
          </Link>

          <div className="hamburger" onClick={openMenu}>
            <FiMenu className="ham_ico" />
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="mobile_menu">
              <ul className="nav_ul_mobile">
                <div className="close_ico" onClick={closeMenu}>
                  <IoMdClose className="ham_ico" />
                </div>
                <Link className="a" to="/about" onClick={closeMenu}>
                  <li className="nav_li_mobile">about us</li>
                </Link>
                <Link className="a" to="/projects" onClick={closeMenu}>
                  <li className="nav_li_mobile">projects</li>
                </Link>
                <Link className="a" to="/service" onClick={closeMenu}>
                  <li className="nav_li_mobile">services</li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
