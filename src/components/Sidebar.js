// Import Library
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import Library Components
import { cx } from './Helper';
import { ToggleSidebar } from './store/ReducerDataDummy';

// Import Assets
import IconBag from '../assets/ic-bag.svg';
import IconHome from '../assets/ic-home.svg';
import IconXMark from '../assets/ic-xmark.svg';

// Import Styles
import style from '../styles/sidebar.module.css';

export default function Sidebar() {
    
    const ActiveSidebar = useSelector((state) => state.store.Sidebar);
    const dispatch = useDispatch();

    // Toggle Show Hide Sidebar
    const SwitchSidebar = () => {
        window.innerWidth > 991 && dispatch(ToggleSidebar());
    }

    return (
        <div className={cx(style.container, ActiveSidebar.active && style.active)} onMouseEnter={SwitchSidebar} onMouseLeave={SwitchSidebar}>
            <img src={IconXMark} className={style.close} width={24} height={24} alt="Icon Close" onClick={() => dispatch(ToggleSidebar())} />
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
