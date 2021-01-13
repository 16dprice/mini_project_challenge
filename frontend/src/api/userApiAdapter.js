import axios from 'axios';

export default class UserApiAdapter {
    static userList() {
        axios.get('http://0.0.0.0:8000/api/users/')
            .then((res) => {
                console.log(res.data);
            });

        return this.mockedUserList();
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
        return this.userList().find(el => el.id === id);
    }

    static createNewUser(userName, firstName, lastName) {
        console.log(`User ${firstName} ${lastName} created as @${userName}`);
    }
}