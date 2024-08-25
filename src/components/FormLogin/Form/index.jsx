import { useState } from "react";
import {
  Button,
  ButtonGroup,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { cores } from "../../../styles/cores";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useCustomSnackbar } from "../../../hooks/useNotification";

export const Form = ({ firstFieldRef, onCancel }) => {
  const notificacao = useCustomSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    const auth = getAuth();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      notificacao("Bem-vindo(a) ao ComuniConeta!", "success");
    } catch {
      notificacao(
        "Não foi possível conectar. Verifique suas credenciais e tente novamente.",
        "error"
      );
    } finally {
      setIsLoading(false);
      onCancel();
    }
  };

  return (
    <Stack spacing={4}>
      <Stack>
        <FormLabel>E-mail</FormLabel>
        <Input
          ref={firstFieldRef}
          sx={{ _placeholder: { color: cores.placeholder } }}
          placeholder="Digite seu e-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Stack>

      <Stack>
        <FormLabel>Senha</FormLabel>
        <InputGroup>
          <Input
            sx={{ _placeholder: { color: cores.placeholder } }}
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="3rem">
            <IconButton
              h="1.75rem"
              size="sm"
              onClick={handleShowClick}
              icon={
                showPassword ? (
                  <ViewOffIcon color={cores.white} fontSize={18} />
                ) : (
                  <ViewIcon color={cores.white} fontSize={18} />
                )
              }
              variant="ghost"
              sx={{
                _hover: {
                  bg: cores.background,
                },
                _focus: {
                  boxShadow: "none",
                },
                _active: {
                  bg: "transparent",
                },
              }}
            />
          </InputRightElement>
        </InputGroup>
      </Stack>

      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button
          color={cores.white}
          sx={{
            _hover: {
              bg: cores.background,
            },
          }}
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          bgColor={cores.amarelo}
          onClick={handleLogin}
        >
          Entrar
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
