import axios from 'axios';

export default class UserApiAdapter {
    static userList() {
        return axios.get('http://0.0.0.0:8000/api/users/')
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

    static mockedUserList() {
        return [
            {
                id: "1",
                username: "lindavasquez",
                firstName: "Linda",
                lastName: "Vasquez"
            },
            {
                id: "2",
                username: "herbert123",
                firstName: "Herbert",
                lastName: "Fletcher"
            },
            {
                id: "3",
                username: "zjohnson",
                firstName: "Zachary",
                lastName: "Johnson"
            },
        ];
    }

    static getUserById(id) {
        return axios.get(`http://0.0.0.0:8000/api/users/${id}`)
            .then(res => {
                return {
                    id: res.data.id,
                    username: res.data.username,
                    firstName: res.data.first_name,
                    lastName: res.data.last_name
                }
            });
    }

    static createNewUser(userName, firstName, lastName) {
        console.log(`Creating user ${firstName} ${lastName} as @${userName}`);
        return axios.post('http://0.0.0.0:8000/api/users/',
            {
                username: userName,
                firstName,
                lastName
            });
    }
}