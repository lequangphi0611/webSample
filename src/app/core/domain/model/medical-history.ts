import { Appointment } from "./appointment";
import { Entity } from '../interface/entity';

export interface MedicalHistory extends Entity, Appointment {
  adviceFromDoctor?: string;
  
  result?: string;
  
  height?: number;

  weight?: number;

  bloodGroup?: number;

  bloodPressure?: string;

  tempBody?: number;

  remedial?: string;
  
  signsOfIllness?: string;
  
  note?: string;

  appointmentId?: number;

  userId?: number;
}
