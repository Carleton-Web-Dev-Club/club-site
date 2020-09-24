import { Router } from 'express'

import blog from './blog'
import events from './events'
import projects from './projects'
import users from './users'

const routes = Router()

routes.use( '/blog', blog )
routes.use( '/events', events )
routes.use( '/projects', projects )
routes.use( '/users', users )

export default routes
