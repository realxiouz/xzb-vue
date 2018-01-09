const baseUrlConfig = {
    dev: {
        url: 'http://localhost:63333', // api请求地址
    },

    development: {
        url: 'http://localhost:63333', // api请求地址
    },

    test: {
        url: 'http://localhost:63333', // api请求地址
    },

    pre: {
        url: 'http://localhost:63333', // api请求地址
    },

    hotfix: {
        url: 'http://localhost:63333', // api请求地址
    },

    production: {
        url: 'http://localhost:63333', // api请求地址
    },
};

module.exports = baseUrlConfig[process.env.NODE_ENV];
