
const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;
const fs = require('fs');


app.use(express.static('public'));
app.use(express.json());

app.post('/postdata', (req, res) => {
    const encodedStr = req.body.postData.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
    fs.appendFile('data.txt', encodedStr + "<br>", err => {
        if (err) {
            console.error(err)
            return
        }
    })
    res.send({ "status": "ok" })
})

app.get('/data', (req, res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.send({ "data": data })
    })
})
const server = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));


const socket = require('socket.io')
const io = socket(server)

function onConnection(socket) {
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);