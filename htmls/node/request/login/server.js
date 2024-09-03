const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// 配置中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// 配置 session
app.use(session({
  secret: 'your_secret_key',  // 用于签名 session ID 的密钥
  resave: false,
  saveUninitialized: true,
}));

// 登录页面
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 处理登录请求
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 简单的用户名和密码验证
  if (username === 'aaa' && password === '123') {
    req.session.username = username;
    res.redirect('/index');
  } else {
    res.status(403).send('登录失败，用户名或密码错误');
  }
});

// 主页路由
app.get('/index', (req, res) => {
  const username = req.session.username;

  if (username) {
    res.send(`
      <h1>欢迎来到主页! ${username}</h1>
      <a href="/logout">退出登录</a>
    `);
  } else {
    res.status(403).send(`
      <h1>您尚未登录, 不能访问主页!</h1>
      <a href="/login">去登录</a>
    `);
  }
});

// 处理退出登录
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Could not log out.');
    }
    res.redirect('http://127.0.0.1:5500/login.html');
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
