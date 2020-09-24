import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.css'

const Navbar = () => (
  <nav className={styles.navbar}>
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/svg/logo.svg" alt="Logo" height="30px" />
        </Link>
      </div>
      <ul className={styles.navlinks}>
        <li className={styles.navlink}>
          <Link to="/events">
            Events
          </Link>
        </li>
        <li className={styles.navlink}>
          <Link to="/members">
            Members
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default Navbar
