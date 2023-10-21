import express, {json, urlencoded} from 'express';
import cors from "cors";

const app = express();
app.use(json()); // for parsing application/json  
app.use(urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded (and multipart/form-data)
app.use(cors())

let history = [];

app.post('/calculate', (req, res) => {
    history.unshift(req.body.result);
    res.json(req.body);
});

app.get('/history', (req, res) => {
    if (history.length > 10) {
        res.json(history.slice(0, 10));
    } else {
        res.json(history);
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));