import axios from 'axios';
import { Text } from '../model';

const baseUrl = 'http://localhost'; // TODO: pegar esse valor de uma variável de ambiente
const port = ':12345'; // TODO: pegar esse valor de uma variável de ambiente

export function get(endpoint: string): Promise<Text[]> {
  return axios.get(`${baseUrl}${port}${endpoint}`)
    .then(resp => resp.data);
}

export function add(endpoint: string, data: any): Promise<Text> {
  return axios.post(`${baseUrl}${port}${endpoint}`, data)
    .then(resp => resp.data);
}
