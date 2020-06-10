import { Router } from 'express'
import { BlogSchema } from '../models/schemas'
import { List, Timestamp } from '../lib/utils'

const router = Router()

// Get list of all blogs
router.get( '/', async ( _, res, next ) => {
  try {
    const blogs = await BlogSchema.find().select( '-__v' )
    res.json( blogs )
  } catch ( err ) { next( err ) }
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
    res.json( saveBlog )
  } catch ( err ) { next( err ) }
} )

// Get blog by ID
router.get( '/:blogId', async (
  { params: { blogId } },
  res,
  next,
) => {
  try {
    const blog = await BlogSchema.findById( blogId ).select( '-__v' )

    if ( blog ) res.json( blog )

    // No blog found
    const error = new Error( `Blog post ${blogId} does not exist` )
    error.status = 404
    next( error )
  } catch ( err ) { next( err ) }
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
    if ( nModified !== 0 ) res.json( { message: 'Updated the following items', updatedFields } )

    next( { message: `Blog post ${blogId} does not exist` } )
  } catch ( err ) { next( err ) }
} )

// Delete a blog by ID
router.delete( '/:blogId', async (
  { params: { blogId } },
  res,
  next,
) => {
  try {
    await BlogSchema.remove( { _id: blogId } )
    res.json( { message: `Deleted ${blogId}` } )
  } catch ( err ) { next( err ) }
} )

// Change status of a blog post

export default router
