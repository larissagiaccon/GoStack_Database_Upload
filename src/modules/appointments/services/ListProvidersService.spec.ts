import 'reflect-metadata';

import ListProvidersService from '@servicesAppointments/ListProvidersService';
import FakeUsersRepository from '@fakesRepositoriesUsers/FakeUsersRepository';

let listProviders: ListProvidersService;
let fakeUsersRepository: FakeUsersRepository;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Usuario 1',
      email: 'usuario1@hotmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Usuario 2',
      email: 'usuario2@hotmail.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Larissa Giaccon',
      email: 'larissa_souz@hotmail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
