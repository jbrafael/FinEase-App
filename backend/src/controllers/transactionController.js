const db = require('../config/db');
const MOCKED_USER_ID = 1;

exports.getTransactions = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC', [MOCKED_USER_ID]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.createTransaction = async (req, res) => {
    const { description, amount, type, category, date } = req.body;

    if (!description || !amount || !type || !date) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
    }

    try {
        await db.execute(
            'INSERT INTO transactions (user_id, description, amount, type, category, date) VALUES (?, ?, ?, ?, ?, ?)',
            [MOCKED_USER_ID, description, amount, type, category, date]
        );
        res.status(201).json({ message: 'Transação criada com sucesso!' });
    } catch (error) {
        console.error('Erro ao criar transação:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { description, amount, type, category, date } = req.body;

    if (!description || !amount || !type || !date) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
    }

    try {
        const [result] = await db.execute(
            'UPDATE transactions SET description = ?, amount = ?, type = ?, category = ?, date = ? WHERE id = ? AND user_id = ?',
            [description, amount, type, category, date, id, MOCKED_USER_ID]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Transação não encontrada ou você não tem permissão para editá-la.' });
        }

        res.status(200).json({ message: 'Transação atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar transação:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute('DELETE FROM transactions WHERE id = ? AND user_id = ?', [id, MOCKED_USER_ID]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Transação não encontrada ou você não tem permissão para deletá-la.' });
        }

        res.status(200).json({ message: 'Transação deletada com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar transação:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};