import './Login.css';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { isEmail } from '../../../shared/utilites/ValidateParams';
import AuthService from '../../services/AuthService';

export default function Login() {

    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        //prevenir que el formulario se envie
        event.preventDefault();

        //obtener los datos del formulario
        const data = new FormData(event.currentTarget);
        const username = data.get('username') as string;
        const password = data.get('password') as string;
        const remember = data.get('remember') as string;


        console.log({ username, password });
        //TODO: validar sintacticamente los datos del formulario
        if(!isEmail(username)) {
            setError('Formato incorrecto de email');
            return;
        }
        if(password.length < 6) {
            setError('La contraseña debe tener al menos 8 caracteres');
            return;
        }


        //fijarse si el usuario y la contraseña son correctos
        const login = await AuthService.login(username,password,true)

        if (login){
            localStorage.setItem('token', login.access_token);
            setError(null);
            navigate('/home');
        }else{
            setError('Usuario/Contraseña incorrectos');
        }


        //fijarse si el checkbox esta seleccionado
        if (remember) localStorage.setItem('usuario', username);

    }

    return (
        <section className='login'>
            <form className="login-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Usuario" name="username" defaultValue={localStorage.getItem('usuario')? localStorage.getItem('usuario')!:""}/>
                <input type="password" placeholder="Contraseña" name="password"/>
                <div>
                    <input type="checkbox" name='remember'/>
                    <label>Recordar mi Usuario</label>
                </div>
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
        </section>
    );
}