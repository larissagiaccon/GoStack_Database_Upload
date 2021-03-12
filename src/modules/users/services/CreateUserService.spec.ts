import 'reflect-metadata';

import AppError from '@errors/AppError';
import CreateUserService from '@servicesUsers/CreateUserService';
import FakeUsersRepository from '@fakesRepositoriesUsers/FakeUsersRepository';
import FakeHashProvider from '@fakesHashProvidersUsers/FakeHashProvider';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Larissa Giaccon',
      email: 'larissa_souz@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Larissa Giaccon');
    expect(user.email).toBe('larissa_souz@hotmail.com');
  });

  it('should not be able to create a new user with same email from another ', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Larissa Giaccon',
      email: 'larissa_souz@hotmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Larissa Giaccon',
        email: 'larissa_souz@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
