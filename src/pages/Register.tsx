import { AbsoluteCenter, Box, Center, Flex, HStack, Text } from "@chakra-ui/react";
import ButtonConfig from "../components/ButtonConfig";
import InputConfig from "../components/InputConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAlertToast from "../components/toastUtils";

function Register(){
    const [nameInputValue, setNameInputValue] = useState('');
    const [emailInputValue, setEmailInputValue] = useState('');
    const [passwordInputValue, setPasswordInputValue] = useState('');
    const [cofirmPasswordInputValue, setCofirmPasswordInputValue] = useState('');
    const { alertToast } = useAlertToast();
    const navigate = useNavigate()

    const goToHome = () => {
        navigate('/')
    }

    const goToLogin = () => {
        navigate('/login')
    }

    const [loading, setLoading] = useState(false);

    // Registro de novo usuario
    const registerSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        const userData = {
            name: nameInputValue,
            email: emailInputValue,
            password: passwordInputValue,
        };

        if (passwordInputValue!== cofirmPasswordInputValue) {
            alertToast("Senhas não conferem!", '', 'error');
            setLoading(false)
            return;
        }
        else if (passwordInputValue === cofirmPasswordInputValue){
            try { 
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, userData);
                alertToast("Cadastro realizado com sucesso!", '', 'success');
                setNameInputValue('');
                setEmailInputValue('');
                setPasswordInputValue('');
                setCofirmPasswordInputValue('');
            } catch (error: any) {
                if(error.response.status === 409){
                    alertToast("Email já cadastrado!", '', 'error');
                    return navigate('/login');
                } 
                if (axios.isAxiosError(error)) {
                    alertToast('Erro de rede. Tente novamente mais tarde!', '', 'error');
                } else {
                    alertToast(`Erro desconhecido. Tente novamente mais tarde!`, '', 'error');    
                }
            }
            setLoading(false);
            goToLogin();
        }

    }
    
    return(
        <Flex>
            <AbsoluteCenter>
            <Box>
                <Flex bg="rgba(0, 0, 0, 0.6)" mt={'180px'} border={'2px'}>
                    <Box p={'70px'}>
                        <Center>
                            <form onSubmit={registerSubmit}>
                                <Text fontSize={'3xl'} p={'5px'}>Cadastrar</Text>
                                <HStack>
                                    <Box p={'10px'}>
                                        <Box><Text>Nome:</Text> <Text><InputConfig placeholder="Nome" value={nameInputValue} onChange={(e) => { setNameInputValue(e.target.value) }} /></Text></Box>
                                        <Box><Text>Email:</Text> <Text><InputConfig placeholder="Email" value={emailInputValue} onChange={(e) => { setEmailInputValue(e.target.value) }} /></Text></Box>
                                    </Box>
                                    <Box p={'10px'}>
                                        <Box><Text>Senha:</Text> <Text><InputConfig placeholder="Senha" type="password" value={passwordInputValue} onChange={(e) => { setPasswordInputValue(e.target.value) }} /></Text></Box>
                                        <Box><Text>Confirmar Senha:</Text> <Text><InputConfig placeholder="Confirmar senha" type="password" value={cofirmPasswordInputValue} onChange={(e) => { setCofirmPasswordInputValue(e.target.value) }} /></Text></Box>
                                    </Box>
                                </HStack>
                                <Center><Box paddingTop={'10px'}><ButtonConfig type="submit" text="Cadastrar" isLoading={loading} isDisabled={nameInputValue === '' || emailInputValue === '' || passwordInputValue === '' || cofirmPasswordInputValue === ''} /></Box></Center>
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

export default Register;