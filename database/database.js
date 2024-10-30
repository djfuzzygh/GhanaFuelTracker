import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('fueltracker.db');

export const initDatabase = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS expenses (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    amount DECIMAL(10,2) NOT NULL,
                    liters DECIMAL(10,2),
                    fuelType TEXT,
                    station TEXT,
                    timestamp INTEGER,
                    latitude DECIMAL(10,8),
                    longitude DECIMAL(10,8),
                    synced INTEGER DEFAULT 0
                )`,
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const saveExpense = (expense) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO expenses (amount, liters, fuelType, station, timestamp, latitude, longitude)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    expense.amount,
                    expense.liters,
                    expense.fuelType,
                    expense.station,
                    expense.timestamp,
                    expense.latitude,
                    expense.longitude
                ],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
};