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
			expect(projects).toEqual(expected);
		});
	});

	describe('GET /api/v1/palettes', () => {
		it('should return all palettes from the db', async () => {
			const expected = await db('palettes').select();
			const res = await request(app).get('/api/v1/palettes');
			const palettes = res.body;
			expect(palettes).toEqual(expected);
		});
	});

	describe('GET /api/v1/projects/:id', () => {
		it('should return a project with matching id', async () => {
			const expected = await db('projects').first();
			const id = expected.id;
			const res = await request(app).get(`/api/v1/projects/${id}`);
			const project = res.body;
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
			expect(palette).toEqual(expected);
		});
		
		it('should return a 404 error if no palette found', async () => {
			const res = await request(app).get('/api/v1/palettes/9999');
			expect(res.status).toEqual(404);
			expect(res.text).toEqual('No entry found in "palettes" with id of 9999.');
		});
	});
});
