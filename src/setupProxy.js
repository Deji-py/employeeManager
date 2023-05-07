const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api/employees*"], // the base api route you can change it
    createProxyMiddleware({
      target: "https://employee-api-tan.vercel.app/", // the local server endpoint
    })
  );
};
