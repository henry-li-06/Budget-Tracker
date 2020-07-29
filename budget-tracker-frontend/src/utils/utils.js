
export default async function getNewAccessToken() {

  let headers = new Headers()
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Origin', 'http://127.0.0.1:3000');

  let response = await fetch('http://127.0.0.1:5000/user/login/refresh', {
    mode: 'cors',
    method: 'GET',
    credentials: 'include'
  })
  if (response.status === 401) return false;
  return true;

}