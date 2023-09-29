const Container = ({ children }) => {
    return (
        <div className='mx-auto max-w-[1280px] xl:px-0 md:px-10 px-4'>
            {children}
        </div>
    );
};

export default Container;