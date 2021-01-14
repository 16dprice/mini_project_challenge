import axios from 'axios';
import apiConfig from "./apiConfig.json";

export default class UserApiAdapter {
    static userList() {
        return axios.get(`${apiConfig.SERVER_URL}/api/users/`)
            .then(res => {
                return res.data.map(user => {
                    return {
                        id: user.id,
                        username: user.username,
                        firstName: user.first_name,
                        lastName: user.last_name
                    }
                });
            });
    }

    static getUserById(id) {
        return axios.get(`${apiConfig.SERVER_URL}/api/users/${id}`)
            .then(res => {
                return {
                    id: res.data.id,
                    username: res.data.username,
                    firstName: res.data.first_name,
                    lastName: res.data.last_name
                }
            });
    }

    static createUser(userName, firstName, lastName) {
        return axios.post(`${apiConfig.SERVER_URL}/api/users/`,
            {
                username: userName,
                firstName,
                lastName
            });
    }

    static updateUser(userId, firstName, lastName) {
        return axios.patch(`${apiConfig.SERVER_URL}/api/users/${userId}`, {
            firstName,
            lastName
        });
    }
}