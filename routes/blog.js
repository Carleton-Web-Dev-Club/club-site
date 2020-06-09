import { Router } from 'express'
import { BlogSchema } from '../models/schemas'
import { List } from '../lib/utils'

const router = Router()

// Get list of all blogs
router.get( '/', async ( _, res ) => {
  try {
    const blogs = await BlogSchema.find()
    res.json( blogs )
  } catch ( err ) {
    res.json( { message: err } )
  }
} )

// Submit a blog
router.post( '/', async ( req, res ) => {
  const blog = new BlogSchema( {
    author: req.body.author,
    content: req.body.content,
    title: req.body.title,
    language: req.body.language,
    tags: List( req.body.tags ),
    category: List( req.body.category ),
  } )

  try {
    const saveBlog = await blog.save()
    res.json( saveBlog )
  } catch ( err ) {
    res.json( { message: err } )
  }
} )

// Blog by ID
router.get( '/:blogId', async ( req, res ) => {
  try {
    const blog = await BlogSchema.findById( req.params.blogId )
    res.json( blog )
  } catch ( err ) {
    res.json( { message: err } )
  }
} )

export default router
