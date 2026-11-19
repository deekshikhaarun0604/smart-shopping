const seedDatabase = require('../seeds/seed');

exports.triggerSeed = async (req, res, next) => {
  try {
    const result = await seedDatabase();
    if (result.success) {
      res.json({
        success: true,
        message: 'Database seeded successfully with demo customers, products, and graph relationships.',
        data: result
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.message || 'Database seeding failed.',
        error: result.error
      });
    }
  } catch (error) {
    next(error);
  }
};
