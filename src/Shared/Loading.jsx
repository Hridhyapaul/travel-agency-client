
import { RotatingLines } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className='bg-white w-full flex justify-center items-center'>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    );
};

export default Loading;