import axios from 'axios';

export default class BookApiAdapter {
    static getBooks() {
        return axios.get('http://0.0.0.0:8000/api/books')
            .then(res => res.data);
    }
}