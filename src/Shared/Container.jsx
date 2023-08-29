const Container = ({ children }) => {
    return (
        <div className='max-w-[1280px] mx-auto xl:px-0 md:px-10 px-4'>
            {children}
        </div>
    );
};

export default Container;