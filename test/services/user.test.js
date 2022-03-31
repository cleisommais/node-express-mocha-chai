import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import UserService from '../../src/services/user';
import { v4 as uuidv4 } from 'uuid';
chai.use(chaiAsPromised);
const userService = new UserService();
let id = null;

describe('Testing UserService', () => {
    it('Testing getUsers with empty response', async () => {
        const options = {};
        const response = await userService.getUsers(options);
        chai.expect(response).to.deep.equal([]);
    });
    it('Testing getUsers with 2 items on the  response', async () => {
        let id = uuidv4();
        userService.users.set(id, {
            id,
            name: 'Cleison',
            age: 39,
            email: 'cleison@test.com',
        });
        id = uuidv4();
        userService.users.set(id, {
            id,
            name: 'Cristina',
            age: 37,
            email: 'cristina@test.com',
        });
        const options = {};
        const response = await userService.getUsers(options);
        chai.expect(response.length).to.deep.equal(2);
        userService.users.clear();
    });
    it('Testing createUser', async () => {
        const bodyRequest = {
            name: 'Cleison',
            age: 39,
            email: 'cleison@test.com',
        };
        const response = await userService.createUser(bodyRequest);
        chai.expect(response).to.have.property('id');
        chai.expect(response).to.have.property('name');
        chai.expect(response).to.have.property('age');
        chai.expect(response).to.have.property('email');
        chai.expect(response).to.not.equal(null);
        chai.expect(response.id).to.not.equal(undefined);
        id = response.id;
    });
    it('Testing createUser when bodyRequest is null', async () => {
        const bodyRequest = null;
        await chai
            .expect(userService.createUser(bodyRequest))
            .to.be.rejectedWith('Body request missing');
    });
    it('Testing getUserById', async () => {
        const response = await userService.getUserById(id);
        chai.expect(response).to.have.property('id');
        chai.expect(response).to.have.property('name');
        chai.expect(response).to.have.property('age');
        chai.expect(response).to.have.property('email');
    });
    it('Testing getUserById when id is wrong', async () => {
        await chai
            .expect(userService.getUserById(123))
            .to.be.rejectedWith('Id 123 not found');
    });
    it('Testing updateUserById', async () => {
        const bodyRequest = {
            name: 'Cleison Melo',
            age: 40,
            email: 'cleison@test.com',
        };
        const response = await userService.updateUserById(id, bodyRequest);
        chai.expect(response.name).to.deep.equal('Cleison Melo');
        chai.expect(response).to.have.property('id');
        chai.expect(response).to.have.property('name');
        chai.expect(response).to.have.property('age');
        chai.expect(response).to.have.property('email');
    });
    it('Testing updateUserById when id is wrong', async () => {
        const bodyRequest = {
            name: 'Cleison Melo',
            age: 40,
            email: 'cleison@test.com',
        };
        await chai
            .expect(userService.updateUserById(123, bodyRequest))
            .to.be.rejectedWith('Id 123 not found');
    });
    it('Testing updateUserById when bodyRequest is null', async () => {
        const bodyRequest = null;
        await chai
            .expect(userService.updateUserById(id, bodyRequest))
            .to.be.rejectedWith('Body request missing');
    });
    it('Testing deleteUserById', async () => {
        const response = await userService.deleteUserById(id);
        chai.expect(response).to.deep.equal(null);
    });
    it('Testing deleteUserById when id is wrong', async () => {
        await chai
            .expect(userService.deleteUserById(123))
            .to.be.rejectedWith('Id 123 not found');
    });
});
