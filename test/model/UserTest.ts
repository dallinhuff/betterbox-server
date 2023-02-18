import { User } from '../../src/model/User';
import { expect } from 'chai';

describe('User Model', function () {
	const createUser = (options: Partial<User> = {}) =>
		new User(
			options.username || '@testUser',
			options.password || 'testPassword',
			options.email || 'test@mail.com',
			options.name || 'Test User',
			options.avatar || 'https://dummyurl.org/photo.jpg'
		);

	describe('constructor', function () {
		const user = createUser();
		it('should set a username', function () {
			expect(user.username).to.equal('@testUser');
		});
		it('should set a name', function () {
			expect(user.name).to.equal('Test User');
		});
		it('should set an avatar', function () {
			expect(user.avatar).to.equal('https://dummyurl.org/photo.jpg');
		});
		it('should set a password', function () {
			expect(user.password).to.equal('testPassword');
		});
	});
	describe('copy constructor', function () {
		const user = createUser();
		const copy = User.from(user);
		it('should make a deep copy', function () {
			expect(copy).to.not.equal(user);
			expect(copy).to.deep.equal(user);

			user.username = '@changed';
			expect(copy.username).to.not.equal('@changed');
		});
	});
});
