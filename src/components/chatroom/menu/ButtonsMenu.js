import React from 'react'
import { Link } from "react-router-dom";

export default function ButtonsMenu(){

    return (
      <ul className="container-menu">
        <Link to='/' className="contact contact--button">
          <i className="fas fa-user-friends"></i><span className="text username">Amigos</span>
        </Link>
      </ul>
    )
}