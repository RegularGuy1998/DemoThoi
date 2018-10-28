import React, { Component } from 'react';
import GirlImage from './GirlImage';

import { Link } from "react-router-dom";

class MainContent extends Component {
    render() {
        const allImages = this.props.images.map(img => (
        <div key={img._id} className='col-3'>
            <Link to={`/image/${img._id}`}>
                <GirlImage img={img} />
            </Link>
        </div>));
        return (
            <div className="container">
                <div className="row">
                    {allImages}
                </div>
            </div>
        );
    }
}

export default MainContent;