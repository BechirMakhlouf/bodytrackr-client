import WeightTable from "../components/weightTableComponent";
import WeightChart from "../components/weightChartComponent";
import Header from "../components/headerComponent";
import AddWeightButton from "../components/AddWeightButtonComponent";

export default function DashboardPage() {
  return (
    <>
      <Header />

      <div className="md:flex items-start">
        <div className="my-12 lg:m-0 lg:w-2/3">
          <WeightChart />
        </div>
        <div className="my-12 lg:m-0 lg:w-1/3">
          <WeightTable />
        </div>
      </div>

      <AddWeightButton />
    </>
  );
}
