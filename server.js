require('dotenv').config();
const environment = process.env.NODE_ENV || 'test';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);
const express = require('express');
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 3001);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.sendStatus(200);
});

app.get('/api/v1/projects', (req, res) => {
	db('projects')
		.select()
		.then(projects => {
			if (!projects.length) {
				return res.status(200).send('No data found in "projects" database.');
			}
			return res.status(200).send(projects);
		})
		.catch(() => res.sendStatus(500));
});

app.get('api/v1/palettes', (req, res) => {
	db('palettes')
		.select()
		.then(palettes => {
			if (!palettes.length) {
				return res.status(200).send('No data found in "palettes" database.');
			}
			return res.status(200).send(palettes);
		})
		.catch(() => res.sendStatus(500));
});

app.listen(app.get('port'), console.log(`Listening on port ${app.get('port')}.`));

module.exports = app;
