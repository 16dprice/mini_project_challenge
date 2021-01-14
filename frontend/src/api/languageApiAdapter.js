import axios from 'axios';

export default class LanguageApiAdapter {
    static getLanguages() {
        return axios.get('http://0.0.0.0:8000/api/languages')
            .then(res => res.data);
    }
}