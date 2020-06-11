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

// Get blog by ID
router.get( '/:blogId', async (
  { params: { blogId } },
  res,
  next,
) => {
  try {
    const blog = await BlogSchema.findById( blogId ).select( '-__v' )

    if ( blog ) return res.json( blog )

    // No blog found
    return next( { message: `Blog post ${blogId} does not exist` } )
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

    // update the fields
    const updateBlog = await BlogSchema.updateOne( { _id: blogId }, { $set: updatedFields } ).exec()
    const { nModified } = updateBlog

    // DB was updated
    if ( nModified !== 0 ) return res.json( { message: 'Updated the following items', updatedFields } )

    return next( { message: `Blog post ${blogId} does not exist` } )
  } catch ( err ) { return next( err ) }
} )

// Delete a blog by ID
router.delete( '/:blogId', async (
  { params: { blogId } },
  res,
  next,
) => {
  try {
    await BlogSchema.remove( { _id: blogId } )
    return res.json( { message: `Deleted ${blogId}` } )
  } catch ( err ) { return next( err ) }
} )

// Change status of a blog post

export default router
