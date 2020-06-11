import { Router } from 'express'
import { BlogSchema } from '../models/schemas'
import { List, Timestamp } from '../lib/utils'

const router = Router()

// Get list of all blogs
router.get( '/', async ( _, res, next ) => {
  try {
    const blogs = await BlogSchema.find().select( '-__v' )
    return res.json( blogs )
  } catch ( err ) { return next( err ) }
} )

// Submit a blog
router.post( '/', async (
  {
    body: { author, content, title, language, tags, category },
  },
  res,
  next,
) => {
  const blog = new BlogSchema( {
    author,
    content,
    title,
    language,
    tags: List( tags ),
    category: List( category ),
  } )

  try {
    const saveBlog = await blog.save()
    return res.json( saveBlog )
  } catch ( err ) { return next( err ) }
} )

/**
 *
 * @param {string} id The ID for the blog to query
 * @returns'{Object} with the data or null
 */
const getBlogId = async id => BlogSchema.findById( id )

const blogDnE = id => ( { message: `Blog post ${id} does not exist`, status: 404 } )

// Get blog by ID
router.get( '/:blogId', async (
  { params: { blogId } },
  res,
  next,
) => {
  try {
    const blog = await getBlogId( blogId )

    if ( blog ) return res.json( blog )

    return next( blogDnE( blogId ) )
  } catch ( err ) { return next( err ) }
} )

// Update blog by ID
router.patch( '/:blogId', async (
  {
    body,
    params: { blogId },
  },
  res,
  next,
) => {
  try {
    if ( await getBlogId( blogId ) ) {
      const updatedFields = {}

      // Add all the incoming fields to object
      Object.keys( body )
        .forEach( key => { updatedFields[ key ] = body[ key ] } )

      // Convert tags and category to array
      Object.keys( body )
        .filter( key => key === 'tags' || key === 'category' )
        .forEach( key => { updatedFields[ key ] = List( body[ key ] ) } )

      // Update the date
      updatedFields.dateUpdated = Timestamp()

      // update the fields in DB
      await BlogSchema.updateOne( { _id: blogId }, { $set: updatedFields } ).exec()

      return res.json( { message: 'Updated the following items', updatedFields } )
    }
    return next( blogDnE( blogId ) )
  } catch ( err ) { return next( err ) }
} )

// Delete a blog by ID
router.delete( '/:blogId', async (
  { params: { blogId } },
  res,
  next,
) => {
  try {
    if ( await getBlogId( blogId ) ) {
      await BlogSchema.remove( { _id: blogId } )
      return res.json( { message: `Deleted ${blogId}` } )
    }
    return next( blogDnE( blogId ) )
  } catch ( err ) { return next( err ) }
} )

// Get status of a blog post
router.get( '/:blogId/status', async (
  {
    params: { blogId },
  },
  res,
  next,
) => {
  try {
    const blog = await getBlogId( blogId )

    if ( blog ) {
      const { published, datePublished } = blog
      return res.json( { published, datePublished } )
    }

    return next( blogDnE( blogId ) )
  } catch ( err ) { return next( err ) }
} )

// Change status of a blog post
router.patch( '/:blogId/status', async (
  {
    params: { blogId },
  },
  res,
  next,
) => {
  try {
    const blog = await getBlogId( blogId )
    if ( blog ) {
      const updatedFields = {}

      updatedFields.published = !blog.published
      updatedFields.datePublished = !blog.published ? Timestamp() : ''
      updatedFields.dateUpdated = Timestamp()

      // update the fields in DB
      await BlogSchema.updateOne( { _id: blogId }, { $set: updatedFields } ).exec()

      return res.json( { message: 'Updated the following items', updatedFields } )
    }
    return next( blogDnE( blogId ) )
  } catch ( err ) { return next( err ) }
} )

export default router
