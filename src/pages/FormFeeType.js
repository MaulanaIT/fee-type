// Import Library
import React, { useState } from 'react';
import { Formik } from 'formik';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Import Library Components
import { cx } from '../components/Helper';
import { InsertData, ShowPopupResponse, UpdateData } from '../components/store/ReducerDataDummy';

// Import Assets
import IconDanger from '../assets/ic-danger-triangle.svg';

// Import Styles
import global from '../styles/global.module.css';
import style from '../styles/formfeetype.module.css';

export default function FormFeeType() {

    const location = useLocation();

    // Variable for Form Type
    const type = location.state.type === 'create' ? 'Create' :
        location.state.type === 'edit' ? 'Edit' :
            location.state.type === 'detail' && 'Details';

    // State for Switch Tab Language
    const [getActiveTab, setActiveTab] = useState(1);

    // State for Controlled Component
    const [getValueDescription, setValueDescription] = useState(type === 'Create' ? '' : location.state.data.description);
    const [getValueFeeTypeCode, setValueFeeTypeCode] = useState(type === 'Create' ? '' : location.state.data.fee_type_code);
    const [getValueFeeTypeName, setValueFeeTypeName] = useState(type === 'Create' ? '' : location.state.data.fee_type_name);

    // State for Controlled Component
    const [getValueDescriptionIndonesia, setValueDescriptionIndonesia] = useState(type === 'Create' ? '' : location.state.data.language.indonesia.description);
    const [getValueFeeTypeNameIndonesia, setValueFeeTypeNameIndonesia] = useState(type === 'Create' ? '' : location.state.data.language.indonesia.fee_type_name);
    const [getValueDescriptionChinese, setValueDescriptionChinese] = useState(type === 'Create' ? '' : location.state.data.language.chinese.description);
    const [getValueFeeTypeNameChinese, setValueFeeTypeNameChinese] = useState(type === 'Create' ? '' : location.state.data.language.chinese.fee_type_name);

    // Data Dummy From React-Redux Store
    const FeeTaxType = useSelector((state) => state.store.FeeTaxType);
    const DataExclude = FeeTaxType.filter(item => item.id !== location?.state?.data?.id && item?.status > 0);

    const dispatch = useDispatch();

    // Testing Save for Failed Condition
    const FailedSave = () => {
        dispatch(ShowPopupResponse({ response: `Failed to save this record.`, link: '' }));
    }

    // Insert New Data Fee Type
    const InsertFeeType = () => {
        const formData = {
            id: FeeTaxType.length + 1,
            fee_type_code: getValueFeeTypeCode,
            fee_type_name: getValueFeeTypeName,
            description: getValueDescription,
            status: 1,
            language: {
                indonesia: {
                    fee_type_name: getValueFeeTypeNameIndonesia,
                    description: getValueDescriptionIndonesia
                },
                chinese: {
                    fee_type_name: getValueFeeTypeNameChinese,
                    description: getValueDescriptionChinese
                },
            },
        }

        dispatch(InsertData(formData));
        dispatch(ShowPopupResponse({ response: `Record '${getValueFeeTypeName}' has been successfully saved.`, link: '/master-data-management/fee-type' }));
    }

    // Update Data Fee Type
    const UpdateFeeType = () => {
        const formData = {
            id: location.state.data.id,
            fee_type_code: getValueFeeTypeCode,
            fee_type_name: getValueFeeTypeName,
            description: getValueDescription,
            status: 1,
            language: {
                indonesia: {
                    fee_type_name: getValueFeeTypeNameIndonesia,
                    description: getValueDescriptionIndonesia
                },
                chinese: {
                    fee_type_name: getValueFeeTypeNameChinese,
                    description: getValueDescriptionChinese
                },
            },
        }

        dispatch(UpdateData(formData));
        dispatch(ShowPopupResponse({ response: `Record '${getValueFeeTypeName}' has been successfully updated.`, link: '/master-data-management/fee-type' }));
    }

    return (
        <Formik
            initialValues={{
                fee_name: type === 'Create' ? '' : getValueFeeTypeName,
                fee_description: type === 'Create' ? '' : getValueDescription,
                fee_code: type === 'Create' ? '' : getValueFeeTypeCode,
                fee_name_indonesia: type === 'Create' ? '' : getValueFeeTypeNameIndonesia,
                fee_description_indonesia: type === 'Create' ? '' : getValueDescriptionIndonesia,
                fee_name_chinese: type === 'Create' ? '' : getValueFeeTypeNameChinese,
                fee_description_chinese: type === 'Create' ? '' : getValueDescriptionChinese,
            }}
            validate={values => {
                const errors = {};

                if (values.fee_name === '')
                    errors.fee_name = 'Fee Type Name is required';
                else if (DataExclude.some(item => item.fee_type_name === values.fee_name))
                    errors.fee_name = 'Fee Type Name already exists';

                if (values.fee_code === '')
                    errors.fee_code = 'Fee Type Code is required';
                else if (DataExclude.some(item => item.fee_type_code === values.fee_code))
                    errors.fee_name = 'Fee Type Code already exists';

                if (values.fee_name_indonesia === '')
                    errors.fee_name_indonesia = 'Fee Type Name for Indonesia Language is required';
                else if (DataExclude.some(item => item.language.indonesia.fee_type_name === values.fee_name_indonesia))
                    errors.fee_name = 'Fee Type Name for Language Indonesia already exists';

                if (values.fee_name_chinese === '')
                    errors.fee_name_chinese = 'Fee Type Name for Indonesia Chinese is required';
                else if (DataExclude.some(item => item.language.chinese.fee_type_name === values.fee_name_chinese))
                    errors.fee_name = 'Fee Type Name for Chinese Indonesia already exists';

                // Update State for Controlled Component
                setValueDescription(values.fee_description);
                setValueFeeTypeCode(values.fee_code);
                setValueFeeTypeName(values.fee_name);
                setValueFeeTypeNameIndonesia(values.fee_name_indonesia);
                setValueDescriptionIndonesia(values.fee_description_indonesia);
                setValueFeeTypeNameChinese(values.fee_name_chinese);
                setValueDescriptionChinese(values.fee_description_chinese);

                return errors;
            }}
            onSubmit={() => {
                // Function When Submit Save
                if (type === 'Create') InsertFeeType();
                else if (type === 'Edit') UpdateFeeType();
            }}>
            {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <React.Fragment>
                    <div className={global.pages}>
                        <p>Master Data Management</p>
                        <p>{'>'}</p>
                        <Link to={'/master-data-management/fee-type'}>Fee Type</Link>
                        <p>{'>'}</p>
                        <p className={global.active}>{type} Fee Type</p>
                    </div>
                    <p className={global.title}>{type} Fee Type</p>
                    <form>
                        <div className={global.card}>
                            <div className={style.form}>
                                <div className={style.detail}>
                                    <div className={style.input}>
                                        <p>Fee Type Name <span className={global.label_important}>*</span> <sup className={global.label_info}>i</sup></p>
                                        <div className={global.input_group}>
                                            <input type="text" name='fee_name' maxLength={256} minLength={1} value={values.fee_name} onChange={handleChange} onBlur={handleBlur} required={true} />
                                            <div className={global.error}>{errors.fee_name}</div>
                                        </div>
                                    </div>
                                    <div className={style.input}>
                                        <p>Description</p>
                                        <div className={global.input_group}>
                                            <textarea name='fee_description' cols="30" rows="5" maxLength={4000} minLength={1} value={values.fee_description} onChange={handleChange} onBlur={handleBlur}></textarea>
                                            <div className={global.error}>{errors.fee_description}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.code}>
                                    <p className={style.title}>For Interface Purpose</p>
                                    <div className={style.input}>
                                        <p>Fee Type Code <span className={global.label_important}>*</span> <sup className={global.label_info}>i</sup></p>
                                        <div className={global.input_group}>
                                            <input type="text" name='fee_code' maxLength={36} minLength={1} value={values.fee_code} onChange={handleChange} onBlur={handleBlur} required={true} />
                                            <div className={global.error}>{errors.fee_code}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.translation}>
                                <p className={style.title}>Translation</p>
                                <div className={style.form_tab}>
                                    <div className={style.tab}>
                                        <div className={cx(global.card, style.card, getActiveTab === 2 && style.disabled)} onClick={() => setActiveTab(1)}>Indonesia {getValueFeeTypeNameIndonesia === '' && <sup><img src={IconDanger} width={16} heigh={16} alt="Icon Danger" /></sup>} </div>
                                        <div className={cx(global.card, style.card, getActiveTab === 1 && style.disabled)} onClick={() => setActiveTab(2)}>Chinese Simplified {getValueFeeTypeNameChinese === '' && <sup><img src={IconDanger} width={16} heigh={16} alt="Icon Danger" /></sup>} </div>
                                        <div className={style.note}>Note: <sup><img src={IconDanger} width={12} heigh={12} alt="Icon Danger" /></sup> Incomplete Data</div>
                                    </div>
                                    <div className={cx(global.card, style.card, style.form)}>
                                        <div className={style.detail}>
                                            {getActiveTab === 1 ?
                                                <React.Fragment>
                                                    <div className={style.input}>
                                                        <p>Fee Type Name <span className={global.label_important}>*</span> <sup className={global.label_info}>i</sup></p>
                                                        <div className={global.input_group}>
                                                            <input name='fee_name_indonesia' type="text" maxLength={256} minLength={1} value={values.fee_name_indonesia} onChange={handleChange} onBlur={handleBlur} required={true} />
                                                            <div className={global.error}>{errors.fee_name_indonesia}</div>
                                                        </div>
                                                    </div>
                                                    <div className={style.input}>
                                                        <p>Description</p>
                                                        <div className={global.input_group}>
                                                            <textarea name='fee_description_indonesia' cols="30" rows="5" maxLength={4000} minLength={1} value={values.fee_description_indonesia} onChange={handleChange} onBlur={handleBlur}></textarea>
                                                            <div className={global.error}>{errors.fee_description_indonesia}</div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                                :
                                                getActiveTab === 2 &&
                                                <React.Fragment>
                                                    <div className={style.input}>
                                                        <p>Fee Type Name <span className={global.label_important}>*</span> <sup className={global.label_info}>i</sup></p>
                                                        <div className={global.input_group}>
                                                            <input name='fee_name_chinese' type="text" maxLength={256} minLength={1} value={values.fee_name_chinese} onChange={handleChange} onBlur={handleBlur} required={true} />
                                                            <div className={global.error}>{errors.fee_name_chinese}</div>
                                                        </div>
                                                    </div>
                                                    <div className={style.input}>
                                                        <p>Description</p>
                                                        <div className={global.input_group}>
                                                            <textarea name='fee_description_chinese' cols="30" rows="5" maxLength={4000} minLength={1} value={values.fee_description_chinese} onChange={handleChange} onBlur={handleBlur}></textarea>
                                                            <div className={global.error}>{errors.fee_description_chinese}</div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.action}>
                            {type === 'Details' ?
                                <Link to={'/master-data-management/fee-type'} className={cx(style.back, global.button)}>BACK</Link>
                                :
                                <React.Fragment>
                                    <div disabled={isSubmitting} className={cx(style.save, global.button)} onClick={handleSubmit}>SAVE</div>
                                    <div disabled={isSubmitting} className={cx(style.save, global.button)} onClick={FailedSave}>FAILED SAVE</div>
                                    <Link to={'/master-data-management/fee-type'} className={cx(style.cancel, global.button)}>CANCEL</Link>
                                </React.Fragment>
                            }
                        </div>
                    </form>
                </React.Fragment>
            )}
        </Formik>
    )
}
