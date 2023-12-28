import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './splash.css';
import AuthService from '../../services/AuthService';

export default function Splash() {
    const  navigate  = useNavigate();

    async function validateToken() {
        const token = localStorage.getItem('token');
        if (token) {
            //TODO: make a request to the server to check if the token is valid
            const isValid = await AuthService.validateToken();
            console.log('token is', isValid);
            if (!isValid) {
                console.log('token is not valid');
                navigate('/login');
                return 
            }
            console.log('token is valid');   
            navigate('/home');
        } else {
            console.log('token is not found');
            navigate('/login');
        }
    } 

    
    useEffect(() => {
        setTimeout(() => {
            validateToken();
        }, 2000);
    }, []);
    
    return (
        <section className="splash">
            <img src='/assets/logo-soyde.png' alt='logo' />
        </section>
    );
    }