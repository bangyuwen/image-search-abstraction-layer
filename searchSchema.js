import autoIncrement from 'mongoose-auto-increment'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const connection = mongoose.createConnection(`mongodb://${process.env.ID}:${process.env.PW}@ds127163.mlab.com:27163/searchdata`)
autoIncrement.initialize(connection)

const searchSchema = new Schema({
  query: String,
  time: Date
})
searchSchema.plugin(autoIncrement.plugin, 'SearchData')
export const SearchModel = connection.model('SearchData', searchSchema)
