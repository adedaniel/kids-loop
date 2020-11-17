import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Link as ChakraLink,
  Select,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function FormContainer({ title, children, ...rest }) {
  //The FormContainer receives the title of the form, as well as the form content
  const { colorMode, toggleColorMode } = useColorMode(); //This hook is created by Chakra UI for toggling color themes
  const boxShadow = useColorModeValue(
    "0px 0px 20px 5px rgba(0,0,0,0.1)", // Box Shadow in Light Mode
    "0px 0px 20px 5px rgb(119 106 106 / 10%)" // Box Shadow in Dark mode
  );
  return (
    <Flex minH="100vh" align="center" justify="center" {...rest}>
      <Stack w={["xs", "sm"]}>
        <Box w="full" boxShadow={boxShadow} px={8} py={8} rounded={12}>
          <Stack spacing={6}>
            <Image src="/images/kidsloop_min_logo.svg" w={20} />
            <Heading fontWeight="semibold" fontSize="2xl">
              {title}
            </Heading>
            {children}
          </Stack>
        </Box>
        <Flex
          flexDirection={["column", "row"]}
          w="full"
          justify="space-between"
          align="center"
        >
          <Stack align="center" isInline>
            <IconButton
              variant="ghost"
              colorScheme="blue"
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
            />
            <Select size="sm" placeholder="Select Language" variant="flushed">
              <option value="English">English</option>
              <option value="Chinese">Chinese</option>
              <option value="French">French</option>
            </Select>
          </Stack>
          <Stack mt={[2, 0]} align="center" spacing={3} isInline>
            <ChakraLink href="#" fontSize="sm">
              Help
            </ChakraLink>
            <ChakraLink href="#" fontSize="sm">
              Privacy
            </ChakraLink>
            <ChakraLink href="#" fontSize="sm">
              Terms
            </ChakraLink>
          </Stack>
        </Flex>
      </Stack>
    </Flex>
  );
}
