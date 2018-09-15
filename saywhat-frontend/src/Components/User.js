import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { grey200, blue900 } from 'material-ui/styles/colors';

const style = {margin: 5};

const User = (props) => {
    return (
        <ListItem>
            leftAvatar={
                <Avatar
                    color={blue900}
                    backgroundColor={grey200}
                    size={30}
                    style={style}
                >
                    {props.name[0]}
                </Avatar>
            }
            primaryText={props.name}
        </ListItem>
    )
}

User.propTypes = {
    name: PropTypes.string.isRequired
}

export default User;
