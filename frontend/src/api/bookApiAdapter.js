import axios from 'axios';
import apiConfig from './apiConfig.json';

export default class BookApiAdapter {
    static getBooks() {
        return axios.get(`${apiConfig.SERVER_URL}/api/books`)
            .then(res => res.data);
    }
}