<div align="center">
  <h1>Bin API</h1>
  <p>基于 Next.js 15 + Hono 的现代化全栈开发框架</p>
</div>

## ✨ 特性

- 🚀 基于 Next.js 15 和 React 19 构建
- 📦 使用 TypeScript 提供类型安全
- 🔑 集成用户认证系统
- 🎨 使用 Tailwind CSS 构建 UI
- 📝 OpenAPI 文档支持
- 🗃️ PostgreSQL 数据库支持
- 🔄 Drizzle ORM 数据库迁移工具

## 🚀 快速开始

### 环境要求

- Node.js 18+
- PostgreSQL 数据库
- pnpm 包管理器

### 安装

```bash
# 克隆项目
git clone git@github.com:cuxt/bin.git

# 安装依赖
pnpm install
```

### 配置

1. 配置环境变量:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NODE_ENV=development
LOG_LEVEL=debug
```

### 开发

```bash
# 数据库迁移
pnpm generate
pnpm migrate

# 启动开发服务器
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📖 项目结构

```
.
├── server/                    # Hono 后端服务
│   ├── app.ts                # Hono 应用入口
│   ├── env.ts                # 环境变量配置
│   ├── db/                   # 数据库相关
│   │   ├── migrations/       # Drizzle 迁移文件
│   │   └── schema/          # 数据库模型定义
│   ├── lib/                  # 工具函数
│   │   ├── create-app.ts    # Hono 应用创建
│   │   ├── configure-open-api.ts  # OpenAPI 配置
│   │   ├── constants.ts     # 常量定义
│   │   └── types.ts        # TypeScript 类型
│   ├── middlewares/         # Hono 中间件
│   │   ├── pino-logger.ts  # Pino 日志中间件
│   │   └── response-wrapper.ts # 响应包装中间件
│   └── routes/              # API 路由
│       ├── auth/           # 认证相关路由
│       ├── tasks/          # 任务管理路由
│       ├── im/             # 即时通讯路由
│       └── cron/          # 定时任务路由
└── src/                     # Next.js 前端
    └── app/
        └── api/            # API 路由代理
            └── [...route]/ # Hono 路由处理
```

## 🛠️ 核心功能

### 用户系统

- 📝 邮箱注册
- 👤 用户角色权限管理

### API 服务 (Hono)

- 🚀 基于 Hono 的高性能 API 服务
- 📝 OpenAPI/Swagger 自动文档生成
- 📊 请求响应统一封装
- 📝 Zod 请求验证
- 🌐 CORS 支持
- 📡 SSE 实时通信
- 🔄 定时任务支持

### 数据库

- 📦 PostgreSQL + Drizzle ORM
- 🔄 自动迁移工具
- 🔍 类型安全查询
- 🏷️ Zod 集成验证

### 开发特性

- 📝 自动生成 API 文档
- 🔄 数据库自动迁移
- 🎨 TailwindCSS 主题定制
- ⚡ Turbopack 快速开发
- 🧪 单元测试支持

### 开发体验

- 🔥 Turbopack 热更新
- 📝 TypeScript 类型推导
- 🎯 ESLint + Prettier 代码规范
- 📊 Pino 日志系统
- 🧪 测试支持

## 🔧 技术栈

### 前端

- **框架:** Next.js 15, React 19
- **状态管理:** React Context
- **样式:** Tailwind CSS 4
- **类型检查:** TypeScript 5

### 后端 (Hono)

- **框架:** Hono v4.7
- **特性:**
  - OpenAPI/Swagger 集成
  - Zod 验证器
  - Pino 日志
  - 中间件系统
- **数据库:** PostgreSQL 14+ with Drizzle ORM
- **实时通信:** Server-Sent Events

### 开发工具

- **包管理:** pnpm
- **代码规范:** ESLint, Prettier
- **提交规范:** Husky, Commitlint
- **测试框架:** Jest, Testing Library
- **CI/CD:** GitHub Actions

## 📚 API 文档

得益于 Hono 的 OpenAPI 集成，本项目提供完整的 API 文档：

- 交互式文档: http://localhost:3000/api/reference (由 @scalar/hono-api-reference 提供)
- OpenAPI 规范: http://localhost:3000/api/doc

API 特性:

- 完整的 OpenAPI 3.0 规范
- 类型安全的请求/响应定义
- 详细的接口说明和示例
- 支持在线调试

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交改动 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 [MIT](./LICENSE) 许可证。

## 🙏 致谢

- [Next.js](https://nextjs.org)
- [Hono](https://hono.dev)
- [Drizzle ORM](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)

## 📞 联系方式

- 作者: binxin
- Email: binxin.zhou@outlook.com
- GitHub: [@cuxt](https://github.com/cuxt)