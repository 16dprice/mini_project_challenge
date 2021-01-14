import axios from 'axios';

export default class LanguageApiAdapter {
    static getFilteredLanguages(filter) {
        return axios.get(`http://0.0.0.0:8000/api/languages/?filter=${filter}`)
            .then(res => res.data);
    }

    static getMoreLanguages(index) {
        return axios.get(`http://127.0.0.1:8000/api/languages/?index=${index}`)
    }
}