export default class ProjectApiAdapter {
    static projectList() {
        return [
            {
                id: 1,
                bookName: "Mark",
                language: "English",
                completed: true
            },
            {
                id: 2,
                bookName: "1 Peter",
                language: "English",
                completed: false
            },
            {
                id: 3,
                bookName: "Genesis",
                language: "Espanol",
                completed: true
            }
        ];
    }

    static completedProjectList() {
        return this.projectList().filter(project => project.completed);
    }

    static uncompletedProjectList() {
        return this.projectList().filter(project => !project.completed);
    }
}