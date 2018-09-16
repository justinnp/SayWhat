import React, { Component, Fragment } from 'react'
import { ReactMic } from 'react-mic';
import { Button } from 'react-md';
import { MdAddCircleOutline } from "react-icons/md";

class AudioVisual extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showEndRecord: false,
          startRecord: false,
          endRecord: false,
          blob: "",
          elapsed: 0,
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

    submitAudio(e){
        // Formdata obj can hold blobs
        const formData = new FormData();
        formData.append("meetingName", this.props.meeting);
        formData.append("numUsers", this.props.speakers);
        formData.append("audio", this.state.blob.blob);
        let req = new XMLHttpRequest();
        req.open('POST', 'http://127.0.0.1:5000/register');
        req.send(formData);
        this.props.handleEnd();
    }

    render() {
        var elapsed = Math.round(this.state.elapsed / 100);
        var seconds = (elapsed / 10).toFixed(1);
        return (
        <Fragment>
            <ReactMic
                record={this.state.startRecord}
                onStop={this.endRecording}
                onData={ (e) => this.onData(e) }
                backgroundColor="white"
                strokeColor="#4551A9"
                width={1050}
                height={300}
            />
            <div className="d-flex d-inline">
                <div className="mr-auto">
                    <Button secondary style={{fontSize: "40px"}} onClick={(e) => this.endRecording(e)}>
                        Stop
                    </Button>
                    <span className="ml-3" style={{fontSize: "40px"}}>{seconds}</span>
                </div>
                {this.state.endRecord ?
                <Button className="ml-auto p-2" secondary style={{fontSize: "40px"}} onClick={ (e) => this.submitAudio(e)}>
                    <MdAddCircleOutline />
                </Button> : null
                }
            </div>
        </Fragment>
        )
    }
}

export default AudioVisual;
