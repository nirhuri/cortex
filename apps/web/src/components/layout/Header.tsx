"use client";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-background border-b h-[64px]">
      <div className="text-lg font-medium text-muted-foreground">Dashboard</div>
      {/* <div className="flex items-center gap-4"> */}
      {/* <div className="w-8 h-8 bg-muted rounded-full" /> */}
      {/* </div> */}
    </header>
  );
}
