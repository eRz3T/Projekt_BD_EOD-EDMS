exports.up = function (knex) {
  return knex.raw(`
    CREATE TABLE IF NOT EXISTS files 
    (
        id_file BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name_file CHARACTER VARYING(100) NOT NULL,
        hashed_name_file CHARACTER VARYING(300) NOT NULL,
        upload_timestamp TIMESTAMP(6) WITH TIME ZONE NOT NULL,
        size_file BIGINT NOT NULL,
        type_file CHARACTER VARYING(10) NOT NULL
    );
  `)
}

exports.down = function (knex) {
  return knex.raw(`
    DROP TABLE IF EXISTS files;
  `)
}
