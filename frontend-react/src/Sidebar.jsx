import {
  LayoutDashboard,
  Tractor,
  CalendarDays,
  History,
  User,
  Settings,
  LogOut,
  CircleHelp,
  ShoppingCart
} from "lucide-react"

function Sidebar({ onLogout, onNavigate, currentPage }) {

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col p-5 shrink-0">

      {/* FarmTech Logo */}

      <div className="px-2 mb-8">

        <div className="flex items-center gap-2">

          <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">

            <Tractor
              size={20}
              className="text-green-700"
            />

          </div>

          <h2 className="text-2xl font-bold text-green-700">
            FARMTECH
          </h2>

        </div>

        <p className="text-xs text-gray-500 mt-1 ml-11">
          Smart Farming, Better Future
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex flex-col gap-2">

        {/* Dashboard */}

        <button
          onClick={() => onNavigate("dashboard")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left ${
            currentPage === "dashboard"
              ? "bg-green-50 text-green-700 font-semibold"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >

          <LayoutDashboard size={20} />

          <span>
            Dashboard
          </span>

        </button>

        {/* Rentals */}

        <button
          onClick={() => onNavigate("rentals")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left ${
            currentPage === "rentals"
              ? "bg-green-50 text-green-700 font-semibold"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >

          <Tractor size={20} />

          <span>
            Rentals
          </span>

        </button>
        {/* Cart */}

<button
  onClick={() => onNavigate("cart")}
  className={`flex items-center justify-between px-4 py-3 rounded-xl text-left ${
    currentPage === "cart"
      ? "bg-green-50 text-green-700 font-semibold"
      : "text-gray-700 hover:bg-gray-50"
  }`}
>
  <div className="flex items-center gap-3">
    <ShoppingCart size={20} />
    <span>Cart</span>
  </div>
</button>

        {/* My Bookings */}

        <button
          onClick={() => onNavigate("bookings")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left ${
            currentPage === "bookings"
              ? "bg-green-50 text-green-700 font-semibold"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >

          <CalendarDays size={20} />

          <span>
            My Bookings
          </span>

        </button>

        {/* Booking History */}

        <button
          onClick={() => onNavigate("history")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left ${
            currentPage === "history"
              ? "bg-green-50 text-green-700 font-semibold"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >

          <History size={20} />

          <span>
            Booking History
          </span>

        </button>

        {/* Profile */}

        <button
          onClick={() => onNavigate("profile")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left ${
            currentPage === "profile"
              ? "bg-green-50 text-green-700 font-semibold"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >

          <User size={20} />

          <span>
            Profile
          </span>

        </button>

        {/* Settings */}

        <button
          onClick={() => onNavigate("settings")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left ${
            currentPage === "settings"
              ? "bg-green-50 text-green-700 font-semibold"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >

          <Settings size={20} />

          <span>
            Settings
          </span>

        </button>

      </nav>

      {/* Help Card */}

      <div className="mt-auto mb-5 bg-green-700 rounded-2xl p-5 text-white">

        <CircleHelp size={28} />

        <h3 className="font-bold text-lg mt-3">
          Need Help?
        </h3>

        <p className="text-sm text-green-100 mt-2">
          We're here to help you with your farming needs.
        </p>

        <button className="w-full bg-white text-gray-800 py-2.5 rounded-lg mt-4 font-semibold hover:bg-gray-100">
          Contact Support
        </button>

      </div>

      {/* Logout */}

      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600"
      >

        <LogOut size={20} />

        <span>
          Logout
        </span>

      </button>

    </aside>
  )
}

export default Sidebar