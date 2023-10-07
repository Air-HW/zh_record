# 小张携旅

这是一款用来记录每日收支情况的应用程序。

## 项目简介

小张携旅是一款方便实用的个人理财软件。通过该应用，用户可以轻松记录每日的收支情况，进行资产管理和预算规划。

## 功能特性

- 记录每日的收入和支出
- 支持多账户管理
- 统计每日、每周、每月的收入和支出
- 设置预算和目标，进行预算规划
- 导出收支记录和统计报表

## 技术栈

本项目使用了以下技术栈：

- Vue 3：主要框架
- TypeScript：更加健壮的代码组织方式
- uni-app：跨平台开发框架
- uview-plus：优美的样式组件库
- Pinia：Vue 3 生态中的状态管理库
- Axios：用于向后端请求数据的 HTTP 客户端

## 开发环境设置

1. 确保已经安装 Node.js 和 npm。
2. 全局安装 uni-app 脚手架：npm install -g @vue/cli
3. 克隆项目代码到本地：git clone https://github.com/your-github-username/your-repo.git
4. 安装项目依赖：npm install
5. 启动开发服务器：npm run dev

## 目录结构

- public
  - favicon.ico
  - index.html
- src
  - api
    - request.ts
  - assets
    - logo.png
  - components
    - HelloWorld.vue
  - pages
    - Index.vue
  - plugins
    - uview-ui.ts
  - store
    - index.ts
  - utils
    - date.ts
  - App.vue
  - main.ts
  - shims-vue.d.ts
- .gitignore
- package.json
- README.md
- tsconfig.json

## 使用说明

1. 启动开发服务器：npm run dev
2. 在浏览器中打开 http://localhost:8080 来访问应用程序。

## 版本控制与协作

本项目使用 Git 进行版本控制。你可以通过以下命令来提交代码：

git add .
git commit -m 'commit message'
git push origin master

如果你想要参与该项目的开发，请 Fork 该仓库并创建一个新的分支，然后向我们发送一个合并请求。

## 授权许可

MIT

## 开发者信息

- 小张同学
- Email: 1592955886@qq.com
