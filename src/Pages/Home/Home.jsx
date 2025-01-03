import Banner from "../../components/Banner/Banner";
import CardContent from "../../components/CardSection/CardContent";
import CarryPhone from "../../components/CarryPhone/CarryPhone";
import AutoSwitchingTabs from "../../components/Process/AutoSwitchingTabs";
import SmallBusiness from "../../components/SmallBusiness/SmallBusiness";
import Stacks from "../../components/Stacks/Stacks";
import Templates from "../../components/Templates/Templates";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="hidden lg:block">
        <AutoSwitchingTabs />
      </div>
      <CarryPhone />
      <Stacks />
      <Templates />
      {/* <Brands /> */}
      <CardContent />
      <SmallBusiness />
    </>
  );
};

export default Home;
