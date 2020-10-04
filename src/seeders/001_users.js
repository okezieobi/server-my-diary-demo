import bcrypt from '../utils/bcrypt';

const hashedPassword = bcrypt.hashString('password one');

async function up(queryInterface) {
  await queryInterface.bulkInsert('Users', [
    {
      id: '18ae5a5b-4c5f-410e-aef1-c0c800cf47f9',
      fullName: 'Frank Okezie',
      username: 'Obiedere',
      email: 'foobar@mail.com',
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
