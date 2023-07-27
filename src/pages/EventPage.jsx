import {
  Box,
  Center,
  Heading,
  Img,
  Text,
  useColorModeValue,
  Tag,
  Image,
  useToast,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useLoaderData, Link } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    event: await event.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { event, users, categories } = useLoaderData();
  const toast = useToast();

  const showToast = JSON.parse(localStorage.getItem("showToast"));

  if (showToast) {
    toast({
      title: "Event added succesfully",
      status: "success",
      duration: 5000,
      position: "top-right",
      isClosable: true,
    });
    localStorage.setItem("showToast", false);
  }

  const handleDeleteClick = () => {
    if (window.confirm("Are you 100% sure you want to delete this event?")) {
      fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      })
        .then(() => {
          toast({
            title: "Event deleted successfully.",
            status: "success",
            duration: 5000,
            position: "top-right",
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <Center>
      <Box>
        <Box
          key={event.id}
          bg="white"
          border={"1px"}
          borderColor="black"
          boxShadow={useColorModeValue("5px 5px 0 black")}
          margin={"2rem"}
          w={{ base: "95%", md: "90%", lg: "80%" }}
          mx="auto"
        >
          <Img
            src={event.image}
            roundedTop={"sm"}
            objectFit="cover"
            h={{ base: "15rem", md: "20rem", lg: "25rem" }}
            w="full"
            alt={"Event Image"}
          />

          <Box p={6}>
            <Flex alignItems={"center"}>
              {categories.map((category) =>
                event.categoryIds.includes(category.id) ? (
                  <Box key={event.categoryIds}>
                    <Tag
                      fontSize={"sm"}
                      fontWeight="medium"
                      key={category.id}
                      color="white"
                      bg="black"
                      borderRadius="0"
                      p={2}
                      marginRight={3}
                      marginBottom={3}
                    >
                      {category.name}
                    </Tag>
                  </Box>
                ) : null
              )}
              <Spacer />
              {users.map((user) =>
                user.id == event.createdBy ? (
                  <Box key={user.id}>
                    <Image boxSize="33px" src={user.image} />
                  </Box>
                ) : null
              )}
              {users.map((user) =>
                user.id == event.createdBy ? (
                  <Box key={user.id}>
                    <Tag color="white" bg="black" borderRadius="0" p={2}>
                      <Text>{user.name}</Text>
                    </Tag>
                  </Box>
                ) : null
              )}
            </Flex>

            <Heading marginBottom={"0.3rem"} as="h1" size="2xl" noOfLines={1}>
              {event.title}
            </Heading>

            <Text marginBottom={"1rem"}>
              {new Date(event.startTime).toLocaleString([], {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              {"-"}
              {new Date(event.endTime).toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>

            <Text fontSize="4xl" noOfLines={2}>{`${event.description}`}</Text>
            <Text>location: {event.location}</Text>

            <Box marginTop={"1rem"}>
              <Link to={"/"}>
                <Button
                  margin={"0.5rem"}
                  variant="outline"
                  borderRadius="0"
                  bg={"white"}
                  borderColor="black"
                  boxShadow={useColorModeValue(
                    "6px 6px 0 black",
                    "6px 6px 0 cyan"
                  )}
                >
                  Back to all events
                  <ArrowForwardIcon marginLeft={"1rem"} />
                </Button>
              </Link>

              <Link to={"/"}>
                <Button
                  onClick={handleDeleteClick}
                  margin={"0.5rem"}
                  variant="outline"
                  borderRadius="0"
                  bg={"white"}
                  borderColor="black"
                  boxShadow={useColorModeValue(
                    "6px 6px 0 black",
                    "6px 6px 0 cyan"
                  )}
                >
                  Delete event
                  <DeleteIcon marginLeft={"1rem"} />
                </Button>
              </Link>

              <Link to={`/editevent/${event.id}`}>
                <Button
                  margin={"0.5rem"}
                  variant="outline"
                  borderRadius="0"
                  bg={"white"}
                  borderColor="black"
                  boxShadow={useColorModeValue(
                    "6px 6px 0 black",
                    "6px 6px 0 cyan"
                  )}
                >
                  Edit event
                  <EditIcon marginLeft={"1rem"} />
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Center>
  );
};
