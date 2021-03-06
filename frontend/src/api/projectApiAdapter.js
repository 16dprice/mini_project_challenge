import axios from 'axios';
import apiConfig from './apiConfig.json';

export default class ProjectApiAdapter {

    static getProjects() {
        return axios.get(`${apiConfig.SERVER_URL}/api/projects`)
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
        return axios.get(`${apiConfig.SERVER_URL}/api/projects/${id}`)
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
        return axios.post(`${apiConfig.SERVER_URL}/api/projects/`, {
            bookSlug,
            languageSlug
        });
    }

    static addContributorToProject(projectId, contributorIds) {
        return axios.post(`${apiConfig.SERVER_URL}/api/projects/${projectId}/contributors`, {
            contributors: JSON.stringify(contributorIds)
        });
    }

    static removeContributorFromProject(projectId, contributorId) {
        return axios.delete(`${apiConfig.SERVER_URL}/api/projects/${projectId}/contributors`, {
            data: {
                contributorId
            }
        });
    }

    static getProjectsByUserId(userId) {
        return axios.get(`${apiConfig.SERVER_URL}/api/users/${userId}/projects`)
            .then(res => {
                return res.data.map(project => {
                    return {
                        id: project.id,
                        language: project.language.original_name,
                        bookName: project.book.name
                    }
                })
            });
    }

    static updateProjectCompletionStatus(projectId, completed) {
        axios.patch(`${apiConfig.SERVER_URL}/api/projects/${projectId}/`, {
            completed: JSON.stringify(completed)
        })
    }

    static deleteProject(projectId) {
        axios.delete(`${apiConfig.SERVER_URL}/api/projects/${projectId}`);
    }
}