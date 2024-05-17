// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/Feedback.json',
    createProxyMiddleware({
      target: 'http://ticklesksp.c1.is',
      changeOrigin: true,
      pathRewrite: {
        '^/Feedback.json': '/Feedback.json'
      },
      onProxyReq: function(proxyReq, req, res) {
        if (req.method === 'POST') {
          // Modify headers if needed for POST requests
          proxyReq.setHeader('Content-Type', 'application/json');
        }
      },
      onProxyRes: function(proxyRes, req, res) {
        // Add CORS headers to the response
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      }
    })
  );
};
