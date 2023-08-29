const SectionTitle = ({ headers, subHeader }) => {
    return (
        <div className="lg:mb-20 mb-10 mx-4 lg:mx-0 font-body">
            <h5 className="text-designColor lg:text-xl font-semibold text-center">{subHeader}</h5>
            <h1 className="text-bodyColor text-xl lg:text-5xl text-center font-bold mt-3">{headers}</h1>
        </div>
    );
};

export default SectionTitle;