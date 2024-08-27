import { loginOrCreateUser } from "../../api/userAPI";

export async function loginOrCreate({ setModalMessage, setShow, username, password, navigate}, type) {
  const response = await loginOrCreateUser(type, username, password)
  const body = await response.json();
  if (response.ok) {
    localStorage.setItem('username', username);
    if (body.complete) navigate('/search')
    else navigate('/updateUser')
  } else {
    setModalMessage(`⚠ Error: ${body.msg}`)
    setShow(true);
  }
}
