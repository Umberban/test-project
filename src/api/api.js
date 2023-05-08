import axios from 'axios';
const BASE_URL = 'https://6458fa234eb3f674df8301e9.mockapi.io/users'
export async function getUsers(page) {
  try {
    const response = await axios.get(`${BASE_URL}?page=${page}&limit=3`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getUser(id) {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export async function changeFollowers(id, update) {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, update);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}