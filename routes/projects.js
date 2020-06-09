import { Router } from 'express'

const app = Router()

app.get( '/', ( _, res ) => (
  res.json( { message: 'PROJECTS ROUTE' } )
) )

export default app
