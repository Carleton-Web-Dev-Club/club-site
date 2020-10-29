import moment from 'moment';

/**
 * Returns an array from list items
 * @param {String} list comma separated list
 */
export const List = (list) => {
  if (!list) return [];
  return list.split(',') || list;
};

// Date and time in ISO 8601
export const Timestamp = () => new Date().toISOString();

/**
 * Uses momentJS to parse date and time
 * See https://momentjs.com/docs/#/parsing/string/ for supported formats
 * @param {String} date
 * @returns Date and time in ISO 8601
 */
export const FormatDateTime = (date) => {
  if (moment(date, moment.ISO_8601).isValid() && moment(date).hour()) {
    return moment(date, moment.ISO_8601);
  }
  throw Error('Not a valid format. Should contain date and time, check https://momentjs.com/docs/#/parsing/string/ for supported formats');
};

/**
 * Validates a date to make sure it occurs after current date
 * @param {String} begin start date for event
 * @param {String} finish end date for event
 * @returns boolean
 */
export const ValidateDateTime = (begin, finish) => {
  const conditions = [
    moment(begin).isAfter(moment.now()),
    moment(finish).isAfter(moment.now()),
    moment(finish).isAfter(begin),
  ].every((result) => result);

  if (!conditions) throw Error('Make sure dates are not from past and start occurs before end date');

  return conditions;
};

/**
 * Return an object from DB
 * @param {MongooseModel} schema Mongoose Schema to query DB
 * @param {string} id The ID for the blog to query
 * @param {string} populateFields Any subfields to populate
 * @returns {Object} with the data or null
 */
export const GetItemById = async (schema, id, populateFields) => schema
  .findById(id)
  .select('-__v')
  .populate(populateFields);

/**
 *
 * @param {String} id
 * @returns 404 error
 */
export const DnE = (id) => ({ message: `${id} does not exist`, status: 404 });
