import { Router } from 'express'
import { EventSchema } from '../models/schemas'
import { FormatDateTime, ValidateDateTime, GetItemById, DnE } from '../lib/utils'

const app = Router()

// Get list of all events
app.get( '/', async ( _, res, next ) => {
  try {
    const events = await EventSchema.find().select( '-__v' )
    return res.json( events )
  } catch ( err ) { return next( err ) }
} )

// Get a single event using ID
app.get( '/:eventId', async (
  { params: { eventId } },
  res,
  next,
) => {
  try {
    const event = await GetItemById( EventSchema, eventId )

    if ( event ) return res.json( event )
    return next( DnE( eventId ) )
  } catch ( err ) { return next( err ) }
} )

// Add an event
app.post( '/', async ( { body }, res, next ) => {
  try {
    const { startDate, endDate } = body
    const formattedStartDate = FormatDateTime( startDate )
    const formattedEndDate = FormatDateTime( endDate )
    ValidateDateTime( formattedStartDate, formattedEndDate )

    const event = new EventSchema( {
      ...body,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    } )

    const saveEvent = await event.save()

    return res.json( saveEvent )
  } catch ( err ) { return next( err ) }
} )

// Delete an event using ID
app.delete( '/:eventId', async (
  { params: { eventId } },
  res,
  next,
) => {
  try {
    if ( await GetItemById( EventSchema, eventId ) ) {
      await EventSchema.deleteOne( { _id: eventId } )
      return res.json( { message: `Deleted ${eventId}` } )
    }
    return next( DnE( eventId ) )
  } catch ( err ) { return next( err ) }
} )

// Update an event using ID
app.patch( '/:eventId', async (
  {
    body,
    params: { eventId },
  },
  res,
  next,
) => {
  try {
    if ( await GetItemById( EventSchema, eventId ) ) {
      const updatedFields = {}

      // Add all the incoming fields to object
      Object.keys( body )
        .forEach( key => { updatedFields[ key ] = body[ key ] } )

      // Format dates
      Object.keys( body )
        .filter( key => key === 'startDate' || key === 'endDate' )
        .forEach( key => { updatedFields[ key ] = FormatDateTime( body[ key ] ) } )

      // update the fields in DB
      await EventSchema.updateOne( { _id: eventId }, { $set: updatedFields } ).exec()

      return res.json( { message: 'Updated the following items', updatedFields } )
    }
    return next( DnE( eventId ) )
  } catch ( err ) { return next( err ) }
} )
export default app
