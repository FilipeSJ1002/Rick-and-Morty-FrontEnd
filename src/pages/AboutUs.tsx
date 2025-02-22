import { AbsoluteCenter, Box, Center, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import Footer from "../components/ReturnHome";

function AboutUs() {

    return (
        <Flex>
            <AbsoluteCenter bg="rgba(0, 0, 0, 0.6)"  padding={'35px'} border={'2px'} boxShadow={'0 7px 8px rgba(0, 0, 0, 0.2), 0 3px 5px rgba(0, 0, 0, 0.2)'}>
                <Box>
                    <VStack spacing={4}>
                        <Text fontSize={'3xl'}>Sobre mim:</Text>
                        <Text fontSize={"s"} pb={'10px'}>O desenvolvedor do site.</Text>
                        <Text>
                            Sou um desenvolvedor dedicado e apaixonado, sempre em busca de novos aprendizados e desafios. Meu foco é entregar soluções eficientes e funcionais, garantindo a melhor experiência para o usuário.
                            Estou sempre buscando novas formas de melhorar meu trabalho, aprendendo e me adaptando às necessidades do mercado e dos usuários.
                        </Text>
                        <Text fontSize={'2xl'}>Por que eu sou ideal para essa vaga?</Text>
                        <Text>
                            Tenho um perfil proativo e gosto de enfrentar desafios que impulsionam meu crescimento profissional. Estou sempre pronto para aprender novas tecnologias e expandir meus conhecimentos, pois acredito que um bom desenvolvedor não se limita ao que já sabe, mas à sua capacidade de evoluir constantemente.
                        </Text>
                        <Text>
                            Busco sempre escrever código limpo, organizado e de fácil manutenção, além de estar aberto a feedbacks e novas ideias. Estou sempre disposto a estudar e aprender qualquer tecnologia necessária para oferecer o melhor resultado possível.
                        </Text>
                        <Text>
                            Estou pronto para dar o meu melhor e contribuir com meu conhecimento e dedicação para o sucesso da equipe e da empresa!
                        </Text>
                        <Text m={'10px'} fontStyle={'italic'}>Feito por Filipe S. Junqueira</Text>
                    </VStack>
                </Box>
                <Box pt={'15px'}><Center><Footer /></Center></Box>
            </AbsoluteCenter>
        </Flex>
    )
}

export default AboutUs;