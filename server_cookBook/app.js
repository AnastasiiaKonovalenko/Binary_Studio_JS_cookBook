const express = require('express');
const app = express();
const port = 5000;
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/', express.static('api', {
    index: 'articles.json',
    extensions: ['json'],
}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));