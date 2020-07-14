import { Router } from 'express'
import { ProjectSchema } from '../models/schemas'
import { List, FormatDateTime, Timestamp, GetItemById, DnE } from '../lib/utils'

const app = Router()

// Get list of all projects
app.get( '/', async ( _, res, next ) => {
  try {
    const events = await ProjectSchema.find().select( '-__v' )
    return res.json( events )
  } catch ( err ) { return next( err ) }
} )

// Get a single project using ID
app.get( '/:projectId', async (
  { params: { projectId } },
  res,
  next,
) => {
  try {
    const event = await GetItemById( ProjectSchema, projectId )

    if ( event ) return res.json( event )
    return next( DnE( projectId ) )
  } catch ( err ) { return next( err ) }
} )

// Create a project
app.post( '/', async ( { body }, res, next ) => {
  try {
    const { contributors, createdDate } = body
    let contribs = contributors
    if ( typeof ( contributors ) === 'string' ) { contribs = List( contributors ) }

    const project = new ProjectSchema( {
      ...body,
      contributors: contribs,
      createdDate: createdDate ? FormatDateTime( createdDate ) : Timestamp(),
    } )

    const saveProject = await project.save()
    return res.json( saveProject )
  } catch ( err ) { return next( err ) }
} )

// Update a project using ID
app.patch( '/:projectId', async (
  {
    body,
    params: { projectId },
  },
  res,
  next,
) => {
  try {
    if ( await GetItemById( ProjectSchema, projectId ) ) {
      const updatedFields = {}

      // Add all the incoming fields to object
      Object.keys( body )
        .filter( key => key !== 'contributors' ) // Doesn't support updating contributors
        .forEach( key => { updatedFields[ key ] = body[ key ] } )

      // Format dates
      Object.keys( body )
        .filter( key => key === 'createdDate' )
        .forEach( key => { updatedFields[ key ] = FormatDateTime( body[ key ] ) } )

      // update the fields in DB
      await ProjectSchema.updateOne( { _id: projectId }, { $set: updatedFields } ).exec()

      return res.json( { message: 'Updated the following items', updatedFields } )
    }
    return next( DnE( projectId ) )
  } catch ( err ) { return next( err ) }
} )

export default app
