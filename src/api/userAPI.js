export const loginOrCreateUser = async (type, username, password) => {
    const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/create';
    return await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
}

export const logout = () => {
  fetch(`/api/auth/logout`, {
      method: 'delete',
  });
}

export const updateUserInfo = async (phone, firstName, preferredName, lastName) => {
  return await fetch('api/updateuser', {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ phone, firstName, preferredName, lastName})
  });
}