import { Router } from 'express'

const app = Router()

app.get( '/', ( _, res ) => (
  res.json( { message: 'EVENTS ROUTE' } )
) )

export default app
