import { Entity } from "../interface/entity";
import { Nurse } from "./nurse";
import { Appointment } from "./appointment";
import { Doctor } from './doctor';

export interface Department extends Entity {
  name?: string;

  note?: string;

  introduction?: string;
  
  equipment?: string;

  doctors?: Doctor[];

  nurses?: Nurse[];

  appointments?: Appointment[];
}
