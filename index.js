const express = require("express")

const app = express()

const port = 3200

app.get('/', (req, res) => {
    res.send("Express + TS server")
})

app.listen(port)