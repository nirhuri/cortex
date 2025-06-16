import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
// import QuickAccess from "@/components/layout/quick-access";
// import RecentActivity from "@/components/layout/recent-activity";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-muted">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        {/* 
        <main className="flex-1 p-6 space-y-6">
          <QuickAccess />
          <RecentActivity />
        </main> */}
      </div>
    </div>
  );
}
