import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { cores } from "../../styles/cores";
import { getAuth, signOut } from "firebase/auth";
import { useCustomSnackbar } from "../../hooks/useNotification";

export const LogOut = () => {
  const notificacao = useCustomSnackbar();
  const cancelRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      notificacao("Usuário deslogado com sucesso.", "success");
    } catch (error) {
      notificacao("Erro ao deslogar,", "error");
    } finally {
      onClose();
    }
  };

  return (
    <>
      <IconButton
        size="sm"
        variant="ghost"
        icon={<RiLogoutCircleRLine color={cores.white} size={22} />}
        onClick={onOpen}
        sx={{
          _hover: {
            bg: cores.verde,
          },
          _focus: {
            boxShadow: "none",
          },
          _active: {
            bg: "transparent",
          },
        }}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx={2} bg={cores.verde}>
            <AlertDialogBody mt={2} fontWeight="bold" color={cores.white}>
              Você tem certeza que deseja sair?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                bg={"transparent"}
                color={cores.white}
                ref={cancelRef}
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                bg={cores.amarelo}
                color={cores.white}
                onClick={handleLogout}
                ml={3}
              >
                Sair
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
