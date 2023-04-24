exports.up = async function (knex) {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS file_owner (
      id_owner_filown SERIAL,
      id_user_filown integer NOT NULL,
      id_file_filown integer NOT NULL,
      CONSTRAINT owners_pkey PRIMARY KEY (id_owner_filown),
      FOREIGN KEY (id_file_filown) REFERENCES files (id_file) ON UPDATE NO ACTION ON DELETE NO ACTION,
      FOREIGN KEY (id_user_filown) REFERENCES appusers (id) ON UPDATE NO ACTION ON DELETE NO ACTION
    );
  `)
}

exports.down = async function (knex) {
  await knex.raw(`
    DROP TABLE IF EXISTS file_owner;
  `)
}
