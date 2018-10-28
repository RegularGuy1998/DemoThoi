import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from './axios';
import HomeScreen from './Containers/HomeScreen';
import DetailScreen from './Containers/DetailScreen';

import { BrowserRouter, Route } from "react-router-dom";



// const Link = (props) => <a href = {props.children} target = "_blank">{props.children}</a> 



class App extends Component {
  state = {};

  componentDidMount() {
    axios
      .post('/api/auth/check')
      .then(res => {
        if (res.data.user !== undefined) {
          this.setState({
            username: res.data.user.username
          })
        }
      })
      .catch(err => console.error(err));
  }

  _onLogin = () => {
    axios.post('/api/auth/login', {
      username: 'ducbmse05243',
      password: '123456'
    })
      .then(res => {
        this.setState({
          username: res.data.user.username
        })
      })
      .catch(err => console.error(err));
  }

  render() {

    return (
      <BrowserRouter>

        <div className='App'>
          {/* <HomeScreen onLogin={this._onLogin} username={this.state.username} /> */}
          <Route exact path='/' render={props => {
            return <HomeScreen
              {...props}
              onLogin={this._onLogin}
              username={this.state.username}
            />
          }} />
          <Route path='/image/:id' render={props => {
            return <DetailScreen
              {...props}
              onLogin={this._onLogin}
              username={this.state.username}
            />
          }} />
          {/* <DetailScreen onLogin={this._onLogin} username={this.state.username} /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;