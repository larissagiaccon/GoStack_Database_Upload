import { Router } from 'express';

import usersRouter from '@routesUsers/users.routes';
import profileRouter from '@routesUsers/profile.routes';
import sessionsRouter from '@routesUsers/sessions.routes';
import passwordRouter from '@routesUsers/password.routes';
import providersRouter from '@routesAppointments/providers.routes';
import appointmentsRouter from '@routesAppointments/appointments.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/providers', providersRouter);
routes.use('/appointments', appointmentsRouter);

export default routes;
