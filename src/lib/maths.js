export const sum = () => (a, b) => (+a + +b).toString();
export const diff = () => (a, b) => (+a - +b).toString();
export const mult = () => (a, b) => (+a * +b).toString();
export const div = () => (a, b) => (+a / +b).toString();

export const toHex = (numb) => separate(numb.toString(16).toUpperCase().split(''), 4);

export const toDec = (numb) => separate(numb.toString(10).split(''));
export const toOct = (numb) => separate(numb.toString(8).split(''));
export const toBin = (numb) => separate(numb.toString(2).split(''), 4);

const separate = (arrNums, length = 3) => {
    if (arrNums.length < length) return arrNums.join('');

    arrNums.reverse();

    let partNum = [];
    const newArrNums = [];
    let i = 0;

    while (i < arrNums.length) {
        if (i % length === 0 && i !== 0) {
            newArrNums.push(partNum.reverse().join(''));
            partNum = [];
        }
        partNum.push(arrNums[i]);
        i++;
    }

    while (partNum.length < length) {
        partNum.push('0');
    }
    if (partNum.length > 0) newArrNums.push(partNum.reverse().join(''));

    return newArrNums.reverse().join(' ');
};
