import { Entity } from "../interface/entity";
import { Appointment } from "./appointment";
import { User } from "./user";

export interface Doctor extends User, Entity {
  status?: number;

  userId?: number;

  studying?: string;

  experience?: string;

  bonus?: string;

  departmentId?: string;

  departmentName?: string;

  intro?: string;

  function?: string;

  appointments?: Appointment[];
}
