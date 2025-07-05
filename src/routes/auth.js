const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
    "/register",
    [
        check("firstName", "First name is required").notEmpty(),
        check("lastName", "Last name is required").notEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 }),
        check("phone", "Phone number is required").notEmpty(),
        check("nic", "NIC is required").notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, password, phone, nic } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            user = new User({
                firstName,
                lastName,
                email,
                password,
                phone,
                nic,
            });

            await user.save();

            res.status(201).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                nic: user.nic,
                role: user.role,
                token: generateToken(user._id),
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
    "/login",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const isMatch = await user.matchPassword(password);

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                nic: user.nic,
                role: user.role,
                token: generateToken(user._id),
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
