import Vue from 'vue';

const getAgentsBaseList = data => Vue.axios.get('/wages/agents-base-search', data);

export default {
    getAgentsBaseList,
};
