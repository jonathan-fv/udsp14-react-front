import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const API = axios.create({
	baseURL: apiUrl,
	timeout: 15000,
});

export default API;
