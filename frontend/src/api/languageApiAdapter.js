export default class LanguageApiAdapter {
    static getLanguages() {
        return [
            {
                slug: "en",
                anglicized_name: "English",
                original_name: "English"
            },
            {
                slug: "es",
                anglicized_name: "Spanish",
                original_name: "Espanol"
            }
        ]
    }
}