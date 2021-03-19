import { Router } from 'express';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';
import ProvidersController from '@controllersAppointments/ProvidersController';
import ProviderDayAvailabilityController from '@controllersAppointments/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '@controllersAppointments/ProviderMonthAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);

export default providersRouter;
