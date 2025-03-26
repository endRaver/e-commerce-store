// backend/swagger/product.swagger.js

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /products/featured:
 *   get:
 *     summary: Get featured products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of featured products
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /products/category/{category}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     parameters:
 *       - name: category
 *         in: path
 *         required: true
 *         description: The category to filter products
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products in the specified category
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /products/recommendations:
 *   get:
 *     summary: Get recommended products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of recommended products
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               featured:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid product data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Toggle featured status of a product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to toggle
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product featured status toggled successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */