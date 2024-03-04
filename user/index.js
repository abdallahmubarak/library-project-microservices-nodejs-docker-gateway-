const app = require('express')();

app.get('/user', (req, res) => res.send('Hello user, API with mongo!'));

app.listen(3001, () => console.log(`‘سثق API listening on port 3001!`));