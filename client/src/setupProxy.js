const { createProxyMiddleware } = require("http-proxy-middleware");

const onError = (err, req, resp, target) => {
  console.log(`${err.message}`);
};
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
    })
  );
};
