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
});
