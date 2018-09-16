import React, { Component, Fragment } from 'react'
import {Radar} from 'react-chartjs-2';
import { Button } from 'react-md';
import PropTypes from 'prop-types';


const data = {
    labels: ['ML', 'Python', 'ReactJS', 'Flask', 'Github', 'ShellHacks'],
    datasets: [
      {
        label: 'Justin Powell',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [65, 59, 90, 81, 56, 55]
      },
      {
        label: 'Navon Francis',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: [28, 48, 40, 19, 96, 27]
      },
      {
        label: 'Jose Pena',
        backgroundColor: 'rgb(69, 81, 169,0.2)',
        borderColor: 'rgb(69, 81, 169,1)',
        pointBackgroundColor: 'rgb(69, 81, 169,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(69, 81, 169,1)',
        data: [56, 37, 4, 69, 47, 13]
      }
    ]
  };

class Visual extends Component {
    render () {
        return ( 
          <Fragment>
            <div className="ml-auto">
              <Button primary onClick={this.props.handleSession}>Start new session</Button>
            </div>
            <Radar data={data} />
          </Fragment>
      );
    }
}

Visual.propTypes = { 
  handleSession: PropTypes.func.isRequired
}

export default Visual;
