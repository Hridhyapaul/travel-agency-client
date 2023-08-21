
import { RotatingLines } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className='bg-bgColor w-full h-screen flex justify-center items-center'>
            <RotatingLines
                strokeColor="#F43F5E"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    );
};

export default Loading;