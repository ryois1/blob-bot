module.exports = function(config) {
	const mysql = require('mysql');
	const pool = mysql.createPool({
		host: config.MYSQL_HOST,
		user: config.MYSQL_USER,
		password: config.MYSQL_PASSWORD,
		database: config.MYSQL_DATABASE,
		connectionLimit: 10,
	});
	pool.getConnection(function(err) {
		if (err) throw err;
		console.log('Connected to database.');
	});
	return pool;
};