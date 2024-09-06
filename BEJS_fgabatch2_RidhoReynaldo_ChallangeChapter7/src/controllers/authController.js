const Sentry = require('../config/sentry');
const { generateToken, verifyToken } = require('../services/authService');
const transporter = require('../config/mailer');
const { User } = require('../models/userModel');
const { sendResetEmail } = require('../services/notificationService');

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const token = generateToken(user._id);
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    sendResetEmail(email, resetLink);
    
    res.send('Password reset link sent.');
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).send('An error occurred.');
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const userId = verifyToken(token);

    if (!userId) {
      return res.status(400).send('Invalid or expired token');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.password = newPassword;
    await user.save();
    
    res.send('Password has been reset.');
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).send('An error occurred.');
  }
};