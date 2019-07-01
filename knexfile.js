module.exports = {
	development: {
		client: 'pg',
		connection: 'postgress://localhost/paintbrush',
		migrations: {
			directory: './db/migrations'
		},
		seeds: {
			directory: './db/seeds/dev'
		},
		useNullAsDefault: true
	}
};
