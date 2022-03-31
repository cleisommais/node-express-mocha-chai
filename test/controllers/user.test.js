import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
let id = 1;
import UserController from '../../src/controllers/user';
import UserService from '../../src/services/user';
import ErrorResponseApp from '../../src/utils/error-response-app';
chai.use(sinonChai);
const userController = new UserController();
const sandbox = sinon.createSandbox();
let multipleResponse = null;

describe('Testing UserController', () => {
    beforeEach('Stub UserService', () => {
        multipleResponse = [
            {
                name: 'Cleison Melo',
                age: 39,
                email: 'cleison@gmail.com',
                id: 1,
            },
            {
                name: 'Cristina Melo',
                age: 37,
                email: 'cristina@gmail.com',
                id: 2,
            },
        ];
        sandbox
            .stub(UserService.prototype, 'getUsers')
            .returns(multipleResponse);
        sandbox
            .stub(UserService.prototype, 'createUser')
            .returns(multipleResponse[1]);
        sandbox
            .stub(UserService.prototype, 'getUserById')
            .returns(multipleResponse[0]);
        sandbox
            .stub(UserService.prototype, 'updateUserById')
            .returns(multipleResponse[0]);
        sandbox.stub(UserService.prototype, 'deleteUserById').returns(null);
    });
    afterEach('Restore sandbox', () => {
        sandbox.restore();
    });
    it('Testing UserController getUsers', async () => {
        const res = {};
        res.status = sandbox.stub().returns(res);
        res.json = sandbox.stub().returns(res);
        const req = {};
        await userController.getUsers(req, res);
        chai.expect(res.status).to.have.been.calledWith(200);
        chai.expect(res.json).to.have.been.calledWith({
            success: true,
            data: multipleResponse,
        });
    });
    it('Testing UserController createUser', async () => {
        const res = {};
        res.status = sandbox.stub().returns(res);
        res.json = sandbox.stub().returns(res);
        const req = {};
        req.body = {
            name: 'Cleison Melo',
            age: 39,
            email: 'cleison@gmail.com',
        };
        await userController.createUser(req, res);
        chai.expect(res.status).to.have.been.calledWith(201);
        chai.expect(res.json).to.have.been.called;
        chai.expect(res.json).to.have.been.calledWith({
            success: true,
            data: multipleResponse[1],
        });
    });
    it('Testing UserController createUser with null bodyRequest', async () => {
        sandbox.restore();
        sandbox
            .stub(UserService.prototype, 'createUser')
            .throws(new ErrorResponseApp('Body request missing', 400));
        const next = sandbox.stub().returns(() => {});
        const res = {};
        res.status = sandbox.stub().returns(res);
        res.json = sandbox.stub().returns(res);
        const req = {};
        await userController.createUser(req, res, next);
        chai.expect(res.status).to.have.been.calledWith(400);
        chai.expect(res.json).to.have.been.called;
        chai.expect(res.json).to.have.been.calledWith({
            success: false,
            msg: 'Body request missing',
        });
    });
    it('Testing UserController getUserById', async () => {
        const next = sandbox.stub().returns(() => {});
        const res = {};
        res.status = sandbox.stub().returns(res);
        res.json = sandbox.stub().returns(res);
        const req = {
            params: {
                id: id,
            },
        };
        await userController.getUserById(req, res, next);
        chai.expect(res.status).to.have.been.calledWith(200);
        chai.expect(res.json).to.have.been.called;
        chai.expect(res.json).to.have.been.calledWith({
            success: true,
            data: multipleResponse[0],
        });
    });
    it('Testing UserController getUserById when id is wrong', async () => {
        sandbox.restore();
        sandbox
            .stub(UserService.prototype, 'getUserById')
            .throws(new ErrorResponseApp('Id 1 not found', 404));
        const next = sandbox.stub().returns(() => {});
        const res = {};
        res.status = sandbox.stub().returns(res);
        res.json = sandbox.stub().returns(res);
        const req = {
            params: {
                id: id,
            },
        };
        await userController.getUserById(req, res, next);
        chai.expect(res.status).to.have.been.calledWith(404);
        chai.expect(res.json).to.have.been.called;
        chai.expect(res.json).to.have.been.calledWith({
            success: false,
            msg: 'Id 1 not found',
        });
    });
    it('Testing UserController updateUserById', async () => {
        const next = sandbox.stub().returns(() => {});
        const res = {};
        res.status = sandbox.stub().returns(res);
        res.json = sandbox.stub().returns(res);
        const req = {
            params: {
                id: id,
            },
            body: {
                name: 'Cleison Melo',
                age: 39,
                email: 'cleison@gmail.com',
            },
        };
        await userController.updateUserById(req, res, next);
        chai.expect(res.status).to.have.been.calledWith(202);
        chai.expect(res.json).to.have.been.called;
        chai.expect(res.json).to.have.been.calledWith({
            success: true,
            data: multipleResponse[0],
        });
    });
    it('Testing UserController updateUserById when id is wrong', async () => {
        sandbox.restore();
        sandbox
            .stub(UserService.prototype, 'updateUserById')
            .throws(new ErrorResponseApp('Id 1 not found', 404));
        const next = sandbox.stub().returns(() => {});
        const res = {};
        res.status = sandbox.stub().returns(res);
        res.json = sandbox.stub().returns(res);
        const req = {
            params: {
                id: 0,
            },
            body: {
                name: 'Cleison Melo',
                age: 39,
                email: 'cleison@gmail.com',
            },
        };
        await userController.updateUserById(req, res, next);
        chai.expect(res.status).to.have.been.calledWith(404);
        chai.expect(res.json).to.have.been.called;
        chai.expect(res.json).to.have.been.calledWith({
            success: false,
            msg: 'Id 1 not found',
        });
    });
    it('Testing UserController updateUserById with null bodyRequest', async () => {
        sandbox.restore();
        sandbox
            .stub(UserService.prototype, 'updateUserById')
            .throws(new ErrorResponseApp('Body request missing', 400));
        const next = sandbox.stub().returns(() => {});
        const res = {};
        res.status = sandbox.stub().returns(res);
        res.json = sandbox.stub().returns(res);
        const req = {
            params: {
                id: 0,
            },
            body: {
                name: 'Cleison Melo',
                age: 39,
                email: 'cleison@gmail.com',
            },
        };
        await userController.updateUserById(req, res, next);
        chai.expect(res.status).to.have.been.calledWith(400);
        chai.expect(res.json).to.have.been.called;
        chai.expect(res.json).to.have.been.calledWith({
            success: false,
            msg: 'Body request missing',
        });
    });
    it('Testing UserController deleteUserById', async () => {
        const next = sandbox.stub().returns(() => {});
        const res = {};
        res.status = sandbox.stub().returns(res);
        res.json = sandbox.stub().returns(res);
        const req = {
            params: {
                id: id,
            },
        };
        await userController.deleteUserById(req, res, next);
        chai.expect(res.status).to.have.been.calledWith(204);
        chai.expect(res.json).to.have.been.called;
        chai.expect(res.json).to.have.been.calledWith({
            success: true,
            data: null,
        });
    });
    it('Testing UserController deleteUserById when id is wrong', async () => {
        sandbox.restore();
        sandbox
            .stub(UserService.prototype, 'deleteUserById')
            .throws(new ErrorResponseApp('Id 1 not found', 404));
        const next = sandbox.stub().returns(() => {});
        const res = {};
        res.status = sandbox.stub().returns(res);
        res.json = sandbox.stub().returns(res);
        const req = {
            params: {
                id: 0,
            },
        };
        await userController.deleteUserById(req, res, next);
        chai.expect(res.status).to.have.been.calledWith(404);
        chai.expect(res.json).to.have.been.called;
        chai.expect(res.json).to.have.been.calledWith({
            success: false,
            msg: 'Id 1 not found',
        });
    });
});
