import React from 'react'
import { FormControl, Input } from '@chakra-ui/core'

const Searchbar : React.FC = () => {
    return (
        <FormControl>
            <Input name="search" placeholder="Buscar..."/>
        </FormControl>
    )
}

export default Searchbar;