import 'reflect-metadata';

import AppError from '@errors/AppError';
import CreateAppointmentService from '@servicesAppointments/CreateAppointmentService';
import FakeAppointmentsRepository from '@fakesRepositoriesAppointments/FakeAppointmentsRepository';

import FakeUsersRepository from '@fakesRepositoriesUsers/FakeUsersRepository';
import CreateUserService from '@providersUsers/services/CreateUserService';
import FakeHashProvider from '@providersUsers/providers/HashProvider/fakes/FakeHashProvider';

describe('CreateAppointmentService', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
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

    const createAppointment = new CreateAppointmentService(
      fakeUsersRepository,
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      provider_id: user.id,
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(user.id);
  });

  it('should not be able to create two appointments in same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
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

    const createAppointment = new CreateAppointmentService(
      fakeUsersRepository,
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date();

    await createAppointment.execute({
      provider_id: user.id,
      date: appointmentDate,
    });

    expect(
      createAppointment.execute({
        provider_id: user.id,
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new appointment with non existing user', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeUsersRepository = new FakeUsersRepository();

    const createAppointment = new CreateAppointmentService(
      fakeUsersRepository,
      fakeAppointmentsRepository,
    );

    expect(
      createAppointment.execute({
        provider_id: '123456',
        date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
