// Import Library
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Import Library Components
import { cx } from './Helper';
import { HidePopupResponse } from '../components/store/ReducerDataDummy';

// Import Styles
import global from '../styles/global.module.css';
import style from '../styles/popupresponse.module.css';

export default function PopupResponse() {

    const PopupResponse = useSelector((state) => state.store.PopupResponse);

    const dispatch = useDispatch();

    return (
        <div className={style.popup}>
            <div className={style.container}>
                <p className={style.response}>{PopupResponse.response}</p>
                <div className={style.action}>
                    {PopupResponse.link === '' ?
                        <button type='button' className={cx(global.button, style.close)} onClick={() => dispatch(HidePopupResponse())}>OK</button>
                        :
                        <Link to={PopupResponse.link} className={cx(global.button, style.close)} onClick={() => dispatch(HidePopupResponse())}>OK</Link>
                    }
                </div>
            </div>
        </div >
    )
}
