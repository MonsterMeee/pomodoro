const ButtonSubmit = ({ onClickSubmit, label }) => {
    return (
        <button onClick={ onClickSubmit } className="hover:bg-cyan-500 text-cyan-500 hover:text-white border-cyan-500 justify-self-end cursor-pointer w-fit font-semibold hover:text-white bg-transparent py-2 px-4 border hover:border-transparent rounded">
            { label }
        </button>
    );
}
 
export default ButtonSubmit;