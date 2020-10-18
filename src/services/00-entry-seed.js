import testUtils from '../tests/utils';

async function up(queryInterface) {
  await queryInterface.bulkInsert('Entries', [
    {
      id: testUtils.entry.mock.id,
      title: testUtils.entry.mock.title,
      body: testUtils.entry.mock.body,
      UserId: testUtils.user.mock2.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('Entries', null, {});
}

export default { up, down };
