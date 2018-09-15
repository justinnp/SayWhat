import React, { Component } from 'react';
import sample from './wave.mov';

class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }

  render() {
    return(
      <div>
        <video className='videoTag' autoPlay loop muted>
                <source src={sample} type='video/mp4' />
        </video>
      </div>
    );
  }
}

export default Home;
