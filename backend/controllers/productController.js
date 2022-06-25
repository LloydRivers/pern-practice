module.exports = {
    getProducts: async(req, res) => {
        const db = req.app.get('db');
        try {
            const products = await db.products.find();
            res.status(200).send(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getSpecificProduct: async(req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        try {
            const product = await db.products.findOne(id);
            res.status(200).send(product);
        } catch (error) {
            console.log(error);
        }
    },
    createProduct: async(req, res) => {
        const db = req.app.get('db');
        const { name, price, image, category, description, rating } = req.body;

        try {
            await db.products.insert({
                name,
                price,
                description,
                category,
                image,
                rating,
            });
            res.status(200).send({ status: 'success', msg: 'Product created' });
        } catch (error) {
            console.log(error);
        }
    },
    deleteProduct: async(req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        try {
            // {productid in this case is the primary key of this table but in other
            // tables it could be the specific primary key of the table }
            await db.products.destroy({ productid: id });
            res.status(200).send({ status: 'success', msg: 'Product deleted' });
        } catch (error) {
            console.log(error);
        }
    },
    updateProduct: async(req, res) => {
        const db = req.app.get('db');
        const { name, price, image, category, description, rating } = req.body;
        const { id } = req.params;

        try {
            // {productid in this case is the primary key of this table but in other
            // tables it could be the specific primary key of the table
            // this primary key is the value the function will use to find the product
            // to update }
            await db.products.update({
                productid: id,
                name,
                price,
                description,
                category,
                image,
                rating,
            });

            res.status(200).send({ status: 'success', msg: 'Product updated' });
        } catch (error) {
            console.log(error);
        }
    },
};