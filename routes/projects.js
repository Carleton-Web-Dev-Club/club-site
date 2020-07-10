import { Router } from 'express'
import { ProjectSchema } from '../models/schemas'
import { List, FormatDateTime, Timestamp } from '../lib/utils'

const app = Router()

app.get( '/', ( _, res ) => (
  res.json( { message: 'PROJECTS ROUTE' } )
) )

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

export default app
