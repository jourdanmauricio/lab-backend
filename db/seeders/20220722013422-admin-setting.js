'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'settings',
      [
        {
          user_id: 1,
          setting: JSON.stringify({
            status: '',
            listing_type_id: '',
            condition: '',
            hintSku: false,
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('settings', 1, {});
  },
};
