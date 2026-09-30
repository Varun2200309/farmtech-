import { useEffect, useState } from "react"

function BookingHistory() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadBookingHistory()
  }, [])

  async function loadBookingHistory() {
    const token = localStorage.getItem("token")

    if (!token) {
      setMessage("Please login to view your booking history.")
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
        setMessage(
          data.message || "Failed to load booking history."
        )
        setLoading(false)
        return
      }

      setBookings(data)
      setLoading(false)
    } catch (error) {
      console.error(error)

      setMessage(
        "Server error while loading booking history."
      )

      setLoading(false)
    }
  }

  function getStatusClass(status) {
    if (status === "Completed") {
      return "bg-green-50 text-green-700"
    }

    if (status === "Cancelled") {
      return "bg-red-50 text-red-700"
    }

    if (status === "Approved") {
      return "bg-blue-50 text-blue-700"
    }

    return "bg-yellow-50 text-yellow-700"
  }

  return (
    <main className="p-6">

      {/* Page Header */}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Booking History
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          View your previous equipment rental activity.
        </p>
      </div>

      {/* Loading */}

      {loading && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mt-6 p-8 text-center">
          <p className="text-gray-500">
            Loading booking history...
          </p>
        </div>
      )}

      {/* Error */}

      {!loading && message && (
        <div className="bg-red-50 text-red-700 rounded-xl mt-6 p-4 text-sm">
          {message}
        </div>
      )}

      {/* No Bookings */}

      {!loading &&
        !message &&
        bookings.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm mt-6 p-8 text-center">
            <h2 className="font-semibold text-gray-800">
              No booking history
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Your equipment rental activity will appear here.
            </p>
          </div>
        )}

      {/* History Table */}

      {!loading &&
        !message &&
        bookings.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm mt-6 overflow-hidden">

            <div className="px-6 py-4 border-b border-gray-100">

              <h2 className="font-semibold text-gray-900">
                Previous Bookings
              </h2>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="text-left px-6 py-4 font-semibold text-gray-600">
                      Equipment
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-gray-600">
                      Booking ID
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-gray-600">
                      Date
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-gray-600">
                      Amount
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-gray-600">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {bookings.map((booking) => (

                    <tr
                      key={booking._id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >

                      {/* Equipment */}

                      <td className="px-6 py-4 font-medium text-gray-900">

                        {booking.items
                          ?.map((item) => item.name)
                          .join(", ") || "Equipment"}

                      </td>

                      {/* Booking ID */}

                      <td className="px-6 py-4 text-gray-500">

                        {booking._id}

                      </td>

                      {/* Date */}

                      <td className="px-6 py-4 text-gray-500">

                        {new Date(
                          booking.bookedAt
                        ).toLocaleDateString("en-IN")}

                      </td>

                      {/* Amount */}

                      <td className="px-6 py-4 font-semibold text-gray-900">

                        ₹
                        {booking.totalAmount.toLocaleString(
                          "en-IN"
                        )}

                      </td>

                      {/* Status */}

                      <td className="px-6 py-4">

                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusClass(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

    </main>
  )
}

export default BookingHistory