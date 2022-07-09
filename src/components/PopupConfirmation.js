// Import Library
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import Library Components
import { cx } from './Helper';
import { HidePopupConfirmation, RemoveData, ShowPopupResponse } from './store/ReducerDataDummy';

// Import Styles
import global from '../styles/global.module.css';
import style from '../styles/popupresponse.module.css';

export default function PopupConfirmation() {

    const PopupConfirmation = useSelector((state) => state.store.PopupConfirmation);

    const dispatch = useDispatch();

    // Delete Single Fee Type by ID
    const DeleteCurrentItem = () => {
        dispatch(RemoveData(PopupConfirmation.id));
        dispatch(HidePopupConfirmation());
        dispatch(ShowPopupResponse({response: `Record Fee Type Name: ${PopupConfirmation.fee_type_name}' was successfully deleted.`, link: ''}));

        document.getElementById('select-all').checked = false;
    }

    return (
        <div className={style.popup}>
            <div className={style.container}>
                <p className={style.response}>{PopupConfirmation.response}</p>
                <div className={style.action}>
                    <button type='button' className={cx(global.button, style.delete)} onClick={DeleteCurrentItem}>DELETE</button>
                    <button type='button' className={cx(global.button, style.cancel)} onClick={() => dispatch(HidePopupConfirmation())}>CANCEL</button>
                </div>
            </div>
        </div >
    )
}
