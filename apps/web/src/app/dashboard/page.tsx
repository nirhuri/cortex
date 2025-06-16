import Sidebar from "@/components/dashboard/Sidebar";
// import Header from "@/components/dashboard/header";
// import QuickAccess from "@/components/dashboard/quick-access";
// import RecentActivity from "@/components/dashboard/recent-activity";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-muted">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* <Header />
        <main className="flex-1 p-6 space-y-6">
          <QuickAccess />
          <RecentActivity />
        </main> */}
      </div>
    </div>
  );
}
