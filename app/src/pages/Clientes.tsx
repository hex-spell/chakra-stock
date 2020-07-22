import React from 'react'
import { Page, ActionButton } from "../components/Layout";
import {FaUserPlus} from "react-icons/fa";

export default function Clientes() {
    return (
        <Page title="Clientes">
            <ActionButton icon={FaUserPlus} ariaLabel="Agregar Cliente" action={()=>alert("hello!")}/>
        </Page>
    )
}
