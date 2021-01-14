import axios from 'axios';

export default class ProjectApiAdapter {

    static getProjects() {
        return axios.get('http://0.0.0.0:8000/api/projects')
            .then(res => {
                return res.data.map(project => {
                    return {
                        id: project.id,
                        bookName: project.book.name,
                        language: project.language.original_name,
                        completed: project.completed
                    }
                })
            });
    }

    static getProjectById(id) {
        return axios.get(`http://0.0.0.0:8000/api/projects/${id}`)
            .then(res => {
                const contributors = res.data.contributors.map(contributor => {
                    return {
                        id: contributor.id,
                        username: contributor.username,
                        firstName: contributor.first_name,
                        lastName: contributor.last_name
                    }
                });

                return {
                    id: res.data.id,
                    bookName: res.data.book.name,
                    language: res.data.language.original_name,
                    completed: res.data.completed,
                    contributors
                };
            });
    }

    static createProject(bookSlug, languageSlug) {
        return axios.post('http://0.0.0.0:8000/api/projects/', {
            bookSlug,
            languageSlug
        });
    }

    static addContributorToProject(projectId, contributorIds) {
        return axios.post(`http://0.0.0.0:8000/api/projects/${projectId}/contributors`, {
            contributors: JSON.stringify(contributorIds)
        });
    }

    static projectList() {
        return [
            {
                id: "1",
                bookName: "Mark",
                language: "English",
                completed: true,
                contributors: [
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
                ]
            },
            {
                id: "2",
                bookName: "1 Peter",
                language: "English",
                completed: false,
                contributors: [
                    {
                        id: "1",
                        username: "lindavasquez",
                        firstName: "Linda",
                        lastName: "Vasquez"
                    }
                ]
            },
            {
                id: "3",
                bookName: "Genesis",
                language: "Espanol",
                completed: true,
                contributors: [
                    {
                        id: "1",
                        username: "lindavasquez",
                        firstName: "Linda",
                        lastName: "Vasquez"
                    },
                    {
                        id: "3",
                        username: "zjohnson",
                        firstName: "Zachary",
                        lastName: "Johnson"
                    },
                ]
            }
        ];
    }

    static getProjectsByUserId(userId) {
        return this.projectList().filter(
            project => {
                let projectHasUserAsContributor = false;
                project.contributors.forEach((item, index) => {
                    if(item.id === userId) projectHasUserAsContributor = true;
                });
                return projectHasUserAsContributor;
            }
        );
    }
}