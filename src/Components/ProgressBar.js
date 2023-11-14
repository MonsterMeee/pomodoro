import { useEffect, useState } from "react";

// Visual feedback on how many tasks have been completed
const ProgressBar = ({ count, length }) => {
    const [value, setValue] = useState(0)

    useEffect(() => {
        setValue(100 / (length / count))
    }, [count, length])

    return (
        <div className="self-center grid grid-cols-8 gap-2">
            <div className="text-sm float-left whitespace-nowrap col-span-3">
                Erledigt: { count } / { length }
            </div>

            <div className="mt-0.5 rounded-lg bg-white float-right h-3.5 col-span-5" style={{ width: "100%" }}>
                <div style={{ width: `${value}%` }} className="h-3.5 self-center rounded-lg bg-green-500 transition-all ease-in-out duration-1000 delay-500" />
            </div>
        </div>
    );
}
 
export default ProgressBar;