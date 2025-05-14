import axios from 'axios';

const host = import.meta.env.MODE === 'production' ? "" : `http://${import.meta.env.VITE_REACT_APP_HOST}`;

// let errorCount = 0;

export const instance = axios.create({
  baseURL: `${host}/api`,
  timeout: 3000,
  // headers: {
  //   "Authorization": localStorage.getItem("token") || undefined
  // }
});

const token = localStorage.getItem("token");

if (token) instance.defaults.headers.common['Authorization'] = token;

export const api = (logout = () => { }) => {
  const promise_ = (instance_) => {
    return new Promise((response, reject) => {
      instance_
        .then((res) => {
          response(res.data);
        })
        .catch((error) => {
          if (error.response.status === 401) logout()
          reject(error);
        })
    })
  }
  return {
    postAuthLogin: ({ data }) => promise_(instance.post('/auth/login', { ...data })),

    getUserList: ({ ...rest }) => promise_(instance.get('/user/list', { params: { ...rest } })),
    postCreateUser: ({ data }) => promise_(instance.post('/user/create', { ...data })),
    putUpdateUser: ({ data, ...rest }) => promise_(instance.put('/user/update', { ...data }, { params: { ...rest } })),
    deleteUser: ({ ...rest }) => promise_(instance.delete('/user/delete', { params: { ...rest } }))

  }
}

