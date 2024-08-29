import logo from "../../assets/logo.png";
import { Box, Flex, Image } from "@chakra-ui/react";
import { FormLogin } from "../FormLogin";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { LogOut } from "../LogOut";
import { CreateEvent } from "../CreateEvent";

export const Header = ({ onEventCreated }) => {
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
          loading="lazy"
        />
      </Box>

      <Flex alignItems="center" gap={2}>
        {isAuthenticated && <CreateEvent onEventCreated={onEventCreated} />}
        <FormLogin />
        {user && <LogOut />}
      </Flex>
    </Flex>
  );
};
