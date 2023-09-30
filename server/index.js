const express = require('express')
const cors = require('cors')
const router = require('./router')

const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
})) 

app.use('/api', router)

const PORT = 9001

const start = async () => {
    try {
        app.ws('/', (ws, req) => {
            ws.on('message', (msg) => {
                msg = JSON.parse(msg)
                switch (msg.method) {
                    case "connection": {
                        connectionHandler(ws, msg)
                        break
                    }
                    case "draw": {
                        broadcastConnection(ws, msg)
                        break
                    }
                }
            })
        })
        app.listen(PORT, ()=>{
            console.log(`Server started on port = ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

start() 
