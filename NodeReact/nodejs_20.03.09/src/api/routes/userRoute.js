module.exports = (server) => {
  const userController = require('../controllers/userController');

  server.post('/users/register', userController.user_register)
  
  server.post('/users/login', userController.user_login)

  server.route('/users')
    .get(userController.list_all_users);

}
