import React, { Component, Fragment } from 'react';
import shell from './shell.mov';
import './Home.css';

const Home = () => {
  return(
    <div>
      <video id='videoTag' autoPlay loop muted>
        <source src={shell} type='video/mp4' />
      </video>
    </div>
  );
}

export default Home;
