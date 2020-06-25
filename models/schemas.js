import mongoose from 'mongoose'
import { Timestamp } from '../lib/utils'

export const BlogSchema = mongoose.model(
  'Blog',
  new mongoose.Schema( {
    // Link it to USER
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

export const EventSchema = mongoose.model(
  'Events',
  new mongoose.Schema( {
    // Link it to USER
    organizer: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      default: Timestamp(),
      required: true,
    },
    endDate: {
      type: String,
      default: Timestamp(),
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  } ),
)
