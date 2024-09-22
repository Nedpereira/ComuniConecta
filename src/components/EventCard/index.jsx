import React, { useState } from "react";
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
import {
  FaLocationArrow,
  FaTag,
  FaMoneyBillWave,
  FaStar,
  FaShareAlt,
} from "react-icons/fa";
import { cores } from "../../styles/cores";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useCustomSnackbar } from "../../hooks/useNotification";

export const EventCard = ({ event, onFavorite }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notificacao = useCustomSnackbar();
  const [isFavorited, setIsFavorited] = useState(event.isFavorited || false);

  const formatData = format(
    new Date(event?.data),
    "dd 'de' MMMM 'de' yyyy, HH:mm",
    { locale: ptBR }
  );

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    onFavorite(event.id, !isFavorited);
  };

  const handleShareClick = async () => {
    const shareData = {
      title: event.titulo,
      text: `Confira este evento: ${event.titulo} no ${event.local} em ${formatData}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        notificacao("Erro ao compartilhar o evento:", "error");
      }
    } else {
      notificacao("Compartilhamento não suportado neste dispositivo.", "info");
    }
  };

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
      minHeight="240px"
    >
      <Flex justify="space-between" align="center">
        <Tooltip label={event.titulo} hasArrow>
          <Text
            textTransform="capitalize"
            fontSize="md"
            fontWeight="bold"
            color={cores.dourado}
          >
            {event.titulo}
          </Text>
        </Tooltip>
        <Flex align="center">
          <Icon
            as={FaStar}
            color={isFavorited ? "yellow" : "white"}
            cursor="pointer"
            mx={2}
            onClick={handleFavoriteClick}
          />
          <Icon
            as={FaShareAlt}
            color="white"
            cursor="pointer"
            mx={2}
            onClick={handleShareClick}
          />
        </Flex>
      </Flex>

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
        <Text color={event.gratuito ? "#8cda8f" : "#fda8bf"} isTruncated>
          {event.gratuito ? "Gratuito" : `Pago - R$${event.valor}`}
        </Text>
      </Flex>
      {event?.descricao && (
        <Button
          mt={6}
          sx={{
            _hover: {
              bg: cores.verdeClaro,
            },
            _focus: {
              boxShadow: "none",
            },
            _active: {
              bg: "transparent",
            },
          }}
          variant="outline"
          bg={"transparent"}
          size="sm"
          onClick={onOpen}
          color={cores.white}
        >
          Ver Mais
        </Button>
      )}

      <Modal
        isCentered
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
