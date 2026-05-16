# Vercel 免费部署步骤

## 当前项目状态

这个项目已经满足基础部署条件：

- `Next.js` 项目可正常构建
- `npm run build` 已验证通过
- 没有依赖数据库
- 没有依赖后端文件存储
- 适合直接部署到 `Vercel Hobby`

## 最推荐的部署方式

最简单的是：

1. 把项目传到 GitHub
2. 用 Vercel 导入 GitHub 仓库
3. 一键部署

这样后续你改代码，Vercel 会自动重新部署。

## 方式一：GitHub + Vercel 网页部署

### 第 1 步：上传到 GitHub

在项目目录执行：

```bash
git init
git add .
git commit -m "init image compress mvp"
```

然后在 GitHub 新建一个仓库，比如：

`image-compress-mvp`

接着把本地项目推上去：

```bash
git remote add origin 你的仓库地址
git branch -M main
git push -u origin main
```

### 第 2 步：登录 Vercel

打开：

https://vercel.com/

建议直接用 GitHub 登录。

### 第 3 步：导入项目

进入 Vercel 后：

1. 点击 `Add New...`
2. 选择 `Project`
3. 选择你刚刚上传的 GitHub 仓库
4. 点击 `Import`

### 第 4 步：部署配置

默认一般就够了：

- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Output Directory: 留空
- Install Command: `npm install`

然后点击：

`Deploy`

### 第 5 步：拿到线上地址

部署完成后你会拿到一个默认地址，类似：

`https://your-project-name.vercel.app`

先用这个地址测试功能。

## 方式二：Vercel CLI 部署

如果你更喜欢命令行，可以在项目目录执行：

```bash
npm install -g vercel
vercel
```

第一次会提示你：

- 登录账号
- 绑定项目
- 选择部署目录

按默认选项即可。

生产部署命令：

```bash
vercel --prod
```

## 免费版够不够

对这个项目当前阶段来说，`Vercel Hobby` 通常够用，因为：

- 这是静态 + 前端处理为主的工具站
- 没有大规模后端任务
- 没有文件上传存储成本
- 没有数据库读写压力

官方说明：

- Vercel Deploy Docs  
  https://vercel.com/docs/deployments/overview
- Vercel CLI Docs  
  https://vercel.com/docs/cli
- Vercel Plans  
  https://vercel.com/docs/plans

## 当前阶段不需要配的东西

先不用急着配：

- 数据库
- 对象存储
- CDN 特殊配置
- 环境变量
- 自定义后端服务

因为这个 MVP 主要在浏览器本地处理图片。

## 域名后面怎么接

如果你后面买了 `snapkb.com`，上线后再做：

1. 在 Vercel 项目里点 `Domains`
2. 添加 `snapkb.com`
3. 按提示去 Namecheap 配 DNS

最常见是：

- `A` 记录指向 Vercel
- 或使用 `CNAME`

具体以 Vercel 当时给你的提示为准。

## 最建议的顺序

1. 先部署到 `vercel.app`
2. 先测试页面和工具
3. 确认没问题后再绑定 `snapkb.com`

## 你现在只需要做什么

如果你要最快跑起来，只做这几步：

1. 把项目推到 GitHub
2. 登录 Vercel
3. 导入仓库
4. 点 Deploy

这样是最省事的。

