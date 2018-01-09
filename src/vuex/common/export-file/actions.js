import exportService from '../../../services/exportService';
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

const getAgentsExportKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getAgentsExportKey(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_AGENTS_KEY, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getWagesExportKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getWagesExportKey(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_WAGES_KEY, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getTurnoversKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getTurnoversKey(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_TURNOVERS_KEY, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getTurnoversKeyJD = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getTurnoversKeyJD(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getPaymentsKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getPaymentsKey(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_PAYMENTS_KEY, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getPaymentRecordKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getPaymentRecordKey(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_PAYMENT_RECORD_KEY, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getPaymentsCardKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getPaymentsCardKey(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_PAYMENTS_CARD_KEY, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});
const getCardsTurnoversKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getCardsTurnoversKey(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_CARDS_TURNOVERS_KEY, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});
const getCardsReconciliationKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getCardsReconciliationKey(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_CARDS_RECONCILIATION_KEY, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getPaymentsReconciliationKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getPaymentsReconciliationKey(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_PAYMENTS_RECONCILIATION_KEY, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getCompanyKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.companyExport(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_COMPANY_KEY, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getSaleTurnoverKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getSaleTurnoverKey(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_SALE_TURNOVER_KEY, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getSupplyKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getSupplyKey(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_SUPPLY_KEY, data.exportUrl);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getNewRequireKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getNewRequireKey(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_NEWREQUIRE_KEY, data.exportUrl);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getCountryKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getCountryKey(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_COUNTRY_KEY, data.exportUrl);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getProductKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getFarmProduceKey(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_PRODUCT_KEY, data.exportUrl);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getStationKey = (
    { commit },
    condition,
) => new Promise((resolve, reject) => {
    exportService.getStationKey(condition).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_STATION_KEY, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

export default {
    getAgentsExportKey,
    getWagesExportKey,
    getTurnoversKey,
    getTurnoversKeyJD,
    getPaymentsKey,
    getPaymentRecordKey,
    getPaymentsCardKey,
    getCardsTurnoversKey,
    getCardsReconciliationKey,
    getPaymentsReconciliationKey,
    getCompanyKey,
    getSaleTurnoverKey,
    getSupplyKey,
    getNewRequireKey,
    getCountryKey,
    getProductKey,
    getStationKey,
};
