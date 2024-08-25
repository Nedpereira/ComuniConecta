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

export const Form = ({ firstFieldRef, onCancel }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Stack spacing={4}>
      <Stack>
        <FormLabel>E-mail</FormLabel>
        <Input
          sx={{ _placeholder: { color: cores.placeholder } }}
          placeholder="Digite seu e-mail"
          type="email"
        />
      </Stack>

      <Stack>
        <FormLabel>Senha</FormLabel>
        <InputGroup>
          <Input
            sx={{ _placeholder: { color: cores.placeholder } }}
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
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
          sx={{
            _hover: {
              bg: cores.amarelo,
            },
          }}
          bgColor={cores.amarelo}
        >
          Entrar
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
