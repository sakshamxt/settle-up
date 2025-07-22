import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  split: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      trim: true,
    },
    amountOwed: {
      type: Number,
      required: true,
      min: 0,
      trim: true,
    },
    isSettled: {
      type: Boolean,
      default: false,
      trim: true,
    }
  }],
  receiptImage: {
    type: String, // URL to the receipt image in S3
    required: false,
    trim: true
  }
}, {
  timestamps: true,
});

const Expense = mongoose.model('Expense', ExpenseSchema);

export default Expense;