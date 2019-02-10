const express = require('express');
const algorithm = require('./algorithm');
const bodyParser = require('body-parser');


const PORT = 5000;
const app = express();
app.use(bodyParser.json());
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

app.post('/api/link', (req, res) => {
    console.log(req.body);
    if (!req.body) {
        return res.status(400).send({
            success: 'false',
            message: 'payment input is missing!'
        });
    }

    try {
        const payment = req.body;
        const matchCount = algorithm.search(payment);
        return res.status(201).send({
            success: 'true',
            message: `Expected number of payables: ${matchCount}`,
            payment
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            success: 'false',
            message: 'Unexpected Error!'
        });
    }
});
