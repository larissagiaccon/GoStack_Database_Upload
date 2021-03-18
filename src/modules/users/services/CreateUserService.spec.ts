import 'reflect-metadata';

import AppError from '@errors/AppError';
import CreateUserService from '@servicesUsers/CreateUserService';
import FakeHashProvider from '@fakesHashProvidersUsers/FakeHashProvider';
import FakeUsersRepository from '@fakesRepositoriesUsers/FakeUsersRepository';

let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
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
    await createUser.execute({
      name: 'Larissa Giaccon',
      email: 'larissa_souz@hotmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Larissa Giaccon',
        email: 'larissa_souz@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
