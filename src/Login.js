// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import InputEmail from "./layout/components/inputs/InputEmail";
import InputPassword from "./layout/components/inputs/InputPassword"; // Certifique-se de que este caminho está correto
import BtnSolid from "./layout/components/buttons/BtnSolid";
import Ipo from "./assets/il.svg";
import InputText from './layout/components/inputs/InputText';

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const db = getFirestore();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/"); // Navegar para a página principal após login bem-sucedido
        } catch (error) {
            setError("Erro ao fazer login: " + error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                firstName,
                lastName,
            });
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-teal-800">
            <div className="rounded-xl xl:hover:scale-105 duration-500 ease-in-out bg-white overflow-hidden h-2/3 xl:w-3/5 w-11/12 shadow-md flex items-center">
                <div className="xl:w-3/4 w-full h-full xl:flex hidden justify-center items-center p-4">
                    <img src={Ipo} alt="Ilustração" />
                </div>
                <div className="flex w-full p-4 items-center justify-center gap-4 flex-col">
                    <h2 className="font-black text-2xl">{isLogin ? "Faça o login" : "Registre-se"}</h2>
                    <form className="flex flex-col w-11/12 xl:w-2/3 gap-2" onSubmit={isLogin ? handleLogin : handleRegister}>
                        {!isLogin && (
                            <>
                                <InputText
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Nome"
                                    required
                                />
                                <InputText
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Sobrenome"
                                    required
                                />
                            </>
                        )}
                        <InputEmail
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail"
                        />
                        <InputPassword
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Senha"
                        />
                        <nav className="flex justify-end">
                            <BtnSolid text={isLogin ? "Login" : "Registrar-se"} />
                        </nav>
                    </form>
                    {error && <p className="text-red-500">{error}</p>}
                    <p className="text-sm">
                        {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
                        <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 underline">
                            {isLogin ? "Registre-se" : "Faça o login"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
