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

export default function Signup() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const linkColor = useColorModeValue("navy", "blue.400");

  const onSubmitSignUp = (event) => {
    event.preventDefault();
    if (
      !validator.isMobilePhone(emailOrPhone) &&
      !validator.isEmail(emailOrPhone)
    ) {
      toast({
        title: "Please enter a valid email or phone number.",
        position: "top",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    } else if (password !== confirmPassword) {
      toast({
        title: "Those passwords do not match.",
        position: "top",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    } else {
      setIsLoading(true);
      mockSignInApi().then(() => {
        setIsLoading(false);
        toast({
          title: "Signup successful",
          description: "You're good to go!",
          position: "top",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
        setEmailOrPhone("");
        setFullName("");
        setPassword("");
        setConfirmPassword("");
      });
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - KidsLoop</title>
      </Head>
      <FormContainer title="Sign Up">
        <form onSubmit={onSubmitSignUp} action="submit">
          <Stack spacing={3} w="full">
            <Input
              h={12}
              isRequired
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              rounded={12}
              placeholder="Full Name *"
            />
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
            <Input
              type="password"
              h={12}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              isRequired
              rounded={12}
              placeholder="Confirm Password *"
            />

            <Flex align="center" justify="space-between">
              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Signing Up..."
                h={8}
                fontSize="sm"
                colorScheme="blue"
                rounded={12}
              >
                Sign Up
              </Button>
            </Flex>
          </Stack>
        </form>
        <Flex py={2}>
          <ChakraLink fontSize="sm" color={linkColor}>
            <Link href="/">
              <a>Sign In</a>
            </Link>
          </ChakraLink>
        </Flex>
      </FormContainer>
    </>
  );
}
