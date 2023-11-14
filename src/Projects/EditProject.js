import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase-config";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import Form from "../Components/Form";

const EditProject = () => {
    const navigate = useNavigate()
    const { projectid } = useParams()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [project, setProject] = useState()

    const projectRef = doc(db, "projects", projectid)
    
    useEffect(() => {
        const getProject = async () => {
            const docSnap = await getDoc(projectRef)
            setProject(docSnap.data())
        }
        getProject()
    }, [])

    useEffect(() => {
        if(project) {
            setTitle(project.title)
            setDescription(project.description)
        }
    }, [project])

    const handleTitle = (event) => {
        setTitle(event.target.value)
    };
    const handleDescription = (event) => {
        setDescription(event.target.value)
    };

    const updateProject = async (e) => {  
        e.preventDefault()
        const newFields = { title: title, description: description, updated_at: Timestamp.now() }
        await updateDoc(projectRef, newFields)
        navigate("/")
    }

    const handleBack = (e) => {
        e.preventDefault()
        navigate("/")
    }
    
    return (
        <>
            <h2 className="text-xl font-semibold mb-6">Projekt editieren:</h2>

            {   project && 
                <Form 
                    title={ title }
                    description={ description } 
                    handleTitle={ handleTitle } 
                    handleDescription={ handleDescription } 
                    onClickBack={ handleBack } 
                    onClickSubmit={ updateProject }
                    label="speichern" 
                />
            }
        </>
    );
}
 
export default EditProject;