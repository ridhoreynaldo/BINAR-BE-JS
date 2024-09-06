const { io } = require('../socket/socketManager');

exports.sendWelcomeNotification = (user) => {
  io.emit('notification', { message: `Welcome ${user.name}!` });
};

exports.sendPasswordChangeNotification = (user) => {
  io.emit('notification', { message: `${user.name}, your password has been successfully changed.` });
};