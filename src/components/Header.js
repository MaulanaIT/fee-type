// Import Library
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Import Library Components
import { cx } from './Helper';
import { ToggleSidebar } from './store/ReducerDataDummy';

// Import Assets
import IconBars from '../assets/ic-bars.svg';
import IconBell from '../assets/ic-bell.svg';
import IconLogo from '../assets/ic-logo.svg';
import IconLockOpen from '../assets/ic-lock-open.svg';
import IconLogout from '../assets/ic-logout.svg';
import IconUser from '../assets/ic-user.svg';
import IconUserCircle from '../assets/ic-user-circle.svg';

// Import Styles
import style from '../styles/header.module.css';

export default function Header() {

    const [getActiveNotification, setActiveNotification] = useState(false);
    const [getActivePopup, setActivePopup] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();

    // Auto Close Popup Profile when page change
    useEffect(() => {
        setActiveNotification(false);
        setActivePopup(false);
    }, [location.pathname]);

    return (
        <nav>
            <div className={style.logo}>
                <img src={IconBars} className={style.toggle} width={36} height={36} alt="Icon Bars" onClick={() => dispatch(ToggleSidebar())} />
                <img src={IconLogo} width={200} height={48} alt="Icon Logo" />
            </div>
            <div className={style.menu}>
                <p className={style.question}>?</p>
                <div className={style.notification}>
                    <img src={IconBell} width={24} height={24} alt="Icon Notification" onClick={() => setActiveNotification(prevState => !prevState)} />
                    <div className={cx(style.popup, getActiveNotification && style.active)}>
                        <div className={style.item}>No Notification</div>
                    </div>
                </div>
                <div className={style.profile}>
                    <img src={IconUserCircle} width={38} height={38} alt="Icon Profile" onClick={() => setActivePopup(prevState => !prevState)} />
                    <div className={cx(style.popup, getActivePopup && style.active)}>
                        <div className={style.profile}>
                            <img src={IconUserCircle} width={48} height={48} alt="Icon Profile" />
                            <div className={style.data}>
                                <p className={style.name}>Patrick Jane</p>
                                <p className={style.job}>Administrator</p>
                            </div>
                        </div>
                        <div className={style.menu}>
                            <ul>
                                <li>
                                    <img src={IconUser} width={12} heigh={12} alt="Icon User" />
                                    <p>My Profile</p>
                                </li>
                                <li>
                                    <img src={IconLockOpen} width={12} heigh={12} alt="Icon Lock Open" />
                                    <p>Change Password</p>
                                </li>
                                <li>
                                    <img src={IconLogout} width={12} heigh={12} alt="Icon Logout" />
                                    <p>Sign Out</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
