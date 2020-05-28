import React, { useContext } from "react";
import { UserContext, LOG_OUT } from "./context/User";


const App: React.FC = () => {
  const {
    store: {
      user: { name, email }
    },
    dispatch
  } = useContext(UserContext);

  return (
    <div>
      welcome {name} ! your email is { email }.
      <button onClick={()=>dispatch({type:LOG_OUT})}>Log out</button>
    </div>
  );
};

export default App;
