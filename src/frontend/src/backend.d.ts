import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface VisaApplication {
    status: ApplicationStatus;
    dateOfBirth: string;
    lastUpdated: Time;
    submissionDate: Time;
    passportNumber: string;
    applicationType: string;
    applicationReferenceNumber: string;
}
export type Time = bigint;
export enum ApplicationStatus {
    in_progress = "in_progress",
    approved = "approved",
    declined = "declined",
    received = "received"
}
export interface backendInterface {
    getVisaApplication(referenceNumber: string): Promise<VisaApplication | null>;
    seedSampleApplications(): Promise<void>;
    submitVisaApplication(referenceNumber: string, passportNumber: string, dateOfBirth: string, applicationType: string): Promise<void>;
    updateApplicationStatus(referenceNumber: string, newStatus: ApplicationStatus): Promise<void>;
}
