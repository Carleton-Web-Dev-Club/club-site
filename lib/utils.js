import moment from 'moment'

/**
 * Returns an array from list items
 * @param {String} list comma separated list
 */
export const List = list => {
  if ( !list ) return []
  return list.split( ',' ) || list
}

// Date and time in ISO 8601
export const Timestamp = () => new Date().toISOString()

/**
 * Uses momentJS to parse date and time
 * See https://momentjs.com/docs/#/parsing/string/ for supported formats
 * @param {String} date
 * @returns Date and time in ISO 8601
 */
export const FormatDateTime = date => {
  if ( moment( date, moment.ISO_8601 ).isValid() && moment( date ).hour() ) {
    return moment( date, moment.ISO_8601 )
  }
  throw Error( 'Not a valid format. Should contain date and time, check https://momentjs.com/docs/#/parsing/string/ for supported formats' )
}

