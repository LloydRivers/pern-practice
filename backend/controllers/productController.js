module.exports = {
    getProducts: async(req, res) => {
        //get DB variable
        const db = req.app.get('db'); //To get reference to the db folder

        //Running SELECT * from products;
        // db.products
        //     .fetch_products()
        //     .then((products) => {
        //         res.status(200).send(products);
        //     })
        //     .catch((err) => {
        //         res.status(500).json(err);
        //     });
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
            const product = await db.products.fetch_product_by_id(id);
            // console.log(product);
            res.status(200).send(product[0]);
        } catch (error) {
            console.log(error);
        }
    },
    createProduct: async(req, res) => {
        const db = req.app.get('db');
        const { name, price, image, category, description, rating } = req.body;

        try {
            const product = await db.products.create_product(
                name,
                price,
                description,
                category,
                image,
                rating
            );
            res.status(200).send({ status: 'success', msg: 'Product created' });
        } catch (error) {
            console.log(error);
        }
    },
    deleteProduct: async(req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        try {
            const product = await db.products.delete_product(id);
            res.status(200).send({ status: 'success', msg: 'Product deleted' });
        } catch (error) {
            console.log(error);
        }
    },
    updateProduct: async(req, res) => {
        const db = req.app.get('db');
        const { name, price, image, category, description, rating, productid } =
        req.body;

        try {
            const product = await db.products.update_product(
                name,
                price,
                description,
                category,
                image,
                rating,
                productid
            );

            res.status(200).send({ status: 'success', msg: 'Product updated' });
        } catch (error) {
            console.log(error);
        }
    },
};