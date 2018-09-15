import React, { Component } from 'react';
import { Button } from 'react-md';
import Header from './Header';
import UserList from './UserList';
import { Grid, Cell } from 'react-md';

class Hub extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [
                {name: "Justin", color: "#4FA0A5"},
                {name: "Navon", color: "#ADCF6E"},
                {name: "Sara", color: "#F8DE76"},
                {name: "Daniel", color: "#E69499"}
            ]
        }
    }

    addUser(){
        var arr = this.state.users;
        const obj = {name: "Yeet"};
        arr.push(obj);
        this.setState({
            users: arr
        }); 
    }

    render() {
        return (
            <div className="App">
                <header>
                    <Header />
                </header>
                <Grid>
                    <Cell size={3}>
                        <UserList users={this.state.users}/>
                        <Button raised primary onClick={() => this.addUser()}>Add</Button>
                    </Cell>
                </Grid>
            </div>
        )
    }
}

export default Hub;
