import { Movie } from '../../src/model/Movie';
import { beforeEach } from 'mocha';

describe('Movie Model', function () {
	let movie: Movie;
	const createMovie = () => new Movie();
	beforeEach(() => (movie = createMovie()));

	describe('constructor', function () {
		it('should set a title', function () {
			this.skip();
		});
		it('should set a year', function () {
			this.skip();
		});
		it('should set a director', function () {
			this.skip();
		});
		it('should set a cast', function () {
			this.skip();
		});
	});
	describe('copy constructor', function () {
		it('should make a deep copy', function () {
			this.skip();
		});
	});
});
