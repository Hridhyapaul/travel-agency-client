const SectionTitle = ({ headers, subHeader }) => {
    return (
        <div className="mb-20 mx-4 lg:mx-0 font-body">
            <h5 className="text-designColor text-xl font-semibold text-center">{subHeader}</h5>
            <h1 className="text-bodyColor text-2xl lg:text-5xl text-center font-bold mt-3">{headers}</h1>
        </div>
    );
};

export default SectionTitle;