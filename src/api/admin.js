import fetch from './index';

//admin login
export const adminLog = p => fetch.post('/admin/user/login', p)