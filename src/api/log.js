import axios from 'axios'



// export default login = p => axios.post('api/login', p);
// export default login = p => axios.post('api/login', p);
export const login = p => axios.post('/api/login', p);
export const telVal = p => axios.get('/api/phoneValidate');


