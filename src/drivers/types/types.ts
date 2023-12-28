export interface ApiDriver {
    id: number;
    names: string;
    signup_state: string;
    cellphone_work: string;
}

export interface FrontDriver {
    id: number;
    names: string;
    state: string;
    cellphoneWork: string;
}

export function apiToFrontDriver(apiDriver: ApiDriver): FrontDriver {
    return {
        id: apiDriver.id,
        names: apiDriver.names,
        state: apiDriver.signup_state,
        cellphoneWork: apiDriver.cellphone_work,
    };
}
