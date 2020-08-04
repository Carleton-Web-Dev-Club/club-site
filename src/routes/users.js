import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { omit } from 'lodash'
import { AuthSchema, UserSchema } from '../models/schemas'
import { USER_ROLES } from '../lib/consts'
import { DnE } from '../lib/utils'

const app = Router()

// Get all users
app.get( '/', async ( _, res, next ) => {
  try {
    const users = await UserSchema
      .find()
      .select( '-__v' )
      .populate( 'login', '-password -user -__v' )

    return res.json( users )
  } catch ( err ) { return next( err ) }
} )

// Get a user using ID
app.get( '/:userId', async (
  { params: { userId } },
  res,
  next,
) => {
  try {
    const user = await UserSchema
      .findById( userId )
      .select( '-__v' )
      .populate( 'login', '-password -user -__v' )

    if ( user ) return res.json( user )
    return next( DnE( userId ) )
  } catch ( err ) { return next( err ) }
} )

// Register
app.post( '/', async ( { body }, res, next ) => {
  try {
    const hashedPassword = await bcrypt.hash( body.password, 10 )

    // Save user credentials for auth document
    const userAuth = new AuthSchema( {
      email: body.email,
      password: hashedPassword,
      role: USER_ROLES.basic,
    } )
    const saveUserAuth = await userAuth.save()
    const { _id: loginId } = saveUserAuth

    // Save user User Document
    const user = UserSchema( {
      name: body.name,
      organization: body.organization,
      socialAccounts: body.socialAccounts,
      login: loginId,
    } )
    const saveUser = await user.save()
    const { _id: userId } = saveUser

    // Link User document back to Auth Document (One to One relationship)
    await AuthSchema.updateOne( { _id: saveUserAuth.id }, { $set: { user: userId } } )

    return res.json( {
      ...saveUser.toJSON(),
      login: {
        // Remove password from response
        ...omit( saveUserAuth.toJSON(), 'password' ),
      },
    } )
  } catch ( err ) { return next( err ) }
} )

export default app
