import axios from 'axios';
import apiConfig from './apiConfig.json';

export default class LanguageApiAdapter {
    static getFilteredLanguages(filter) {
        return axios.get(`${apiConfig.SERVER_URL}/api/languages/?filter=${filter}`)
            .then(res => res.data);
    }

    static getMoreLanguages(index) {
        return axios.get(`http://127.0.0.1:8000/api/languages/?index=${index}`)
            .then(res => res.data);
    }
}