import { AbsoluteCenter, Box, Center, Flex, Text } from "@chakra-ui/react";
import ButtonConfig from "../components/ButtonConfig";
import InputConfig from "../components/InputConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import useAlertToast from "../components/toastUtils";

function Login(){
    const [emailLoginInputValue, setEmailLoginInputValue] = useState('');
    const [passwordLoginInputValue, setPasswordLoginInputValue] = useState('');
    const {setIsAuthenticated, setToken} = useAuth()
    const { alertToast } = useAlertToast();
    const navigate = useNavigate()

    const goToHome = () => {
        navigate('/')
    }

    const [loadingLogin, setLoadingLogin] = useState(false);

    // Login de usuario
    const loginSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoadingLogin(true);
        const userData = {
            email: emailLoginInputValue,
            password: passwordLoginInputValue
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, userData);
            const dataBase = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/info-login`, userData);
            const dataId = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/info-login-id`, userData);
            const user = {
                id: dataId.data.id,
                name: dataBase.data.name,
            };
            
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('user_name', user.name);
            setIsAuthenticated(response.data.access_token? true:false)
            setToken(response.data.access_token)
            alertToast("Logado com sucesso!", `Bem vindo ${user.name}`, 'success');
            goToHome()
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    alertToast(`Erro: e-mail ou senha incorreto`, '', 'error');
                } else if (error.request) {
                    alertToast('Erro de rede. Nenhuma resposta do servidor.', '', 'error');
                }
            } else {
                alertToast(`Erro de conexão, tente novamente mais tarde!`, '', 'error');
            }
        }
        setLoadingLogin(false);
    }
    
    return(
        <Flex>
            <AbsoluteCenter>
            <Box>
                <Flex bg="rgba(0, 0, 0, 0.6)" mt={'180px'} justifyContent={'space-between'} border={'2px'}>
                    <Box p={'45px'} justifyContent={'space-between'}>
                        <Center>
                            <form onSubmit={loginSubmit}>
                                <Text fontSize={'3xl'} p={'5px'}>Login</Text>
                                <Box><Text>Email:</Text> <Text><InputConfig placeholder="Email" value={emailLoginInputValue} onChange={(e) => { setEmailLoginInputValue(e.target.value) }} /></Text></Box>
                                <Box><Text>Senha:</Text> <Text><InputConfig placeholder="Senha" type="password" value={passwordLoginInputValue} onChange={(e) => { setPasswordLoginInputValue(e.target.value) }} /></Text></Box>
                                <Box p={'10px 0px'}><ButtonConfig type="submit" text="Entrar" isLoading={loadingLogin} isDisabled={emailLoginInputValue === '' || passwordLoginInputValue === ''} /></Box>
                            </form>
                        </Center>
                    </Box>
                </Flex>
                <Center><Box paddingTop={'10px'}><ButtonConfig onClick={goToHome} text="Voltar para o início" /></Box></Center>
            </Box>
            </AbsoluteCenter>
        </Flex>
    )
}

export default Login;