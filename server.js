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

app.post('/api/v1/palettes', (req, res) => {
	const palette = req.body;
	const required = [ 'name', 'project_id', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5' ];
	for (let param of required) {
		if (!palette[param]) {
			return res
				.status(422)
				.send(
					`Expected format: { name: <String>, project_id: <Number>, color_1: <String>, ... , color_5: <String>}. You are missing the ${param} parameter.`
				);
		}
	}
	db('palettes').insert(palette).then(() => res.sendStatus(201)).catch(() => res.sendStatus(500));
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

app.post('/api/v1/projects', (request, response) => {
	const project = request.body;
	const format = [ 'name', 'id' ];
	for (let requiredParam of format) {
		if (!project[requiredParam] && !project[requiredParam] === '') {
			return response.status(422).send({
				error: `Expected format: ${format}. You are missing ${requiredParam}.`
			});
		}
	}

	db('projects')
		.insert(project, '*')
		.then(project => {
			response.status(201).json(project[0]);
		})
		.catch(error => {
			response.status(500).json({ error });
		});
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
	const paletteData = req.body;
	const required = [ 'name', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5' ];

	for (let param of required) {
		if (!paletteData[param]) {
			return res
				.status(422)
				.send(
					`Expected format: { name: <String>, color_1: <String>, ... , color_5: <String>}. You are missing the ${param} parameter.`
				);
		}
	}

	db('palettes')
		.where({ id })
		.first()
		.then(palette => {
			if (!palette) {
				return res.status(404).send(`No entry found in "palettes" with id of ${id} to update.`);
			}

			db('palettes')
				.where({ id })
				.update(paletteData)
				.then(() => res.status(200).send(`Palette ${id} successfully updated.`))
				.catch(() => res.sendStatus(500));
		})
		.catch(() => res.sendStatus(500));
});

// !
app.put('/api/v1/projects/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const projectData = req.body;
	const required = [ 'name', 'id' ];

	for (let param of required) {
		if (!projectData[param]) {
			return res
				.status(422)
				.send(`Expected format: { name: <String>, id: <number>}. You are missing the ${param} parameter.`);
		}
	}

	db('projects')
		.where({ id })
		.first()
		.then(palette => {
			if (!palette) {
				return res.status(404).send(`No entry found in "projects" with id of ${id} to update.`);
			}

			db('projects')
				.where({ id })
				.update(projectData)
				.then(() => res.status(200).send(`ProjectData ${id} successfully updated.`))
				.catch(() => res.sendStatus(500));
		})
		.catch(() => res.sendStatus(500));
});

app.delete('/api/v1/palettes/:id', (req, res) => {
	const id = parseInt(req.params.id);
	db('palettes')
		.where({ id })
		.first()
		.then(palette => {
			if (!palette) {
				return res.status(200).send(`No entry found in "palettes" with id of ${id} to delete.`);
			}

			db('palettes')
				.where({ id })
				.del()
				.then(() => res.status(200).send(`Palette ${id} successfully deleted.`))
				.catch(() => res.sendStatus(500));
		})
		.catch(() => res.sendStatus(500));
});

// !
app.delete('/api/v1/projects/:id', (req, res) => {
	const id = parseInt(req.params.id);
	db('projects')
		.where({ id })
		.first()
		.then(project => {
			if (!project) {
				return res.status(200).send(`No entry found in "projects" with id of ${id} to delete.`);
			}
			db('projects')
				.where({ id })
				.del()
				.then(
					db('palettes')
						.where({ id })
						.del()
						.then(() =>
							res.status(200).send(`Project and associated palettes with id: ${id} have been successfully deleted.`)
						)
						.catch(() => res.sendStatus(500))
				);
		})
		.catch(() => res.sendStatus(500));
});

app.listen(app.get('port'), console.log(`Listening on port ${app.get('port')}.`));

module.exports = app;
