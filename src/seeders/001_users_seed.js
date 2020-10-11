import bcrypt from '../utils/bcrypt';

import testUtils from '../tests/utils';

const hashedPassword = bcrypt.hashString(testUtils.user.mock2.password);

async function up(queryInterface) {
  await queryInterface.bulkInsert('Users', [
    {
      id: '18ae5a5b-4c5f-410e-aef1-c0c800cf47f9',
      fullName: testUtils.user.mock2.fullName,
      username: testUtils.user.mock2.username,
      email: testUtils.user.mock2.email,
      password: hashedPassword,
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
