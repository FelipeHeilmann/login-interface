import express from 'express'
import db from './connection/dbConnection.js'
import routes from './routes/index.js'

const app = express()
routes(app)

export default app