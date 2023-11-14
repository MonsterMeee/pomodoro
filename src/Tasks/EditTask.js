import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import Form from "../Components/Form";

const EditTask = () => {
    const { taskid, projectid } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [done, setDone] = useState(false)

    const [task, setTask] = useState()
    const taskRef = doc(db, "tasks", taskid)

    useEffect(() => {
        const getTask = async () => {
            const docSnap = await getDoc(taskRef)
            setTask(docSnap.data())
        }
        getTask()
    }, [])

    useEffect(() => {
        if(task) {
            setTitle(task.title)
            setDescription(task.description)
            setDone(task.done)
        }
    }, [task])

    const handleTitle = (event) => {
        setTitle(event.target.value)
    };

    const handleDescription = (event) => {
        setDescription(event.target.value)
    };

    const editTask = async (e) => {
        e.preventDefault()
        const newFields = { title: title, description: description, done: done, updated_at: Timestamp.now() }
        await updateDoc(taskRef, newFields)
        navigate("/projects/" + projectid)
    }

    const handleBack = (e) => {
        e.preventDefault()
        navigate("/projects/" + projectid)
    }

    return (
        <>
            <h2 className="text-xl font-semibold mb-6">Task editieren:</h2>
            { 
                task &&
                <Form 
                    title={ title }
                    description={ description } 
                    handleTitle={ handleTitle } 
                    handleDescription={ handleDescription } 
                    onClickBack={ handleBack } 
                    onClickSubmit={ editTask } 
                    label="speichern" 
                />
            }
        </>
    );
}
 
export default EditTask;