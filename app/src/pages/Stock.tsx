import React from 'react'
import { Page, ActionButton } from '../components/Layout'
import { Stack } from '@chakra-ui/core'
import { Searchbar } from '../components/Searchbar'
import { FilterDropdown } from '../components/FilterDropdown'
import { FaRegPlusSquare } from 'react-icons/fa'

export default function Stock() {
    return (
        <Page title="Stock">
            <Stack spacing={2} shouldWrapChildren={true}>
            <Searchbar />
            <FilterDropdown menu={[
                {name:"Todas las categorías",value:"all"},
                {name:"Especias",value:"especias"},
                {name:"Cotillón",value:"cotillon"}
            ]}/>
            </Stack>
            <ActionButton icon={FaRegPlusSquare} ariaLabel="Agregar Item" action={()=>alert("hello!")}/>
        </Page>
    )
}
