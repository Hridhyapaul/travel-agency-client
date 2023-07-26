const SpecialCard = ({ item }) => {
    const { image, icon, service } = item;
    return (
        <div className="col-span-1 font-body shadow-lg rounded-lg">
            <div className="relative">
                <img className="h-[200px] w-full object-cover rounded-t-lg" src={image} alt="" />
                <div className="absolute -bottom-9 left-1/2 translate-x-[-50%] bg-white shadow-lg w-20 h-20 rounded-full flex justify-center items-center">
                    <img className="h-[50px] w-[50px]" src={icon} alt="" />
                </div>
            </div>
            <div className="">
                <p className="pt-12 pb-5 px-6 text-lg text-center font-semibold">{service}</p>
            </div>
        </div>
    );
};

export default SpecialCard;