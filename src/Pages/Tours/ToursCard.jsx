import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const ToursCard = ({ destination, isBoxCard }) => {
    const {user} = useAuth();
    console.log(destination)
    const { _id, about, image, name, countryName, numberOfDay, price, reviews } = destination;

    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);

    let averageRating = 0
    if (reviews?.length > 0) {
        averageRating = totalRatings / reviews?.length;
    }

    const customStyles = {
        itemShapes: ThinRoundedStar,
        activeFillColor: '#f59e0b',
        inactiveFillColor: '#ECEEEF',
    };

    // <------ Details page ------>
    const navigate = useNavigate();
    const location = useLocation();
    const handleDetailsPage = () => {
        if (user && user.email) {
            navigate(`/accommodation/${_id}`);
        }
        else {
            Swal.fire({
                title: 'Please login to see details',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    return (
        <div className="lg:col-span-1">
            <div className="shadow-md rounded-lg">
                {
                    isBoxCard ?
                        (
                            <div>
                                <div>
                                    {image && image[0] ? (
                                        <img className="h-[200px] w-full object-cover rounded-t-lg" src={image[0]} alt="" />
                                    ) : (
                                        <div className="h-[200px] w-full bg-gray-300 rounded-t-lg"></div> // Default image or fallback UI
                                    )}
                                </div>
                                <div className="text-bodyColor bg-white rounded-b-lg font-body px-6 py-5 space-y-4">
                                    <div className="space-y-[1px]">
                                        <div className="flex justify-start items-center gap-2">
                                            <Rating
                                                style={{ maxWidth: 90 }}
                                                value={averageRating}
                                                itemStyles={customStyles}
                                                readOnly
                                                className=""
                                            />
                                            <p className="text-[14px]">{averageRating.toFixed(1)}</p>
                                            <p className="text-[14px]">({reviews.length < 10 ? `0${reviews.length}` : reviews.length} Reviews)</p>
                                        </div>
                                        <h1 className="text-2xl font-medium">{name}</h1>
                                        <p>{about}</p>
                                    </div>
                                    <div className="bg-bgColor rounded-lg px-4 py-2 flex justify-center items-center">
                                        <p className="w-[60%] border-r-2">{countryName}</p>
                                        <p className="w-[40%] text-center">0{numberOfDay} Days</p>
                                    </div>
                                    <div className="">
                                        <p><span className="font-medium text-[18px] text-designColor">${price}</span>{" "} / Per person</p>
                                    </div>
                                    <div>
                                        <div onClick={handleDetailsPage}>
                                            <button className="px-4 py-2 bg-designColor text-white rounded-lg">See Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        :

                        // Vertical Card...
                        (
                            <div className="flex justify-start items-center">
                                <div className="leftDiv w-[45%] h-[100%]">
                                    {image && image[0] ? (
                                        <img className="image h-[273px] w-full object-cover rounded-l-lg" src={image[0]} alt="" />
                                    ) : (
                                        <div className="h-[200px] w-full bg-gray-300 rounded-l-lg"></div> // Default image or fallback UI
                                    )}
                                </div>
                                <div className="rightDiv w-[55%] text-bodyColor bg-white rounded-r-lg font-body px-6 py-5 space-y-4">
                                    <div className="space-y-[1px]">
                                        <div className="flex justify-start items-center gap-2">
                                            <Rating
                                                style={{ maxWidth: 90 }}
                                                value={averageRating}
                                                itemStyles={customStyles}
                                                readOnly
                                                className=""
                                            />
                                            <p className="text-[14px]">{averageRating.toFixed(1)}</p>
                                            <p className="text-[14px]">({reviews.length < 10 ? `0${reviews.length}` : reviews.length} Reviews)</p>
                                        </div>
                                        <h1 className="text-2xl font-medium">{name}</h1>
                                        <p>{about}</p>
                                    </div>
                                    <div className="bg-bgColor rounded-lg px-4 py-2 flex justify-center items-center">
                                        <p className="w-[60%] border-r-2">{countryName}</p>
                                        <p className="w-[40%] text-center">0{numberOfDay} Days</p>
                                    </div>
                                    <div className="">
                                        <p><span className="font-medium text-[18px] text-designColor">${price}</span>{" "} / Per person</p>
                                    </div>
                                    <div>
                                        <button
                                        onClick={handleDetailsPage}
                                        className="px-4 py-2 bg-designColor text-white rounded-lg">See Details</button>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default ToursCard;