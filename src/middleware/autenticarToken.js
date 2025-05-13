import jwt from 'jsonwebtoken';

const claveSecreta = process.env.JWT_SECRET || 'mi_secreto_super_seguro';

const autenticarToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const usuario = await new Promise((resolve, reject) => {
      jwt.verify(token, claveSecreta, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

export default autenticarToken;
