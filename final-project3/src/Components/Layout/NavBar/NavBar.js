import React from 'react'
import "../../../css/Nav.css";
import {Link} from "react-router-dom";
import LogOut from "../../Auth/Logout"

function NavBar(props) {
  return (
    <nav>
      <label class="page">PAGE</label>
      <ul>
        <li>
          <Link class="Nav-link" to="login">Login</Link>
        </li>
        <li>
          <Link class="Nav-link" to="register">Register</Link>
        </li>
        <li>
          <LogOut/>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;