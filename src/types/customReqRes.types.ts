import { Request, Response } from "express";
import { ParamsDictionary, Send } from 'express-serve-static-core'
import { IncomingHttpHeaders } from "http";
import { UserType } from "./user.types";


export interface RequestType<T> extends Request {
    body: T;
}

export interface RequestTypes<T extends ParamsDictionary, U> extends Request {
    params: T;
    body: U
}

export interface ResponseType<ResBody> extends Response {
    json: Send<ResBody, this>
}

export interface TestType {
    proId: string;
    proName: string;
    proQty: number;
    proPrice: number;
}

export interface TplusType {
    proId: string;
    proName: string;
    proQty: number;
    proPrice: number;
}