import Banner from "../../components/Banner/Banner";
import Brands from "../../components/Brands/Brands";
import CardContent from "../../components/CardSection/CardContent";
import CarryPhone from "../../components/CarryPhone/CarryPhone";
import AutoSwitchingTabs from "../../components/Process/AutoSwitchingTabs";
import SmallBusiness from "../../components/SmallBusiness/SmallBusiness";
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
      <CardContent></CardContent>
      <SmallBusiness></SmallBusiness>
    </>
  );
};
export default Home;
