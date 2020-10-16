import testUtils from '../tests/utils';

async function up(queryInterface) {
  await queryInterface.bulkInsert('Entries', [
    {
      id: '18ae5a5b-4c5f-410e-aef1-c0c800cf47f8',
      title: testUtils.user.mock2.username,
      body: testUtils.user.mock2.email,
      UserId: '18ae5a5b-4c5f-410e-aef1-c0c800cf47f9',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('Entries', null, {});
}

export default { up, down };
