import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../App';

export const Auth = (props) => {
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();
    const { accessToken, setAccessToken } = useContext(AppContext);

    useEffect(() => {
        const verify = async () => {
            console.log('access ver:',accessToken);
            try {
                const response = await axios.get('http://localhost:5000/token', {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'x-access-token': accessToken
                    }
                });
                setRedirect(true);
                setAccessToken(response.data.accessToken);
            } catch (e) {
                console.log(e);
                navigate('/login');
            }
        }
        verify();
    }, [accessToken, navigate, setAccessToken])

    console.log('redirect', redirect);
    return (
        !redirect ? props.children : null
    )
}

export default Auth;