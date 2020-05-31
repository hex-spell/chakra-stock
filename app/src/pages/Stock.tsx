import React from 'react'
import { Container } from '../components/Layout'
import { Stack } from '@chakra-ui/core'
import { Searchbar } from '../components/Searchbar'
import { FilterDropdown } from '../components/FilterDropdown'

export default function Stock() {
    return (
        <Container>
            <Stack spacing={2} shouldWrapChildren={true}>
            <Searchbar />
            <FilterDropdown menu={[
                {name:"Todas las categorías",value:"all"},
                {name:"Especias",value:"especias"},
                {name:"Cotillón",value:"cotillon"}
            ]}/>
            </Stack>
        </Container>
    )
}
