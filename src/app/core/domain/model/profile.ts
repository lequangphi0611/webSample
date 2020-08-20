import { User } from "./user";
import { Entity } from "../interface/entity";
import { Appointment } from "./appointment";

export interface Profile extends User, Entity {
    
  cardId?: string;

  insuranceCardNumber?: number;

  userId?: number;

  status?: number;

  bonus?: string;

  appointments?: Appointment[];

  studying?: string;

  experience?: string;

  intro?: string;

  departmentId?: number;

  departmentName?: string;

  function?: string;

}
