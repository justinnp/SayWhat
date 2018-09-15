import React, { Component, Fragment } from 'react'
class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {
            elapsed: 0
        }
    }
    componentDidMount(){
        this.recordSnippet();
        this.timer = setInterval(this.tick, 50);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    tick = () => {
        this.setState({
            elapsed: new Date() - this.props.start
        });
    }
}