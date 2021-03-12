import 'reflect-metadata';

import AppError from '@errors/AppError';
import CreateUserService from '@servicesUsers/CreateUserService';
import FakeHashProvider from '@fakesHashProvidersUsers/FakeHashProvider';
import AuthenticateUserService from '@servicesUsers/AuthenticateUserService';
import FakeUsersRepository from '@fakesRepositoriesUsers/FakeUsersRepository';

describe('AuthenticateUserService', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Larissa Giaccon',
      email: 'larissa_souz@hotmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'larissa_souz@hotmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'larissa_@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Larissa Giaccon',
      email: 'larissa_souz@hotmail.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'larissa_souz@hotmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
