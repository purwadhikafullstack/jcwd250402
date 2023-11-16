import { Earnings, Reservations, Views, ReserveRate } from "../asset";

const Dashboard = () => {
  return (
    <div className="items-center justify-between p-5 sm:gap-1">
      <h1 className="mb-5 text-4xl">This month in a glance</h1>
      <div className="flex flex-col justify-between md:flex-row">
        <div className="flex justify-between p-5 border-2 rounded-lg">
          <div className="flex flex-col mr-2">
            <h2 className="mb-2 text-xl">Earnings</h2>
            <span className="text-lg font-semibold">IDR 100,000,000</span>
            <span className="mt-2 text-xs">
              <span className="mr-1 text-green-500">↑13.95%</span> Since last
              month
            </span>
          </div>
          <div className="items-center justify-center mt-2">
            <img src={Earnings} alt="" height={50} width={50} />
          </div>
        </div>
        <div className="flex justify-between p-5 border-2 rounded-lg">
          <div className="flex flex-col mr-2">
            <h2 className="mb-2 text-xl">Views</h2>
            <span className="text-lg font-bold ">100.000</span>
            <span className="mt-2 text-xs">
              <span className="mr-1 text-red-500">↓13.95%</span> Since last
              month
            </span>
          </div>
          <div className="items-center justify-center mt-2">
            <img src={Views} alt="" height={50} width={50} />
          </div>
        </div>
        <div className="flex justify-between p-5 border-2 rounded-lg">
          <div className="flex flex-col mr-2">
            <h2 className="mb-2 text-xl">Reservations</h2>
            <span className="text-lg font-bold">90.000</span>
            <span className="mt-2 text-xs">
              <span className="mr-1 text-red-500">↓13.95%</span> Since last
              month
            </span>
          </div>
          <div className="items-center justify-center mt-2">
            <img src={Reservations} alt="" height={50} width={50} />
          </div>
        </div>
        <div className="flex justify-between p-5 border-2 rounded-lg">
          <div className="flex flex-col mr-2">
            <h2 className="mb-2 text-xl">Reserve Rate</h2>
            <span className="text-lg font-bold">90%</span>
            <span className="mt-2 text-xs">
              <span className="mr-1 text-red-500">↓13.95%</span> Since last
              month
            </span>
          </div>
          <div className="items-center justify-center mt-2">
            <img src={ReserveRate} alt="" height={50} width={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
