// Import Library
import React from 'react';
import { useState } from 'react';
import { cx } from './Helper';

// Import Assets
import IconBag from '../assets/ic-bag.svg';
import IconHome from '../assets/ic-home.svg';

// Import Styles
import style from '../styles/sidebar.module.css';

export default function Sidebar() {

    const [getActiveSidebar, setActiveSidebar] = useState(false);

    // Toggle Show Hide Sidebar
    const ToggleSidebar = () => {
        setActiveSidebar((prevState) => !prevState);
    }

    return (
        <div className={cx(style.container, getActiveSidebar && style.active)} onMouseEnter={ToggleSidebar} onMouseLeave={ToggleSidebar}>
            <ul>
                <li>
                    <img src={IconHome} width={24} height={24} alt="Icon Home" />
                    <p className={style.menu}>Dashboard</p>
                </li>
                <li>
                    <img src={IconBag} width={24} height={24} alt="Icon Bag" />
                    <p className={style.menu}>Master Data Management</p>
                </li>
                <li>
                    <p className={style.submenu}>Standard Mark-Up</p>
                </li>
                <li>
                    <p className={style.submenu}>Standard Service Fee</p>
                </li>
                <li>
                    <p className={cx(style.submenu, style.active)}>Fee Type</p>
                </li>
                <li>
                    <p className={style.submenu}>Frequent Traveler Program</p>
                </li>
                <li>
                    <p className={style.submenu}>Standard Ancillary Fee</p>
                </li>
                <li>
                    <p className={style.submenu}>Rating Type</p>
                </li>
                <li>
                    <p className={style.submenu}>Setup Flight Commision</p>
                </li>
                <li>
                    <p className={style.submenu}>Special Dates</p>
                </li>
                <li>
                    <p className={style.submenu}>Corporate Rating</p>
                </li>
            </ul>
        </div>
    )
}
