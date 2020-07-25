import React from 'react';
import {DynamicDrawerMenu} from "./";

interface IConfirmationMenuProps {
    isOpen: boolean;
    onClose: ()=>void;
    title: string;
    action: ()=>void;
}

//menu drawer de confirmacion de accion, se usa para acciones irreversibles, que necesitan mas atencion de parte del usuario
//EJ: ¿Seguro desea eliminar x?
const ConfirmationMenu : React.FC<IConfirmationMenuProps> = ({isOpen,onClose,title,action}) => {
    return (
        <DynamicDrawerMenu isOpen={isOpen} onClose={onClose} title={`¿Seguro que desea ${title}?`} menu={[{name:"Confirmar",action},{name:"Cancelar",action:onClose}]}/>
    )
}

export default ConfirmationMenu;