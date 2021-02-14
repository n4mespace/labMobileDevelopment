export const validateMovieTitle = (title: string): boolean => {
    if (title.length > 0) {
        const regex = new RegExp('[a-zA-Z0-9]+');
        return regex.test(title);
    }
    return false;
};

export const validateMovieType = (type: string): boolean => {
    if (type.length > 0) {
        return type === 'movie' || type === 'tv show';
    }
    return false;
};

export const validateMovieYear = (year: string): boolean => {
    if (year.length > 0 && Number(year) > 1850) {
        const regex = new RegExp('[12][089][0-9][0-9]');
        return regex.test(year);
    }
    return false;
};
