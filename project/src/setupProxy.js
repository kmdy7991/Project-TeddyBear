const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/video-service", //proxy가 필요한 path prameter를 입력합니다.
    createProxyMiddleware({
      target: "http://localhost:8083", //타겟이 되는 api url를 입력합니다.
      changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
    })
  );

  // 여러 도메인 사용하는 경우
  app.use(
    "/script-service",
    createProxyMiddleware({
      target: "http://localhost:8082",
      changeOrigin: true,
    })
  );
};
