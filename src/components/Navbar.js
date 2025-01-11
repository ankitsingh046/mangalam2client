/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

function Navbar() {
  const user = (JSON.parse(localStorage.getItem("currentUser")));

  const logout = () => {
    localStorage.removeItem('currentUser')
    window.location.href ="/login";
  }

  return (
    <div style={{
    position: "sticky",
    top: 0,
    zIndex: 999
  }}>
      <nav class='navbar navbar-expand-lg navbar-dark' id='navbar'>
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
            <ul class='navbar-nav ms-auto text-start'>
              {user ? (
                <>
                  <div class='dropdown me-5 text-start'>
                    <button
                      class='btn btn-secondary dropdown-toggle'
                      type='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      {user?.name}
                    </button>
                    <ul class='dropdown-menu'>
                      <li>
                        <a class='dropdown-item' href='#'>
                          Bookings
                        </a>
                      </li>
                      <li>
                        <a class='dropdown-item' href='#' onClick={logout}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <li class='nav-item'>
                    <a
                      class='nav-link active'
                      aria-current='page'
                      href='/register'
                    >
                      Register
                    </a>
                  </li>
                  <li class='nav-item'>
                    <a class='nav-link' href='/login'>
                      Login
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
