import { AbsoluteCenter, Box, Center, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import ButtonConfig from "../components/ButtonConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import TitleRM from "../components/TitleRM";

function Home() {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const goToLogin = () => {
        return navigate('/login');
    };

    const goToRegister = () => {
        return navigate('/register');
    };

    const goToCharacter = () => {
        return navigate('/character');
    };

    const goToAbout = () => {
        return navigate('/about');
    };

    const goToContact = () => {
        return navigate('/contact');
    };

    const goToUserEdit = () => {
        return navigate('/user-edit')
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
    };

    return (
        <Flex   >
            <AbsoluteCenter mt={'20px'}>
                <Center p={'20px'}>
                    <Box>
                        <Center pb={'20px'}>
                            <VStack fontSize={'2xl'} fontFamily="'Creepster', cursive" color="blue.400" textShadow="1px 1px 0px #00FF00, -1px -1px 0px #00FF00, 1px -1px 0px #00FF00, -2px 2px 0px #00FF00">
                                {isAuthenticated ? (
                                    <Text fontSize={'3xl'}>
                                        Você chegou, {localStorage.getItem('user_name')}!
                                    </Text>
                                ) : (
                                    <Text fontSize={'3xl'}>
                                        Você chegou, bem vindo!
                                    </Text>
                                )}
                                <Text>
                                    Hora de salvar o universo... ou destruir tudo!
                                </Text>
                            </VStack>
                        </Center>
                        <Flex>
                            <Box>
                                <VStack>
                                    {isAuthenticated &&
                                        <>
                                            <HStack>
                                                <Box p={'4px'}><ButtonConfig text='Personagens' onClick={goToCharacter} /></Box>
                                                <Box p={'4px'}><ButtonConfig text='Editar Perfil' onClick={goToUserEdit} /></Box>
                                            </HStack>
                                            <HStack>
                                                <Box p={'4px'}><ButtonConfig text='Sobre mim' onClick={goToAbout} /></Box>
                                                <Box p={'4px'}><ButtonConfig text='Contato' onClick={goToContact} /></Box>
                                            </HStack>
                                            <ButtonConfig text='Sair' onClick={logout} />
                                        </>
                                    }
                                    {!isAuthenticated &&
                                        <Center>
                                            <Box p={'5px'}>
                                                <ButtonConfig text='Entrar' onClick={goToLogin} />
                                            </Box>
                                            <Box p={'5px'}>
                                                <ButtonConfig text='Cadastrar' onClick={goToRegister} />
                                            </Box>
                                        </Center>
                                    }
                                </VStack>
                            </Box>
                        </Flex>
                    </Box>
                </Center>
            </AbsoluteCenter>
        </Flex>
    );
}

export default Home;
