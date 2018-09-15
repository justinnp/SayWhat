import React from 'react'
import {List} from 'material-ui/List';
import PropTypes from 'prop-types';

 const UserList = (props) => {
    return (
        <List>
            {props.users.map((user, index) => 
                <User 
                    name={user.name}
                />
            )}
        </List>
    )
}

UserList.propTypes = {
    users: PropTypes.array.isRequired
}

export default UserList;