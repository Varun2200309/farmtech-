import { useEffect, useState } from "react"

import {
  Users,
  CalendarDays,
  Clock3,
  IndianRupee,
  Tractor,
  CheckCircle2,
  XCircle
} from "lucide-react"

function AdminDashboard({ onNavigate }) {

  // =========================
  // DASHBOARD STATISTICS
  // =========================

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0
  })


  // =========================
  // RECENT BOOKINGS
  // =========================

  const [recentBookings, setRecentBookings] =
    useState([])
    const [equipmentStats, setEquipmentStats] =
  useState({
    available: 0,
    maintenance: 0,
    unavailable: 0
  })


  // =========================
  // FETCH DASHBOARD STATISTICS
  // =========================

  useEffect(() => {

    async function fetchDashboardStats() {

      try {

        const token =
          localStorage.getItem("token")

        const response = await fetch(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        )

        if (!response.ok) {
          throw new Error(
            "Failed to fetch dashboard statistics"
          )
        }

        const data =
          await response.json()

        setStats(data)

      } catch (err) {

        console.error(
          "Failed to load dashboard stats:",
          err
        )

      }

    }

    fetchDashboardStats()

  }, [])


  // =========================
  // FETCH RECENT BOOKINGS
  // =========================

  useEffect(() => {

    async function fetchRecentBookings() {

      try {

        const token =
          localStorage.getItem("token")

        const response = await fetch(
          "http://localhost:5000/api/admin/bookings",
          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        )

        if (!response.ok) {
          throw new Error(
            "Failed to fetch bookings"
          )
        }

        const data =
          await response.json()

        // API already returns newest bookings first
        setRecentBookings(
          data.slice(0, 3)
        )

      } catch (err) {

        console.error(
          "Failed to load recent bookings:",
          err
        )

      }

    }

    fetchRecentBookings()

  }, [])
useEffect(() => {

  async function fetchEquipmentStats() {

    try {

      const token =
        localStorage.getItem("token")

      const response = await fetch(
        "http://localhost:5000/api/admin/equipment-stats",
        {
          headers: {
            Authorization:
              "Bearer " + token
          }
        }
      )

      if (!response.ok) {
        throw new Error(
          "Failed to fetch equipment statistics"
        )
      }

      const data =
        await response.json()

      setEquipmentStats(data)

    } catch (err) {

      console.error(
        "Failed to load equipment stats:",
        err
      )

    }

  }

  fetchEquipmentStats()

}, [])

  return (
    <main className="p-6">

      {/* Page Heading */}

      <div>

        <p className="text-green-600 text-sm font-medium mb-1">
          FarmTech Administration
        </p>

        <h1 className="text-2xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Manage your farm equipment rental platform.
        </p>

      </div>


      {/* Statistics */}

      <div className="grid grid-cols-4 gap-5 mt-6">

        {/* Total Users */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Users
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {stats.totalUsers}
              </h2>

              <p className="text-xs text-green-600 mt-1">
                Registered farmers
              </p>

            </div>

            <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center">

              <Users
                size={22}
                className="text-green-700"
              />

            </div>

          </div>

        </div>


        {/* Total Bookings */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Bookings
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {stats.totalBookings}
              </h2>

              <p className="text-xs text-green-600 mt-1">
                All bookings
              </p>

            </div>

            <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center">

              <CalendarDays
                size={22}
                className="text-green-700"
              />

            </div>

          </div>

        </div>


        {/* Pending Bookings */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Pending Bookings
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {stats.pendingBookings}
              </h2>

              <p className="text-xs text-orange-600 mt-1">
                Need attention
              </p>

            </div>

            <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center">

              <Clock3
                size={22}
                className="text-orange-600"
              />

            </div>

          </div>

        </div>


        {/* Revenue */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Revenue
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                ₹{stats.totalRevenue.toLocaleString("en-IN")}
              </h2>

              <p className="text-xs text-green-600 mt-1">
                From completed bookings
              </p>

            </div>

            <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center">

              <IndianRupee
                size={22}
                className="text-green-700"
              />

            </div>

          </div>

        </div>

      </div>


      {/* Main Content */}

      <div className="grid grid-cols-3 gap-5 mt-7">

        {/* Recent Bookings */}

        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">

          <div className="p-5 border-b border-gray-100 flex items-center justify-between">

            <div>

              <h2 className="text-lg font-bold text-gray-900">
                Recent Bookings
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Latest rental requests from farmers.
              </p>

            </div>

           <button
  onClick={() => onNavigate("bookings")}
  className="text-sm font-semibold text-green-700 hover:text-green-900"
>
  View All
</button>

          </div>


          <div className="divide-y divide-gray-100">

            {recentBookings.map((booking) => {

              const item =
                booking.items?.[0]

              return (

                <div
                  key={booking._id}
                  className="p-5 flex items-center justify-between"
                >

                  <div className="flex items-center gap-4">

                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">

                      <Tractor
                        size={20}
                        className="text-green-700"
                      />

                    </div>

                    <div>

                      <h3 className="font-semibold text-gray-800">
                        {item?.name || "Equipment"}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        Farmer:{" "}
                        {booking.userId?.username ||
                          "Unknown"}
                      </p>

                    </div>

                  </div>


                  <div className="text-right">

                    <p className="font-semibold text-gray-800">
                      ₹{booking.totalAmount.toLocaleString("en-IN")}
                    </p>

                    <span
                      className={
                        booking.status === "Pending"
                          ? "text-xs bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full"
                          : booking.status === "Cancelled"
                          ? "text-xs bg-red-50 text-red-600 px-2.5 py-1 rounded-full"
                          : "text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full"
                      }
                    >
                      {booking.status}
                    </span>

                  </div>

                </div>

              )

            })}

          </div>

        </div>


        {/* Equipment Overview */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

          <div className="p-5 border-b border-gray-100">

            <h2 className="text-lg font-bold text-gray-900">
              Equipment Overview
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Current equipment status.
            </p>

          </div>


          <div className="p-5 space-y-4">

            {/* Available */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <CheckCircle2
                  size={19}
                  className="text-green-600"
                />

                <span className="text-sm text-gray-700">
                  Available
                </span>

              </div>

              <span className="font-semibold text-gray-900">
                {equipmentStats.available}
              </span>

            </div>


            {/* Rented */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <Tractor
                  size={19}
                  className="text-blue-600"
                />

                <span className="text-sm text-gray-700">
                  Currently Rented
                </span>

              </div>

              <span className="font-semibold text-gray-900">
                7
              </span>

            </div>


            {/* Maintenance */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <Clock3
                  size={19}
                  className="text-orange-600"
                />

                <span className="text-sm text-gray-700">
                  Maintenance
                </span>

              </div>

              <span className="font-semibold text-gray-900">
               {equipmentStats.maintenance}
              </span>

            </div>


            {/* Unavailable */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <XCircle
                  size={19}
                  className="text-red-600"
                />

                <span className="text-sm text-gray-700">
                  Unavailable
                </span>

              </div>

              <span className="font-semibold text-gray-900">
              {equipmentStats.unavailable}
              </span>

            </div>

          </div>


          <div className="px-5 pb-5">

            <button
  onClick={() => onNavigate("equipment")}
  className="w-full bg-green-700 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800"
>
  Manage Equipment
</button>

          </div>

        </div>

      </div>


      {/* Bottom Information */}

      <div className="mt-6 bg-green-700 rounded-2xl p-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            FarmTech Administration 🌱
          </h2>

          <p className="text-green-100 text-sm mt-1">
            Keep track of farmers, bookings and equipment from one place.
          </p>

        </div>

        <div className="text-right">

          <p className="text-green-100 text-xs">
            System Status
          </p>

          <p className="text-white font-semibold text-sm mt-1">
            ● Operational
          </p>

        </div>

      </div>

    </main>
  )
}

export default AdminDashboard