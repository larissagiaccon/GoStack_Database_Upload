import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

import Appointment from '@entitiesAppointments/Appointment';
import ICreateAppointmentDTO from '@dtosAppointments/ICreateAppointmentDTO';
import IAppointmentsRepository from '@interfaceRepositoriesAppointments/IAppointmentsRepository';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), provider_id, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
