import express from 'express';
import {
  initializeSlots,
  getAllSlots,
  bookSlot,
  freeSlot
} from '../controllers/parkingController.js';

const router = express.Router();

// Initialize parking slots (one-time operation)
router.post('/initialize', initializeSlots);

// Get all parking slots
router.get('/slots', getAllSlots);

// Book a parking slot
router.post('/book', bookSlot);

// Free a parking slot
router.post('/free', freeSlot);

export default router;