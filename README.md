#### 基于 React+TypeScript+Vite 脚手架项目

##### 项目启动

```
   安装vscode 插件
   Prettier -Code formatter

   依赖安装
   pnpm install

   项目运行
   pnpm run dev
```

##### 文件夹说明

```
  src--主目录
   api--接口请求
   hooks--公共hooks
   pages--视图
   store--全局状态机
   router--路由配置
   utils--工具函数集
   style--公共样式
   request--axios封装
   components--公共组件
   assets--静态资源
 main.tsx--入口文件
 vite.config.ts--vite配置文件
```

#### Docker 部署说明

```
   基于项目根目录下的Dockerfile配置文件，构建docker容器
   docker build -t containerName .

   运行我们创建的Docker容器
   docker run -p 3000:80 -d --name containerName
```
