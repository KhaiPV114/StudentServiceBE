const createError = require('http-errors');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');

module.exports = {
    // Get all users with pagination and filtering
    getAllUsers: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const role = req.query.role;
            const status = req.query.status;

            const query = {};
            if (role) query.role = role.toUpperCase();
            if (status) query.status = status.toUpperCase();

            const users = await User.find(query)
                .select('-password') 
                .skip((page - 1) * limit)
                .limit(limit)
                .lean();

            const total = await User.countDocuments(query);

            const filterUsers = users.filter(user => user.role !== "ADMIN")

            res.json({
                filterUsers,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalUsers: total
            });
        } catch (error) {
            next(createError(500, error.message));
        }
    },

    // Get user by ID
    getUserById: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id).select('-password');
            if (!user) {
                return next(createError(404, 'User not found'));
            }
            res.json(user);
        } catch (error) {
            next(createError(500, error.message));
        }
    },

    // Create new user
    createUser: async (req, res, next) => {
        try {
            const { name, email, password, role } = req.body;

            // Check if email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return next(createError(409, 'Email already exists'));
            }

            // Hash password
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);

            const user = new User({
                name,
                email,
                password: hashedPassword,
                role: role?.toUpperCase() || 'STUDENT'
            });

            const savedUser = await user.save();
            // Don't send password in response
            const userResponse = savedUser.toObject();
            delete userResponse.password;

            res.status(201).json(userResponse);
        } catch (error) {
            if (error.name === 'ValidationError') {
                return next(createError(400, error.message));
            }
            next(createError(500, error.message));
        }
    },

    // Update user
    updateUser: async (req, res, next) => {
        try {
            const { name, email, role, status } = req.body;
            const updateData = {};

            if (name) updateData.name = name;
            if (email) updateData.email = email;
            if (role) updateData.role = role.toUpperCase();
            if (status) updateData.status = status.toUpperCase();

            // If password is being updated, hash it
            if (req.body.password) {
                const salt = await bcryptjs.genSalt(10);
                updateData.password = await bcryptjs.hash(req.body.password, salt);
            }

            const user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: updateData },
                { new: true, runValidators: true }
            ).select('-password');

            if (!user) {
                return next(createError(404, 'User not found'));
            }

            res.json(user); 
        } catch (error) {
            if (error.name === 'ValidationError') {
                return next(createError(400, error.message));
            }
            next(createError(500, error.message));
        }
    },

    // Delete user
    deleteUser: async (req, res, next) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return next(createError(404, 'User not found'));
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            next(createError(500, error.message));
        }
    },

    // Update user status 
    updateUserStatus: async (req, res, next) => {
        try {
            const { status } = req.body;
            if (!status || !['ACTIVE', 'BANNED'].includes(status.toUpperCase())) {
                return next(createError(400, 'Invalid status value'));
            }

            const user = await User.findByIdAndUpdate(
                req.params.id,
                { status: status.toUpperCase() },
                { new: true, runValidators: true }
            ).select('-password');

            if (!user) {
                return next(createError(404, 'User not found'));
            }

            res.json(user);
        } catch (error) {
            next(createError(500, error.message));
        }
    },

    // Change user role
    changeUserRole: async (req, res, next) => {
        try {
            const { role } = req.body;
            if (!role || !['STUDENT', 'STAFF', 'ADMIN'].includes(role.toUpperCase())) {
                return next(createError(400, 'Invalid role value'));
            }

            const user = await User.findByIdAndUpdate(
                req.params.id,
                { role: role.toUpperCase() },
                { new: true, runValidators: true }
            ).select('-password');

            if (!user) {
                return next(createError(404, 'User not found'));
            }

            res.json(user);
        } catch (error) {
            next(createError(500, error.message));
        }
    }
};
