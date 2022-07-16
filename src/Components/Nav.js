import React, { useEffect, useState } from "react";
import "../Nav.css"
function Nav() {

    const [show, handleShow] = useState(false)

    useEffect(()=>{

        // this is for navbar black scroll
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 100){
                handleShow(true)
            } else handleShow(false)


            //cleanup function
            return () =>{
                window.removeEventListener('scroll')
            }
        })
    })

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
      className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/255px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />

      <img className="nav_avatar" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117" alt="" />
    </div>
  );
}

export default Nav;
