import React, { Component } from 'react';

import SearchField from "./SearchField";
import Logo from "../img/Logo.png";
import ProfilePanel from './ProfilePanel';
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="container">
                    <SearchField onSearchChange={this.props.onSearchChange} />
                    <div className="col-6 text-center">
                        <Link to={`/`}>
                            <img src={Logo} alt="Logo" className="img-logo" />
                        </Link>
                    </div>
                    <ProfilePanel onLogin={this.props.onLogin} username={this.props.username} />
                </div>
            </div>
        );
    }
}

export default Navbar;