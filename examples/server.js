const express = require('express');
let PORT = 4200;

let app = express();

app.use(express.static(__dirname));

app.get('/', (req, resp) => {
    resp.redirect('/react');
})
app.get('/angular', (req, resp) => {
    resp.sendFile('./angular/index.html')
})

app.get('/react', (req, resp) => {
    resp.sendFile('./react/index.html')
})

app.listen(PORT, console.log.bind(console,  `server listening on port ${PORT}`));