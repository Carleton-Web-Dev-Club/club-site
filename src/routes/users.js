import { Router } from 'express'

const app = Router()

app.get( '/', ( _, res ) => (
  res.json( { message: 'USERS ROUTE' } )
) )

export default app
