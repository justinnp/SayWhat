import React, {PureComponent} from 'react'
import { NavLink } from 'react-router-dom'
import { Button, DialogContainer, List, ListItem, TextField, SVGIcon } from 'react-md';
import { MdMicNone } from 'react-icons/md';
import { LinearProgress } from 'react-md';
import { ReactMic } from 'react-mic';
import micIcon from './microphone.svg';

class CreationModal extends PureComponent {
  constructor(props) {
      super(props);
      this.state = {
        name: "",
        showEndRecord: false,
        startRecord: false,
        endRecord: false,
        blob: "",
        showPlayback: false
      }
  }

  setName = (e) => {
    this.setState({name: e})
    // TODO: do anything with the name,
    // Add to DB?
    // Pass it down?
  }

  recordSnippet = (e) => {
    console.log("recording snippet..");

    // Record.
    this.setState({startRecord: true});
    this.setState({showEndRecord: true});
  }

  endRecording = (recording) => {
    this.setState({startRecord: false});
    this.setState({endRecord: true});
    this.setState({showEndRecord: false});

    this.setState({blob: recording});
    console.log("THIS IS THE BLOB\n", recording);

    // Finish recording, and show playback button for the user.
    this.setState({showPlayback: true})
  }

  onData = (e) => {

  }

  playbackRecording = (e) => {
    var audio = document.getElementById('myAudioElement') || new Audio();
    audio.src = this.state.blob.blobURL;
    audio.play();
  }

  render() {
    return (
      <div>
        <DialogContainer
            id="simple-list-dialog"
            visible={true}
            title="Add User"
            onHide={this.hide}
            style={{"textAlign":"center"}}
          >
            <List>
              <TextField
                id="floating-center-title"
                label="Name"
                lineDirection="center"
                placeholder="Shelly Hacks"
                className="md-cell md-cell--bottom"
                fullWidth={true}
                style={{"width":"18.9em"}}
                onChange={ (e) => this.setName(e) }
              />
            <div style={{"margin-bottom": "1em"}}>
              <Button
                floating
                onClick={ (e) => this.recordSnippet(e) }
                style={{"height":"6em", "width":"6em", "margin-top":"20px"}}>
                <MdMicNone style={{"height":"1.4em", "width":"1.4em", "margin-top":"2px"}}/>
              </Button>
              <ReactMic
                record={this.state.startRecord}
                onStop={(e) => this.endRecording(e)}
                onData={(e) => this.onData(e)}
                strokeColor="#4054b2"
              />
              {this.state.showEndRecord ?
                <Button
                  raised
                  secondary
                  onClick={ (e) => this.endRecording(e) }>
                  End Snippet
                </Button>
              : null}
              {this.state.showPlayback ?
                <Button
                  raised
                  primary
                  onClick={ (e) => this.playbackRecording(e)}>
                  Playback
                </Button>
              : null}
            </div>
            </List>
          </DialogContainer>
      </div>
    )
  }
}

export default CreationModal;
