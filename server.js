require('dotenv').config();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.set('port', process.env.PORT || 3001);

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
			return res.status(200).json(projects);
		})
		.catch(() => res.sendStatus(500));
});

app.get('/api/v1/palettes', (req, res) => {
	db('palettes')
		.select()
		.then(palettes => {
			if (!palettes.length) {
				return res.status(200).send('No data found in "palettes" database.');
			}
			return res.status(200).json(palettes);
		})
		.catch(() => res.sendStatus(500));
});

app.get('/api/v1/projects/:id', (req, res) => {
	const id = parseInt(req.params.id);
	db('projects')
		.where({ id })
		.first()
		.then(project => {
			if (!project) {
				return res.status(404).send(`No entry found in "projects" with id of ${id}.`);
			}
			return res.status(200).json(project);
		})
		.catch(() => res.sendStatus(500));
});

app.get('/api/v1/palettes/:id', (req, res) => {
	const id = parseInt(req.params.id);
	db('palettes')
		.where({ id })
		.first()
		.then(palette => {
			if (!palette) {
				return res.status(404).send(`No entry found in "palettes" with id of ${id}.`);
			}
			return res.status(200).json(palette);
		})
		.catch(() => res.sendStatus(500));
});

app.put('/api/v1/palettes/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const palette = req.body;
	const required = ['name', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5'];

	for (let param of required) {
		if (!palette[param]) {
			return res
				.status(422)
				.send(
					`Expected format: { name: <String>, color_1: <String>, ... , color_5: <String>}. You are missing the ${param} parameter.`
				);
		}
	}

	const paletteToUpdate = db('palettes')
		.where({ id })
		.first();

	if (!paletteToUpdate) {
		return res.status(404).send(`No entry found in "palettes" with id of ${id} to update.`);
	}

	db('palettes')
		.where({ id })
		.update(palette)
		.then(() => res.status(200).send(`Palette ${id} successfully updated.`))
		.catch(() => res.sendStatus(500));
});

app.delete('/api/v1/palettes/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const palette = db('palettes')
		.where({ id })
		.first();

	if (!palette) {
		return res.status(200).send(`No entry found in "palettes" with id of ${id} to delete.`);
	}

	db('palettes')
		.where({ id })
		.del()
		.then(() => res.status(204).send(`Palette ${id} successfully deleted.`))
		.catch(() => res.sendStaus(500));
});

app.listen(app.get('port'), console.log(`Listening on port ${app.get('port')}.`));

module.exports = app;
