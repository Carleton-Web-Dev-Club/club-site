import mongoose from 'mongoose'

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
      type: Date,
      default: Date.now(),
    },
    dateUpdated: {
      type: Date,
      default: Date.now(),
    },
    datePublished: {
      type: Date,
      default: Date.now(),
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
