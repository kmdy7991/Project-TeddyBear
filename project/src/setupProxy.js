const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api/video-service", //proxy가 필요한 path prameter를 입력합니다.
    createProxyMiddleware({
      target: "http://j10b107.p.ssafy.io:8000", //타겟이 되는 api url를 입력합니다.
      changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
    })
  );

  // 여러 도메인 사용하는 경우
  app.use(
    "/api/script-service",
    createProxyMiddleware({
      target: "http://j10b107.p.ssafy.io:8000",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/word-service",
    createProxyMiddleware({
      target: "http://j10b107.p.ssafy.io:8000",
      // 여러 도메인 사용하는 경우
    })
  );

  app.use(
    "/api/user-service",
    createProxyMiddleware({
      target: "http://j10b107.p.ssafy.io:8000",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/test-service",
    createProxyMiddleware({
      target: "http://j10b107.p.ssafy.io:8000",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/category-service",
    createProxyMiddleware({
      target: "http://j10b107.p.ssafy.io:8000",
      changeOrigin: true,
    })
  );

  app.use(
    "/python",
    createProxyMiddleware({
      target: "https://j10b107.p.ssafy.io:8779",
      changeOrigin: true,
    })
  );

  app.use(
    "/logout",
    createProxyMiddleware({
      target: "http://j10b107.p.ssafy.io:8086",
      changeOrigin: true,
    })
  );
};
