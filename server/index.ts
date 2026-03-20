import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, initDb } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Configuração para salvar uploads em /uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

// Inicializa banco
initDb()
  .then(() => {
    console.log('Banco inicializado');
  })
  .catch((err) => {
    console.error('Erro ao inicializar banco', err);
  });

// Autenticação simplificada: login/cadastro por email
app.post('/api/auth/login', async (req, res) => {
  const { name, email, avatarUrl } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Nome e e-mail são obrigatórios' });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO users (name, email, avatar_url)
      VALUES ($1, $2, $3)
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        avatar_url = EXCLUDED.avatar_url
      RETURNING *;
    `,
      [name, email, avatarUrl || null],
    );
    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao autenticar usuário' });
  }
});

// Upload de avatar do usuário
app.post('/api/user/avatar', upload.single('avatar'), async (req, res) => {
  try {
    const { email } = req.body;
    const file = req.file;

    if (!email || !file) {
      return res.status(400).json({ error: 'E-mail e arquivo são obrigatórios' });
    }

    const avatarUrl = `/uploads/${file.filename}`;

    const result = await pool.query(
      `
      UPDATE users
      SET avatar_url = $1
      WHERE email = $2
      RETURNING *;
    `,
      [avatarUrl, email],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao enviar avatar' });
  }
});

// Usuário logado (primeiro registro só para simplificar)
app.get('/api/user', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users LIMIT 1');
    if (result.rows.length === 0) {
      return res.json(null);
    }
    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

app.post('/api/user', async (req, res) => {
  const { name, email, cycleLength, periodLength, lastMenstruation } = req.body;
  try {
    const result = await pool.query(
      `
      INSERT INTO users (name, email, cycle_length, period_length, last_menstruation)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        cycle_length = EXCLUDED.cycle_length,
        period_length = EXCLUDED.period_length,
        last_menstruation = EXCLUDED.last_menstruation
      RETURNING *
    `,
      [name, email, cycleLength, periodLength, lastMenstruation || null],
    );
    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao salvar usuário' });
  }
});

// Categorias e conteúdos
app.get('/api/categories', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao listar categorias' });
  }
});

app.post('/api/categories', async (req, res) => {
  const { id, name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO categories (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name RETURNING *',
      [id, name],
    );
    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao salvar categoria' });
  }
});

app.get('/api/contents', async (req, res) => {
  const { categoryId } = req.query;
  try {
    const params: any[] = [];
    let query = 'SELECT * FROM contents';
    if (categoryId) {
      query += ' WHERE category_id = $1';
      params.push(categoryId);
    }
    query += ' ORDER BY id DESC';
    const result = await pool.query(query, params);
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao listar conteúdos' });
  }
});

app.post('/api/contents', async (req, res) => {
  const { categoryId, title, summary, text } = req.body;
  try {
    const result = await pool.query(
      `
      INSERT INTO contents (category_id, title, summary, text)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
      [categoryId, title, summary, text],
    );
    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar conteúdo' });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});

