import colors from 'colors';
import { v4 as uuidv4 } from 'uuid';
import ErrorResponseApp from '../utils/error-response-app';

export default class UserService {
    constructor() {
        this.users = new Map();
    }
    async getUsers(options) {
        try {
            return [...this.users.values()];
        } catch (err) {
            console.log(colors.red(err.message));
            console.log(colors.red(err.statusCode));
            throw new ErrorResponseApp(
                err.message || 'Error when try to get all',
                err.statusCode || 400
            );
        }
    }
    async createUser(bodyRequest) {
        try {
            if (!bodyRequest) {
                throw new ErrorResponseApp('Body request missing', 400);
            }
            const id = uuidv4();
            bodyRequest.id = id;
            this.users.set(id, bodyRequest);
            return this.users.get(id);
        } catch (err) {
            console.log(colors.red(err.message));
            console.log(colors.red(err.statusCode));
            throw new ErrorResponseApp(
                err.message || 'Error when try to create',
                err.statusCode || 400
            );
        }
    }
    async getUserById(id) {
        try {
            if (!this.users.has(id)) {
                throw new ErrorResponseApp(`Id ${id} not found`, 404);
            }
            return this.users.get(id);
        } catch (err) {
            console.log(colors.red(err.message));
            console.log(colors.red(err.statusCode));
            throw new ErrorResponseApp(
                err.message || 'Error when try to get by id',
                err.statusCode || 400
            );
        }
    }
    async updateUserById(id, bodyRequest) {
        try {
            if (!bodyRequest) {
                throw new ErrorResponseApp('Body request missing', 400);
            }
            if (!this.users.has(id)) {
                throw new ErrorResponseApp(`Id ${id} not found`, 404);
            }
            bodyRequest.id = id;
            this.users.set(id, bodyRequest);
            return this.users.get(id);
        } catch (err) {
            console.log(colors.red(err.message));
            console.log(colors.red(err.statusCode));
            throw new ErrorResponseApp(
                err.message || 'Error when try to update by id',
                err.statusCode || 400
            );
        }
    }
    async deleteUserById(id) {
        try {
            if (!this.users.has(id)) {
                throw new ErrorResponseApp(`Id ${id} not found`, 404);
            }
            this.users.delete(id);
            return null;
        } catch (err) {
            console.log(colors.red(err.message));
            console.log(colors.red(err.statusCode));
            throw new ErrorResponseApp(
                err.message || 'Error when try to delete by id',
                err.statusCode || 400
            );
        }
    }
}
