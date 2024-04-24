import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise(resolve => resolve('hash'));
    }
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt);
}

describe('BcryptAdapter', () => {
    test('Should call bcrypt with correct value', async () => {
        const sut = makeSut();
        const hashSpy = jest.spyOn(bcrypt, 'hash');
        await sut.encrypt('any_value');
        expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
    });

    test('Should return a hash on success', async () => {
        const sut = makeSut();
        const hash = await sut.encrypt('any_value');
        expect(hash).toBe('hash');
    });

    test('Should throw if bcrypt throws', async () => {
        const sut = makeSut();
        /*
            Esse método tem diversas sobrecargas, por isso fica difícil mockar ele com o mockReturnValue.
            O compilador pensa que você quer mockar alguma das possíveis sobrecargas desse método.
            Com o mockImplementation você fica livre pra mockar como quiser.
        */
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
            throw new Error()
          }
        );
        const promise = sut.encrypt('any_value');
        await expect(promise).rejects.toThrow();
    });
});