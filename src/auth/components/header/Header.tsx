import './Header.css';

export default function Header() {
    return(
        <section className="header">
            <div className="header__logo">
                <span>Nombre Usuario</span>
            </div>
            <div className="header__avatar">
                <img src='/assets/avatar.png' alt='avatar' />
            </div>
        </section>
    )
}
