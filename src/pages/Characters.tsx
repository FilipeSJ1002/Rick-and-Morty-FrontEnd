import { AbsoluteCenter, Box, Center, Flex, Text, Image, HStack } from "@chakra-ui/react";
import InputConfig from "../components/InputConfig";
import { useState } from "react";
import ReturnHome from "../components/ReturnHome";
import axios from "axios";
import ButtonConfig from "../components/ButtonConfig";
import useAlertToast from "../components/toastUtils";
import { useNavigate } from "react-router-dom";

function Characters() {
    const [nameCharacter, setNameCharacter] = useState('');
    const [error, setError] = useState('');
    const { alertToast } = useAlertToast();
    const [characters, setCharacters] = useState<any[]>([]);
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if(!token){
        alertToast('Usuário não autenticado. Faça login para continuar.', '', 'error');
        navigate('/login');
    };

    const nextCharacter = async () => {
        if (currentCharacterIndex < characters.length - 1) {
            setCurrentCharacterIndex(currentCharacterIndex + 1);
        }
    };

    const previousCharacter = () => {
        if (currentCharacterIndex > 0) {
            setCurrentCharacterIndex(currentCharacterIndex - 1);
        }
    };

    const fetchCharacter = async () => {
        try {
            setError('');
            const response = await axios.get(`http://localhost:3000/characters/${nameCharacter}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setCharacters(response.data);
            setCurrentCharacterIndex(0);
            alertToast('Personagens encontrados!', '', 'success');
        } catch (err) {
            setCharacters([]);
            setError('Personagem não encontrado.');
            alertToast('Personagem não encontrado!', '', 'error');
        }
    };

    const character = characters[currentCharacterIndex];

    const searchAgain = async () => {
        setCharacters([]);
        setCurrentCharacterIndex(0);
        setNameCharacter('');
    };


    return (
        <Flex>
            <AbsoluteCenter>
                {!character && (
                    <Box>
                        <Text fontSize={'2xl'}>Digite o nome do personagem desejado</Text>
                        <InputConfig
                            placeholder="Digite o nome do personagem"
                            type="text"
                            value={nameCharacter}
                            onChange={(e) => setNameCharacter(e.target.value)}
                        />
                        {error && <Center><Text color="red">{error}</Text></Center>}
                        <Center p={'10px'}>
                            <ButtonConfig isDisabled={nameCharacter == ''} text="Buscar" onClick={fetchCharacter} />
                        </Center>
                    </Box>
                )}

                {character && (
                    <Box textAlign="center" mt={4}>
                        <Center mt={'150px'} mb={'-20px'}>
                            <HStack>
                                <Box p={'20px'}>
                                    <Image boxSize={'2xs'} src={character.image} borderRadius="md" />
                                </Box>
                                <Box>
                                    <Text fontSize="3xl" fontFamily={"'Creepster', cursive"} fontWeight="bold">{character.name}</Text>
                                    <Box as={'ul'} listStyleType={'inherit'}>
                                        <Text as={'li'}>Status: {character.status}</Text>
                                        <Text as={'li'}>Espécie: {character.species}</Text>
                                        <Text as={'li'}>Localização: {character.location}</Text>
                                    </Box>
                                </Box>
                            </HStack>
                        </Center>
                        <HStack spacing={4} justify="center" m={4}>
                            <ButtonConfig text="Voltar" onClick={previousCharacter} />
                            <ButtonConfig text="Avançar" onClick={nextCharacter} />
                        </HStack>
                        <Center>
                            <ButtonConfig text="Fazer nova busca" onClick={searchAgain} />
                        </Center>
                    </Box>
                )}
                <Center p={'20px'}>
                    <ReturnHome />
                </Center>
            </AbsoluteCenter>
        </Flex>
    );
}

export default Characters;
