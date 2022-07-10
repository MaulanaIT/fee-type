// Import Library
import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
    name: 'store',
    initialState: {
        FeeTaxType: [{
            id: 1,
            fee_type_code: 1,
            fee_type_name: 'Service Fee',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin turpis vel enim efficitur interdum. Etiam euismod nunc vel justo pretium, et pulvinar dolor malesuada.`,
            status: 1,
            language: {
                indonesia: {
                    fee_type_name: '',
                    description: ''
                },
                chinese: {
                    fee_type_name: '',
                    description: ''
                },
            },
        }, {
            id: 2,
            fee_type_code: 2,
            fee_type_name: 'Reissue Fee',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin turpis vel enim efficitur interdum.`,
            status: 1,
            language: {
                indonesia: {
                    fee_type_name: '',
                    description: ''
                },
                chinese: {
                    fee_type_name: '',
                    description: ''
                },
            },
        }, {
            id: 3,
            fee_type_code: 3,
            fee_type_name: 'Cancellation Fee',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin turpis vel enim efficitur interdum.`,
            status: 3,
            language: {
                indonesia: {
                    fee_type_name: '',
                    description: ''
                },
                chinese: {
                    fee_type_name: '',
                    description: ''
                },
            },
        }, {
            id: 4,
            fee_type_code: 4,
            fee_type_name: 'Refund Fee',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin turpis vel enim efficitur interdum.`,
            status: 1,
            language: {
                indonesia: {
                    fee_type_name: '',
                    description: ''
                },
                chinese: {
                    fee_type_name: '',
                    description: ''
                },
            },
        }, {
            id: 5,
            fee_type_code: 5,
            fee_type_name: 'MDR Fee',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin turpis vel enim efficitur interdum. Etiam euismod nunc vel justo pretium, et pulvinar dolor malesuada.`,
            status: 1,
            language: {
                indonesia: {
                    fee_type_name: '',
                    description: ''
                },
                chinese: {
                    fee_type_name: '',
                    description: ''
                },
            },
        }, {
            id: 6,
            fee_type_code: 6,
            fee_type_name: 'After Office Charge',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin turpis vel enim efficitur interdum. Etiam euismod nunc vel justo pretium, et pulvinar dolor malesuada.`,
            status: 3,
            language: {
                indonesia: {
                    fee_type_name: '',
                    description: ''
                },
                chinese: {
                    fee_type_name: '',
                    description: ''
                },
            },
        }, {
            id: 7,
            fee_type_code: 7,
            fee_type_name: 'Late Payment',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin turpis vel enim efficitur interdum. Etiam euismod nunc vel justo pretium, et pulvinar dolor malesuada.`,
            status: 3,
            language: {
                indonesia: {
                    fee_type_name: '',
                    description: ''
                },
                chinese: {
                    fee_type_name: '',
                    description: ''
                },
            },
        }, {
            id: 8,
            fee_type_code: 8,
            fee_type_name: 'Domestic Flight Service Fee',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin turpis vel enim efficitur interdum.`,
            status: 1,
            language: {
                indonesia: {
                    fee_type_name: '',
                    description: ''
                },
                chinese: {
                    fee_type_name: '',
                    description: ''
                },
            },
        }, {
            id: 9,
            fee_type_code: 9,
            fee_type_name: 'International Flight Service Fee',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin turpis vel enim efficitur interdum.`,
            status: 1,
            language: {
                indonesia: {
                    fee_type_name: '',
                    description: ''
                },
                chinese: {
                    fee_type_name: '',
                    description: ''
                },
            },
        }, {
            id: 10,
            fee_type_code: 10,
            fee_type_name: 'Domestic Hotel Service Fee',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin turpis vel enim efficitur interdum. Etiam euismod nunc vel justo pretium, et pulvinar dolor malesuada.`,
            status: 3,
            language: {
                indonesia: {
                    fee_type_name: '',
                    description: ''
                },
                chinese: {
                    fee_type_name: '',
                    description: ''
                },
            },
        }, {
            id: 11,
            fee_type_code: 11,
            fee_type_name: 'Domestic Hotel Service Fee',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin turpis vel enim efficitur interdum. Etiam euismod nunc vel justo pretium, et pulvinar dolor malesuada.`,
            status: 3,
            language: {
                indonesia: {
                    fee_type_name: '',
                    description: ''
                },
                chinese: {
                    fee_type_name: '',
                    description: ''
                },
            },
        }],
        PopupConfirmation: {
            active: false,
            id: 0,
            fee_type_name: '',
            response: '',
        },
        PopupResponse: {
            active: false,
            link: '',
            response: '',
        },
        Sidebar: {
            active: false,
        }
    },
    reducers: {
        HidePopupConfirmation: (state) => {
            state.PopupConfirmation.active = false;
            state.PopupConfirmation.id = 0;
            state.PopupConfirmation.fee_type_name = '';
            state.PopupConfirmation.response = '';
        },
        HidePopupResponse: (state) => {
            state.PopupResponse.active = false;
            state.PopupResponse.link = '';
            state.PopupResponse.response = '';
        },
        InsertData: (state, action) => {
            state.FeeTaxType.push(action.payload);
        },
        UpdateData: (state, action) => {
            state.FeeTaxType[state.FeeTaxType.findIndex(item => item.id === action.payload.id)] = action.payload;
        },
        RemoveData: (state, action) => {
            state.FeeTaxType[state.FeeTaxType.findIndex(data => +data.id === +action.payload)].status = 0;
        },
        ReplaceData: (state, action) => {
            state.FeeTaxType = [...action.payload];
        },
        ShowPopupConfirmation: (state, action) => {
            state.PopupConfirmation.active = true;
            state.PopupConfirmation.id = action.payload.id;
            state.PopupConfirmation.fee_type_name = action.payload.fee_type_name;
            state.PopupConfirmation.response = action.payload.response;
        },
        ShowPopupResponse: (state, action) => {
            state.PopupResponse.active = true;
            state.PopupResponse.link = action.payload.link;
            state.PopupResponse.response = action.payload.response;
        },
        ToggleSidebar: (state) => {
            state.Sidebar.active = !state.Sidebar.active;
        },
        UpdateStatus: (state, action) => {
            state.FeeTaxType.forEach(item => {
                if (item.id === action.payload.id)
                    item.status = action.payload.status
            });
        },
    },
});

export const {
    HidePopupConfirmation,
    HidePopupResponse,
    InsertData,
    RemoveData,
    ReplaceData,
    ShowPopupConfirmation,
    ShowPopupResponse,
    ToggleSidebar,
    UpdateData,
    UpdateStatus
} = storeSlice.actions;

export default storeSlice.reducer;