/**
 * 移动数组元素
 * @param arr
 * @param index
 * @param direct
 */

export function arrUpDown(arr, index, direct) {
  // direct 1 为向上，向前 0 为向下，向后
  console.log(arr);
  if (direct === 1) {
    arr.splice(index-1, 0, arr.splice(index,1)[0]);
  } else if (direct === 0) {
    console.log(arr);
    arr.splice(index+1, 0, arr.splice(index,1)[0]);
    console.log(arr);
  }
}




/**
 * 根据类型返回索引
 * @param arr
 * @param type
 * @returns {string}
 */
export function type2index(arr, type) {
  for(let i in arr) {
    if (type === arr[i].type) {
      return i;
    }
  }
}

