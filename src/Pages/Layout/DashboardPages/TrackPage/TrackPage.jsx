import useTrack from "../../../../hooks/useTrack";
import ExpenseChart from "./ExpenseChart";
import InvoiceChart from "./InvoiceChart";
import StatsPage from "./StatsPage";

const TrackPage = () => {
  const { tracks, loading } = useTrack();
  console.log(tracks);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <>
          <StatsPage tracks={tracks}></StatsPage>
          <InvoiceChart tracks={tracks}></InvoiceChart>
          <ExpenseChart tracks={tracks}></ExpenseChart>
        </>
      )}
    </>
  );
};
export default TrackPage;
