# PM2 进程管理使用指南

PM2 是一个强大的 Node.js 进程管理器，可以自动重启应用、监控资源使用、管理日志等。

## 快速开始

### 1. 启动应用

```bash
# 方式一：使用 npm 脚本
npm run pm2:start

# 方式二：直接使用 pm2
pm2 start ecosystem.config.js
```

### 2. 查看应用状态

```bash
npm run pm2:status
# 或
pm2 status
```

### 3. 查看实时日志

```bash
npm run pm2:logs
# 或
pm2 logs nof1-tracker
```

### 4. 重启应用

```bash
npm run pm2:restart
# 或
pm2 restart nof1-tracker
```

### 5. 停止应用

```bash
npm run pm2:stop
# 或
pm2 stop nof1-tracker
```

### 6. 删除应用

```bash
npm run pm2:delete
# 或
pm2 delete nof1-tracker
```

## 常用 PM2 命令

### 进程管理

```bash
# 列出所有进程
pm2 list

# 停止指定应用
pm2 stop nof1-tracker

# 重启指定应用
pm2 restart nof1-tracker

# 重新加载（零停机时间）
pm2 reload nof1-tracker

# 删除应用
pm2 delete nof1-tracker
```

### 日志管理

```bash
# 查看实时日志
pm2 logs nof1-tracker

# 查看最近的日志（最后100行）
pm2 logs --lines 100

# 清空日志
pm2 flush

# 查看错误日志
pm2 logs --err
```

### 监控和调试

```bash
# 实时监控（CPU、内存等）
pm2 monit

# 查看详细信息
pm2 show nof1-tracker

# 查看所有应用信息
pm2 describe nof1-tracker
```

### 启动设置

```bash
# 保存当前进程列表（自动启动）
pm2 save

# 配置开机自启动
pm2 startup

# 取消开机自启动
pm2 unstartup
```

## PM2 配置说明

配置文件：`ecosystem.config.js`

```javascript
{
  name: 'nof1-tracker',        // 应用名称
  script: 'server.js',          // 启动脚本
  instances: 1,                  // 实例数量（单实例）
  autorestart: true,             // 自动重启
  watch: false,                  // 不监听文件变化
  max_memory_restart: '500M',    // 内存超过500M自动重启
  env: {                         // 生产环境变量
    NODE_ENV: 'production',
    PORT: 3000
  },
  env_development: {             // 开发环境变量
    NODE_ENV: 'development',
    PORT: 3000
  }
}
```

## 启动方式选择

### 开发环境

```bash
# 直接启动（方便调试）
npm start

# 或使用 pm2（后台运行）
npm run pm2:start
```

### 生产环境

```bash
# 使用 pm2 启动并保存
npm run pm2:start
pm2 save
pm2 startup  # 配置开机自启动
```

## 故障排查

### 查看错误信息

```bash
pm2 logs nof1-tracker --err
```

### 检查进程状态

```bash
pm2 show nof1-tracker
```

### 查看系统资源使用

```bash
pm2 monit
```

### 完全删除进程

```bash
pm2 delete nof1-tracker
pm2 save
```

## 高级配置

### 多实例运行（负载均衡）

修改 `ecosystem.config.js`：

```javascript
instances: 2  // 或 'max' 使用所有 CPU 核心
```

### 监听文件变化自动重启

```javascript
watch: true,
watch_delay: 1000,
ignore_watch: ['node_modules', 'logs']
```

### 内存限制

```javascript
max_memory_restart: '1G'
```

## 与 .env 文件的配合

PM2 会自动加载 `.env` 文件中的环境变量。确保：

1. `.env` 文件存在于项目根目录
2. 包含正确的环境变量：
   ```
   BINANCE_API_KEY=your_key
   BINANCE_SECRET_KEY=your_secret
   USE_TESTNET=false
   ```

## 查看服务状态

访问应用：
- http://localhost:3000

查看 PM2 面板：
```bash
pm2 web  # 启动 PM2 监控面板
# 访问 http://localhost:9615
```

