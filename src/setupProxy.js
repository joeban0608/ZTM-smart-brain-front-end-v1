const { createProxyMiddleware } = require('http-proxy-middleware');

const modelVersionId = process.env.REACT_APP_CLARIFAI_API_KEY;
const pat = process.env.REACT_APP_CLARIFAI_API_PAT;

module.exports = function setupProxy(app) {
  app.use(
    '/api/clarifai/outputs',
    createProxyMiddleware({
      target: 'https://api.clarifai.com',
      changeOrigin: true,
      pathRewrite: () =>
        `/v2/users/clarifai/apps/main/models/face-detection/versions/${modelVersionId}/outputs`,
      onProxyReq: (proxyReq) => {
        if (!modelVersionId || !pat) {
          throw new Error('Missing REACT_APP_CLARIFAI_API_KEY or REACT_APP_CLARIFAI_API_PAT');
        }

        proxyReq.setHeader('Authorization', `Key ${pat}`);
      }
    })
  );
};
