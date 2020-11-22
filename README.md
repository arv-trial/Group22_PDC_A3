# Instruction

## Create database
Use `docs/scripts/arvtrials.sql` to create a localhost database

## Config database connection string
In `configs/db.config.json`, do modify 2 fields:
```json
{
  "dbConfig": {
    "connectionLimit": 100,
    "host": "localhost",
    "port": 3306,
    "user": "root", // your database user
    "password": "root", // your database password
    "database": "arvtrials"
  }
}
```

## Run code
```bash
# Install needed dependencies
$ npm i

# Run in you localhost
$ npm start
```
To test server, in browser's URL bar, enter: `http://localhost:8080/drug`, you should see a list of drug