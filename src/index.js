import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// route to go here
import router from './controllers';

const app = express();

const urlParser = express.urlencoded({
  extended: true,
});

const jsonParser = express.json();
app.use(urlParser);
app.use(jsonParser);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
router(app);

// catch all routers
app.use('*', (req, res) => res.status(404).json({
  message: 'Not Found. Use /api/v1 to access the Api'
}));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Success!! app listening on port ${process.env.PORT}!`);
});

module.exports = server;
