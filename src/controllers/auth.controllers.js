import bcrypt from 'bcryptjs';
import db from '../firebase.js';
import jwt from 'jsonwebtoken';

const claveSecreta = process.env.JWT_SECRET || 'mi_secreto_super_seguro';

export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const response = await db
      .collection('users')
      .add({ email, password: hash, name });
    const doc = await response.get();
    res.status(201).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (snapshot.empty) {
      return res.sendStatus(404);
    }

    const doc = snapshot.docs[0];
    const user = doc.data();

    const coincide = await bcrypt.compare(password, user.password);

    if (!coincide) {
      return res.status(401).json({ message: 'Credenciales invalidas' });
    }

    const token = jwt.sign({ id: doc.id }, claveSecreta, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.usuario;
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.sendStatus(404);
    }

    res.json({ id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
