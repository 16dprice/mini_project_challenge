export default class ProjectApiAdapter {
    static projectList() {
        return [
            {
                bookName: "Mark",
                language: "English",
                completed: true
            },
            {
                bookName: "1 Peter",
                language: "English",
                completed: false
            },
            {
                bookName: "Genesis",
                language: "Espanol",
                completed: true
            }
        ];
    }
}