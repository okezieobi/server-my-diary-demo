import testUtils from '../tests/utils';

async function up(queryInterface) {
  await queryInterface.bulkInsert('Users', [
    {
      id: testUtils.user.mock2.id,
      fullName: testUtils.user.mock2.fullName,
      username: testUtils.user.mock2.username,
      email: testUtils.user.mock2.email,
      password: testUtils.user.mock2.hashedPassword,
      type: 'Client',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('Users', null, {});
}

export default { up, down };
