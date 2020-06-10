import { Router } from 'express'
import { BlogSchema } from '../models/schemas'
import { List } from '../lib/utils'

const router = Router()

// Get list of all blogs
router.get( '/', async ( _, res, next ) => {
  try {
    const blogs = await BlogSchema.find()
    res.json( blogs )
  } catch ( err ) { next( err ) }
} )

// Submit a blog
router.post( '/', async ( req, res, next ) => {
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
  } catch ( err ) { next( err ) }
} )

// Blog by ID
router.get( '/:blogId', async ( req, res, next ) => {
  try {
    const blog = await BlogSchema.findById( req.params.blogId )
    res.json( blog )
  } catch ( err ) { next( err ) }
} )

export default router
