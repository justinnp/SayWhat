import React from 'react';
import {Navbar} from 'reactstrap';
import convos from './conversation.svg';

const Header = () => {
    return (
        <Navbar style={{backgroundColor: "#4251AF"}}> 
            <h2 className="mx-auto" style={{color:"white", fontFamily:"Avenir"}}>
                SayWhat{' '}<img alt="saywhat" src={convos} height="40px"/>
             </h2>
        </Navbar>
    );
}

export default Header;
