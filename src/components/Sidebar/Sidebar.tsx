import { House } from 'lucide-react'
import './styles.css'

export default function Sidebar () {
    return (<aside className="sidebar">
        <a href='/'><House />Inicio</a>
        <a href='/Home'>Pagina Home</a>
    </aside>)
}
