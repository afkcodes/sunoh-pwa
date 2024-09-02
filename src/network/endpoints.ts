const baseURL = 'https://sunoh-api.vercel.app';
// 'http://localhost:3600';
const endpoints = {
  saavn: {
    home: `${baseURL}/saavn`,
    modules: `${baseURL}/modules`,
    album: `${baseURL}/saavn/album`,
  },
};

export { baseURL, endpoints };
