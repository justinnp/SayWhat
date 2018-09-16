import React from 'react'
import { List, Subheader } from 'react-md';
import PropTypes from 'prop-types';
import User from './User';

 const UserList = (props) => {
    if(props.users.length > 0){
        return (
                <List className="md-paper md-paper--1" style={{height:"84vh"}} >
                    <Subheader primaryText="Users"/>
                    <hr/>
                    {props.users.map((user, index) => 
                        <User
                            key={index} 
                            name={user.name}
                            color={user.color}
                        />
                    )}
                </List>
        )
    }
    else {
        return (
            <List className="md-paper md-paper--1">
                <Subheader primaryText="No Users"/>
            </List>
    )
    }
}

UserList.propTypes = {
    users: PropTypes.array.isRequired
}

export default UserList;