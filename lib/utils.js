/**
 * Returns an array from list items
 * @param {String} list comma separated list
 */
export const List = list => {
  if ( !list ) return []
  return list.split( ',' ) || list
}
