import { useState, useEffect, useCallback } from "react";
import { db } from "../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import ProgressCircle from "./ProgressCircle";

const Timer = ({ taskid }) => {
    const [seconds, setSeconds] = useState(1500)
    const [isActive, setIsActive] = useState(false)
    const [wasStarted, setWasStarted] = useState(false)
    const [time, setTime] = useState(0)
    const [progress, setProgress] = useState(0)

    const taskRef = doc(db, "tasks", taskid)

    const handleDone = useCallback(value  => {
        const newFields = { done: value }
        updateDoc(taskRef, newFields)
    }, [])

    const toggleActive = () => {
        setIsActive(!isActive)
        setWasStarted(true)
    }
    
    const reset = () => {
        if(wasStarted) {
            setSeconds(1500)
            setIsActive(false)
            setTime(secondsToMs(1500))
            setProgress(0)
            handleDone(false)
            setWasStarted(false)
        }
    }    
    
    const secondsToMs = (sec) => {
        let m = Math.floor(sec / 60)
        let s = Math.floor(sec % 60)

        let mDisplay = m < 10 ? "0" + m + " : " : m + " : "
        let sDisplay = s < 10 ? "0" + s : s
        return mDisplay + sDisplay
    }   
        
    useEffect(() => {
        let interval = null

        setTime(secondsToMs(seconds))

        if (isActive) {
            interval = setInterval(() => {
                setTime(secondsToMs(seconds))
                setSeconds(seconds => seconds - 1)
                setProgress(progress + 1)
            }, 1000); 
        } else {
            clearInterval(interval)
        }

        if(seconds === 0) {
            setIsActive(false)
            handleDone(true)
        }

        return () => clearInterval(interval)
    }, [isActive, seconds, progress, handleDone])


    return (
        <div className="pt-6 grid gap-y-2.5">
            <ProgressCircle progress={ progress } trackWidth={ 25 } indicatorWidth={ 25 } time={ time } />

            <div className="grid grid-cols-2 gap-2">
                <button className={`w-32 cursor-pointer font-semibold py-2 px-4 rounded ${isActive ? "hover:bg-gray-500 border border-white hover:border-transparent" : "text-green-500 hover:text-white border border-green-500 hover:bg-green-500"}`} onClick={ toggleActive }>
                    { isActive ? "Pause" : "Start" }
                </button>
                <button className={`w-32 place-self-end text-white font-semibold py-2 px-4 rounded ${wasStarted ? "cursor-pointer hover:bg-rose-500 border border-rose-500 text-rose-500 hover:text-white" : "cursor-not-allowed hover:bg-gray-500 border border-white hover:border-transparent"}`} onClick={ reset }>
                    Abbrechen
                </button>
            </div>
        </div>
    );
}
 
export default Timer;