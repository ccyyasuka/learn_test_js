document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://127.0.0.1:3000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
  });

  const result = await response.json();

  if (result.success) {
      window.location.href = 'welcome.html';
  } else {
      alert('Invalid username or password');
  }
});

// 检查是否已经登录
(async function checkLogin() {
  const response = await fetch('http://127.0.0.1:3000/checkAuth', {
      credentials: 'include'  // 使请求携带cookie
  });
  const result = await response.json();

  if (result.loggedIn) {
      window.location.href = 'welcome.html';
  }
})();
