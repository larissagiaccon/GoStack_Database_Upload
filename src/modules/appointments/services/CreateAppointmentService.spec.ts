import 'reflect-metadata';

import AppError from '@errors/AppError';
import CreateAppointmentService from '@servicesAppointments/CreateAppointmentService';
import FakeAppointmentsRepository from '@fakesRepositoriesAppointments/FakeAppointmentsRepository';

import FakeUsersRepository from '@fakesRepositoriesUsers/FakeUsersRepository';
import CreateUserService from '@providersUsers/services/CreateUserService';
import FakeHashProvider from '@providersUsers/providers/HashProvider/fakes/FakeHashProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let createAppointment: CreateAppointmentService;

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    createAppointment = new CreateAppointmentService(
      fakeUsersRepository,
      fakeAppointmentsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    const user = await createUser.execute({
      name: 'Larissa Giaccon',
      email: 'larissa_souz@hotmail.com',
      password: '123456',
    });

    const appointment = await createAppointment.execute({
      provider_id: user.id,
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(user.id);
  });

  it('should not be able to create two appointments in same time', async () => {
    const user = await createUser.execute({
      name: 'Larissa Giaccon',
      email: 'larissa_souz@hotmail.com',
      password: '123456',
    });

    const appointmentDate = new Date();

    await createAppointment.execute({
      provider_id: user.id,
      date: appointmentDate,
    });

    await expect(
      createAppointment.execute({
        provider_id: user.id,
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new appointment with non existing user', async () => {
    await expect(
      createAppointment.execute({
        provider_id: '123456',
        date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
