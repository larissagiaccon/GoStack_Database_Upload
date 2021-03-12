import { container } from 'tsyringe';

import '@providersUsers/providers';
import '@container/providers';

import AppointmentsRepository from '@repositoriesAppointments/AppointmentsRepository';
import IAppointmentsRepository from '@interfaceRepositoriesAppointments/IAppointmentsRepository';

import UsersRepository from '@repositoriesUsers/UsersRepository';
import IUsersRepository from '@interfaceRepositoriesUsers/IUsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
