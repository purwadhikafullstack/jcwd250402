import { TenantSidebar } from "../components";

const TenantDashboard = () => {
  document.title = "Host Dashboard";
  return (
    <div>
      <TenantSidebar />
    </div>
  );
};

export default TenantDashboard;
