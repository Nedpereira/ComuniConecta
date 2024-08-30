import {
  Box,
  Text,
  Icon,
  Flex,
  Spacer,
  Tooltip,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdCalendar } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa6";
import { FaTag, FaMoneyBillWave } from "react-icons/fa";
import { cores } from "../../styles/cores";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const EventCard = ({ event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatData = format(
    new Date(event?.data),
    "dd 'de' MMMM 'de' yyyy, HH:mm",
    { locale: ptBR }
  );

  return (
    <Box
      border="1px solid"
      borderColor={cores.verde}
      borderRadius="md"
      p={4}
      bg={cores.verde}
      boxShadow="sm"
      mb={4}
      maxWidth="400px"
      minHeight="220px"
    >
      <Tooltip label={event.titulo} hasArrow>
        <Text
          textTransform="capitalize"
          fontSize="xl"
          fontWeight="bold"
          color={cores.dourado}
          isTruncated
        >
          {event.titulo}
        </Text>
      </Tooltip>

      <Flex mt={2} align="center">
        <Icon as={IoMdCalendar} color={cores.ciano} mr={2} />
        <Tooltip label={formatData} hasArrow>
          <Text color={cores.white} isTruncated>
            {formatData}
          </Text>
        </Tooltip>
      </Flex>

      {event?.local && (
        <Flex mt={2} justifyContent="flex-start" align="center">
          <Icon as={FaLocationArrow} color={cores.ciano} mr={2} />
          <Tooltip label={event.local} hasArrow>
            <Text color={cores.white} isTruncated>
              {event.local}
            </Text>
          </Tooltip>
        </Flex>
      )}

      <Flex mt={2} align="center">
        <Icon as={FaTag} color={cores.ciano} mr={2} />
        <Text color={cores.white} isTruncated>
          {event.categoria}
        </Text>
        <Spacer mx={2} />
        <Icon as={FaMoneyBillWave} color={cores.ciano} mr={2} />
        <Text color={event.gratuito ? '#0cff15' : '#e98c8b'} isTruncated>
          {event.gratuito ? "Gratuito" : `Pago - R$${event.valor}`}
        </Text>
      </Flex>

      {event?.descricao && (
        <Button
          mt={6}
          sx={{
            _hover: {
              bg: "transparent",
            },
            _focus: {
              boxShadow: "none",
            },
            _active: {
              bg: "transparent",
            },
          }}
          size="sm"
          onClick={onOpen}
          color={cores.white}
        >
          Ver Mais
        </Button>
      )}

      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent bg={cores.verde} color={cores.white} mx={2}>
          <ModalHeader mt={2}>{event.titulo}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text lineHeight="1.3" fontSize={14} textAlign="start">
              {event.descricao}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
