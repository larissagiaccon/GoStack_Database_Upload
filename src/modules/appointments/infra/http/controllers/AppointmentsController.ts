import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAppoinmentService from '@servicesAppointments/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppoinment = container.resolve(CreateAppoinmentService);

    const appointment = await createAppoinment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}
