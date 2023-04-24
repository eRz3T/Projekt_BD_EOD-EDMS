exports.up = async function (knex) {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS documents (
      id_document SERIAL PRIMARY KEY,
      id_user_document bigint NOT NULL,
      title_document varchar(100) NOT NULL,
      note_document varchar(1000),
      date_document timestamp(6) with time zone NOT NULL,
      id_file_document bigint
    );
  `)
}

exports.down = async function (knex) {
  await knex.raw('DROP TABLE IF EXISTS documents')
}
