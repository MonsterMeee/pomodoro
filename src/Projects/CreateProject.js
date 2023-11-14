import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Form from "../Components/Form";

const CreateProject = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const projectsCollectionRef = collection(db, "projects")

    const handleTitle = (event) => {
        setTitle(event.target.value)
    };

    const handleDescription = (event) => {
        setDescription(event.target.value)
    };

    const createProject = async (e) => {
        e.preventDefault()
        await addDoc(projectsCollectionRef, { title: title, description: description, author: "annika", created_at: Timestamp.now(), updated_at: Timestamp.now() })
        navigate("/")
    }

    const handleBack = (e) => {
        e.preventDefault()
        navigate("/")
    }

    return (
        <>
            <h2 className="text-xl font-semibold mb-6">Erstelle ein neues Projekt:</h2>
            <Form 
                description={ description } 
                title={ title } 
                handleDescription={ handleDescription } 
                handleTitle={ handleTitle } 
                onClickBack={ handleBack } 
                onClickSubmit={ createProject } 
                label="speichern" 
            />
        </>
    );
}
 
export default CreateProject;