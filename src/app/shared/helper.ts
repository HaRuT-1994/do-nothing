export function strToArray(data: string): number[] {
    let arr = [];
    data.split(',').map(i => {
        if(!isNaN(+i)) arr.push(+i)
    });
    return arr;
}