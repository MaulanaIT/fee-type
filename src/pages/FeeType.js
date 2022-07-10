// Import Library
import $ from 'jquery';
import React from 'react';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import ReactToPrint from 'react-to-print';
import { CSVLink } from 'react-csv';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

// Import Library Component
import { ReplaceData, ShowPopupConfirmation, UpdateStatus } from '../components/store/ReducerDataDummy';
import { cx } from '../components/Helper';

// Import Assets
import IconAnglesDown from '../assets/ic-angles-down.svg';
import IconCreate from '../assets/ic-file-plus.svg';
import IconDelete from '../assets/ic-trash.svg';
import IconDownload from '../assets/ic-download.svg';
import IconEdit from '../assets/ic-pen.svg';
import IconPrint from '../assets/ic-print.svg';
import IconSearch from '../assets/ic-search.svg';
import IconView from '../assets/ic-eye.svg';

// Import Styles
import global from '../styles/global.module.css';
import style from '../styles/feetype.module.css';

export default function FeeType() {
    const [getActiveAdvancedOptions, setActiveAdvancedOptions] = useState(false);
    const [getHTMLFeeType, setHTMLFeeType] = useStateWithCallbackLazy([]);
    const [getPrintData, setPrintData] = useState([]);
    const [getSelectedData, setSelectedData] = useState([]);

    // State for Controlled Component
    const [getValueSearchTable, setValueSearchTable] = useState('');
    const [getValueSelectUpdateStatus, setValueSelectUpdateStatus] = useState('');

    // Data Dummy From React-Redux Store
    const FeeTaxType = useSelector((state) => state.store.FeeTaxType);
    const dispatch = useDispatch();

    const tableRef = useRef();

    useEffect(() => {
        // Generate Data for Download CSV
        let dataPrint = [];

        dataPrint.push([
            'No.', 'Fee Type Code', 'Fee Type Name', 'Description', 'Status'
        ]);

        // Generate Header CSV
        FeeTaxType.forEach(item => {
            dataPrint.push([
                item.id, item.fee_type_code, item.fee_type_name, item.description, item.status
            ]);
        });

        setPrintData(dataPrint)

        // Generate Table
        let htmlFeeType = [];

        if (FeeTaxType && FeeTaxType.length > 0) {
            FeeTaxType.forEach((item, index) => {
                if (item.status > 0) {
                    htmlFeeType.push(
                        <tr key={index}>
                            <td className={global.checkbox}></td>
                            <td className='d-none'>{item.id}</td>
                            <td className={`dt-control ${window.innerWidth > 991 ? 'd-none' : ''}`}></td>
                            <td>{item.fee_type_code}</td>
                            <td>{item.fee_type_name}</td>
                            <td className={window.innerWidth <= 991 ? 'd-none' : ''}>{item.description}</td>
                            <td className={window.innerWidth <= 991 ? 'd-none' : ''}>{item.status === 1 ? 'Active' : item.status === 3 && 'Inactive'}</td>
                            <td>
                                <div className={global.action}>
                                    <Link to={'/master-data-management/edit-fee-type'} state={{ type: 'edit', data: item }} className={global.tooltip} tooltip="Click to Edit">
                                        <img src={IconEdit} width={20} height={20} alt="Icon Edit" />
                                    </Link>
                                    <Link to={'/master-data-management/detail-fee-type'} state={{ type: 'detail', data: item }} className={global.tooltip} tooltip="Click to View Details">
                                        <img src={IconView} width={20} height={20} alt="Icon Detail" />
                                    </Link>
                                    <div className={global.tooltip} tooltip="Click to Delete">
                                        <img src={IconDelete} width={20} height={20} alt="Icon Delete" onClick={() => dispatch(ShowPopupConfirmation({ id: item.id, fee_type_name: item.fee_type_name, response: `Are you sure you want to delete 'Fee Type Name: ${item.fee_type_name}'?` }))} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    );
                }
            });
        }

        $(`#table-data`).DataTable().destroy();

        setHTMLFeeType(htmlFeeType, () => {
            // Draw Table
            DrawTable();
        });
        // eslint-disable-next-line
    }, [FeeTaxType]);

    // Custom Search
    useEffect(() => {
        $.fn.dataTable.ext.search.push(function (setting, data, dataIndex) {
            let search = getValueSearchTable;

            let result = false;

            for (let i = 0; i < data.length; i++) {
                if (data[i].includes(search)) {

                    result = true;

                    break;
                }
            }

            return result;
        });
        // eslint-disable-next-line
    }, [getValueSearchTable]);

    useEffect(() => {
        if (getValueSelectUpdateStatus !== '') UpdateSelectItemStatus();
        // eslint-disable-next-line
    }, [getValueSelectUpdateStatus,]);

    // Draw Table ( Recommended using Server Side for live production )
    const DrawTable = () => {
        $(`#table-data`).DataTable().destroy();

        let dataTable = $(`#table-data`).DataTable({
            columnDefs: [{
                checkBoxes: {
                    selectRow: true,
                    selectAllPages: true
                },
                className: 'select-checkbox',
                orderable: false,
                targets: 0
            }],
            dom: 't<"d-flex align-items-center gap-sm-4 gap-2 justify-content-sm-between justify-content-center flex-wrap"<"d-flex align-items-center gap-4"li><<Page>p>>r',
            language: {
                info: 'Showing _START_ - _END_ of _TOTAL_',
                lengthMenu: '_MENU_',
                paginate: {
                    next: '>',
                    previous: '<'
                },
                zeroRecords: 'No Fee Type found',
            },
            lengthMenu: [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, 'All'],
            ],
            order: [[1, 'asc']],
            select: {
                style: 'multi',
                selector: 'td:first-child'
            }
        });

        $(`#select-all`).on('click', function () {
            let selectedData = [];

            if (this.checked) dataTable.rows().select();
            else dataTable.rows().deselect();

            let data = dataTable.rows({ selected: true }).data();

            for (let i = 0; i < data.length; i++) {
                let temp = [];

                temp = {
                    id: +data[i][1],
                    fee_type_code: +data[i][2],
                    fee_type_name: data[i][3],
                    description: data[i][4],
                    status: data[i][5],
                };

                selectedData.push(temp);
            }

            console.log(selectedData);
            setSelectedData(selectedData);
        });

        dataTable.on('select deselect', function () {
            let selectedData = [];

            let data = dataTable.rows({ selected: true }).data();

            for (let i = 0; i < data.length; i++) {
                let temp = [];

                temp = {
                    id: +data[i][1],
                    fee_type_code: +data[i][2],
                    fee_type_name: data[i][3],
                    description: data[i][4],
                    status: data[i][5]
                };

                selectedData.push(temp);
            }

            setSelectedData(selectedData);
        });

        $(`#table-search`).on('keyup', function () {
            dataTable.draw();
        });

        function format(data) {
            return (
                '<table style="border: 0px solid transparent" class="w-100">' +
                '<tbody style="border: 0px solid transparent">' +
                '<tr>' +
                '<td>Description</td>' +
                '<td>' +
                data[5] +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Status:</td>' +
                '<td>' +
                data[6] +
                '</td>' +
                '</tbody>' +
                '</table>'
            );
        }

        $('#table-data tbody').on('click', 'td.dt-control', function () {
            var tr = $(this).closest('tr');
            var row = dataTable.row(tr);

            if (row.child.isShown()) {
                row.child.hide();
                tr.removeClass('shown');
            } else {
                row.child(format(row.data())).show();
                tr.addClass('shown');
            }
        });

        $.fn.DataTable.ext.pager.numbers_length = 3;
    }

    // Delete Multiple Fee Type
    const DeleteSelectItem = () => {
        let dataDummy = [...FeeTaxType];

        getSelectedData.forEach(item => {
            dataDummy.splice(
                dataDummy.findIndex(data => +data.id === +item.id),
                1
            );
        });

        document.getElementById('select-all').checked = false;

        dispatch(ReplaceData(dataDummy));
    }

    // Print Table
    const PrintTable = () => {
        let content = document.getElementById('table-data');
        let pri = document.getElementById('content-print').contentWindow;

        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }

    // Toggle Advanced Options
    const ToggleAdvancedOptions = () => {
        setActiveAdvancedOptions(prevState => !prevState);
    }

    // Update Status Multiple Fee Type
    const UpdateSelectItemStatus = () => {
        getSelectedData.forEach(item => {
            dispatch(UpdateStatus({ status: getValueSelectUpdateStatus, id: item.id }));
        });

        document.getElementById('select-all').checked = false;

        setValueSelectUpdateStatus('');
    }

    return (
        <React.Fragment>
            <iframe id="content-print" title='content-print' style={{ height: 0, position: 'absolute', width: 0 }}></iframe>
            <div className={global.pages}>
                <p>Master Data Management</p>
                <p>{'>'}</p>
                <p className={global.active}>Fee Type</p>
            </div>
            <p className={global.title}>Fee Type</p>
            <div className={style.header}>
                <div className={style.filter}>
                    <div className={global.input_group}>
                        <input type="text" id='table-search' value={getValueSearchTable} placeholder={'Search...'} onChange={e => setValueSearchTable(e.target.value)} />
                        <span><img src={IconSearch} width={14} height={14} alt="Icon Search" /></span>
                    </div>
                    <div className={cx(style.toggle, getActiveAdvancedOptions && style.active)} onClick={ToggleAdvancedOptions}>
                        <p>Advanced Option</p>
                        <img src={IconAnglesDown} width={14} height={14} alt="Icon Toggle" />
                    </div>
                </div>
                <div className={style.action}>
                    <CSVLink
                        className={cx(global.tooltip, style.circle)}
                        data={getPrintData}
                        filename={"Table Fee Type"}
                        tooltip="Download">
                        <img src={IconDownload} width={16} height={16} alt="Icon Download" />
                    </CSVLink>
                    <ReactToPrint
                        trigger={() => <div className={cx(global.tooltip, style.circle)} tooltip="Print" onClick={PrintTable}><img src={IconPrint} width={16} height={16} alt="Icon Print" /></div>}
                        content={() => tableRef.current}
                    />
                    <Link to={'/master-data-management/create-fee-type'} state={{ type: 'create' }} className={cx(style.create, global.button)}><img src={IconCreate} width={16} height={16} alt="Icon Create" />Create New</Link>
                </div>
            </div>
            <div className={cx(style.advanced_options, getActiveAdvancedOptions && style.active)}>
                <div className={style.box}>
                    <p className={style.title}>Status</p>
                    <select name="select-status" id="select-status">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>
            {getSelectedData.length > 0 &&
                <div className={style.action}>
                    <select name="select-status" id="select-status" value={getValueSelectUpdateStatus} onChange={e => setValueSelectUpdateStatus(e.target.value)}>
                        <option value="" disabled hidden>UPDATE STATUS</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <button type='button' className={cx(style.remove, global.button)} onClick={DeleteSelectItem}>REMOVE FEE TYPE</button>
                </div>
            }
            <Table id='table-data' ref={tableRef} striped bordered responsive hover width={'100%'}>
                <thead>
                    <tr className={'align-middle'}>
                        <th className={'text-center'}><FormCheckInput id='select-all' /></th>
                        <th className={window.innerWidth > 991 ? 'd-none' : ''}></th>
                        <th className='d-none'>ID</th>
                        <th>Fee Type Code</th>
                        <th>Fee Type Name</th>
                        <th className={window.innerWidth <= 991 ? 'd-none' : ''}>Description</th>
                        <th className={window.innerWidth <= 991 ? 'd-none' : ''}>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {getHTMLFeeType}
                </tbody>
            </Table>
        </React.Fragment>
    )
}

