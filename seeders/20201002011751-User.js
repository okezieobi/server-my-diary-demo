module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [{
      id: '18ae5a5b-4c5f-410e-aef1-c0c800cf47f9',
      fullName: 'test-fullName',
      username: 'test-username',
      email: 'test@email.com',
      password: 'test-password',
    }], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
