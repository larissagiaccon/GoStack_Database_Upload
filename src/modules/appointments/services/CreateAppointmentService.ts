import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import Appointment from '@entitiesAppointments/Appointment';
import IUsersRepository from '@interfaceRepositoriesUsers/IUsersRepository';
import IAppointmentsRepository from '@interfaceRepositoriesAppointments/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppoinmentService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const checkUserExist = await this.usersRepository.findById(provider_id);

    if (!checkUserExist) {
      throw new AppError('Provider not exist.');
    }

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppoinmentService;
