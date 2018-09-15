import React from 'react'
import { List, Subheader } from 'react-md';
import PropTypes from 'prop-types';
import User from './User';

 const UserList = (props) => {
    return (
            <List className="md-paper md-paper--1" style={{height:"85vh"}} >
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

UserList.propTypes = {
    users: PropTypes.array.isRequired
}

export default UserList;