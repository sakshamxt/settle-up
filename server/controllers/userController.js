import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/users/register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // create a new user instance
    user = new User({
      name,
      email,
      password,
    });

    // hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // save the user to the database
    await user.save();

    // create and sign a JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' }, // Token expires in 30 days
      (err, token) => {
        if (err) throw err;
        // send the token back to the client
        res.status(201).json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/users/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // if match, create and return JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    }
                });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};


export {registerUser, loginUser}