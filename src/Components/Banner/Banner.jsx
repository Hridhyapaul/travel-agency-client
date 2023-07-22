import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Banner/Banner.css"
import "../Banner/custom-slick.css"
import Header from '../Header/Header';
// import Container from '../../Shared/Container';

const Banner = () => {

    const images = [
        {
            img: 'https://i.ibb.co/XzztDzS/shiv-prasad-OPWM488-Dfe-Q-unsplash.jpg',
            name: 'Varanasi',
            address: 'Varanasi, Uttar Pradesh, India',
            details: 'Varanasi, also called Benares, Banaras, or Kashi, city, southeastern Uttar Pradesh state, northern India. Varanasi is one of the oldest continuously inhabited cities in the world. It was one of the first major urban settlements in the middle Ganges valley.'
        },
        {
            img: 'https://i.ibb.co/d7wZwj1/chris-czermak-Aei-XAB8n8-Mc-unsplash.jpg',
            name: 'Mount Assiniboine',
            address: 'Mount Assiniboine, BC, Canada',
            details: 'Mount Assiniboine Park is a magnificent place of shimmering lakes, glistening glaciers, sky-scraping peaks, and sun-dappled alpine meadows. World-renowned Mount Assiniboine is situated along the continental divide near the southeast corner of the park, and has defined mountain splendour in the Canadian Rockies for over 100 years.'
        },
        {
            img: 'https://i.ibb.co/MMgjS7B/muhammed-mizanur-rahman-o9yf-XPyhpks-unsplash.jpg',
            name: 'Saint Martin’s',
            address: 'Saint Martin Island, Bangladesh',
            details: 'Saint Martin’s, the one and only coral island of Bangladesh, is a small island measuring eight square kilometers. The visible landmass sinks during the tide. Alternatively called the pearl of the sea, it is about 10 km from the mainland at teknaf. The safest means of transport is the government-owned ferry which takes around two hours one way.'
        },
        {
            img: 'https://i.ibb.co/L0zy5Lb/mainul-islam-Lkh9-Zh-SDxuc-unsplash.jpg',
            name: 'Sajek Valley',
            address: 'Sajek Valley, Rangamati, Bangladesh',
            details: 'Sajek Valley is an emerging tourist spot in Bangladesh situated among the hills of the Kasalong range of mountains in Sajek union, Baghaichhari Upazila in the Rangamati District. Sajek is located in the verdant hills of Kasalong range of mountains amidst the serene and exotic beauty of nature.'
        },
        {
            img: 'https://i.ibb.co/MhdffT2/fahim-reza-ETe-DLz-MMAUQ-unsplash.jpg',
            name: 'Kuakata',
            address: 'Kuakata, Potuakhali, Bangladesh',
            details: 'Kuakata is one of the rarest places which has the unique beauty of offering the full view of the rising and setting of crimson sun in the water of the Bay of Bengal in a calm environment. That perhaps makes Kuakata one of the world’s unique beaches.'
        },
        {
            img: 'https://i.ibb.co/jRqPKgn/mamun-srizon-v6-A4n-Xxqk-Fo-unsplash.jpg',
            name: 'Sundarbans',
            address: 'Sundarbans, Khulna, Bangladesh',
            details: 'Sundarbans, The largest single block of tidal halophytic mangrove forest in the world, located in the southwestern part of Bangladesh. It lies on the Ganges-Brahmaputra Delta at the point where it merges with the bay of bengal. It is also a centre of economic activities, such as extraction of timber, fishing and collection of honey. The forest consists of about 200 islands, separated by about 400 interconnected tidal rivers, creeks and canals.'
        }
    ];

    const [backgroundImage, setBackgroundImage] = useState(images[0].img);

    const [selectedPlace, setSelectedPlace] = useState({
        name: images[0].name,
        address: images[0].address,
        details: images[0].details,
    });

    const handleThumbnailClick = (image) => {
        setBackgroundImage(image?.img);
        setSelectedPlace({
            name: image.name,
            address: image.address,
            details: image.details,
        });
    };

    const [slidesToShow, setSlidesToShow] = useState(3);

    useEffect(() => {
        const updateSlidesToShow = () => {
            setSlidesToShow(window.innerWidth <= 768 ? 1 : 3);
        };

        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);

        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, []);

    const settings = {
        dots: true,
        speed: 500,
        arrows: false,
        respondTo: window,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        focusOnSelect: true,
        lazyLoad: 'ondemand',
        pauseOnFocus: 'true',
    };

    return (
        <div>
            <div className=''>
                <div className='fixed z-10 w-full'>
                    <Header></Header>
                </div>
            </div>

            {/* Start Mobile Screen */}

            <div className='lg:hidden block'>
                <Slider {...settings}>
                    {images.slice(1).map((item, index) => (
                        <div key={index} className="relative flex justify-between items-start gap-8" onClick={() => handleThumbnailClick(item)}>
                            <img className="w-full h-[400px] object-cover cursor-pointer" src={item.img} alt="" />

                            {/* ====== Start Background shadow ====== */}

                            <div className='bg-black w-full h-[400px] absolute inset-0 index-1 bg-opacity-30'></div>

                            {/* ====== End Background shadow ====== */}


                            <div className="absolute top-1/2 right-5 left-5 translate-y-[-50%] text-bgColor space-y-5">
                                <h1 className='lg:text-3xl text-2xl font-semibold'>{item.address}</h1>
                                <p className='text-sm line-clamp-4'>{item.details}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* End Mobile Screen */}

            {/* ===== Start Large Screen ===== */}

            <div className="lg:block hidden w-full shadow-lg relative">

                {/* ====== Start Background ====== */}

                <div>
                    <img className='backgroundImage w-full h-[100vh] object-cover' src={backgroundImage} alt="" />
                </div>

                {/* ====== End Background ====== */}

                {/* ====== Start Background shadow ====== */}

                <div className='bg-bodyColor w-full h-[100vh] absolute inset-0 index-1 bg-opacity-30'></div>

                {/* ====== End Background shadow ====== */}

                <div className='font-body text-bgColor absolute inset-0 top-1/2 left-10 right-10 translate-y-[-50%] flex justify-between items-center gap-5'>
                    <div className='w-[50%] space-y-5 '>
                        <h1 className='lg:text-3xl text-xl font-semibold'>{selectedPlace.address}</h1>
                        <p className='text-sm line-clamp-4'>{selectedPlace.details}</p>
                    </div>

                    {/* ====== Start Thumbnail Images ====== */}

                    <div className='w-[50%]'>
                        <div className='w-full '>
                            <Slider {...settings}>
                                {images.map((item, index) => (
                                    <div key={index} className="relative flex justify-between items-start gap-8" onClick={() => handleThumbnailClick(item)}>
                                        <img className="w-[200px] h-[300px] object-cover cursor-pointer rounded-lg " src={item.img} alt="" />
                                        <div className="absolute bottom-0 right-0 left-0 py-5">
                                            <h1 className="font-semibold text-center">{item.name}</h1>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>

                    {/* ====== End Thumbnail Images ====== */}

                </div>
            </div>

            {/* ===== End Large Screen ===== */}
        </div>
    );
};

export default Banner;