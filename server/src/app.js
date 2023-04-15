import express from 'express'
import cors from 'cors'
import db from './connection/dbConnection.js'
import cookieParser from 'cookie-parser'
import routes from './app/routes/index.js'

const app = express()
app.use(
    express.json(),
    cors(),
    cookieParser()
)
routes(app)

export default app