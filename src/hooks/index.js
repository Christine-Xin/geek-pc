import { useEffect, useState, useRef, createContext,useContext } from "react";
function App(){
    // 创建context
    const Context=createContext()
    function Bar(){
        const name= useContext(Context)
        return <div>{name}</div>
    }
    return (
        <Context.Provider value={'这是name'}>
            <Bar></Bar>
        </Context.Provider>
    )
}

export default App;