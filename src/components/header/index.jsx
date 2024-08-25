import logo from "../../assets/logo.png";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { cores } from "../../styles/cores";
import { FormLogin } from "../FormLogin";
import { useIsMobile } from "../../hooks/useIsMobile";

export const Header = () => {

  const isMobile = useIsMobile();
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [usuarioAuth, setUsuarioAuth] = useState(false);

  return (
    <Flex alignItems="center" justifyContent="space-between" py={2} px={10}>
      <Box>
        <Image
          boxSize="70px"
          src={logo}
          objectFit="contain"
          alt="logo comuniconecta"
        />
      </Box>

      <Flex alignItems="center" gap={2}>
        <FormLogin />
        {!usuarioAuth ? (
          <ButtonGroup size="sm" isAttached variant="outline">
            {!isMobile && (
              <Button sx={{
                _hover: {
                  bg: cores.verde,
                }
              }} color={cores.white}>Adicionar Evento</Button>
            )}
            <IconButton
              aria-label="adicionar evento"
              sx={{
                _hover: {
                  bg: cores.verde,
                }}}
              icon={<IoMdAdd color={cores.white} />}
            />
          </ButtonGroup>
        ) : null}
      </Flex>
    </Flex>
  );
};
