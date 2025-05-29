
/**
 * 
 * @param array 
 * @returns random element from array
 */
export function randomElement(array: Array<any>) {
    return array[Math.floor(Math.random() * array.length)]
}
