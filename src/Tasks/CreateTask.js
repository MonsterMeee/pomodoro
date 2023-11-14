import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../Components/Form";

import { db } from "../firebase-config";
import { collection, addDoc, doc, Timestamp } from "firebase/firestore";

const CreateTask = () => {
    const navigate = useNavigate()
    const { projectid } = useParams()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const tasksCollectionRef = collection(db, "tasks")
    const projectRef = doc(db, "projects", projectid)

    const handleTitle = (event) => {
        setTitle(event.target.value)
    };

    const handleDescription = (event) => {
        setDescription(event.target.value)
    };

    const createTask = async (e) => {
        e.preventDefault()
        await addDoc(tasksCollectionRef, { title: title, description: description, done: false, project_id: projectRef, created_at: Timestamp.now(), updated_at: Timestamp.now() })
        navigate("/projects/" + projectid)
    }

    const handleBack = () => {
        navigate("/projects/" + projectid)
    }

    return (
        <>
            <h2 className="text-xl font-semibold mb-6">Erstelle einen neuen Task:</h2>
            <Form 
                title={ title }
                description={ description } 
                handleTitle={ handleTitle } 
                handleDescription={ handleDescription } 
                onClickBack={ handleBack } 
                onClickSubmit={ createTask } 
                label="speichern" 
            />
        </>
    );
}
 
export default CreateTask;