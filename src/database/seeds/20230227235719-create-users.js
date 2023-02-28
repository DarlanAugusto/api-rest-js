const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Admin',
          email: 'admin@email.com',
          password_hash: await bcryptjs.hash('admin123', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Luiz',
          email: 'luiz@email.com',
          password_hash: await bcryptjs.hash('luiz123', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Joao',
          email: 'joao@email.com',
          password_hash: await bcryptjs.hash('joao123', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
