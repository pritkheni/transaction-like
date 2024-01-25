import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="w-full min-h-screen bg-slate-200">
      <Outlet/>
    </main>
  )
}
