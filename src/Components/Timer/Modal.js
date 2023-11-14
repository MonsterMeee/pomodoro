import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Timer from "./Timer";

// Shows a single task
const Modal = ({ handleClose, show, singleTaskId }) => {
    const [task, setTask] = useState()

    const taskRef = doc(db, "tasks", singleTaskId)

    useEffect(() => {
        const getTask = async () => {
            const docSnap = await getDoc(taskRef)
            setTask(docSnap.data())
        }
        getTask()
    }, [])

    return (
      <div className={`absolute bg-black/30 w-screen h-screen top-0 left-0 ${show ? "block" : "hidden"}`}>
        <div className="max-w-sm w-full absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 bg-slate-900 p-5 rounded-lg m-0 p-0">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer float-right" onClick={ handleClose }>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

            { task &&
                <>
                    <h2 className="text-2xl font-semibold pb-4">{ task.title }</h2>                
                    <p>{ task.description }</p>
                    
                    <Timer taskid={ taskRef.id } />
                </>
            }
        </div>
      </div>
    );
}
 
export default Modal;