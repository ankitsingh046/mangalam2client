/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Navbar() {
  return (
    <div>
      <nav class='navbar navbar-expand-lg' id="navbar">
        <div class='container-fluid'>
          <a class='navbar-brand' href='/'>
            MANGALAM
          </a>
          <button
            class='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span class='navbar-toggler-icon'></span>
          </button>
          <div class='collapse navbar-collapse' id='navbarNav'>
            <ul class='navbar-nav ms-auto'>
              <li class='nav-item'>
                <a class='nav-link active' aria-current='page' href='/register'>
                  Register
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/login'>
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
