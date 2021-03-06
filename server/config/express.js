import express from 'express';
import consign from 'consign';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import database from './database';
import authorization from './auth';

const app = express();
app.config = config;

app.database = database(app);
app.set('port', 8080);
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
	extended: true
}));  
app.use(bodyParser.json());

const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;

consign()
	.include('models')
	.then('controllers/restaurante.js')
	.then('controllers')
	.then('routes/auth.js')
	.then('routes')
	.into(app);

export default app;