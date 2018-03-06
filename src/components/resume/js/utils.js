/**
 * 移动数组元素
 * @param arr
 * @param index
 * @param direct
 */

export function arrUpDown(arr, index, direct) {
  // direct 1 为向上，向前 0 为向下，向后
  if (direct === 1) {
    arr[index].s -= 1;
    arr[+index-1].s += 1;
  } else if (direct === 0) {
    arr[index].s += 1;
    arr[+index+1].s -= 1;
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

/**
 * 删除数组中索引为index的元素
 * @param arr
 * @param index
 */
export function removeListItem(arr, index) {
  arr.splice(index, 1);
}
