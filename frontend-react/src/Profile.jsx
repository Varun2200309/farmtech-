import { useEffect, useState } from "react"

import {
  User,
  Mail,
  CalendarDays,
  Tractor,
  CheckCircle2,
  IndianRupee,
  Edit
} from "lucide-react"

function Profile() {
  const [bookings, setBookings] = useState([])
  const [loadingBookings, setLoadingBookings] = useState(true)

  const username =
    localStorage.getItem("username") || "User"

  const email =
    localStorage.getItem("email") || "Email not available"

  useEffect(() => {
    loadBookings()
  }, [])

  async function loadBookings() {
    const token = localStorage.getItem("token")

    if (!token) {
      setLoadingBookings(false)
      return
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/bookings/my",
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )

      const data = await res.json()

      if (!res.ok) {
        console.error(
          data.message || "Failed to load bookings."
        )
        setLoadingBookings(false)
        return
      }

      setBookings(data)
      setLoadingBookings(false)
    } catch (error) {
      console.error(error)
      setLoadingBookings(false)
    }
  }

  const totalBookings = bookings.length

  const completedBookings = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length

  const totalSpent = bookings.reduce(
    (total, booking) =>
      total + (booking.totalAmount || 0),
    0
  )

  return (
    <main className="p-6">

      {/* Page Header */}

      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          My Profile
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Manage your FarmTech account information.
        </p>

      </div>

      {/* Profile Layout */}

      <div className="grid grid-cols-3 gap-5 mt-6">

        {/* User Profile Card */}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

          <div className="flex flex-col items-center text-center">

            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">

              <User
                size={38}
                className="text-green-700"
              />

            </div>

            <h2 className="text-xl font-bold text-gray-900 mt-4">
              {username}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              FarmTech User
            </p>

            <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold mt-5 hover:bg-green-800">

              <Edit size={16} />

              Edit Profile

            </button>

          </div>

        </div>

        {/* Account Information */}

        <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">

          <h2 className="text-lg font-bold text-gray-900">
            Account Information
          </h2>

          <div className="grid grid-cols-2 gap-5 mt-5">

            {/* Name */}

            <div>

              <p className="text-xs text-gray-500 mb-2">
                Full Name
              </p>

              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3">

                <User
                  size={18}
                  className="text-gray-400"
                />

                <span className="text-sm text-gray-800">
                  {username}
                </span>

              </div>

            </div>

            {/* Email */}

            <div>

              <p className="text-xs text-gray-500 mb-2">
                Email Address
              </p>

              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3">

                <Mail
                  size={18}
                  className="text-gray-400"
                />

                <span className="text-sm text-gray-800">
                  {email}
                </span>

              </div>

            </div>

            {/* Account Created */}

            <div>

              <p className="text-xs text-gray-500 mb-2">
                Account Created
              </p>

              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3">

                <CalendarDays
                  size={18}
                  className="text-gray-400"
                />

                <span className="text-sm text-gray-500">
                  Not available
                </span>

              </div>

            </div>

            {/* Account Type */}

            <div>

              <p className="text-xs text-gray-500 mb-2">
                Account Type
              </p>

              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3">

                <User
                  size={18}
                  className="text-gray-400"
                />

                <span className="text-sm text-gray-800">
                  Farmer
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Booking Statistics */}

      <div className="mt-6">

        <h2 className="text-lg font-bold text-gray-900">
          Booking Statistics
        </h2>

        <div className="grid grid-cols-3 gap-5 mt-4">

          {/* Total Bookings */}

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">

              <Tractor
                size={20}
                className="text-green-700"
              />

            </div>

            <p className="text-sm text-gray-500 mt-4">
              Total Bookings
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {loadingBookings ? "..." : totalBookings}
            </h3>

          </div>

          {/* Completed */}

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">

              <CheckCircle2
                size={20}
                className="text-blue-700"
              />

            </div>

            <p className="text-sm text-gray-500 mt-4">
              Completed
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {loadingBookings
                ? "..."
                : completedBookings}
            </h3>

          </div>

          {/* Total Spent */}

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">

              <IndianRupee
                size={20}
                className="text-orange-700"
              />

            </div>

            <p className="text-sm text-gray-500 mt-4">
              Total Spent
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {loadingBookings
                ? "..."
                : `₹${totalSpent.toLocaleString("en-IN")}`}
            </h3>

          </div>

        </div>

      </div>

    </main>
  )
}

export default Profile