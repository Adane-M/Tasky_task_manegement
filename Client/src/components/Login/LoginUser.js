
async function LoginUser(credentials) {
    return fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => {
            // console.log(data);
            return data.json()
        }
        )
        .catch(err =>{
            console.log('error', err);
        })

}

export default LoginUser;