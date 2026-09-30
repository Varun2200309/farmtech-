import { useEffect, useState } from "react"
import {
  CalendarDays,
  Package
} from "lucide-react"

function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("success")

  useEffect(() => {
    loadBookings()
  }, [])

  async function loadBookings() {
    const token = localStorage.getItem("token")

    if (!token) {
      setMessage("Please login to view your bookings.")
      setMessageType("error")
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
          data.message || "Failed to load bookings."
        )
        setMessageType("error")
        setLoading(false)
        return
      }

      setBookings(data)
      setLoading(false)

    } catch (error) {
      console.error(error)

      setMessage(
        "Server error while loading bookings."
      )

      setMessageType("error")
      setLoading(false)
    }
  }

  async function handleCancelBooking(bookingId) {
    const token = localStorage.getItem("token")

    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setMessage(
          data.message ||
          "Failed to cancel booking."
        )

        setMessageType("error")
        return
      }

      setMessage(
        data.message ||
        "Booking cancelled successfully."
      )

      setMessageType("success")

      await loadBookings()

    } catch (error) {
      console.error(error)

      setMessage(
        "Server error while cancelling booking."
      )

      setMessageType("error")
    }
  }

  function getStatusClass(status) {
    if (status === "Approved") {
      return "bg-green-100 text-green-700"
    }

    if (status === "Cancelled") {
      return "bg-red-100 text-red-700"
    }

    if (status === "Completed") {
      return "bg-blue-100 text-blue-700"
    }

    return "bg-yellow-100 text-yellow-700"
  }

  if (loading) {
    return (
      <div>
        <p className="text-gray-500">
          Loading your bookings...
        </p>
      </div>
    )
  }

  return (
    <div>

      {/* PAGE HEADER */}

      <div className="mb-6">

        {/* <p className="text-green-700 text-sm font-semibold">
          Your Activity
        </p> */}

        <h1 className="text-2xl font-bold text-gray-900">
          My Bookings
        </h1>

        <p className="text-gray-500 mt-1">
          View all your equipment bookings.
        </p>

      </div>


      {/* MESSAGE */}

      {message && (
        <div
          className={`mb-5 px-4 py-3 rounded-xl text-sm ${
            messageType === "error"
              ? "bg-red-50 text-red-700"
              : "bg-green-50 text-green-700"
          }`}
        >
          {message}
        </div>
      )}


      {/* NO BOOKINGS */}

      {bookings.length === 0 ? (

        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">

          <Package
            size={42}
            className="mx-auto text-gray-400 mb-4"
          />

          <h2 className="text-lg font-semibold text-gray-800">
            No bookings yet
          </h2>

          <p className="text-gray-500 mt-2">
            Your confirmed equipment bookings will appear
            here.
          </p>

        </div>

      ) : (

        /* BOOKING TABLE */

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              {/* TABLE HEADER */}

              <thead className="bg-gray-50 border-b border-gray-200">

                <tr>

                  <th className="px-5 py-4 text-left font-semibold text-gray-700">
                    Booking ID
                  </th>

                  <th className="px-5 py-4 text-left font-semibold text-gray-700">
                    Date
                  </th>

                  <th className="px-5 py-4 text-left font-semibold text-gray-700">
                    Equipment
                  </th>

                  <th className="px-5 py-4 text-center font-semibold text-gray-700">
                    Quantity
                  </th>

                  <th className="px-5 py-4 text-right font-semibold text-gray-700">
                    Price
                  </th>

                  <th className="px-5 py-4 text-right font-semibold text-gray-700">
                    Total
                  </th>

                  <th className="px-5 py-4 text-center font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="px-5 py-4 text-center font-semibold text-gray-700">
                    Action
                  </th>

                </tr>

              </thead>


              {/* TABLE BODY */}

              <tbody>

                {bookings.map((booking) => (

                  <tr
                    key={booking._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >

                    {/* BOOKING ID */}

                    <td className="px-5 py-5">

                      <p
                        className="font-medium text-gray-800 max-w-[150px] truncate"
                        title={booking._id}
                      >
                        #{booking._id.slice(-6)}
                      </p>

                    </td>


                    {/* DATE */}

                    <td className="px-5 py-5">

                      <div className="flex items-center gap-2 text-gray-600">

                        <CalendarDays
                          size={15}
                          className="text-gray-400"
                        />

                        <span className="whitespace-nowrap">
                          {new Date(
                            booking.bookedAt
                          ).toLocaleDateString("en-IN")}
                        </span>

                      </div>

                    </td>


                    {/* EQUIPMENT */}

                    <td className="px-5 py-5">

                      <div className="space-y-1">

                        {booking.items.map(
                          (item, index) => (

                            <p
                              key={index}
                              className="font-medium text-gray-800"
                            >
                              {item.name}
                            </p>

                          )
                        )}

                      </div>

                    </td>


                    {/* QUANTITY */}

                    <td className="px-5 py-5 text-center">

                      <div className="space-y-1">

                        {booking.items.map(
                          (item, index) => (

                            <p
                              key={index}
                              className="text-gray-600"
                            >
                              {item.quantity || 1}
                            </p>

                          )
                        )}

                      </div>

                    </td>


                    {/* PRICE */}

                    <td className="px-5 py-5 text-right">

                      <div className="space-y-1">

                        {booking.items.map(
                          (item, index) => (

                            <p
                              key={index}
                              className="text-gray-600 whitespace-nowrap"
                            >
                              ₹
                              {item.price.toLocaleString(
                                "en-IN"
                              )}
                            </p>

                          )
                        )}

                      </div>

                    </td>


                    {/* TOTAL */}

                    <td className="px-5 py-5 text-right">

                      <p className="font-bold text-green-700 whitespace-nowrap">

                        ₹
                        {booking.totalAmount.toLocaleString(
                          "en-IN"
                        )}

                      </p>

                    </td>


                    {/* STATUS */}

                    <td className="px-5 py-5 text-center">

                      <span
                        className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>

                    </td>


                    {/* ACTION */}

                    <td className="px-5 py-5 text-center">

                      {booking.status !== "Cancelled" ? (

                        <button
                          onClick={() => {
  const confirmed = window.confirm(
    "Are you sure you want to cancel this booking?"
  )

  if (confirmed) {
    handleCancelBooking(booking._id)
  }
}}
                          className="px-4 py-2 border border-red-200 text-red-600 rounded-lg font-semibold text-xs hover:bg-red-50 whitespace-nowrap"
                        >
                          Cancel
                        </button>

                      ) : (

                        <span className="text-gray-400 text-xs">
                          Cancelled
                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  )
}

export default MyBookings