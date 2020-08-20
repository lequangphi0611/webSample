import { Entity } from "../interface/entity";
import { Appointment } from "./appointment";
import { User } from "./user";

export interface Nurse extends User, Entity {

  userId?: number;

  studying?: string;

  experience?: string;

  intro?: string;

  departmentId?: number;

  departmentName?: string;

  function?: string;

  appointments?: Appointment[];
}
