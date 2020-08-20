import { RouteInfo } from './sidebar.metadata';
import { ROLE } from '../config';

export const ROUTES: RouteInfo[] = [
    {
        path: '/', title: 'Bảng điều khiển', icon: 'ft-command', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE]
    },
    {
        path: 'medical-history/list', title: 'Lịch sử khám bệnh', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.PATIENT, ROLE.DOCTOR, ROLE.NURSE, ROLE.ADMIN]
    },
    {
        path: '', title: 'Cuộc hẹn', icon: 'icon-notebook', class: 'has-sub', badge: '5', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', role: [ROLE.PATIENT, ROLE.DOCTOR, ROLE.NURSE, ROLE.ADMIN],
        submenu: [
            { path: 'appointments/add', title: 'Tạo cuộc hẹn', icon: '', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.PATIENT, ROLE.NURSE, ROLE.ADMIN]},
            { path: 'appointments/list', title: 'Tất cả cuộc hẹn', icon: '', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE]},
            { path: 'appointments/waiting', title: 'Cuộc hẹn đang chờ', icon: '', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE]},
            { path: 'appointments/cancel', title: 'Cuộc hẹn đã hủy', icon: '', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE]},
            { path: 'appointments/finished', title: 'Cuộc hẹn đã kết thúc', icon: '', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE]},
        ]
    },
    {
        path: 'doctors/list', title: 'Bác sĩ', icon: 'ft-user', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE]
    },
    {
        path: 'nurses/list', title: 'Y tá', icon: 'ft-users', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN]
    },
    {
        path: 'patients/list', title: 'Bệnh nhân', icon: 'ft-user-check', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE]
    },
    {
        path: 'departments/list', title: 'Khoa', icon: 'icon-notebook', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN]
    }
];

export const ROUTES_DOCTOR: RouteInfo[] = [
    {
        path: 'task/list', title: 'Công việc', icon: 'ft-list', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.DOCTOR, ROLE.NURSE, ROLE.PATIENT]
    },
    {
        path: 'medical-history/list', title: 'Lịch sử khám bệnh', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.PATIENT, ROLE.DOCTOR, ROLE.NURSE, ROLE.ADMIN]
    },
    {
        path: 'appointments/waiting', title: 'Cuộc hẹn đang chờ', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.PATIENT, ROLE.DOCTOR, ROLE.NURSE, ROLE.ADMIN]
    },
    {
        path: 'appointments/finished', title: 'Cuộc hẹn đã kết thúc', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.PATIENT, ROLE.DOCTOR, ROLE.NURSE, ROLE.ADMIN]
    },
    {
        path: 'appointments/cancel', title: 'Cuộc hẹn đã hủy', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.PATIENT, ROLE.DOCTOR, ROLE.NURSE, ROLE.ADMIN]
    },
];

export const ROUTES_PATIENT: RouteInfo[] = [
    {
        path: 'task/list', title: 'Cuộc hẹn sắp tới', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.PATIENT, ROLE.DOCTOR, ROLE.NURSE, ROLE.ADMIN]
    },
    {
        path: 'medical-history/list', title: 'Lịch sử khám bệnh', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.PATIENT, ROLE.DOCTOR, ROLE.NURSE, ROLE.ADMIN]
    },
    {
        path: '', title: 'Cuộc hẹn', icon: 'icon-notebook', class: 'has-sub', badge: '4', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', role: [ROLE.PATIENT, ROLE.DOCTOR, ROLE.NURSE, ROLE.ADMIN],
        submenu: [
            { path: 'appointments/add', title: 'Tạo cuộc hẹn', icon: '', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.PATIENT, ROLE.NURSE, ROLE.ADMIN]},
            { path: 'appointments/waiting', title: 'Cuộc hẹn đang chờ', icon: '', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE]},
            { path: 'appointments/cancel', title: 'Cuộc hẹn đã hủy', icon: '', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE, ROLE.PATIENT, ROLE.DOCTOR]},
            { path: 'appointments/finished', title: 'Cuộc hẹn đã kết thúc', icon: '', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE, ROLE.PATIENT, ROLE.DOCTOR]}
        ]
    }
];

export const ROUTES_NURSE: RouteInfo[] = [
    {
        path: '/', title: 'Bảng điều khiển', icon: 'ft-command', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE]
    },
    {
        path: 'medical-history/list', title: 'Lịch sử khám bệnh', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.PATIENT, ROLE.DOCTOR, ROLE.NURSE, ROLE.ADMIN]
    },
    {
        path: '', title: 'Cuộc hẹn', icon: 'icon-notebook', class: 'has-sub', badge: '5', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', role: [ROLE.PATIENT, ROLE.DOCTOR, ROLE.NURSE, ROLE.ADMIN],
        submenu: [
            { path: 'appointments/add', title: 'Tạo cuộc hẹn', icon: '', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.PATIENT, ROLE.NURSE, ROLE.ADMIN]},
            { path: 'appointments/list', title: 'Tất cả cuộc hẹn', icon: '', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE]},
            { path: 'appointments/waiting', title: 'Cuộc hẹn đang chờ', icon: '', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE]},
            { path: 'appointments/cancel', title: 'Cuộc hẹn đã hủy', icon: '', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE, ROLE.PATIENT, ROLE.DOCTOR]},
            { path: 'appointments/finished', title: 'Cuộc hẹn đã kết thúc', icon: '', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE, ROLE.PATIENT, ROLE.DOCTOR]}
        ]
    },
    {
        path: 'doctors/list', title: 'Bác sĩ', icon: 'ft-user', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE]
    },
    {
        path: 'patients/list', title: 'Bệnh nhân', icon: 'ft-user-check', class: '', badge: '', badgeClass: '', submenu: [], role: [ROLE.ADMIN, ROLE.NURSE]
    }
];