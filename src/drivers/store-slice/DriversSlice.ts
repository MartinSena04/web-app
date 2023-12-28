import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FiltersType {
    name: string;
    age: string;
    team: string;
    country: string;
    position: string;
}

const initialState = {

    filters:{
        id: "",
        names: "",
        state: "",
        cellphoneWork: "",
    },
}

export const driversFilterSlice = createSlice({
    name: "driversFilter",
    initialState,
    reducers: {
        updateFilters: (state, action:PayloadAction<{name:string,value:string}>) => {
            const {name, value} = action.payload;
            const newFilters = {...state.filters, [name]: value};
            return {...state, filters: newFilters};
        },

        deleteFilters: (state) => {
            return {...state, filters: initialState.filters};
        }
    },
});

export default driversFilterSlice.reducer;
export const { updateFilters, deleteFilters } = driversFilterSlice.actions;
