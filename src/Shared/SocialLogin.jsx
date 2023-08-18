import { FaGoogle } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser)
                const registerUser = { name: loggedUser.displayName, email: loggedUser.email, photo: loggedUser.photoURL, role: 'Traveler' }
                console.log(registerUser);
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(registerUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            console.log('User inserted to database')
                        }
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <div>
            <div className="flex items-center justify-center space-x-2">
                <span className="block w-14 h-0.5 bg-gray-400"></span>
                <span className="text-gray-600">OR</span>
                <span className="block w-14 h-0.5 bg-gray-400"></span>
            </div>
            <button
                onClick={handleGoogleSignIn}
                type="button"
                className="flex items-center justify-center gap-3 w-full py-1.5 text-designColor bg-white border-2 border-designColor hover:bg-designColor hover:text-white duration-300 rounded-full mt-4"
            >
                <FaGoogle></FaGoogle>
                <p className='font-semibold'>Login with Google</p>
            </button>
        </div>
    );
};

export default SocialLogin;