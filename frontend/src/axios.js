import axios from 'axios';
import config from './config';

// console.log(process.env.REACT_APP_STATE);

export default axios.create({
    baseURL: config.rootPath,
    withCredentials: true
  })