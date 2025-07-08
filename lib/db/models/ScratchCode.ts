import mongoose from 'mongoose';

const ScratchCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    isUsed: { type: Boolean, default: false },
    usedAt: { type: Date, default: null }, // ✅ Used for verification timestamp
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

export default mongoose.models.ScratchCode || mongoose.model('ScratchCode', ScratchCodeSchema);
