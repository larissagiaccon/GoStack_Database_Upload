import { Router } from 'express';

import appointmentsRouter from '@routesAppointments/appointments.routes';
import usersRouter from '@routesUsers/users.routes';
import sessionsRouter from '@routesUsers/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
