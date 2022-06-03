import express from "express";

const app = express()

app.get('/', (req: express.Request, res: express.Response) => {
    res.send(`<h1>Welcome</h1>`)
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server listening to port: ${port}`)
})
