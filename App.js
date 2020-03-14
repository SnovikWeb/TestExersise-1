const anagramChecker = str => {
    let counter = 0;
    const couple = num => num % 2 === 0;
    const removeCoupleValues = () => {
        for (let key in temp) {
            if (couple(temp[key])) {
                delete temp[key];
                removeCoupleValues();
                break;
            }
        }
    };
    const leveler = entries => {
        const min = Math.min(...entries.map(arr => arr[1])),
            max = Math.max(...entries.map(arr => arr[1]));

        if (min !== max) {
            entries.forEach(item => {
                if (item[1] === min) item[1]++;
                else if (item[1] === max) item[1]--;
            });
            counter++;
            leveler(entries);
        }
    };

    if (!couple(str.length)) return -1;

    const temp = {};
    str = str.toLowerCase().split('');
    str.forEach(item => item in temp ? temp[item]++ : temp[item] = 1);

    removeCoupleValues();

    const keys = Object.keys(temp).length,
        values = Object.values(temp);

    if (!keys) return counter;

    if (values.every((item, idx, arr) => item === arr[0])) counter = values[0] * (keys / 2);
    else leveler(Object.entries(temp));

    return counter;

};

console.log(anagramChecker('aaabbb'));  // 3
console.log(anagramChecker('ab'));  // 1
console.log(anagramChecker('abc')); // -1
console.log(anagramChecker('mnop'));    // 2
console.log(anagramChecker('xyyx'));    // 0
console.log(anagramChecker('xaxbbbxx'));    // 1

console.log(anagramChecker('banana'));    // 1
console.log(anagramChecker('test'));    // 1
console.log(anagramChecker('symfony'));    // -1
console.log(anagramChecker('qwerty'));    // 3
console.log(anagramChecker('abcdefghijklmnopqrstuvwxyz'));    // 13