export interface Reservation {
    id: number;
    name: string;
    startAt: string;
    endAt: string;
    reserveId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export type ReservationsResponse = {
    data: Reservation[];
}

export interface ParamsProps {
    params: Promise<{id: string}>;
}

export type State = "IDLE" | "LOADING" | "SUCCESS" | "ERROR";