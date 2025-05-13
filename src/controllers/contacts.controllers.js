import db from '../firebase.js';

export const createContact = async (req, res) => {
  try {
    const { username, phone, email } = req.body;
    const response = await db
      .collection('contacts')
      .add({ username, phone, email });
    const doc = await response.get();
    res.status(201).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contactsRef = db.collection('contacts');
    const snapshot = await contactsRef.get();
    const contacts = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contactRef = db.collection('contacts').doc(id);
    const doc = await contactRef.get();
    if (!doc.exists) {
      return res.sendStatus(404);
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, phone, email } = req.body;
    const contactRef = db.collection('contacts').doc(id);
    await contactRef.update({ username, phone, email });
    const doc = await contactRef.get();
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('contacts').doc(id).delete();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
