import { createContext,useState} from "react";


export const DriversContext = createContext();

export default function DriversProvider({children}) {

    const [pageSize, setPageSize] = useState(3)
    const [page, setPage] = useState(1)

    return (
        <DriversContext.Provider value={{
            pageSize,
            setPageSize,
            page,
            setPage,
        }}>
            {children}
        </DriversContext.Provider>
    )
}