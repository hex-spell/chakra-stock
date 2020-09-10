import { useEffect } from 'react';

interface IuseBackButtonProps {
    isActive : boolean;
    substituteFunction : () => void;
}

const useBackButton = ({isActive, substituteFunction} : IuseBackButtonProps) => {
    useEffect(()=>{
        if (isActive){
            window.onpopstate = (e:any) => {
                e.preventDefault();
                substituteFunction();
            }
        }
    },[isActive])
    return 1;
}

export default useBackButton;