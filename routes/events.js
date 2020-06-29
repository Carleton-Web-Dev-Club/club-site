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


export default app
