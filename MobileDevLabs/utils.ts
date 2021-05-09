const arrayChunks = (
    array: Array<string>,
    chunkSize: number
): Array<Array<string>> =>
    Array(Math.ceil(array.length / chunkSize))
        .fill(0)
        .map((_, index) => index * chunkSize)
        .map((begin) => array.slice(begin, begin + chunkSize));

export default {
    arrayChunks
};
