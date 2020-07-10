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
      type: Date,
      default: Timestamp(),
    },
    dateUpdated: {
      type: Date,
      default: Timestamp(),
    },
    datePublished: {
      type: Date,
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
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  } ),
)

export const ProjectSchema = mongoose.model(
  'Projects',
  new mongoose.Schema( {
    // Link it to USERS
    contributors: [ {
      type: String,
      required: true,
    } ],
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      required: true,
    },
  } ),
)
