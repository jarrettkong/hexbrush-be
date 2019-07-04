const app = require('./server');
const request = require('supertest');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);

describe('Server', () => {
	beforeEach(async () => {
		await db.seed.run();
	});

	describe('init', () => {
		it('should return a 200 status', async () => {
			const res = await request(app).get('/');
			expect(res.status).toBe(200);
		});
	});

	describe('GET /api/v1/projects', () => {
		it('should return all projects from the db', async () => {
			const expected = await db('projects').select();
			const res = await request(app).get('/api/v1/projects');
			const projects = res.body;

			expected.forEach(e => {
				e.created_at = e.created_at.toJSON();
				e.updated_at = e.updated_at.toJSON();
			});

			expect(projects).toEqual(expected);
		});
	});

	describe('GET /api/v1/palettes', () => {
		it('should return all palettes from the db', async () => {
			const expected = await db('palettes').select();
			const res = await request(app).get('/api/v1/palettes');
			const palettes = res.body;

			expected.forEach(e => {
				e.created_at = e.created_at.toJSON();
				e.updated_at = e.updated_at.toJSON();
			});

			expect(palettes).toEqual(expected);
		});
	});

	describe('GET /api/v1/projects/:id', () => {
		it('should return a project with matching id', async () => {
			const expected = await db('projects').first();
			const id = expected.id;
			const res = await request(app).get(`/api/v1/projects/${id}`);
			const project = res.body;

			expected.created_at = expected.created_at.toJSON();
			expected.updated_at = expected.updated_at.toJSON();

			expect(project).toEqual(expected);
		});

		it('should return a 404 error if no project found', async () => {
			const res = await request(app).get('/api/v1/projects/9999');
			expect(res.status).toEqual(404);
			expect(res.text).toEqual('No entry found in "projects" with id of 9999.');
		});
	});

	describe('GET /api/v1/palettes/:id', () => {
		it('should return a palettes with matching id', async () => {
			const expected = await db('palettes').first();
			const id = expected.id;
			const res = await request(app).get(`/api/v1/palettes/${id}`);
			const palette = res.body;

			expected.created_at = expected.created_at.toJSON();
			expected.updated_at = expected.updated_at.toJSON();

			expect(palette).toEqual(expected);
		});

		it('should return a 404 error if no palette found', async () => {
			const res = await request(app).get('/api/v1/palettes/9999');
			expect(res.status).toEqual(404);
			expect(res.text).toEqual('No entry found in "palettes" with id of 9999.');
		});
	});

	describe('PUT /api/v1/palettes/:id', () => {
		it('should update a palette with matching id', async () => {
			const query = await db('palettes')
				.select()
				.first();
			console.log(query);
			const id = query.id;
			const body = {
				name: 'My Palette',
				color_1: '#ffffff',
				color_2: '#ffffff',
				color_3: '#000000',
				color_4: '#ffffff',
				color_5: '#ffffff'
			};
			const res = await request(app)
				.put(`/api/v1/palettes/${id}`)
				.send(body);
			// expect(res.status).toEqual(200);
			expect(res.text).toEqual(`Palette ${id} successfully updated.`);
		});
	});
});
