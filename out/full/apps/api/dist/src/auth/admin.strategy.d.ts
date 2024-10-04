export type AzureADJwtPayload = {
    sub: string;
    name: string;
    email: string;
    roles: string;
};
declare const AzureADStrategy_base: new (...args: any[]) => any;
export declare class AzureADStrategy extends AzureADStrategy_base {
    constructor();
    validate(payload: AzureADJwtPayload): Promise<{
        sub: string;
        name: string;
        email: string;
        roles: string;
    }>;
}
export {};
