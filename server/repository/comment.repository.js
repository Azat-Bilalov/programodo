const db = require('./db');

class CommentRepository {
    async getAll() {
        return await db.any('SELECT * FROM comment');
    }

    async getById(id) {
        return await db.oneOrNone('SELECT * FROM comment WHERE id = $1', id);
    }

    async getByProductId(id) {
        // убрать это
        const comments = await db.any('SELECT * FROM comment WHERE productClient in (SELECT id FROM productClient WHERE product = $1)', id);
        await Promise.all(comments.map(async (comment) => {
            console.log(comment);
            comment.client = await db.oneOrNone('SELECT * FROM client WHERE id in (SELECT client FROM productClient WHERE id = $1)', comment.productclient);
        }));

        return comments;

    }

    async getByClientId(id) {
        // убрать это
        const comments = await db.any('SELECT * FROM comment WHERE productClient in (SELECT id FROM productClient WHERE client = $1)', id);
        await Promise.all(comments.map(async (comment) => {
            console.log(comment);
            comment.product = await db.oneOrNone('SELECT * FROM product WHERE id in (SELECT product FROM productClient WHERE id = $1)', comment.productclient);
        }));

        return comments;
    }

    async _getProductClientId(client, product) {
       return await db.oneOrNone('SELECT id FROM productClient WHERE client = $1 AND product = $2', [client, product]); 
    }

    async create(comment) {
        const { text, client, product } = comment;
        return await db.one(
            'INSERT INTO comment(text, productClient) VALUES($1, (SELECT id FROM productClient WHERE client = $2 AND product = $3)) RETURNING *',
            [text, client, product]
        );
    }

    async update(id, comment) {
        const { text, client, product } = comment;
        return await db.one(
            'UPDATE comment SET text = $1, productClient = (SELECT id FROM productClient WHERE client = $2 AND product = $3) WHERE id = $4 RETURNING *',
            [text, client, product, id]
        );
    }

    async delete(id) {
        return await db.none('DELETE FROM comment WHERE id = $1', id);
    }
}

module.exports = new CommentRepository();
