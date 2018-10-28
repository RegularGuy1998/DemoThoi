import React, { Component } from 'react';
// import config from '../config';

class GirlImage extends Component {
    render() {

        const comment = this.props.img.comment ? 
        this.props.img.comment.map( comment => (
            <p key={comment._id}>
                <span className='font-weight-bold'>
                    {comment.owner.username}
                </span>:{" "}
                {comment.content}
            </p>
        )) : "";

        return (
            <div className="img-item mx-auto">
                <div className="text-center img-image">
                    <img className="rounded img-fluid" src={this.props.img.imageUrl} alt={this.props.img.owner.fullName} />
                </div>
                <div className="img-description">
                    <h4>{this.props.img.owner.username}</h4>
                    <p>{this.props.img.description}</p>
                    {comment}
                </div>
            </div>
        );
    }
}

export default GirlImage;