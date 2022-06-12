import React from 'react';

const About = (props) => {
    return (
        <div style={{backgroundImage: `url(https://mdbcdn.b-cdn.net/img/new/slides/005.webp)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
}}>

            <p className='btn' style={{fontSize:'30px', color:'white' ,fontFamily: "Shadows Into Light" }}>
            "# Tasky_task_manegement" 
full stack task management app

bassicaly the app allow the user to enter to a secure site/app
which he can fill his tasks and assiments 

tech's & librariys that used for back end:
node.js 
express
dotenv
jsonwebtoken / jwt
knex
postgresql / pg
heroku

tech's  & librariys that used for Front-end:
react
axios
jwt_decode
Bootstrap
react-router
useHooks**
*useeffect
*useNavigate and more

**
**

            </p>

        </div>
    )
}

export default About;