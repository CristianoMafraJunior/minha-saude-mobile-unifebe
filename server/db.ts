import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString =
  process.env.DATABASE_URL ||
  'postgres://postgres:cris1515A@localhost:5432/db-curricular';

export const pool = new Pool({
  connectionString,
});

export async function initDb() {
  // Criação simples das tabelas se não existirem + seed inicial
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      cycle_length INTEGER,
      period_length INTEGER,
      last_menstruation DATE,
      avatar_url TEXT
    );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contents (
      id SERIAL PRIMARY KEY,
      category_id TEXT REFERENCES categories(id),
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      text TEXT NOT NULL
    );
  `);

  // Seed de categorias básicas
  await pool.query(
    `
    INSERT INTO categories (id, name) VALUES
      ('menstruacao', 'Menstruação'),
      ('contracepcao', 'Contracepção'),
      ('prevencao', 'Prevenção'),
      ('bem-estar', 'Bem-estar')
    ON CONFLICT (id) DO NOTHING;
  `,
  );

  // Seed de conteúdos iniciais se a tabela estiver vazia
  const contentsCount = await pool.query('SELECT COUNT(*)::int AS count FROM contents');
  if (contentsCount.rows[0].count === 0) {
    await pool.query(
      `
      INSERT INTO contents (category_id, title, summary, text)
      VALUES
        (
          'menstruacao',
          'Corrimento Vaginal: O que é normal?',
          'Entenda as variações do muco ao longo do ciclo.',
          'Durante o ciclo da mulher, o muco pode apresentar características diferentes. O muco fisiológico é transparente ou claro, sem odor e não causa coceira. No período fértil, torna-se elástico e lubrificante, semelhante a clara de ovo.'
        ),
        (
          'menstruacao',
          'Cólica: Como aliviar?',
          'Dicas para lidar com a dor menstrual em casa.',
          'A cólica é uma dor na parte de baixo da barriga, comum em jovens após a menarca. Se a dor for muito forte ou acompanhada de febre, procure uma unidade de saúde.'
        );
    `,
    );
  }
}

