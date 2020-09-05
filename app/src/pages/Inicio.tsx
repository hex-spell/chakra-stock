import React, { useContext } from "react";
import { Page } from "../components/Layout";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Box,
  Stack,
  Divider,
  Heading,
} from "@chakra-ui/core";
import { UserContext } from "../context/User";

export default function Inicio() {
  const {
    store: {
      user: { name },
    },
  } = useContext(UserContext);
  return (
    <Page title="Inicio">
      <Stack spacing={5} mt="5px">
        <Box p="10px" shadow="md">
          <Heading size="sm">
            Bienvenido/a {name}! Actualmente tenés 0 pedidos pendientes.
          </Heading>
        </Box>
        <Divider/>
        <Box p="10px" shadow="md">
          <StatGroup>
            <Stat>
              <StatLabel>Gasto mensual</StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Feb 1 - Feb 28</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Ganancia mensual bruta</StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Feb 1 - Feb 28</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Ganancia total</StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Feb 1 - Feb 28</StatHelpText>
            </Stat>
          </StatGroup>
        </Box>
        <Divider />
        <Box p="10px" shadow="md">
          <StatGroup>
            <Stat>
              <StatLabel>Deuda propia</StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Deuda de clientes</StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
          </StatGroup>
        </Box>
      </Stack>
    </Page>
  );
}
