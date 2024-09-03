document.getElementById('logoutButton').addEventListener('click', async function() {
  const response = await fetch('http://127.0.0.1:3000/logout', {
      method: 'POST'
  });

  const result = await response.json();

  if (result.success) {
      window.location.href = 'index.html';
  }
});

// 检查登录状态
(async function checkLogin() {
  const response = await fetch('http://127.0.0.1:3000/checkAuth', {
      credentials: 'include'  // 使请求携带cookie
  });
  const result = await response.json();

  if (!result.loggedIn) {
      window.location.href = 'index.html';
  }
})();
