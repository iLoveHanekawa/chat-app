import express from 'express'
import { connectDB } from './db/connect'
import { config } from 'dotenv'
require('express-async-errors') //bruh
import authRouter from './routes/auth'
config()


const app: express.Express = express()

app.use(express.json())

app.use('/api/v1/auth', authRouter)

app.get('/', (req: express.Request, res: express.Response) => {
    res.send(`<h1>Welcome</h1>`)
})

const port = Number(process.env.PORT) || 5000 as number

const start = (port: number) => {
    try {
        connectDB(process.env.MONGO_URI!) 
        app.listen(port, () => {
            console.log(`server listening at port: ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start(port)
