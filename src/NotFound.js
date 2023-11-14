import { useNavigate } from "react-router-dom";
import ButtonBack from "./Components/Button/ButtonBack";

const NotFound = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate("/")
    }

    return (
        <div className="container grid place-items-center gap-4 text-center md:mx-auto max-w-4xl px-3 md:px-8 py-10">
            <h1 className="text-7xl font-semibold">
                404
            </h1>
            <p>
                Die gewünschte Seite kann nicht gefunden werden.
            </p>
            <p>
                Hier geht es zurück zur Startseite:
            </p>
            <ButtonBack onClickBack={ handleBack } />
        </div>
    );
}
 
export default NotFound;