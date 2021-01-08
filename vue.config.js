module.exports = {
    devServer: {
        port: 8888, // 端口号，如果端口号被占用，会自动提升1
        host: "localhost", //主机名， 127.0.0.1，  真机 0.0.0.0
        https: false, //协议
        open: true, //启动服务时自动打开浏览器访问

        proxy: {
            '/rng': {     //这里最好有一个 /
                target: 'http://localhost:8081',  // 后台接口域名
                ws: true,        //如果要代理 websockets，配置这个参数
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite:{
                    '^/rng':''
                }
            }
        }
    },

   

    lintOnSave: false, // 关闭格式检查
    productionSourceMap: false, // 打包时不会生成 .map 文件，加快打包速度 

    

}