// Import Library
import loadable from '@loadable/component';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

// Import Styles
import 'bootstrap/dist/css/bootstrap.css';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.css';
import 'datatables.net-select-bs5/css/select.bootstrap5.css';
import global from './styles/global.module.css';

// Import Javascript
import 'datatables.net/js/jquery.dataTables';
import 'datatables.net-bs5/js/dataTables.bootstrap5';
import 'datatables.net-select-bs5/js/select.bootstrap5';

// Lazy Loading
const Footer = loadable(() => import('./components/Footer'));
const FormFeeType = loadable(() => import('./pages/FormFeeType'));
const Header = loadable(() => import('./components/Header'));
const FeeType = loadable(() => import('./pages/FeeType'));
const PopupConfirmation = loadable(() => import('./components/PopupConfirmation'));
const PopupResponse = loadable(() => import('./components/PopupResponse'));
const Sidebar = loadable(() => import('./components/Sidebar'));

export default function App() {

    const StatePopupConfirmation = useSelector((state) => state.store.PopupConfirmation);
    const StatePopupResponse = useSelector((state) => state.store.PopupResponse);

    return (
        <div className={global.container}>
            {StatePopupResponse.active && <PopupResponse />}
            {StatePopupConfirmation.active && <PopupConfirmation />}
            <Sidebar />
            <div className={global.content}>
                <Header />
                <div className={global.box}>
                    <Routes>
                        <Route path={'/'} element={<Navigate to={'/master-data-management/fee-type'} />} />
                        <Route path={'/master-data-management/fee-type'} element={<FeeType />} />
                        <Route path={'/master-data-management/create-fee-type'} element={<FormFeeType />} />
                        <Route path={'/master-data-management/edit-fee-type'} element={<FormFeeType />} />
                        <Route path={'/master-data-management/detail-fee-type'} element={<FormFeeType />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </div>
    )
}