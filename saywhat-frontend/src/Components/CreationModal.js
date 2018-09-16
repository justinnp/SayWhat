import React, {Component} from 'react'
import { Button, DialogContainer, List, TextField } from 'react-md';
import { MdMicNone } from 'react-icons/md';
import { ReactMic } from 'react-mic';
import PropTypes from 'prop-types';


const read = "I started off in Brooklyn. My father gave me a small loan of a million dollars. I came into Manhattan and I had to pay him back, and I had to pay him back with interest. But I came into Manhattan, I started buying up properties, and I did great. I did a good job. But, I was always told that would never work. I mean, I've built one of the great companies, but it's always been, you know, you can't do this, you can't do that. I'm not a schmuck. Even if the world goes to hell in a handbasket, I won't lose a penny.";

class CreationModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: "",
        showEndRecord: false,
        startRecord: false,
        endRecord: false,
        blob: "",
        showPlayback: false,
        showSubmit: false,
        visible: this.props.visible
      }
  }


  setName = (e) => {
    this.setState({name: e})
  }

  recordSnippet = (e) => {
    console.log("recording snippet..");
    this.setState({showPlayback: false});

    // Record.
    this.setState({startRecord: true});
    this.setState({showEndRecord: true});
  }

  endRecording = (recording) => {
    this.setState({startRecord: false});
    this.setState({endRecord: true});
    this.setState({showEndRecord: false});
    this.setState({isRecording: false});
    this.setState({blob: recording});
    console.log("THIS IS THE BLOB\n", recording);

    // Finish recording, and show playback button for the user.
    this.setState({showPlayback: true});
  }

  onData = (e) => {
  }

  playbackRecording = (e) => {
    var audio = document.getElementById('myAudioElement') || new Audio();
    audio.src = this.state.blob.blobURL;
    audio.play();
  }

  submit(e){
    this.props.handleAdd(this.state.name);
    this.toggle();

    // Formdata obj can hold blobs
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("audio", this.state.blob.blob);
    let req = new XMLHttpRequest();
    req.open('POST', 'http://127.0.0.1:5000/register');
    req.send(formData);
  }

  toggle = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <div>
        <DialogContainer
            id="simple-list-dialog"
            visible={this.state.visible}
            title="Add User"
            onHide={this.toggle}
            style={{"textAlign":"center"}}
            width={500}
            modal
          >
            <List>
              <TextField
                id="floating-center-title"
                label="Name"
                lineDirection="center"
                className="md-cell md-cell--bottom"
                fullWidth={true}
                style={{"width":"485px"}}
                onChange={ (e) => this.setName(e) }
              />
            <div style={{"margin-bottom": "1em"}}>
              <br />
              <h4>Press record and read the following carefully:</h4>
              <p style={{padding:"1em", textAlign: "justify"}}>{read}</p>
              <Button
                floating
                onClick={ (e) => this.recordSnippet(e) }
                style={{"height":"8em", "width":"8em", "margin-top":"15px"}}>
                <MdMicNone style={{"height":"2em", "width":"2em", "margin-top":"2px"}}/>
              </Button>
              <ReactMic
                record={this.state.startRecord}
                onStop={ (e) => this.endRecording(e) }
                onData={ (e) => this.onData(e) }
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
              <div style={{display:"block"}}>
                {this.state.showPlayback ?
                  <Button
                    raised
                    primary
                    onClick={ (e) => this.playbackRecording(e) }>
                    Playback
                  </Button>
                : null}
                <br />
                <br />
                {this.state.showPlayback ?
                  <Button
                    raised
                    primary
                    onClick={ (e) => this.submit(e) }
                    style={{backgroundColor:"green"}}>
                    Submit
                  </Button>
                : null}
              </div>
            </div>
            </List>
          </DialogContainer>
      </div>
    )
  }
}

CreationModal.propTypes = { 
  visible: PropTypes.bool.isRequired,
  handleAdd: PropTypes.func.isRequired
}

export default CreationModal;
