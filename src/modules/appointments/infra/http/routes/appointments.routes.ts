import { Router } from 'express';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';
import AppointmentsController from '@controllersAppointments/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
