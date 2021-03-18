import { container } from 'tsyringe';

import '@providersUsers/providers';
import '@container/providers';

import AppointmentsRepository from '@repositoriesAppointments/AppointmentsRepository';
import IAppointmentsRepository from '@interfaceRepositoriesAppointments/IAppointmentsRepository';

import UsersRepository from '@repositoriesUsers/UsersRepository';
import IUsersRepository from '@interfaceRepositoriesUsers/IUsersRepository';

import UserTokensRepository from '@repositoriesUsers/UserTokensRepository';
import IUserTokensRepository from '@interfaceRepositoriesUsers/IUserTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
