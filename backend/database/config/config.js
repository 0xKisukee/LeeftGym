module.exports = {
    "development": {
        "dialect": "postgres",
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "logging": false,
        "migrationStorageTableName": "migrations",
    },
    "test": {
        "dialect": "postgres",
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "logging": false,
        "migrationStorageTableName": "migrations",
    },
    "production": {
        "dialect": "postgres",
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "logging": false,
        "migrationStorageTableName": "migrations",
    }
}