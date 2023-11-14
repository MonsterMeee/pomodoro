const Button = ({ classes, onClickProp, children }) => {
    return (
        <button onClick={ onClickProp } className={`${classes} cursor-pointer w-fit font-semibold hover:text-white bg-transparent py-2 px-4 border hover:border-transparent rounded`}>
            { children }
        </button>
    );
}
 
export default Button;