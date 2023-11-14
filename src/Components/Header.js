import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="max-w-5xl mx-auto p-6 lg:px-0">
            <Link to='/'>
                <div className='border-cyan-500 border-2 w-16 h-16 relative'>
                    <div className='text-xl font-semibold absolute top-6 left-4'>
                        Pomodoro
                    </div>
                </div>
            </Link>
        </header>
    );
}
 
export default Header;