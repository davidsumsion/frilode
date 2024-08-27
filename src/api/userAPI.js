export const loginOrCreateUser = async (type, username, password) => {
    const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/create';
    return await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return await response.json();
}
