import mongoose, { Schema } from 'mongoose'
import 'mongoose-type-email'

import { Timestamp } from '../lib/utils'

export const BlogSchema = mongoose.model(
  'Blog',
  new mongoose.Schema( {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: { type: String, required: true },
    title: { type: String, required: true },
    dateUploaded: { type: Date, default: Timestamp() },
    dateUpdated: { type: Date, default: Timestamp() },
    datePublished: { type: Date, default: Timestamp() },
    language: { type: String, default: 'en' },
    tags: [ String ],
    category: [ String ],
    published: { type: Boolean, default: true },
  } ),
)

export const EventSchema = mongoose.model(
  'Events',
  new mongoose.Schema( {
    organizer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
  } ),
)

export const ProjectSchema = mongoose.model(
  'Projects',
  new mongoose.Schema( {
    contributors: [ {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    } ],
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdDate: { type: Date, required: true },
  } ),
)

// Usernames for different social platforms
const SocialAccountsSchema = {
  github: String,
  reddit: String,
  discord: String,
  steam: String,
  twitch: String,
  twitter: String,
  facebook: String,
  instagram: String,
  linkedIn: String,
}

export const UserSchema = mongoose.model(
  'Users',
  new mongoose.Schema( {
    name: {
      type: String,
      required: true,
    },
    login: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
    },
    socialAccounts: SocialAccountsSchema,
    organization: String,
  } ),
)

export const AuthSchema = mongoose.model(
  'Auth',
  new mongoose.Schema( {
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
      unique: true,
      index: true,
    },
    password: { type: String, required: true },
    role: { type: String, required: true },
    // one to one relation with users
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  } ),
)
