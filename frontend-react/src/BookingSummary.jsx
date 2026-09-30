import { useEffect, useState } from "react"

import {
  CalendarDays,
  Clock3,
  IndianRupee,
  ArrowRight
} from "lucide-react"

function BookingSummary({ onNavigate }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBookings()
  }, [])

  async function loadBookings() {
    const token = localStorage.getItem("token")

    if (!token) {
      setLoading(false)
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
        setLoading(false)
        return
      }

      setBookings(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const totalBookings = bookings.length

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length

  const activeBookings =
    totalBookings - cancelledBookings

  const totalSpent = bookings.reduce(
    (total, booking) =>
      total + (booking.totalAmount || 0),
    0
  )

  const upcomingBooking = bookings.find(
    (booking) => booking.status !== "Cancelled"
  )

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-lg font-bold text-gray-900">
            Booking Summary
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Your rental overview
          </p>

        </div>

        <CalendarDays
          size={22}
          className="text-green-700"
        />

      </div>

      {/* Summary Items */}

      <div className="mt-6 space-y-5">

        {/* Total Bookings */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">

              <CalendarDays
                size={18}
                className="text-green-700"
              />

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Total Bookings
              </p>

              <p className="font-bold text-gray-900">
                {loading ? "..." : totalBookings}
              </p>

            </div>

          </div>

        </div>

        {/* Active Bookings */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

              <Clock3
                size={18}
                className="text-blue-700"
              />

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Active Bookings
              </p>

              <p className="font-bold text-gray-900">
                {loading ? "..." : activeBookings}
              </p>

            </div>

          </div>

        </div>

        {/* Total Spent */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">

              <IndianRupee
                size={18}
                className="text-orange-700"
              />

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Total Spent
              </p>

              <p className="font-bold text-gray-900">
                {loading
                  ? "..."
                  : `₹${totalSpent.toLocaleString("en-IN")}`}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Upcoming Booking */}

      <div className="mt-6 bg-green-50 rounded-xl p-4">

        <p className="text-xs font-medium text-green-700">
          RECENT BOOKING
        </p>

        {loading ? (

          <p className="text-sm text-gray-500 mt-2">
            Loading...
          </p>

        ) : upcomingBooking ? (

          <>
            <p className="font-semibold text-gray-900 mt-2">
              {upcomingBooking.items
                ?.map((item) => item.name)
                .join(", ") || "Equipment Rental"}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {new Date(
                upcomingBooking.bookedAt
              ).toLocaleDateString("en-IN")}
            </p>

            <p className="text-xs text-green-700 mt-1">
              Status: {upcomingBooking.status}
            </p>
          </>

        ) : (

          <p className="text-sm text-gray-500 mt-2">
            No active bookings
          </p>

        )}

      </div>

      {/* View History */}

      <button
        onClick={() => onNavigate("history")}
        className="w-full mt-5 flex items-center justify-center gap-2 text-green-700 font-semibold text-sm hover:text-green-800"
      >
        View Booking History
        <ArrowRight size={16} />
      </button>

    </div>
  )
}

export default BookingSummary