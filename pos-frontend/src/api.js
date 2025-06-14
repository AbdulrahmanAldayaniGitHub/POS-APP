import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const get = (endpoint) => axios.get(`${API_URL}${endpoint}`);
export const post = (endpoint, data) => axios.post(`${API_URL}${endpoint}`, data);
export const put = (endpoint, data) => axios.put(`${API_URL}${endpoint}`, data);
export const remove = (endpoint) => axios.delete(`${API_URL}${endpoint}`);
