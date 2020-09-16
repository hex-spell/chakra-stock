import React, { useContext } from "react";
import { ContainerCentered, MoneyText, Page } from "../components/Layout";
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
  Spinner,
} from "@chakra-ui/core";
import { UserContext } from "../context/User";
import { getCurrentMonthName, useStatsService } from "../services";

const currentMonthName = getCurrentMonthName();

export default function Inicio() {
  const {
    store: {
      user: { name },
    },
  } = useContext(UserContext);

  const {
    store: { payload, error, status },
  } = useStatsService();

  return (
    <Page title="Inicio">
      {status === "loaded" && error === null && payload && (
        <Stack spacing={5} mt="5px">
          <Box p="10px" shadow="md" bg="white" rounded="md">
            <Heading size="sm">
              Bienvenido/a {name}! Tenés {payload.pending_orders} pedidos
              pendientes.
            </Heading>
          </Box>
          <Divider />
          <Box p="10px" shadow="md" bg="white" rounded="md">
            <StatGroup textAlign="center">
              <Stat>
                <StatLabel>Gasto total</StatLabel>
                <StatNumber>
                  <MoneyText
                    red
                    ammount={payload.transactions_out + payload.expenses_sum}
                  />
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Ganancia bruta</StatLabel>
                <StatNumber>
                  <MoneyText ammount={payload.transactions_in} />
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Ganancia neta</StatLabel>
                <StatNumber>
                  <MoneyText ammount={payload.benefits} />
                </StatNumber>
              </Stat>
              <StatHelpText>{currentMonthName}</StatHelpText>
            </StatGroup>
          </Box>
          <Divider />
          <Box p="10px" shadow="md" bg="white" rounded="md">
            <StatGroup textAlign="center">
              <Stat>
                <StatLabel>Deuda propia</StatLabel>
                <StatNumber>
                  <MoneyText red ammount={payload.own_debt} />
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Deuda de contactos</StatLabel>
                <StatNumber>
                  <MoneyText red ammount={payload.contacts_debt} />
                </StatNumber>
              </Stat>
            </StatGroup>
          </Box>
        </Stack>
      )}
      {status === "loading" && (
        <ContainerCentered>
          <Spinner size="xl" />
        </ContainerCentered>
      )}
    </Page>
  );
}
