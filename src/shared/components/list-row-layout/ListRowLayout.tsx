import './ListRowLayout.css'
import { useNavigate } from 'react-router-dom'

export default function ListRowLayout({ children, id }) {

    const navigate = useNavigate()

    return (
        <tr className="list-row-layout" key={id}>
            {children}
            <td>
                <button onClick={() => navigate(`/home/conductores/modificar/${id}`)}>
                    Modificar
                </button>
            </td>
            <td>
                <button onClick={() => navigate(`/home/conductores/eliminar/${id}`)}>
                    Eliminar
                </button>
            </td>
        </tr>
    )
}