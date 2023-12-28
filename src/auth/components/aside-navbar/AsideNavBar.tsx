import { Link } from 'react-router-dom';
import './AsideNavBar.css';
import { useState } from 'react';
import { menuItems } from './MenuItems';


export default function AsideNavBar() {

    const [activeIndex, setActiveIndex] = useState<number|null>(null);

    const handleClick = (index:number) => {
    // Si se clickea en el ítem que ya está abierto, lo cerramos.
    if (index === activeIndex) {
        setActiveIndex(null);
    } else {
        setActiveIndex(index);
    }
    };

    return(
        <section className="aside-navbar">
            <div className="asideNavBar__logo">
                <img src='/assets/logo-soyde.png' alt='logo' />
            </div>
            <div className="asideNavBar__menu">
                {menuItems.map((item, index) => (
                <div key={index}>
                    <div onClick={() => handleClick(index)}>
                    {item.icon} {item.name}
                    </div>
                    {activeIndex === index && (
                    <div className="subMenu">
                        {item.subMenu.map((subItem, subIndex) => (
                        <div key={subIndex}>
                            <Link to={subItem.link}>{subItem.name}</Link>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
                ))}
            </div>
            <div className="asideNavBar__avatar">
                <img src='/assets/avatar.png' alt='avatar' />
            </div>
        </section>
    )

}