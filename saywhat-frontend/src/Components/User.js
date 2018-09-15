import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Avatar } from 'react-md';
import { MdSearch } from "react-icons/md";

const User = (props) => {
    return (
        <ListItem
            leftAvatar={<Avatar iconSized={true} style={{backgroundColor: props.color}}>{props.name[0]}</Avatar>}
            primaryText={props.name}
            rightIcon={<MdSearch style={{fontSize:"20px"}} />}
        >
        </ListItem>
    )
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}

export default User;
