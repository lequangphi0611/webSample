import { Entity } from "../interface/entity";
import { Patient } from "./patient";
import { Doctor } from "./doctor";
import { User } from './user';

export interface Appointment extends Entity {
  timeOfService?: Date;

  shift?: number;

  timeRegistered?: Date;

  location?: string;

  appointmentCode?: string;

  status?: number;

  note?: string;

  departmentId?: number;

  departmentName?: string;

  createdBy?: number;

  doctorId?: number;

  patientId?: number;

  patientDTO?: Patient;

  doctorDTO?: Doctor;

  reason?: string;

  reasonCancel?: string;
}
