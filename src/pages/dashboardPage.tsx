import WeightTable from "../components/weightTableComponent";
import WeightChart from "../components/weightChartComponent";
import Header from "../components/headerComponent";
import AddWeightButton from "../components/AddWeightButtonComponent";

export default function DashboardPage() {
  return (
    <>
      <Header />

      <div className="md:flex">
        <div className="lg:w-2/3">
          <WeightChart />
        </div>
        <div className="lg:w-1/3">
          <WeightTable />
        </div>
      </div>

      <AddWeightButton />
    </>
  );
}
