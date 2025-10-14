import express from 'express';
import {
  getSettings,
  saveSettings,
  updateSettings
} from '../controllers/settingsController.js';

const router = express.Router();


router.get('/settings', getSettings);


router.post('/settings', saveSettings);


router.patch('/settings', updateSettings);

export default router;

