import { useEffect, useState } from "react";
import Container from "../../../Shared/Container";
import SectionTitle from "../../../Shared/SectionTitle";
import SpecialCard from "./SpecialCard";
import Loading from "../../../Shared/Loading";

const Special = () => {

    const [travelServices, setTravelServices] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetchTravelServices();
    }, []);

    const fetchTravelServices = async () => {
        try {
            const response = await fetch('Services.json');
            const data = await response.json();
            setTravelServices(data);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching travel services:', error);
        }
    };

    console.log(travelServices)

    return (

        <div>
            {
                loading ?
                    (
                        <div>
                            <Loading></Loading>
                        </div>
                    )
                    :
                    (
                        <div className="lg:my-28 mb-14 mt-10">
                            <Container>
                                <div>
                                    <SectionTitle headers='Why Travel with Travel.O ?' subHeader='Travel.O Specials'></SectionTitle>
                                </div >
                                <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-8 gap-4">
                                    {
                                        travelServices.map((item, index) => <SpecialCard key={index} item={item}></SpecialCard>)
                                    }
                                </div>
                            </Container >
                        </div >
                    )
            }
        </div >

    );
};

export default Special;