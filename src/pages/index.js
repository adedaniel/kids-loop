import {
  Button,
  Flex,
  Input,
  Link as ChakraLink,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import validator from "validator";
import FormContainer from "../components/FormContainer";
import { mockSignInApi } from "../utils";

const Index = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const linkColor = useColorModeValue("navy", "blue.400"); // Navy in Light mode, blue in Dark mode

  const onSubmitSignIn = (event) => {
    event.preventDefault();
    if (
      !validator.isMobilePhone(emailOrPhone) &&
      !validator.isEmail(emailOrPhone)
      //To validate if the email or phone number is valid
    ) {
      toast({
        title: "Please enter a valid email or phone number.",
        position: "top",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    } else {
      //If validation is successful
      setIsLoading(true); // Then Start progress indicator
      mockSignInApi().then(() => {
        // Call mock api
        setIsLoading(false);
        toast({
          title: "Login Successful.",
          position: "top",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        //Reset Values
        setEmailOrPhone("");
        setPassword("");
      });
    }
  };

  return (
    <>
      <Head>
        <title>Sign In - KidsLoop</title>
      </Head>
      <FormContainer title="Sign In">
        <form onSubmit={onSubmitSignIn} action="submit">
          <Stack spacing={3} w="full">
            <Input
              h={12}
              isRequired
              value={emailOrPhone}
              onChange={(event) => setEmailOrPhone(event.target.value)}
              rounded={12}
              placeholder="Email or Phone *"
            />
            <Input
              type="password"
              h={12}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              isRequired
              rounded={12}
              placeholder="Password *"
            />
            <Flex align="center" justify="space-between">
              <ChakraLink fontSize="sm" color={linkColor}>
                <Link href="/forgot-password">
                  <a>Forgot Password?</a>
                </Link>
              </ChakraLink>
              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Signing In..."
                h={8}
                fontSize="sm"
                colorScheme="blue"
                rounded={12}
              >
                Sign In
              </Button>
            </Flex>
          </Stack>
        </form>
        <Flex py={2}>
          <ChakraLink fontSize="sm" color={linkColor}>
            <Link href="/signup">
              <a>Create an account</a>
            </Link>
          </ChakraLink>
        </Flex>
      </FormContainer>
    </>
  );
};

export default Index;
