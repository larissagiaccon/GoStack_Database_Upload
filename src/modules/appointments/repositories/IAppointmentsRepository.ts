import Appointment from '@entitiesAppointments/Appointment';
import ICreateAppointmentDTO from '@dtosAppointments/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
