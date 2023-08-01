import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { Link } from "react-router-dom";

const PackagesCard = ({ item, country }) => {
    console.log(item)
    const { acc_id, about, image, name, numberOfDay, price, reviews = [] } = item;
    console.log(acc_id)

    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRatings / reviews?.length;

    const customStyles = {
        itemShapes: ThinRoundedStar,
        activeFillColor: '#f59e0b',
        inactiveFillColor: '#ECEEEF',
    };

    return (
        <div className="col-span-1">
            <div className="shadow-md rounded-lg">
                {image && image[0] ? (
                    <img className="h-[200px] w-full object-cover rounded-t-lg" src={image[0]} alt="" />
                ) : (
                    <div className="h-[200px] w-full bg-gray-300 rounded-t-lg"></div> // Default image or fallback UI
                )}
                <div className="text-bodyColor bg-white rounded-b-lg font-body h-[250px] px-6 py-5 space-y-4">
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
                    <div className="flex justify-between items-center">
                        <p><span className="font-medium text-[18px] text-designColor">${price}</span>{" "} / Per person</p>
                        <p className="bg-bgColor rounded-lg px-4 py-2 w-fit">0{numberOfDay} Days</p>
                    </div>
                    <div>
                        <Link to={`/accommodation/${country}/${acc_id}`}>
                            <button className="px-4 py-2 bg-designColor text-white rounded-lg">See Details</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackagesCard;