import axios from 'axios';
import apiConfig from './apiConfig.json';

export default class LanguageApiAdapter {
    static getFilteredLanguages(filter) {
        return axios.get(`${apiConfig.SERVER_URL}/api/languages/?filter=${filter}`)
            .then(res => res.data);
    }
}