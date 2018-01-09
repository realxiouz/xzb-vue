import agentsService from '../../../services/agentsService';
import {
    SET_AGENTS_BASE_LIST,
} from '../../mutation-types';

const getAgentsBaseList = (
    { commit, state },
    queryCondition,
) => (
    agentsService.getAgentsBaseList(queryCondition)
    .then((res) => {
        commit(SET_AGENTS_BASE_LIST, res);
    })
);

export default {
    getAgentsBaseList,
};
