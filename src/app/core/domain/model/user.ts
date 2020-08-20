import { Entity } from "../interface/entity";
import { Authority } from "./authority";
import { MedicalHistory } from "./medical-history";

// export enum AuthorityEnum {
//   User = 'ROLE_USER',
//   Admin = 'ROLE_ADMIN',
// }

// export namespace AuthorityNameSpace {

//   export function isAdmin (user: User) {
//     return user.authorities.includes(AuthorityEnum.Admin);
//   }

//   export function isUser (user: User) {
//     return user.authorities.includes(AuthorityEnum.User);
//   }
// }

export interface User extends Entity {
  firstName?: string;

  lastName?: string;

  phone?: string;

  gender?: number;

  imageUrl?: string;

  email?: string;

  birthday?: Date;

  address?: string;

  password?: string;

  activated?: number;

  createdDate?: Date;

  lastUpdatedDate?: Date;

  authorities?: Authority[];

  authoritiesAsString?: string[];

  authoritiesAsLong?: number[];

  medicalHistories?: MedicalHistory[];
}
