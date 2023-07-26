import Container from "../../../Shared/Container";
import SectionTitle from "../../../Shared/SectionTitle";
import { travelServices } from '../Special/Services';
import SpecialCard from "./SpecialCard";

const Special = () => {
    console.log(travelServices)
    return (
        <div className="my-28">
            <Container>
                <div>
                    <SectionTitle headers='Why Travel with Travel.O ?' subHeader='Travel.O Specials'></SectionTitle>
                </div>
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-8">
                    {
                        travelServices.map((item, index) => <SpecialCard key={index} item={item}></SpecialCard>)
                    }
                </div>
            </Container>
        </div>
    );
};

export default Special;