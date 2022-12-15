import express, { Request, Response } from 'express'
import 'dotenv/config'
import { Configuration, OpenAIApi } from "openai";
import * as http from 'http'
import { Server } from 'socket.io'
import { animals } from './animals'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'https://chat-app-puce-psi.vercel.app',
    methods: ['POST', 'GET'],
    credentials: true
  }
}) 

app.use(express.json())

const configuration = new Configuration({
  apiKey: process.env.SESSION_TOKEN,
});
const openai = new OpenAIApi(configuration);

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hi mom</h1>')
})

app.post('/api/v1/', async (req: Request, res: Response) => {
  const { msg } = req.body.data
  console.log(msg);
  
  
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(msg),
    temperature: 0.6,
    max_tokens: 2000
  });
  console.log(completion.data.choices[0].text);
  res.status(200).json({ result: completion.data.choices[0].text });
})

function generatePrompt(str: string) {
  const capPrompt =
    str[0].toUpperCase() + str.slice(1).toLowerCase();
    console.log(capPrompt);
  return str;
}

app.use(cors())

const port = Number(process.env.PORT) || 5000

const start = (port: number) => { 
    server.listen(port, () => {
      process.stdout.write('Server Deployed on:')
      console.log(`\x1b[33m`, `https://localhost:${port}/`);
    })  
}

let idMap: { [key: string]: string } = {}
let x = 1;
io.on('connect', (socket) => {
  console.log(`User connected with id: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log('User disconnected');
  })
  socket.on('message', (msg, sendTo, sentBy) => {
    console.log(sendTo); 
    socket.to(sendTo).emit('message', msg, 'Anonymous ' + idMap[sentBy])
  })
  socket.on('join', (joinedby, joinedto) => {
    socket.to(joinedto).emit('joinMessage', idMap[joinedby])
  })
  socket.on('leave', (leftBy, left) => {
    socket.to(left).emit('leftMessage', idMap[leftBy])
  })
  socket.on('newUser', id => {
    const num = Math.floor(Math.random() * (animals.length - 1))
    socket.broadcast.emit('newUser', id, animals[num])
    console.log('ctrl here');
    x++;
    idMap = { ...idMap, [id]: animals[num]}
  })  
  socket.on('oldUsers', async (id) => {
    const sockets = await io.fetchSockets() 
    sockets.forEach((val, index) => {
      console.log(idMap)
      if(val.id !== id) io.to(id).emit('newUser', val.id, idMap[val.id])
    })
  })
  socket.on('typing', (room, typingId) => {
    socket.broadcast.to(room).emit('typingEvent', 'Anonymous ' + idMap[typingId] + ' is typing...')
  })
  socket.on('stopTyping', (room) => {
    socket.broadcast.to(room).emit('stopTypingEvent')
  })
})

start(port)