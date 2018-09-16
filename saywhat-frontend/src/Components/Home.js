import React from 'react';
import shell from './shell.mov';
import Logo from './LogoYeet.png';
import { NavLink } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return(
    <NavLink to="/home">
      <div class="parent">
        <video id='videoTag' autoPlay loop muted>
          <source src={shell} type='video/mp4' />
        </video>
        <img className="image2" src={Logo}  width="570" height="190" alt="Logo"/>
      </div>
    </NavLink>
  );
}

export default Home;
