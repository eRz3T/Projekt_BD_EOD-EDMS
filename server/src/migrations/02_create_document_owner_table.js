exports.up = function (knex) {
  return knex.raw(`
    CREATE TABLE IF NOT EXISTS document_owner
    (
        id_owner_docown SERIAL, 
        id_document_docown bigint NOT NULL, 
        id_user_docown bigint NOT NULL,
        CONSTRAINT document_owner_pkey PRIMARY KEY (id_owner_docown)
    );
  `)
}

exports.down = function (knex) {
  return knex.raw(`
    DROP TABLE IF EXISTS document_owner;
  `)
}
