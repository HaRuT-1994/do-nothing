export function strToArray(data: string): number[] {
    let arr = [];
    data.split(',').forEach(i => !isNaN(+i) && arr.push(+i));
    return arr;
  }