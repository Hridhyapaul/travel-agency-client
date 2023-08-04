import Banner from "../../Components/Banner/Banner";
import About from "./About/About";
import PopularPackage from "./PopularPackage/PopularPackage";
import Search from "./Search";
import Special from "./Special/Special";

const Home = () => {
   
    return (
        <div>
            <Banner></Banner>
            <Search></Search>
            <Special></Special>
            <About></About>
            {/* <MostVisitedPlace></MostVisitedPlace> */}
            <PopularPackage></PopularPackage>
        </div>
    );
};

export default Home;