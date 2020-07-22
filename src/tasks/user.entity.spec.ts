import { User } from '../auth/user.entity';
import * as bcrypt from 'bcryptjs';


describe('User entity', () => {
    let user: User;

    beforeEach(() => {
        user = new User();
        user.password = 'testPassword';
        user.salt = 'testSalt';
        bcrypt.hash = jest.fn();
    });

    describe(('validatePassword'), () => {
        it('returns true as password is valid', () => {
            bcrypt.hash.mockReturnValue('testPassword');
            expect(bcrypt.hash).not.toHaveBeenCalled();
            const result = user.validatePassword('123456');
            expect(bcrypt.hash).toHaveBeenCalledWith('123456', 'testSalt');
            expect(result).toEqual(true);
        });

        it('returns false as password is invalid', () => {
            bcrypt.hash.mockReturnValue('wrongPassword');
            expect(bcrypt.hash).not.toHaveBeenCalled();
            const result = user.validatePassword('wrongPassword');
            expect(bcrypt.hash).toHaveBeenCalledWith('123456', 'testSalt');
            expect(result).toEqual(false);
        });
    });
    


    
});