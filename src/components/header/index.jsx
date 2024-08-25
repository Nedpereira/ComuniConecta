import logo from "../../assets/logo.png";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { cores } from "../../styles/cores";
import { FormLogin } from "../FormLogin";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { LogOut } from "../LogOut";

export const Header = () => {
  const { isAuthenticated, user } = useAuthStatus();
  const isMobile = useIsMobile();

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      py={2}
      px={isMobile ? 4 : 10}
    >
      <Box>
        <Image
          boxSize={isMobile ? "50px" : "70px"}
          src={logo}
          objectFit="contain"
          alt="logo comuniconecta"
        />
      </Box>

      <Flex alignItems="center" gap={2}>
        {isAuthenticated ? (
          <ButtonGroup mr={2} size="sm" isAttached variant="outline">
            {!isMobile && (
              <Button
                sx={{
                  _hover: {
                    bg: cores.verde,
                  },
                }}
                color={cores.white}
              >
                Adicionar Evento
              </Button>
            )}
            <IconButton
              aria-label="adicionar evento"
              sx={{
                _hover: {
                  bg: cores.verde,
                },
              }}
              icon={<IoMdAdd color={cores.white} />}
            />
          </ButtonGroup>
        ) : null}
        <FormLogin />
        {user && <LogOut />}
      </Flex>
    </Flex>
  );
};
