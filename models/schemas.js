import mongoose from 'mongoose'
import { Timestamp } from '../lib/utils'

export const BlogSchema = mongoose.model(
  'Blog',
  new mongoose.Schema( {
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    dateUploaded: {
      type: String,
      default: Timestamp(),
    },
    dateUpdated: {
      type: String,
      default: Timestamp(),
    },
    datePublished: {
      type: String,
      default: Timestamp(),
    },
    language: {
      type: String,
      default: 'en',
    },
    tags: {
      type: [ String ],
    },
    category: {
      type: [ String ],
    },
    published: {
      type: Boolean,
      default: true,
    },
  } ),
)
