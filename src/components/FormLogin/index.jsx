import {
  Flex,
  FocusLock,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { cores } from "../../styles/cores";
import { Form } from "./Form";

export const FormLogin = () => {
  const firstFieldRef = React.useRef(null);
  const { onOpen, onClose, isOpen } = useDisclosure();

  const [nome, setNome] = useState("Neder");

  return (
    <Flex>
      <Text
        alignSelf="center"
        fontWeight="bold"
        color={cores.white}
        fontSize="16px"
        mr={2}
      >
        {nome}
      </Text>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="auto-end"
        closeOnBlur={false}
        isLazy={true}
      >
        <PopoverTrigger>
          <IconButton
            size="sm"
            variant="ghost"
            icon={
              <FaRegUser
                color={cores.white}
                cursor="pointer"
                onClick={onOpen}
                size={22}
              />
            }
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
        </PopoverTrigger>
        <PopoverContent mt={2} bg={cores.verde} color={cores.white} p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow bg={cores.verde} />
            <PopoverCloseButton />
            <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
