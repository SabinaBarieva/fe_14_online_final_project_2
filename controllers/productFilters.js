const Product = require('../models/Product');

exports.productFilters = async (req, res, next) => {
  try {
    const dbResponse = await Product.aggregate()
      .match({ enabled: true })
      .facet({
        categories: [{ $group: { _id: '$categories', quantity: { $sum: 1 } } }],
        priceMinAndMax: [
          {
            $group: {
              _id: {},
              priceMin: { $min: '$currentPrice' },
              priceMax: { $max: '$currentPrice' },
            },
          },
        ],
      });
    const { categories, priceMinAndMax } = dbResponse[0];
    const { priceMin, priceMax } = priceMinAndMax[0];
    res.json({
      categories: categories.map(({ _id, quantity }) => {
        return { name: _id, quantity };
      }),
      price: {
        min: priceMin,
        max: priceMax,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }
};
