import { ExecutionContext } from '@nestjs/common';
declare const AdminGuard_base: {
    new (...args: any[]): {
        canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
        handleRequest(err: any, user: any): any;
        logIn<TRequest extends {
            logIn: Function;
        } = any>(request: TRequest): Promise<void>;
        getAuthenticateOptions(context: ExecutionContext): import("@nestjs/passport").IAuthModuleOptions<any>;
        getRequest<T = any>(context: ExecutionContext): T;
    };
    apply(this: Function, thisArg: any, argArray?: any): any;
    call(this: Function, thisArg: any, ...argArray: any[]): any;
    bind(this: Function, thisArg: any, ...argArray: any[]): any;
    toString(): string;
    readonly length: number;
    arguments: any;
    caller: Function;
    readonly name: string;
    [Symbol.hasInstance](value: any): boolean;
};
export declare class AdminGuard extends AdminGuard_base {
}
declare const MemberGuard_base: {
    new (...args: any[]): {
        canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
        handleRequest(err: any, user: any): any;
        logIn<TRequest extends {
            logIn: Function;
        } = any>(request: TRequest): Promise<void>;
        getAuthenticateOptions(context: ExecutionContext): import("@nestjs/passport").IAuthModuleOptions<any>;
        getRequest<T = any>(context: ExecutionContext): T;
    };
    apply(this: Function, thisArg: any, argArray?: any): any;
    call(this: Function, thisArg: any, ...argArray: any[]): any;
    bind(this: Function, thisArg: any, ...argArray: any[]): any;
    toString(): string;
    readonly length: number;
    arguments: any;
    caller: Function;
    readonly name: string;
    [Symbol.hasInstance](value: any): boolean;
};
export declare class MemberGuard extends MemberGuard_base {
}
export {};
