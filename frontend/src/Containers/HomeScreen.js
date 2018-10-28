import React, { Component } from 'react';

import Navbar from '../components/Navbar';
import MainContent from '../components/MainContent';
import axios from '../axios';


class HomeScreen extends Component {
    state = {
        images: [],
        searchString: ""
    }
    componentDidMount() {
        axios
            .get('/api/images')
            .then(data => {
                this.setState({
                    images: data.data.images
                });
            })
            .catch(err => console.error(err));
    }

    _onSearchChange = text => this.setState({ searchString: text })

    render() {
        const displayedImages = this.state.images.filter(img => img.owner.fullName.includes(this.state.searchString) || img.description.includes(this.state.searchString))
        return (
            <div>
                <Navbar
                    onSearchChange={this._onSearchChange}
                    onLogin={this.props.onLogin}
                    username={this.props.username}
                />
                <MainContent images={displayedImages} />
            </div>
        );
    }
}

export default HomeScreen;