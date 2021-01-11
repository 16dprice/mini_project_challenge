export default class UserApiAdapter {
    static userList() {
        return [
            {
                username: "lindavasquez",
                firstName: "Linda",
                lastName: "Vasquez"
            },
            {
                username: "herbert123",
                firstName: "Herbert",
                lastName: "Fletcher"
            },
            {
                username: "zjohnson",
                firstName: "Zachary",
                lastName: "Johnson"
            },
        ];
    }

    static createNewUser(userName, firstName, lastName) {
        console.log(`User ${firstName} ${lastName} created as @${userName}`);
    }
}