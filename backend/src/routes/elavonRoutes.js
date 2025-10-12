import express from 'express';
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  patchTransaction,
  deleteTransaction
} from "../controllers/elavonController.js";

const router = express.Router();


router.post('/transactions', createTransaction);


router.get('/transactions', getAllTransactions);


router.get('/transactions/:transaction_id', getTransactionById);


router.put('/transactions/:transaction_id', updateTransaction);


router.patch('/transactions/:transaction_id', patchTransaction);


router.delete('/transactions/:transaction_id', deleteTransaction);

export default router;