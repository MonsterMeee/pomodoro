import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { doc, collection, getDoc, getDocs, where, query, deleteDoc, orderBy } from "firebase/firestore";
import ButtonBack from "../Components/Button/ButtonBack";
import ButtonSubmit from "../Components/Button/ButtonSubmit";
import Dropdown from "../Components/Dropdown/Dropdown";
import Modal from "../Components/Timer/Modal";
import DropdownFilter from "../Components/Dropdown/DropdownFilter";
import ProgressBar from "../Components/ProgressBar";

// Fetch and display single project from firebase using the project id
const SingleProject = () => {
    const { projectid } = useParams()
    const navigate = useNavigate()
    
    const [refresh, setRefresh] = useState(false);
    const [isShown, setIsShown] = useState(false)
    const [singleTask, setSingleTask] = useState(null)
    const [filter, setFilter] = useState("undone")
    const [filteredTasks, setFilteredTasks] = useState([])
    const [counter, setCounter] = useState(0)
    const [length, setLength] = useState(0)

    const [project, setProject] = useState()
    const [tasks, setTasks] = useState([])

    const projectRef = doc(db, "projects", projectid)

    useEffect(() => {
        const getProject = async () => {
            const docSnap = await getDoc(projectRef)
            setProject(docSnap.data())
        }
        getProject()
    }, [])

    // Fetch all tasks from this project
    useEffect(() => {
        const getTasks = async () => {
            const q = query(
                collection(db, "tasks"),
                where("project_id", "==", projectRef),
                orderBy("updated_at", "desc")
            )
            const data = await getDocs(q)
            setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        } 
        getTasks()
        setRefresh(false)
    }, [refresh])

    const handleDelete = async (taskid) => {
        const taskRef = doc(db, "tasks", taskid)
        await deleteDoc(taskRef)
        setRefresh(true)
    };

    const filterTasks = (val) => {
        setFilter(val)
    }

    // show tasks depending on filter
    useEffect (() => {
        if(tasks) {
            if(filter === "undone") {
                setFilteredTasks(tasks.filter(task => task.done === false))
            } else if(filter === "done") {
                setFilteredTasks(tasks.filter(task => task.done === true))
            } else {
                setFilteredTasks(tasks)
            }

            setCounter(tasks.filter(task => task.done === true).length)
            setLength(tasks.length)
        }
    }, [filter, tasks])
    

    const handleBack = () => {
        navigate("/")
    }

    const createTask = () => {
        navigate("./tasks/create")
    }

    const handleEdit = (id) => {
        navigate("./tasks/" + id + "/edit")
    }
  
    const showModal = (id) => {
        setSingleTask(id)
        setIsShown(true)
    }

    const hideModal = () => {
        setIsShown(false)
        setSingleTask(null)
        setRefresh(true)
    }

    const truncate = (output) => {
        if(output.length > 150) {
            return `${output.substring(0, 150)}...`
        } else {
            return output
        }
    }


    return (
        <>
            { project && (
                <>                
                    <h1 className="text-2xl font-semibold mb-6">{ project.title }</h1>
                    <p>{ project.description }</p>
                </>
            )}

            <div className="grid sm:grid-cols-2 gap-4 my-6">
                <ProgressBar count={ counter } length={ length } />
                <DropdownFilter filter={ filter } onChangeProp={ filterTasks } />
            </div>

            { tasks.length > 0 ? 
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {
                        filteredTasks.map((task) => {
                            return (
                                <div className={`bg-indigo-900/30 p-5 rounded-lg border-t-4 ${task.done ? "border-green-500" : "border-rose-500"}`} key={ task.id }>
                                    <div className="grid grid-cols-3 gap-2 place-content-between">
                                        <h2 className="text-xl font-semibold pb-3 cursor-pointer col-span-2" onClick={ () => showModal(task.id) } >{ task.title }</h2>
                                        <Dropdown onDeleteProp={() => { handleDelete(task.id) }} onEditProp={() => { handleEdit(task.id) }} id={ task.id } />
                                    </div>

                                    <p>{ truncate(task.description) }</p>
                                </div>  
                            ) 
                        })
                    }
                </div>
                : 
                <p className="my-10">Für dieses Projekt gibt es noch keine Tasks. Erstelle deinen ersten Task um mit der Arbeit zu beginnen!</p>
            }  

            <div className="grid grid-cols-2 gap-2">
                <ButtonBack onClickBack={ handleBack } />
                <ButtonSubmit onClickSubmit={ createTask } label="Task erstellen" />
            </div>

            { singleTask !== null ? <Modal show={ isShown } handleClose={ hideModal } singleTaskId={ singleTask } /> : ""}
        </>
    );
}
 
export default SingleProject;