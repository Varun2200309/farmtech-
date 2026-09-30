import {
  LayoutDashboard,
  CalendarDays,
  Tractor,
  Users,
  Settings,
  LogOut
} from "lucide-react"

function AdminSidebar({
  currentPage,
  onNavigate,
  onLogout
}) {

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">

      {/* Logo */}

      <div className="px-6 py-6 border-b border-gray-800">

        <h1 className="text-2xl font-bold">
          Farm<span className="text-green-400">Tech</span>
        </h1>

        <p className="text-xs text-gray-400 mt-1">
          Admin Panel
        </p>

      </div>


      {/* Navigation */}

      <nav className="flex-1 px-4 py-6 space-y-2">

        {/* Dashboard */}

        <button
          onClick={() => onNavigate("dashboard")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
            currentPage === "dashboard"
              ? "bg-green-600 text-white"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
        >

          <LayoutDashboard size={19} />

          Dashboard

        </button>


        {/* Bookings */}

        <button
          onClick={() => onNavigate("bookings")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
            currentPage === "bookings"
              ? "bg-green-600 text-white"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
        >

          <CalendarDays size={19} />

          Bookings

        </button>


        {/* Equipment */}

        <button
          onClick={() => onNavigate("equipment")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
            currentPage === "equipment"
              ? "bg-green-600 text-white"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
        >

          <Tractor size={19} />

          Equipment

        </button>


        {/* Users */}

        <button
          onClick={() => onNavigate("users")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
            currentPage === "users"
              ? "bg-green-600 text-white"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
        >

          <Users size={19} />

          Users

        </button>


        {/* Settings */}

        <button
          onClick={() => onNavigate("settings")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
            currentPage === "settings"
              ? "bg-green-600 text-white"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
        >

          <Settings size={19} />

          Settings

        </button>

      </nav>


      {/* Logout */}

      <div className="px-4 py-5 border-t border-gray-800">

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-red-500/10 hover:text-red-400"
        >

          <LogOut size={19} />

          Logout

        </button>

      </div>

    </aside>
  )
}

export default AdminSidebar