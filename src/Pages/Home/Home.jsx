import Banner from "../../components/Banner/Banner";
import Brands from "../../components/Brands/Brands";
import CarryPhone from "../../components/CarryPhone/CarryPhone";
import AutoSwitchingTabs from "../../components/Process/AutoSwitchingTabs";
import Stacks from "../../components/Stacks/Stacks";
import Templates from "../../components/Templates/Templates";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <AutoSwitchingTabs></AutoSwitchingTabs>
      <CarryPhone></CarryPhone>
      <Stacks></Stacks>
      <Templates></Templates>
      <Brands></Brands>
    </>
  );
};
export default Home;
