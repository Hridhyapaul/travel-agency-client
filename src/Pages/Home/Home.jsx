import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner/Banner";
import About from "./About/About";
import MostVisitedDestinations from "./PopularDestinations/MostVisitedDestinations";
import PopularPackage from "./PopularPackage/PopularPackage";
import Search from "./Search";
import Special from "./Special/Special";

const Home = () => {
   
    return (
        <div>
            <Helmet>
                <title>Travel.O | Home</title>
            </Helmet>
            <Banner></Banner>
            <Search></Search>
            <Special></Special>
            <About></About>
            <PopularPackage></PopularPackage>
            <MostVisitedDestinations></MostVisitedDestinations>
        </div>
    );
};

export default Home;