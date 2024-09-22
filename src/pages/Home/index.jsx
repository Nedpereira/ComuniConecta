import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  Box,
  Grid,
  Text,
  Spinner,
  Center,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { cores } from "../../styles/cores";
import { Presentation } from "../../components/presentation";
import { Header } from "../../components/header";
import { EventCard } from "../../components/EventCard";
import { db } from "../../Firebase";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [filter, setFilter] = useState("all");

  const fetchEvents = async () => {
    try {
      const q = query(
        collection(db, "events"),
        orderBy("isFavorited", "desc"),
        orderBy("data", "asc")
      );
      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        isFavorited: doc.data().isFavorited || false,
        gratuito: doc.data().gratuito ?? false,
      }));
      setEvents(eventsData);
      setFilteredEvents(eventsData);
      setIsEmpty(eventsData.length === 0);
    } catch (error) {
      console.error("Erro ao buscar eventos: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (eventId, isFavorited) => {
    try {
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, { isFavorited });

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? { ...event, isFavorited } : event
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
  };

  const filterEvents = (type) => {
    setFilter(type);
    if (type === "free") {
      setFilteredEvents(events.filter((event) => event.gratuito));
    } else if (type === "paid") {
      setFilteredEvents(events.filter((event) => !event.gratuito));
    } else {
      setFilteredEvents(events);
    }
  };

  useEffect(() => {
    if (filter === "free") {
      setFilteredEvents(events.filter((event) => event.gratuito));
    } else if (filter === "paid") {
      setFilteredEvents(events.filter((event) => !event.gratuito));
    } else {
      setFilteredEvents(events);
    }
  }, [events, filter]);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Header onEventCreated={fetchEvents} />
      <Presentation />
      <Box px={4} py={2}>
        <Text my={4} color={cores.white} fontSize="md" fontWeight="bold">
          Explore os eventos abaixo e faça parte dessa conexão!
        </Text>

        <ButtonGroup mb={4}>
          <Button
            size="sm"
            onClick={() => filterEvents("all")}
            colorScheme={filter === "all" ? "teal" : "gray"}
          >
            Todos
          </Button>
          <Button
            size="sm"
            onClick={() => filterEvents("free")}
            colorScheme={filter === "free" ? "teal" : "gray"}
          >
            Gratuito
          </Button>
          <Button
            size="sm"
            onClick={() => filterEvents("paid")}
            colorScheme={filter === "paid" ? "teal" : "gray"}
          >
            Pago
          </Button>
        </ButtonGroup>

        {loading ? (
          <Center>
            <Spinner size="xl" color={cores.ciano} />
          </Center>
        ) : isEmpty ? (
          <Center>
            <Text color={cores.gray} fontSize="sm" mt={6}>
              Nenhum evento cadastrado ainda.
            </Text>
          </Center>
        ) : (
          <Grid
            templateColumns={{
              base: "repeat(auto-fill, minmax(240px, 1fr))",
              md: "repeat(auto-fill, minmax(250px, 1fr))",
              lg: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
            gap={4}
          >
            {filteredEvents.map((event) => (
              <Box key={event.id}>
                <EventCard event={event} onFavorite={handleFavorite} />
              </Box>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Home;
