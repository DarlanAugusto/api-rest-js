/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'photos',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        aluno_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'alunos',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        originalname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        filename: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('photos');
  },
};
