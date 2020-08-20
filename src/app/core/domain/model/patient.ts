import { User } from "./user";
import { Entity } from "../interface/entity";
import { Appointment } from "./appointment";

export interface Patient extends User, Entity {
  cardId?: string;

  insuranceCardNumber?: number;

  userId?: number;

  appointments?: Appointment[];
}
