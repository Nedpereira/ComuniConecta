import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Radio,
  Stack,
  RadioGroup,
  ModalFooter,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { cores } from "../../styles/cores";
import { useIsMobile } from "../../hooks/useIsMobile";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useCustomSnackbar } from "../../hooks/useNotification";

export const CreateEvent = ({ onEventCreated }) => {
  const isMobile = useIsMobile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notificacao = useCustomSnackbar();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");
  const [local, setLocal] = useState("");
  const [gratuito, setGratuito] = useState(true);
  const [valor, setValor] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (titulo && data && categoria && gratuito && local) {
      try {
        await addDoc(collection(db, "events"), {
          titulo,
          descricao,
          data,
          categoria,
          local,
          gratuito,
          valor: gratuito ? 0 : valor,
        });
        onClose();
        onEventCreated();
      } catch (error) {
        notificacao("Erro ao adicionar evento", "error");
      } finally {
        setLoading(false);
      }
    } else {
      onClose();
      notificacao("Por favor, preencha todos os campos obrigatórios!", "info");
      setLoading(false);
    }
  };

  return (
    <>
      <ButtonGroup
        onClick={onOpen}
        mr={2}
        size="sm"
        isAttached
        variant="outline"
      >
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
      <Modal
        scrollBehavior="inside"
        isCentered
        onClose={onClose}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent bg={cores.verde} mx={4}>
          <ModalHeader fontSize={16}>Cadastrar Novo Evento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Título do Evento</FormLabel>
              <Input
                placeholder="Título do evento"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                placeholder="Descreva o evento"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Data e Hora</FormLabel>
              <Input
                type="datetime-local"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Categoria</FormLabel>
              <Select
                placeholder="Selecione uma categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                color="white"
                _hover={{ bg: "teal.700" }}
                _focus={{ bg: "teal.700" }}
                iconColor="white"
                sx={{
                  option: {
                    background: "teal.600",
                    color: "white",
                  },
                }}
              >
                <option>Educação</option>
                <option>Esportes</option>
                <option>Cultura</option>
                <option>Outros</option>
                <option>Tecnologia</option>
                <option>Negócios</option>
                <option>Saúde</option>
                <option>Arte</option>
                <option>Música</option>
                <option>Ciência</option>
                <option>Política</option>
                <option>Religião</option>
                <option>Entretenimento</option>
                <option>Meio Ambiente</option>
                <option>Moda</option>
                <option>Turismo</option>
              </Select>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Localização</FormLabel>
              <Input
                placeholder="Digite o endereço ou nome do local"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Evento Gratuito?</FormLabel>
              <RadioGroup
                defaultValue="free"
                value={gratuito ? "free" : "paid"}
                onChange={(e) => setGratuito(e === "free")}
              >
                <Stack direction="row">
                  <Radio value="free">Gratuito</Radio>
                  <Radio value="paid">Pago</Radio>
                </Stack>
              </RadioGroup>
              {!gratuito && (
                <FormControl mt={4}>
                  <FormLabel>Valor do Ingresso</FormLabel>
                  <Input
                    type="number"
                    placeholder="Valor do ingresso"
                    value={valor}
                    onChange={(e) => setValor(Number(e.target.value))}
                  />
                </FormControl>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter mt={2}>
            <Button size="sm" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={loading}
              size="sm"
              colorScheme="blue"
              onClick={handleSubmit}
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
