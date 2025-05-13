import { Router } from 'express';
import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
} from '../controllers/contacts.controllers.js';
import autenticarToken from '../middleware/autenticarToken.js';

const router = Router();

router.post('/', autenticarToken, createContact);

router.get('/', autenticarToken, getContacts);

router.get('/:id', autenticarToken, getContact);

router.put('/:id', autenticarToken, updateContact);

router.delete('/:id', autenticarToken, deleteContact);

export default router;
