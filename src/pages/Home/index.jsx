import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Box, Grid, Text, Spinner, Center } from "@chakra-ui/react";
import { cores } from "../../styles/cores";
import { Presentation } from "../../components/presentation";
import { Header } from "../../components/header";
import { EventCard } from "../../components/EventCard";
import { db } from "../../firebase";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchEvents = async () => {
    try {
      const q = query(collection(db, "events"), orderBy("data", "asc"));
      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map((doc) => doc.data());
      setEvents(eventsData);
      setIsEmpty(eventsData.length === 0);
    } catch (error) {
      console.error("Erro ao buscar eventos: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Header onEventCreated={fetchEvents} />
      <Presentation />
      <Box p={4}>
        <Text my={4} color={cores.white} fontSize="md" fontWeight="bold">
          Explore os eventos abaixo e faça parte dessa conexão!
        </Text>

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
            {events.map((event, index) => (
              <Box key={index}>
                <EventCard event={event} />
              </Box>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Home;
