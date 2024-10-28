export const group = (arr, length = 2) => {
    const result = [];
    let row = [];

    for (const elem of arr) {
        row.push(elem);
        if (row.length === length) {
            result.push(row);
            row = [];
        }
    }

    if (row.length !== 0)
        result.push(row);

    return result;
};
