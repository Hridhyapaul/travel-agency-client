import { FaGoogle } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";


const SocialLogin = () => {
    const { googleSignIn } = useAuth();

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
            const loggedUser = result.user
            console.log(loggedUser)
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    return (
        <div>
            <div className="flex items-center justify-center space-x-2">
                <span className="block w-14 h-0.5 bg-gray-300"></span>
                <span className="text-gray-500">or</span>
                <span className="block w-14 h-0.5 bg-gray-300"></span>
            </div>
            <button
                onClick={handleGoogleSignIn}
                type="button"
                className="flex items-center justify-center gap-3 w-full py-1.5 text-designColor bg-white border-2 border-designColor hover:bg-designColor hover:text-white transform hover:scale-105 duration-300 rounded mt-4"
            >
                <FaGoogle></FaGoogle>
                <p className='font-semibold'>Login with Google</p>
            </button>
        </div>
    );
};

export default SocialLogin;