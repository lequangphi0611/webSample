import { environment } from "../../environments/environment";

const API_URL = `http://${environment.apiUrl}/api`;

export const API = {
  BASE: API_URL,
  URL: environment.apiUrl
};

export enum ROLE {
  // ANONYMOUS,
  // ADMIN,
  // PATIENT,
  // NURSE,
  // DOCTOR,
  // USER

  ADMIN = "ROLE_ADMIN",
  PATIENT = "ROLE_PATIENT",
  NURSE = "ROLE_NURSE",
  DOCTOR = 'ROLE_DOCTOR',
  USER = 'ROLE_USER',
}

export enum APPOINTMENT {
  NONE,
  REQUEST,
  APPROVE,
  CANCEL,
  SUCCESS,
  ASSIGN,
  FINISH,
  TIME_1 = 1,
  TIME_2 = 2,
  TIME_3 = 3,
  TIME_4 = 4,
  TIME_5 = 5,
  TIME_6 = 6,
  TIME_7 = 7,
  TIME_8 = 8,
  TIME_9 = 9,
  TIME_10 = 10,
  TIME_11 = 11,
  TIME_12 = 12,
  
  REQUEST_LABEL = 'Đang đợi',
  APPROVE_LABEL = 'Đã duyệt',
  CANCEL_LABEL = 'Đã hủy',
  SUCCESS_LABEL = 'Đã hoàn thành',
  FINISH_LABEL = 'Đã kết thúc',

  APP_TIME_1 = '7:00 AM - 7:30 AM',
  APP_TIME_2 = '7:40 AM - 8:10 AM',
  APP_TIME_3 = '8:20 AM - 8:50 AM',
  APP_TIME_4 = '9:00 AM - 9:30 AM',
  APP_TIME_5 = '9:40 AM - 10:10 AM',
  APP_TIME_6 = '10:20 AM - 10:50 AM',  
  APP_TIME_7 = '11:00 AM - 11:30 AM',

  APP_TIME_8 = '1:30 PM - 2:00 PM',
  APP_TIME_9 = '2:10 PM - 2:40 PM',
  APP_TIME_10 = '2:50 PM - 3:20 PM',
  APP_TIME_11 = '3:30 PM - 4:00 PM',
  APP_TIME_12 = '4:10 PM - 4:40 PM'
}

export enum BLOOD_GROUP {
  BLOOD_GROUP_1,
  BLOOD_GROUP_2,
  BLOOD_GROUP_3,
  BLOOD_GROUP_4,
  BLOOD_GROUP_1_LABEL = 'A',
  BLOOD_GROUP_2_LABEL = 'B',
  BLOOD_GROUP_3_LABEL = 'AB',
  BLOOD_GROUP_4_LABEL = 'O'
}