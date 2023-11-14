const ButtonBack = ({ onClickBack }) => {
    return (
        <button onClick={ onClickBack } className="hover:bg-gray-500 text-white border-white cursor-pointer w-fit font-semibold hover:text-white bg-transparent py-2 px-4 border hover:border-transparent rounded">
            zurück
        </button>
    );
}
 
export default ButtonBack;