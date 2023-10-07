import { AdminLog, AdminLogAction } from "./intern";

export type GetAdminLogsRequest = {
    skip: number;
    take: number;
    action?: AdminLogAction;
    description?: string;
}

export type AdminLogsDto = {
    logs: AdminLog[];
    count: number;
}