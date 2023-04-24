exports.up = async function (knex) {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS file_archive_del (
      id_arch_filarchdel SERIAL,
      date_arch_filarchdel timestamp(6) with time zone NOT NULL,
      id_user_arch_filarchdel bigint NOT NULL,
      file_id_filarchdel bigint NOT NULL,
      CONSTRAINT file_archive_pkey PRIMARY KEY (id_arch_filarchdel) 
    );
  `)
}

exports.down = async function (knex) {
  await knex.raw(`
    DROP TABLE IF EXISTS file_archive_del;
  `)
}
