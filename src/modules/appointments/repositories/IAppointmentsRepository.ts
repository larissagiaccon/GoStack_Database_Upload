import Appointment from '@entitiesAppointments/Appointment';
import ICreateAppointmentDTO from '@dtosAppointments/ICreateAppointmentDTO';
import IFindAllInDayFromProviderDTO from '@dtosAppointments/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromProviderDTO from '@dtosAppointments/IFindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
