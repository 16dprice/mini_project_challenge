import axios from 'axios';

export default class LanguageApiAdapter {
    static getFilteredLanguages(filter) {
        return axios.get(`http://0.0.0.0:8000/api/languages/?filter=${filter}`)
            .then(res => res.data);
    }
}