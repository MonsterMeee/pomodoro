import { useState } from "react";

// Filter the tasks
const DropdownFilter = ({ filter, onChangeProp }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = (value) => {
        setIsOpen(!isOpen)
        onChangeProp(value)
    }

    return (

        <div className="text-center relative p-0 justify-self-end">
            <div className="w-full">
                <span className="text-sm pe-3">Filter: </span>
                <span className="text-sm cursor-pointer pe-2" onClick={ () => toggleMenu(filter) }>{ filter }</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 inline cursor-pointer" onClick={ () => toggleMenu(filter) }>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
            <nav className={`text-sm left-8 top-8 p-4 rounded-lg bg-indigo-800/90 z-50 ${isOpen ? "absolute" : "hidden"}`}>
                <ul className="list-none p-0 m-0 cursor-pointer">
                    <li onClick={ () => toggleMenu("undone") }>undone</li>
                    <li onClick={ () => toggleMenu("done") } className="pt-1">done</li>
                    <li onClick={ () => toggleMenu("all") } className="pt-1">all</li>
                </ul>
            </nav>
    	</div>
    );
}
 
export default DropdownFilter;