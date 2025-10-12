import { sql } from "../config/db.js";

// CREATE - Add new transaction
export const createTransaction = async (req, res) => {
  try {
    const {
      transaction_id,
      recipient_name,
      date,
      description,
      type,
      amount,
      currency = 'USD',
      status = 'pending',
      created_by = 'admin'
    } = req.body;

    // Validation
    if (!transaction_id || !recipient_name || !date || !type || !amount) {
      return res.status(400).json({
        error: 'Missing required fields: transaction_id, recipient_name, date, type, amount'
      });
    }

    if (!['debit', 'credit'].includes(type)) {
      return res.status(400).json({
        error: 'Type must be either "debit" or "credit"'
      });
    }

    const result = await sql`
      INSERT INTO elavon_transactions (
        transaction_id, recipient_name, date, description, type, 
        amount, currency, status, created_by
      )
      VALUES (
        ${transaction_id}, ${recipient_name}, ${date}, ${description}, 
        ${type}, ${amount}, ${currency}, ${status}, ${created_by}
      )
      RETURNING *
    `;

    res.status(201).json({
      message: 'Transaction created successfully',
      data: result[0]
    });
  } catch (error) {
    console.error('Create error:', error);
    if (error.code === '23505') {
      res.status(409).json({ error: 'Transaction ID already exists' });
    } else {
      res.status(500).json({ error: 'Failed to create transaction', details: error.message });
    }
  }
};

// READ - Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const { status, type, limit = 100, offset = 0 } = req.query;

    const transactions = await sql`
      SELECT * FROM elavon_transactions 
      ${status ? sql`WHERE status = ${status}` : sql``}
      ${type ? (status ? sql`AND type = ${type}` : sql`WHERE type = ${type}`) : sql``}
      ORDER BY date DESC 
      LIMIT ${parseInt(limit)} 
      OFFSET ${parseInt(offset)}
    `;

    res.json({
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    console.error('Read error:', error);
    res.status(500).json({ error: 'Failed to fetch transactions', details: error.message });
  }
};

// READ - Get single transaction by transaction_id
export const getTransactionById = async (req, res) => {
  try {
    const { transaction_id } = req.params;

    const result = await sql`
      SELECT * FROM elavon_transactions 
      WHERE transaction_id = ${transaction_id}
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({
      data: result[0]
    });
  } catch (error) {
    console.error('Read single error:', error);
    res.status(500).json({ error: 'Failed to fetch transaction', details: error.message });
  }
};

// UPDATE - Edit transaction (PUT)
export const updateTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const {
      recipient_name,
      date,
      description,
      type,
      amount,
      currency,
      status
    } = req.body;

    // Check if transaction exists
    const existing = await sql`
      SELECT * FROM elavon_transactions 
      WHERE transaction_id = ${transaction_id}
    `;

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Validate type if provided
    if (type && !['debit', 'credit'].includes(type)) {
      return res.status(400).json({
        error: 'Type must be either "debit" or "credit"'
      });
    }

    const result = await sql`
      UPDATE elavon_transactions 
      SET 
        recipient_name = COALESCE(${recipient_name}, recipient_name),
        date = COALESCE(${date}, date),
        description = COALESCE(${description}, description),
        type = COALESCE(${type}, type),
        amount = COALESCE(${amount}, amount),
        currency = COALESCE(${currency}, currency),
        status = COALESCE(${status}, status),
        updated_at = NOW()
      WHERE transaction_id = ${transaction_id}
      RETURNING *
    `;

    res.json({
      message: 'Transaction updated successfully',
      data: result[0]
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update transaction', details: error.message });
  }
};

// PATCH - Partial update transaction
export const patchTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const updates = req.body;

    // Check if transaction exists
    const existing = await sql`
      SELECT * FROM elavon_transactions 
      WHERE transaction_id = ${transaction_id}
    `;

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Validate type if provided
    if (updates.type && !['debit', 'credit'].includes(updates.type)) {
      return res.status(400).json({
        error: 'Type must be either "debit" or "credit"'
      });
    }

    const result = await sql`
      UPDATE elavon_transactions 
      SET 
        recipient_name = COALESCE(${updates.recipient_name}, recipient_name),
        date = COALESCE(${updates.date}, date),
        description = COALESCE(${updates.description}, description),
        type = COALESCE(${updates.type}, type),
        amount = COALESCE(${updates.amount}, amount),
        currency = COALESCE(${updates.currency}, currency),
        status = COALESCE(${updates.status}, status),
        updated_at = NOW()
      WHERE transaction_id = ${transaction_id}
      RETURNING *
    `;

    res.json({
      message: 'Transaction updated successfully',
      data: result[0]
    });
  } catch (error) {
    console.error('Patch error:', error);
    res.status(500).json({ error: 'Failed to update transaction', details: error.message });
  }
};

// DELETE - Remove transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params;

    const result = await sql`
      DELETE FROM elavon_transactions 
      WHERE transaction_id = ${transaction_id}
      RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({
      message: 'Transaction deleted successfully',
      data: result[0]
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete transaction', details: error.message });
  }
};