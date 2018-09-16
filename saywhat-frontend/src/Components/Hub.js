import React, { Component } from 'react';
import { Button } from 'react-md';
import Header from './Header';
import UserList from './UserList';
import { Grid, Cell } from 'react-md';
import {Container} from 'reactstrap';
import micro from './microphone.svg';
import CreationModal from './CreationModal';
import AudioVisual from './AudioVisual';
import Visual from './Visual';
import './Home.css';

class Hub extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            preSession: true,
            sessionStart: false,
            sessionEnded: false,
            modal: false,
            meeting: "ShellHacks"
        }
    }

    addUser(nameStr){
        var arr = this.state.users;
        const obj = {name: nameStr};
        arr.push(obj);
        this.setState({
            users: arr
        }); 
    }

    showAudio = () =>{
        this.setState({
            preSession: false,
            sessionStart: true
        })
    }
    setModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    
    showModal = () => {
        if(this.state.modal){
            return(
                <CreationModal visible={this.state.modal}  handleAdd={(text) => this.addUser(text)}/>
            )
        }
        else return null
    }

    showVisual(){
        this.setState({
            sessionStart: false,
            sessionEnded: true
        })
    }

    render() {
        return (
            <div className="App">
                <header>
                    <Header />
                </header>
                {this.state.modal ? <CreationModal visible={this.state.modal} handleAdd={(text) => this.addUser(text)}/> : null}
                <Grid>
                    <Cell size={3}>
                        <UserList users={this.state.users}/>
                        <div className="mt-2">
                            <Button raised primary onClick={this.setModal}>Add</Button>
                        </div>
                    </Cell>
                    {this.state.users.length > 0 && this.state.preSession ? 
                        <Cell size={9}>
                            <div style={{textAlign:"center", top:"45%", left: "55%", position:"absolute"}} onClick={this.showAudio}>
                                <img src={micro} alt="microphone" className="microphone" />
                                <span className="d-block mt-1 microphone pulse" style={{fontSize: "2em"}}>Start</span>                
                            </div> 
                        </Cell> : null
                    }
                    {this.state.sessionStart ? 
                        <Cell size={9}>
                            <div style={{top:"40%", left:"%3", position:"absolute"}}>
                                <AudioVisual 
                                    start={Date.now()} 
                                    meeting={this.state.meeting} 
                                    speakers={this.state.users.length} 
                                    handleEnd={() => this.showVisual()}
                                />
                            </div>
                        </Cell> : null
                    }
                    {this.state.sessionEnded ? 
                        <Cell size={9}>
                            <Visual />
                        </Cell> : null
                    }
                    
                </Grid>
            </div>
        )
    }
}

export default Hub;
