import React, { Component, Fragment } from 'react'
import { ReactMic } from 'react-mic';
import {Container} from 'reactstrap';
import { Button } from 'react-md';
import pause from './pause.svg';

class AudioVisual extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showEndRecord: false,
          startRecord: false,
          endRecord: false,
          blob: "",
          elapsed: 0
        }
    }

    onData = (e) => {
    }

    tick = () => {
        this.setState({
            elapsed: new Date() - this.props.start
        });
    }

    componentDidMount(){
        this.recordSnippet();
        this.timer = setInterval(this.tick, 50);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    recordSnippet = (e) => {
        console.log("recording snippet..");
        this.setState({
            showPlayback: false,
            startRecord: true,
            showEndRecord: true
        });
    }
    endRecording = (recording) => {
        this.setState({
            startRecord: false,
            endRecord: true,
            showEndRecord: false,
            blob: recording,
            showPlayback: true
        });
        clearTimeout(this.timer);
        console.log("THIS IS THE BLOB\n", recording);
    }

    render() {
        var elapsed = Math.round(this.state.elapsed / 100);
        var seconds = (elapsed / 10).toFixed(1);
        return (
        <Fragment>
            <ReactMic
                record={this.state.startRecord}
                onStop={ (e) => this.endRecording(e) }
                onData={ (e) => this.onData(e) }
                backgroundColor="white"
                strokeColor="#4551A9"
                width={1050}
                height={300}
            />
            <div class="d-flex">
                <span style={{fontSize: "40px"}}>{seconds}</span>
                <Button className="ml-auto p-2" secondary style={{fontSize: "40px"}} onClick={(e) => this.endRecording(e)}>
                    Stop
                </Button>
            </div>
        </Fragment>
        )
    }
}

export default AudioVisual;
