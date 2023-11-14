import ButtonBack from "../Components/Button/ButtonBack";
import ButtonSubmit from "../Components/Button/ButtonSubmit";

const Form = ({ title, handleTitle, description, handleDescription, onClickBack, onClickSubmit, label }) => {
    return (
        <form className="grid gap-2 min-h-fit">
            <label className="font-semibold" htmlFor="title">Titel:</label>
            <input name="title" id="title" type="text" value={ title } onChange={ handleTitle } className="mb-6 py-2 px-4 border-0 border-b-2 border-indigo-700 bg-inherit outline-none" />

            <label className="font-semibold" htmlFor="description">Beschreibung:</label>
            <textarea name="description" id="description" value={ description } onChange={ handleDescription } className="mb-6 py-2 px-4 border-0 border-b-2 border-indigo-700 resize-none outline-none bg-inherit" rows={ 7 } maxLength={ 600 }></textarea>

            <div className="grid grid-cols-2 gap-2 mt-6">
                <ButtonBack onClickBack={ onClickBack } />
                <ButtonSubmit onClickSubmit={ onClickSubmit } label={ label } />
            </div>
        </form>
    );
}
 
export default Form;