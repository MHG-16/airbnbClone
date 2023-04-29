import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<
    Listing,
    'createdAt'
> & {
    createdAt: String
}

export type safeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: String,
    startDate: String,
    endDate: String,
    listing: SafeListing
}

export type SafeUser = Omit<
    User,
    'createdAt' | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified?: string | null;
}