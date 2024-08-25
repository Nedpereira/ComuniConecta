import { Flex, Heading, Image, Spacer, Text } from "@chakra-ui/react";
import imagemApresentacao from "../../assets/comunidade.png";
import { cores } from "../../styles/cores";
import { useIsMobile } from "../../hooks/useIsMobile";

export const Presentation = () => {
  const isMobile = useIsMobile();

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
        <Image
          boxSize="260px"
          src={imagemApresentacao}
          objectFit="contain"
          alt="logo comuniconecta"
        />
        <Flex flexDirection={"column"}>
          <Spacer px={2} maxW={380} textAlign={isMobile ? "center" : "left"}>
            <Heading blockSize={9} color={cores.amareloClaro}>
              ComuniConecta
            </Heading>
            <Text
              color={cores.white}
              fontWeight="bold"
              textAlign="right"
              fontSize="sm"
            >
              A sua comunidade em ação
            </Text>
          </Spacer>

          <Flex
            px={2}
            mt={2}
            color={cores.white}
            fontSize="sm"
            textAlign={isMobile ? "center" : "left"}
            maxW={520}
          >
            Encontre, compartilhe e participe dos eventos que fazem a diferença
            na sua vizinhança. O ComuniConecta é o espaço onde as pessoas se
            reúnem para fortalecer laços, celebrar a cultura local e promover o
            bem-estar comunitário. Juntos, conectamos histórias, trocamos
            experiências e construímos uma rede vibrante de eventos que
            impulsionam nossa comunidade.
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
