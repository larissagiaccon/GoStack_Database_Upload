import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAppointmentService from '@servicesAppointments/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppoinment = container.resolve(CreateAppointmentService);

    const appointment = await createAppoinment.execute({
      user_id,
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}
