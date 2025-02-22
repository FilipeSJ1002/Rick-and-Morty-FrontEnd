import { AbsoluteCenter, Box, Center, Flex, Text } from "@chakra-ui/react";

function TitleRM() {

    return (
        <Flex>
            <AbsoluteCenter pb={'400px'}>
                <Center>
                    <Box as="header">
                        <Text 
                        fontSize={`7xl`}
                        fontFamily="'Creepster', cursive" 
                        color="blue.400" 
                        textShadow="2px 2px 0px #00FF00, -2px -2px 0px #00FF00, 2px -2px 0px #00FF00, -2px 2px 0px #00FF00"
                        >
                            Rick and Morty
                        </Text>
                    </Box>
                </Center>
            </AbsoluteCenter>
        </Flex>
    );
}

export default TitleRM;