import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import './login.js'


export function Login() {
  const [username, updateUsername] = React.useState("");
  const [password, updatePassword] = React.useState("");

  const navigate = useNavigate();

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }
  
  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }
  
  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: username, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    if (response.ok) {
      localStorage.setItem('username', username);
      // window.location.href = "query.html";
      navigate('/search')
    } else {
      const body = await response.json();
      const modalEl = document.querySelector('#msgModal');
      modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
      const msgModal = new bootstrap.Modal(modalEl, {});
      msgModal.show();
    }
  
  }

  return (
    <main className='container-fluid text-center'>
          <title>FRILODE</title>

      <div className="bd" >
            <label htmlFor="bd-example" className="form-label">Welcome, Login to Rent a Vehicle</label>
            <div>
              <div className="px-4 py-3" >
                <div className="mb-3">
                  <label htmlFor="Email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="Email" onChange={(e) => updateUsername(e.target.value) } placeholder="email@example.com" value={username}></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" onChange={(e) => updatePassword(e.target.value) } value={password} placeholder="Password"></input>
                </div>
                <button className="btn btn-primary" onClick={() => loginUser()}>Sign in</button>
                <button className="btn btn-primary" onClick={() => createUser()}>Create Account</button>
              </div>
            </div>

            <div className="modal fade" id="msgModal" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content text-dark">
                  <div className="modal-body">error message here</div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </main>
  );
}


// function loginHook(){

//   // useNavigate(navitage/search)
// }



// function UseEffectHookDemo() {
//   const [username, updateUsername] = React.useState(null);
//   const [password, updatePassword] = React.useState(null);

//   React.useEffect(() => {
//     console.log('username/password updated updated');
//   }, [username, password]);

//   return (
//     <ol>
//       <li onClick={() => updateCount1(count1 + 1)}>Item 1 - {count1}</li>
//       <li onClick={() => updateCount2(count2 + 1)}>Item 2 - {count2}</li>
//     </ol>
//   );
// }

// ReactDOM.render(<UseEffectHookDemo />, document.getElementById('root'));
