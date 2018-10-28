import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ProfilePanel extends Component {
    render() {

        const display = this.props.username ? (
            <div>
                <div className='btn-group'>
                    <div className='btn btn-secondary disabled'>Welcome, {this.props.username}</div>
                    <button className='btn btn-success'><i className="fas fa-angle-down"></i></button>
                </div>
            </div>
        ) : (
            <button className="btn btn-primary btn-block" onClick={this.props.onLogin} >Login</button>
        )

        return (
            <div className="col-3 text-right">
                {display}
            </div>
        );
    }
}

export default ProfilePanel;