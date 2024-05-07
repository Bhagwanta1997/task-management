import { useState } from "react";
import Child from "./child";

const Parent = () => {

    console.log('Parent');
    const [counter, setCounter] = useState(0);
    const [name, setName] = useState('John');

    const handleIncreamenentCounter = () => {
        setCounter(counter => counter + 1);
    };



    return (
        <div>
            {counter} of {name}
            <Child
                increamentCounter={handleIncreamenentCounter}
            />
            <button onClick={()=>setName('James')}>SetName</button>    
        </div>
    )
}

export default Parent;
