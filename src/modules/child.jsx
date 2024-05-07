import React from "react";

const Child = ({ increamentCounter }) => {
    console.log('Child');
    return <div>
        <button onClick={increamentCounter}>Increament</button>
    </div>
}

export default React.memo(Child);