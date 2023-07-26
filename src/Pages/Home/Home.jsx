import Banner from "../../Components/Banner/Banner";
import Search from "./Search";
import Special from "./Special/Special";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Search></Search>
            <Special></Special>
            {/* <About></About>
            <MostVisitedPlace></MostVisitedPlace> */}
        </div>
    );
};

export default Home;