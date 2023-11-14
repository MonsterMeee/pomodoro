import { useState } from "react";

// Dropdown for editing and deleting taks/projects
const Dropdown = ({ onEditProp, onDeleteProp, id }) => {
    const [isOpen, setIsOpen] = useState(false)

    document.addEventListener("click", toggle_menu)

    function toggle_menu(evt){
        let svg = document.getElementById("svg_"+id)
        let path = document.getElementById("path_"+id)
        let nav = document.getElementById("nav_"+id)
        let targetElement = evt.target || evt.srcElement
    
        if((targetElement === svg || targetElement === path) && nav.classList.contains("absolute")){
            setIsOpen(false)
        } else if((targetElement === svg || targetElement === path) && nav.classList.contains("hidden")){
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }

    return (
        <div className="text-center relative cursor-pointer p-0 justify-self-end">
            <svg id={`svg_${id}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" id={`path_${id}`} />
            </svg>
            <nav className={`-left-8 top-8 p-4 rounded-lg bg-indigo-800/90 z-10 ${isOpen ? "absolute" : "hidden"}`} id={`nav_${id}`}>
                <ul className="list-none p-0 m-0">
                    <li onClick={ onEditProp }>Edit</li>
                    <li className="pt-2" onClick={ onDeleteProp }>Delete</li>
                </ul>
            </nav>
    	</div>
    );
}
 
export default Dropdown;