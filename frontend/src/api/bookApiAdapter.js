export default class BookApiAdapter {
    static getBooks() {
        return [
            {
                slug: "gen",
                name: "Genesis",
                index: 1
            },
            {
                slug: "mrk",
                name: "Mark",
                index: 6
            }
        ]
    }
}