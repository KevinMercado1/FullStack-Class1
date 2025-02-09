import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = (id, updatedBlog) => {
  return axios.put(`${baseUrl}/${id}`, updatedBlog);
};
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, setToken, update, remove };
