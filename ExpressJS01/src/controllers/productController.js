const { getProductsPaginated } = require('../services/productService');

async function listProducts(req, res) {
  try {
    const { category, page = 1, limit = 12 } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 12);

    const { items, totalItems } = await getProductsPaginated({
      category,
      page: pageNum,
      limit: limitNum
    });

    const totalPages = Math.ceil(totalItems / limitNum);

    res.json({
      products: items,
      page: pageNum,
      limit: limitNum,
      totalPages,
      totalItems
    });
  } catch (err) {
    console.error('listProducts error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { listProducts };
