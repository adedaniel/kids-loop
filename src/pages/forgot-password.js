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

export default function ForgotPassword() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const linkColor = useColorModeValue("navy", "blue.400");

  const onSubmitForgotPassword = (event) => {
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
    } else {
      setIsLoading(true);
      mockSignInApi().then(() => {
        setIsLoading(false);
        toast({
          title: "You've got mail.",
          description:
            "We have sent you a verification email. Do follow the steps in the mail",
          position: "top",
          status: "success",
          duration: 10000,
          isClosable: true,
        });
        setEmailOrPhone("");
      });
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password? - KidsLoop</title>
      </Head>
      <FormContainer title="Forgot Password?">
        <form onSubmit={onSubmitForgotPassword} action="submit">
          <Stack spacing={3} w="full">
            <Input
              h={12}
              isRequired
              value={emailOrPhone}
              onChange={(event) => setEmailOrPhone(event.target.value)}
              rounded={12}
              placeholder="Enter your Email or Phone Number *"
            />

            <Flex align="center" justify="space-between">
              <ChakraLink fontSize="sm" color={linkColor}>
                <Link href="/">
                  <a>Sign In</a>
                </Link>
              </ChakraLink>
              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Verifying..."
                h={8}
                fontSize="sm"
                colorScheme="blue"
                rounded={12}
              >
                Reset
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
}
