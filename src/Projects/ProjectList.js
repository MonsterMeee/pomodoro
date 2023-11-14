import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, deleteDoc, doc, where, query, orderBy } from "firebase/firestore";
import ButtonSubmit from "../Components/Button/ButtonSubmit";
import Dropdown from "../Components/Dropdown/Dropdown";

// Fetch and display all projects from firebase
const ProjectList = () => {
    const navigate = useNavigate()
    const [projects, setProjects] = useState([])
    const [refresh, setRefresh] = useState(false)

    const projectsCollectionRef = collection(db, "projects")
    
    useEffect(() => {
        const getProjects = async () => {
            const data = await getDocs(query(projectsCollectionRef, orderBy("updated_at", "desc")))
            setProjects(data.docs.map((doc) => 
                ({ ...doc.data(), id: doc.id })
            ))
        }
        getProjects()
        setRefresh(false)
    }, [refresh])

    const handleEdit = (id) => {
        navigate("/projects/edit/" + id)
    }

    const handleClick = () => {
        navigate("/projects/create")
    }

    const handleDelete = async (id) => {
        const projectRef = doc(db, "projects", id)

        const deleteTasks = async () => {
            const q = query(
                collection(db, "tasks"),
                where("project_id", "==", projectRef)
            );
            const data = await getDocs(q);
            
            data.docs.forEach(d => {
                const taskRef = doc(db, "tasks", d.id)
                deleteDoc(taskRef)
            })
        } 
        deleteTasks()

        await deleteDoc(projectRef)
        setRefresh(true)
    }

    const truncate = (output) => {
        if(output.length > 300) {
            return `${output.substring(0, 300)}...`
        } else {
            return output
        }
    }

    return (
        <>
            {   projects.length > 0 ?
                <>
                    <h1 className="text-2xl font-semibold mb-6">
                        Liste aller Projekte:
                    </h1>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {   
                            projects.map((project) => {
                                return (
                                    <div className="bg-indigo-900/75 p-5 rounded-lg" key={ project.id }>
                                        <div className="grid grid-cols-3 gap-2 place-content-between">
                                            <Link to={"/projects/" + project.id} className="col-span-2"><h2 className="text-xl font-semibold pb-3">{ project.title }</h2></Link> 
                                            <Dropdown onDeleteProp={() => { handleDelete(project.id) }} onEditProp={() => { handleEdit(project.id) }} id={ project.id } />
                                        </div>

                                        <p>{ truncate(project.description) }</p>
                                    </div>   
                                )
                            })
                        }
                    </div>
                </>
            : 
                <div>
                    <h1 className="text-2xl font-semibold mb-6">
                        Willkommen in deiner Pomodoro App
                    </h1>

                    <h2 className="text-xl font-semibold mb-4">
                        Was ist "Pomodoro"?
                    </h2>

                    <p className="mb-3">
                        Die Pomodoro-Technik ist eine Methode des Zeitmanagements. Das System verwendet einen Timer, um die Arbeit in 25-Minuten-Abschnitte - die sogenannten pomodori - und Pausenzeiten zu unterteilen.
                    </p>

                    <p className="mb-3">
                        Die Technik besteht aus fünf Schritten:
                    </p>

                    <ul className="mb-3 list-disc ml-5">
                        <li>die Aufgabe schriftlich formulieren</li>
                        <li>den Timer stellen</li>
                        <li>die Aufgabe bearbeiten, bis der Wecker klingelt</li>
                        <li>kurze Pause (5 Minuten)</li>
                        <li>nach jeweils vier Zeitblöcken eine längere Pause machen (15-20 Minuten)</li>
                    </ul>

                    <p>
                        Beginne mit deinem ersten Projekt!
                    </p>
                </div>
            }


            <div className="grid mt-6">
                <ButtonSubmit onClickSubmit={ handleClick } label="Projekt erstellen" />
            </div>
        </>
    );
}
 
export default ProjectList;