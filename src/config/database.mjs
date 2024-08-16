// this uses pg 
// https://tembo.io/docs/getting-started/postgres_guides/connecting-to-postgres-with-nodejs


const { Client } = require('pg');

const client = new Client({
	user: 'username',
	password: 'password',
	host: 'host',
	port: 'port_number',
	database: 'database_name',
});

// connection to database example
client.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});

    // select query example
    client.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.error('Error executing query', err);
        } else {
            console.log('Query result:', result.rows);
        }
    });

    // insert into database example
    client.connect()
	.then(() => {
		const insert =
			'INSERT INTO employees(column1, column2) VALUES (value1, value2)';
		const values = ['value1', 'value2'];

		client.query(insert, values, (err, result) => {
			if (err) {
				console.error('Error inserting data', err);
			} else {
				console.log('Data inserted successfully');
			}

			client.end();
		});
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});


    // close connection
    client.end()
	.then(() => {
		console.log('Connection to PostgreSQL closed');
	})
	.catch((err) => {
		console.error('Error closing connection', err);
	});
