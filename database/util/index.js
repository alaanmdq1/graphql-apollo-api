const mongoose = require('mongoose')
const dotEnv = require('dotenv')

dotEnv.config()

const { MONGO_DB_URL} = process.env

module.exports.connection = async () => {
    try {
        mongoose.set('debug', true)
        await mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Database connected Succesfully')
    } catch (error) {
        return console.log(error)
        throw new Error(error)
    }
    
}

module.exports.isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}