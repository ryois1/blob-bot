const mysql = require('mysql');

module.exports = (config, client) => {
	const pool = mysql.createPool({
		host: config.MYSQL_HOST,
		user: config.MYSQL_USER,
		password: config.MYSQL_PASSWORD,
		database: config.MYSQL_DATABASE,
		connectionLimit: 10,
	});
	pool.getConnection(function(err) {
		if (err) {
			client.logger.error('Error error connecting to database.', err);
			throw err;
		}
		client.logger.success('Connected to database.');
	});
	return pool;
};