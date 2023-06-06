require("dotenv").config();

const {Pool} = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});

module.exports = { pool }

// Linijka 1: require("dotenv").config(); importuje bibliotekę dotenv, która pozwala
//  na korzystanie z pliku .env w celu przechowywania poufnych informacji takich 
//  jak dane uwierzytelniające bazy danych.

// Linijka 3: const {Pool} = require("pg"); importuje klasę Pool z biblioteki pg,
//  która służy do tworzenia puli połączeń z bazą danych.

// Linijka 5: const isProduction = process.env.NODE_ENV === "production"; ustala
//  wartość zmiennej isProduction na podstawie zmiennej środowiskowej NODE_ENV. 
//  Jeśli zmienna ta ma wartość "production", zmienna isProduction przyjmuje 
//  wartość true.

// Linijka 7: const connectionString = postgresql:
//${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}
// :${process.env.DB_PORT}/${process.env.DB_DATABASE}`` tworzy ciąg tekstowy 
// zawierający dane niezbędne do połączenia z bazą danych. Dane te pobierane 
// są z pliku .env, a dokładniej zmiennych DB_USER, DB_PASSWORD, DB_HOST, DB_PORT 
// i DB_DATABASE.

// Linijka 9-13: const pool = new Pool({ ... }) tworzy nowy obiekt Pool, 
// który służy do zarządzania pulą połączeń z bazą danych. Obiekt ten przyjmuje 
// jeden argument, który jest obiektem konfiguracyjnym. W tym przypadku argumentem 
// jest obiekt z jednym polem connectionString, którego wartość zależy od wartości 
// zmiennej isProduction. Jeśli isProduction jest ustawione na true, wartość 
// pola connectionString pobierana jest z zmiennej środowiskowej DATABASE_URL,
//  w przeciwnym wypadku wartość pola connectionString przyjmuje wartość zmiennej
//   connectionString utworzonej wcześniej.

// Linijka 15: module.exports = { pool } eksportuje obiekt z polem pool, który
//  zawiera instancję klasy Pool i może być importowany do innych plików w celu 
//  nawiązania połączenia z bazą danych.