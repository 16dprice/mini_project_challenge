export const selectLanguage = (languageSlug) => {
    return {
        type: 'SELECT_LANGUAGE',
        payload: languageSlug
    }
}

export const deselectLanguage = () => {
    return {
        type: 'DESELECT_LANGUAGE'
    }
}

export const selectBook = (bookSlug) => {
    return {
        type: 'SELECT_BOOK',
        payload: bookSlug
    }
}

export const deselectBook = () => {
    return {
        type: 'DESELECT_BOOK'
    }
}