import { useLoaderData, Link } from "react-router-dom";
import {
  Heading,
  Text,
  Center,
  Box,
  useColorModeValue,
  Img,
  HStack,
  Input,
  SimpleGrid,
  Tag,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export const loader = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  // const categories = await fetch("http://localhost:3000/categories");
  // const users = await fetch(`http://localhost:3000/users`);
  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredEvents = events.filter((event) => {
    if (selectedCategory) {
      const category = event.categoryIds;
      return (
        category == selectedCategory &&
        (event.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          event.description.toLowerCase().includes(searchInput.toLowerCase()))
      );
    } else {
      return (
        event.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        event.description.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
  });

  return (
    <Center py={6}>
      <Box>
        <Center>
          <Box
            boxShadow={useColorModeValue("5px 5px 0 black")}
            border={"1px"}
            padding={"1rem"}
            w={"90%"}
            marginBottom={"2rem"}
            bg="white"
          >
            <Heading
              marginBottom={"2rem"}
              as="h1"
              size="3xl"
              textAlign={"center"}
            >
              Upcoming events
            </Heading>
            <Input
              placeholder="Search events"
              margin={3}
              onChange={handleSearchInput}
              color="#464646"
              borderColor="#464646"
              boxSize={"85%"}
              height="44px"
              borderRadius="0"
            />
            <Select
              borderColor="#464646"
              placeholder="Select a category"
              onChange={handleCategorySelect}
              value={selectedCategory}
              boxSize={"90%"}
              borderRadius="0"
              margin={"0.75rem"}
            >
			
              <option value={1}>Sports</option>
              <option value={2}>Games</option>
              <option value={3}>Music</option>
              <option value={4}>Art</option>
              <option value={5}>Other</option>
			  
            </Select>
          </Box>
        </Center>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} justifyItems="center">
          {filteredEvents.map((event) => (
            <Box
              key={event.id}
              w="xs"
              h={"md"}
              my={5}
              mx={[0, 5]}
              overflow={"hidden"}
              bg="white"
              border={"1px"}
              borderColor="black"
              boxShadow={useColorModeValue("5px 5px 0 black")}
            >
              <Box>
                <Img
                  src={event.image}
                  roundedTop={"sm"}
                  objectFit="cover"
                  h="12.5rem"
                  w="full"
                  alt={"Blog Image"}
                />
              </Box>
              <Box p={4}>
                <Box>
                  {categories.map((category) =>
                    event.categoryIds?.includes(category.id) ? (
                      <Tag
                        key={category.id}
                        fontWeight="medium"
                        fontSize={"sm"}
                        color="white"
                        bg="black"
                        borderRadius="0"
                        p={2}
                        marginRight={3}
                        marginBottom={3}
                      >
                        {category.name}
                      </Tag>
                    ) : null
                  )}
                </Box>

                <Link to={`event/${event.id}`}>
                  <Heading
                    marginBottom={"0.3rem"}
                    as="h1"
                    size="lg"
                    noOfLines={1}
                  >  {event.title}
                  </Heading>
                </Link>
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
                <Text
                  fontSize="2xl"
                  noOfLines={1}
                >{`${event.description}`}</Text>
              </Box>

              <HStack p={4} borderTop={"1px"} color="black">
                <Link to={`event/${event.id}`}>
                  <Text fontSize={"md"} fontWeight={"semibold"}>
                    Check the event
                  </Text>
                </Link>
                <ArrowForwardIcon />
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Center>
  );
};
