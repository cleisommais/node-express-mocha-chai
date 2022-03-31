import UserService from '../services/user';
const userService = new UserService();

export default class UserController {
    // @desc    Get all  users
    // @route   GET /api/v1/users
    // @access  Public
    async getUsers(req, res, next) {
        const options = req.query || {};
        const response = await userService.getUsers(options);
        res.status(200).json(response);
    }
    // @desc    Create a new user
    // @route   POST /api/v1/users
    // @access  Public
    async createUser(req, res, next) {
        const bodyRequest = req.body || {};
        const response = await userService.createUser(bodyRequest);
        res.status(201).json({
            success: true,
            data: response,
        });
    }
    // @desc    Get user by id
    // @route   GET /api/v1/users/:id
    // @access  Public
    async getUserById(req, res, next) {
        const id = req.params.id || 0;
        const response = await userService.getUserById(id);
        res.status(200).json({
            success: true,
            data: response,
        });
    }
    // @desc    Update user by id
    // @route   PUT /api/v1/users/:id
    // @access  Public
    async updateUserById(req, res, next) {
        const id = req.params.id || 0;
        const bodyRequest = req.body || {};
        const response = await userService.updateUserById(id, bodyRequest);
        res.status(202).json({
            success: true,
            data: response,
        });
    }
    // @desc    Delete user by id
    // @route   DELETE /api/v1/users/:id
    // @access  Public
    async deleteUserById(req, res, next) {
        const id = req.params.id || 0;
        const response = await userService.deleteUserById(id);
        res.status(204).json({
            success: true,
            data: response,
        });
    }
}
