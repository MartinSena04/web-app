import './FiltersLayout.css'
import { useState } from 'react'
import { useAppDispatch } from '../../hooks/store'

export const FiltersLayout = ({ children, cleanFilters}) => {

    const [isOpened, setIsOpened] = useState(true)


    return (
        <section className="filters-layout">
            <div className='filters-header'>
                <div>
                    <b>Buscar por:</b>
                </div>
                <div>
                    <button onClick={() => cleanFilters()}>Borrar filtros</button>
                    <button onClick={() => setIsOpened(!isOpened)}>Busqueda Avanzada</button>
                </div> 
            </div>
            {isOpened && <form className='inputs-box'>{children}</form>}
        </section>
    )
}