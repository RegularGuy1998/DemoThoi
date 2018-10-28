import React, { Component } from 'react';
import GirlImage from '../components/GirlImage';
import axios from '../axios';
import Navbar from '../components/Navbar';

class DetailScreen extends Component {
    state = {
    }
    componentDidMount() {
        axios
            .get(`/api/images/${this.props.match.params.id}`)
            .then(data => {
                this.setState({
                    img: data.data.imageFound
                });
            })
            .catch(err => console.error(err));
    };



    render() {

        const showGirlImg = this.state.img ? (
            <GirlImage img={this.state.img} />
        ) : (null);

        return (
            <div>
                <Navbar
                    onSearchChange={this._onSearchChange}
                    onLogin={this.props.onLogin}
                    username={this.props.username}
                />
                <div className='row'>
                    <div className='col-8 mr-auto ml-auto'>
                        {showGirlImg}
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailScreen;