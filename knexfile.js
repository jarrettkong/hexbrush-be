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
	},
	test: {
    client: 'pg',
    connection: 'postgres://localhost/paintbrush_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true,
  }
};
