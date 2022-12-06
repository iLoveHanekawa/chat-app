import express, { Request, Response } from 'express'
import * as http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:5173',
    methods: ['POST', 'GET']
  }
})

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hi mom</h1>')
})

const port = Number(process.env.PORT) || 5000

const start = (port: number) => { 
    server.listen(port, () => {
      process.stdout.write('Local Server:')
      console.log(`\x1b[36m%s\x1b[0m`, ` http://localhost:${port}`);
    })  
}

io.on('connect', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  })
  socket.on('id', (id) => {
    console.log(id);
  })
  socket.on('message', (msg) => {
    console.log(msg);
    socket.broadcast.emit('message', msg)
  })
  io.emit('all', Object.keys(io.sockets.sockets))
})

start(port)
