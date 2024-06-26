// import library yang dibutuhkan
import React from "react";
import { Center, Container, Grid, GridItem, Image } from "@chakra-ui/react";
import LoginForm from "./fragments/LoginForm";
import ImageLogin from "../../assets/login.jpg";
// import ImageBgLogin from "../../assets/background";

// buat komponen index
export default function index() {
  return (
    <Container maxW="80%" gridTemplateRows="repeat(2, 1fr)" py={14} p={0}>
      <Center>
        <Grid
          gap={{ base: "5", lg: "90" }}
          h="100vh"
          w="base: 100%"
          templateColumns={{ lg: "repeat(2, 1fr)" }}
          justifyContent="center"
          // bgImage={ImageBgLogin}
          // bgSize={"cover"}
        >
          <GridItem margin={{ base: "auto", lg: "auto 0" }}>
            {/* tampilkan komponen LoginForm */}
            <LoginForm />
          </GridItem>
          <GridItem margin={{ base: "5", lg: "auto 0" }}>
            <Center>
              {/* tampilkan gambar login */}
              <Image src={ImageLogin} alt="image login" />
            </Center>
          </GridItem>
        </Grid>
      </Center>
    </Container>
  );
}
