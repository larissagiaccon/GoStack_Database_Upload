import { getRepository, Repository, Raw } from 'typeorm';

import Appointment from '@entitiesAppointments/Appointment';
import ICreateAppointmentDTO from '@dtosAppointments/ICreateAppointmentDTO';
import IFindAllInDayFromProviderDTO from '@dtosAppointments/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromProviderDTO from '@dtosAppointments/IFindAllInMonthFromProviderDTO';
import IAppointmentsRepository from '@interfaceRepositoriesAppointments/IAppointmentsRepository';

export default class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dataFielName =>
            `to_char(${dataFielName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dataFielName =>
            `to_char(${dataFielName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}
