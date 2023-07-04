import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const API = axios.create({
	baseURL: apiUrl,
	timeout: 15000,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	},
	withCredentials: true
});

export default API;
