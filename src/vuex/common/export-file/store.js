import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import {
    SET_AGENTS_KEY,
    SET_WAGES_KEY,
    SET_TURNOVERS_KEY,
    SET_PAYMENTS_KEY,
    SET_PAYMENTS_CARD_KEY,
    SET_CARDS_TURNOVERS_KEY,
    SET_CARDS_RECONCILIATION_KEY,
    SET_PAYMENTS_RECONCILIATION_KEY,
    SET_COMPANY_KEY,
    SET_SALE_TURNOVER_KEY,
    SET_COUNTRY_KEY,
    SET_PRODUCT_KEY,
    SET_SUPPLY_KEY,
    SET_NEWREQUIRE_KEY,
    SET_STATION_KEY,
    SET_PAYMENT_RECORD_KEY,
} from '../../mutation-types';

const initState = {
    agentsKey: '',
    wagesKey: '',
    turnoversKey: '',
    paymentsKey: '',
    paymentRecordKey: '',
    paymentsCardKey: '',
    cardsTurnoversKey: '',
    cardsReconciliationKey: '',
    paymentsReconciliationKey: '',
    companyKey: '',
    saleTurnoverKey: '',
    supplyKey: '',
    newRequireKey: '',
    countryKey: '',
    productKey: '',
    stationKey: '',
};

const mutations = {
    [SET_AGENTS_KEY](state, data) {
        Vue.set(state, 'agentsKey', data);
    },
    [SET_WAGES_KEY](state, data) {
        Vue.set(state, 'wagesKey', data);
    },
    [SET_TURNOVERS_KEY](state, data) {
        Vue.set(state, 'turnoversKey', data);
    },
    [SET_PAYMENTS_KEY](state, data) {
        Vue.set(state, 'paymentsKey', data);
    },
    [SET_PAYMENT_RECORD_KEY](state, data) {
        Vue.set(state, 'paymentsKey', data);
    },
    [SET_PAYMENTS_CARD_KEY](state, data) {
        Vue.set(state, 'paymentsCardKey', data);
    },
    [SET_CARDS_TURNOVERS_KEY](state, data) {
        Vue.set(state, 'cardsTurnoversKey', data);
    },
    [SET_CARDS_RECONCILIATION_KEY](state, data) {
        Vue.set(state, 'cardsReconciliationKey', data);
    },
    [SET_PAYMENTS_RECONCILIATION_KEY](state, data) {
        Vue.set(state, 'paymentsReconciliationKey', data);
    },
    [SET_COMPANY_KEY](state, data) {
        Vue.set(state, 'companyKey', data);
    },
    [SET_SALE_TURNOVER_KEY](state, data) {
        Vue.set(state, 'saleTurnoverKey', data);
    },
    [SET_SUPPLY_KEY](state, data) {
        Vue.set(state, 'supplyKey', data);
    },
    [SET_NEWREQUIRE_KEY](state, data) {
        Vue.set(state, 'newRequireKey', data);
    },
    [SET_COUNTRY_KEY](state, data) {
        Vue.set(state, 'countryKey', data);
    },
    [SET_PRODUCT_KEY](state, data) {
        Vue.set(state, 'productKey', data);
    },
    [SET_STATION_KEY](state, data) {
        Vue.set(state, 'stationKey', data);
    },
};


export default {
    state: initState,
    mutations,
    actions,
    getters,
};
