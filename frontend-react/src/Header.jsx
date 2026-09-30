import {
  Bell,
  User,
  ChevronDown
} from "lucide-react"

function Header({ onNavigate }) {

  const username =
    localStorage.getItem("username") || "User"

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-end px-8">

      {/* Right Side */}

      <div className="flex items-center gap-6">

        {/* Notifications */}

        <button className="relative text-gray-600 hover:text-green-700">

          <Bell size={21} />

          {/* <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          
          </span> */}

        </button>

        {/* User */}

        <button
          onClick={() => onNavigate("profile")}
          className="flex items-center gap-3 hover:bg-gray-50 rounded-xl px-2 py-1.5 text-left"
        >

          {/* User Icon */}

          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">

            <User
              size={20}
              className="text-green-700"
            />

          </div>

          {/* User Information */}

          <div>

            <p className="font-semibold text-gray-800 text-sm">
              {username}
            </p>

            <p className="text-xs text-gray-500">
              Farmer
            </p>

          </div>

          <ChevronDown
            size={17}
            className="text-gray-500"
          />

        </button>

      </div>

    </header>
  )
}

export default Header