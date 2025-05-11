import mongoose from 'mongoose';

const parkingSlotSchema = new mongoose.Schema({
  slotNumber: {
    type: Number,
    required: true,
    unique: true
  },
  isOccupied: {
    type: Boolean,
    default: false
  },
  vehicleNumber: {
    type: String,
    default: null
  },
  bookedAt: {
    type: Date,
    default: null
  },
  bookedUntil: {
    type: Date,
    default: null
  }
}, { timestamps: true });

const ParkingSlot = mongoose.model('ParkingSlot', parkingSlotSchema);

export default ParkingSlot;