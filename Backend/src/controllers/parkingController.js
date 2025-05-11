import ParkingSlot from '../models/ParkingSlot.js';

// Initialize parking slots (run this once)
export const initializeSlots = async (req, res) => {
  try {
    // Check if slots already exist
    const existingSlots = await ParkingSlot.countDocuments();
    if (existingSlots > 0) {
      return res.status(400).json({ message: 'Slots already initialized' });
    }

    // Create 20 parking slots
    const slots = [];
    for (let i = 1; i <= 20; i++) {
      slots.push({ slotNumber: i });
    }

    await ParkingSlot.insertMany(slots);
    res.status(201).json({ message: '20 parking slots initialized' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all parking slots
export const getAllSlots = async (req, res) => {
  try {
    const slots = await ParkingSlot.find().sort('slotNumber');
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Book a parking slot
export const bookSlot = async (req, res) => {
  try {
    const { slotId, vehicleNumber, duration } = req.body;

    // Check if slot exists and is available
    const slot = await ParkingSlot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (slot.isOccupied) {
      return res.status(400).json({ message: 'Slot is already occupied' });
    }

    // Calculate booking time
    const now = new Date();
    const bookedUntil = new Date(now.getTime() + duration * 60 * 60 * 1000);

    // Update slot
    slot.isOccupied = true;
    slot.vehicleNumber = vehicleNumber;
    slot.bookedAt = now;
    slot.bookedUntil = bookedUntil;

    await slot.save();
    res.json(slot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Free a parking slot
export const freeSlot = async (req, res) => {
  try {
    const { slotId } = req.body;

    const slot = await ParkingSlot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (!slot.isOccupied) {
      return res.status(400).json({ message: 'Slot is already free' });
    }

    // Reset slot
    slot.isOccupied = false;
    slot.vehicleNumber = null;
    slot.bookedAt = null;
    slot.bookedUntil = null;

    await slot.save();
    res.json(slot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};