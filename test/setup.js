const db = require('../index.js');

exports.mochaGlobalTeardown = async () => {
  try {
    await db.destroy();
    console.log('✅ Closed database connection');
  } catch (error) {
    console.error(error);
  }
};
