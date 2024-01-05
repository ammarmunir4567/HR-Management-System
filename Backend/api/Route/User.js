const router = require('express').Router();
const user = require('../Model/User.model');


// Get all users
router.route('/').get((req, res) => {
  user.find()
    .then(login => res.json(login))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new user
router.route('/add').post((req, res) => {
  const { username, password} = req.body;

  const newLogin = new user({username,password});

  newLogin.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/login').post((req, res) => {
  const { username, password } = req.body;
  console.log('Request Body:', req.body);
  user.findOne({ "username": username }) // Use findOne instead of find
    .then(data => {
      if (data && data.password === password) {
        res.status(200).json({
          success: true,
          message: "Login successful",
          user: data
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid username or password"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "An error occurred"
      });
    });
});


router.route('/update-password/:username').post(async (req, res) => {
  try {
    const { username } = req.params;
    const { newPassword } = req.body;

    // Find the user by username
    const existingUser = await user.findOne({ "username": username });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found with the given username"
      });
    }

    // Update the password
    existingUser.password = newPassword;

    // Save the updated user
    const updatedUser = await existingUser.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      user: updatedUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the password",
      error: error.message
    });
  }
});



module.exports = router;
