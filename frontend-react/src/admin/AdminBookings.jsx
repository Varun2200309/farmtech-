import { useEffect, useState } from "react"

import {
  CalendarDays,
  Clock,
  CheckCircle,
  Search,
  Eye
} from "lucide-react"


function AdminBookings() {

  const [bookings, setBookings] =
    useState([])

  const [searchText, setSearchText] =
    useState("")

  const [selectedStatus, setSelectedStatus] =
    useState("All Status")

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState("")

  const [updatingBookingId, setUpdatingBookingId] =
    useState(null)


  // ==========================
  // FETCH BOOKINGS
  // ==========================

  useEffect(() => {

    async function fetchBookings() {

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

        setBookings(data)

      } catch (err) {

        console.error(err)

        setError(
          "Unable to load bookings"
        )

      } finally {

        setLoading(false)

      }

    }


    fetchBookings()

  }, [])


  // ==========================
  // UPDATE BOOKING STATUS
  // ==========================

  async function handleStatusChange(
    bookingId,
    newStatus
  ) {

    try {

      setUpdatingBookingId(bookingId)


      const token =
        localStorage.getItem("token")


      const response = await fetch(
        `http://localhost:5000/api/admin/bookings/${bookingId}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + token
          },

          body: JSON.stringify({
            status: newStatus
          })
        }
      )


      if (!response.ok) {

        const errorData =
          await response.json()

        throw new Error(
          errorData.message ||
          "Failed to update booking status"
        )

      }


      const updatedBooking =
        await response.json()


      // Update only the changed booking
      // inside React state

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === updatedBooking._id
            ? {
                ...booking,
                status:
                  updatedBooking.status
              }
            : booking
        )
      )


    } catch (err) {

      console.error(err)

      alert(
        err.message ||
        "Failed to update booking status"
      )

    } finally {

      setUpdatingBookingId(null)

    }

  }


  // ==========================
  // FILTER BOOKINGS
  // ==========================

  const filteredBookings =
    bookings.filter(booking => {

      const farmerName =
        booking.userId?.username || ""

      const farmerEmail =
        booking.userId?.email || ""

      const equipmentName =
        booking.items?.[0]?.name || ""


      const matchesSearch =
        farmerName
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          ) ||

        farmerEmail
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          ) ||

        equipmentName
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          )


      const matchesStatus =
        selectedStatus === "All Status" ||
        booking.status === selectedStatus


      return (
        matchesSearch &&
        matchesStatus
      )

    })


  // ==========================
  // STATISTICS
  // ==========================

  const totalBookings =
    bookings.length


  const pendingBookings =
    bookings.filter(
      booking =>
        booking.status === "Pending"
    ).length


  const approvedBookings =
    bookings.filter(
      booking =>
        booking.status === "Approved"
    ).length


  const completedBookings =
    bookings.filter(
      booking =>
        booking.status === "Completed"
    ).length


  return (

    <main className="p-8">

      {/* Page Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-gray-800">
          Bookings
        </h2>

        <p className="text-gray-500 mt-1">
          Manage farmer equipment bookings
        </p>

      </div>


      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">


        {/* Total */}

        <div className="bg-white rounded-2xl p-6 border border-gray-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Bookings
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-2">
                {totalBookings}
              </h3>

            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

              <CalendarDays
                size={23}
                className="text-blue-600"
              />

            </div>

          </div>

        </div>


        {/* Pending */}

        <div className="bg-white rounded-2xl p-6 border border-gray-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Pending
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-2">
                {pendingBookings}
              </h3>

            </div>

            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">

              <Clock
                size={23}
                className="text-yellow-600"
              />

            </div>

          </div>

        </div>


        {/* Approved */}

        <div className="bg-white rounded-2xl p-6 border border-gray-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Approved
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-2">
                {approvedBookings}
              </h3>

            </div>

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">

              <CheckCircle
                size={23}
                className="text-green-600"
              />

            </div>

          </div>

        </div>


        {/* Completed */}

        <div className="bg-white rounded-2xl p-6 border border-gray-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Completed
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-2">
                {completedBookings}
              </h3>

            </div>

            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">

              <CheckCircle
                size={23}
                className="text-purple-600"
              />

            </div>

          </div>

        </div>

      </div>


      {/* Search & Filter */}

      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">

        <div className="flex flex-col md:flex-row gap-4">


          {/* Search */}

          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search farmer, email or equipment..."
              value={searchText}
              onChange={e =>
                setSearchText(
                  e.target.value
                )
              }
              className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>


          {/* Status Filter */}

          <select
            value={selectedStatus}
            onChange={e =>
              setSelectedStatus(
                e.target.value
              )
            }
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          >

            <option>
              All Status
            </option>

            <option>
              Pending
            </option>

            <option>
              Approved
            </option>

            <option>
              Completed
            </option>

            <option>
              Cancelled
            </option>

          </select>

        </div>

      </div>


      {/* Loading */}

      {loading && (

        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">

          <p className="text-gray-500">
            Loading bookings...
          </p>

        </div>

      )}


      {/* Error */}

      {!loading && error && (

        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-5">

          {error}

        </div>

      )}


      {/* Table */}

      {!loading && !error && (

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-200">

            <h3 className="font-semibold text-gray-800">
              All Bookings
            </h3>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Booking ID
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Farmer
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Email
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Equipment
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Quantity
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Amount
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>

                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredBookings.map(booking => {

                  const item =
                    booking.items?.[0] || {}


                  return (

                    <tr
                      key={booking._id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >


                      {/* Booking ID */}

                      <td className="px-6 py-4 text-sm font-medium text-gray-700">

                        {booking._id.slice(-6)}

                      </td>


                      {/* Farmer */}

                      <td className="px-6 py-4">

                        <span className="text-sm font-medium text-gray-800">

                          {booking.userId?.username ||
                            "Unknown"}

                        </span>

                      </td>


                      {/* Email */}

                      <td className="px-6 py-4 text-sm text-gray-600">

                        {booking.userId?.email ||
                          "Unknown"}

                      </td>


                      {/* Equipment */}

                      <td className="px-6 py-4 text-sm text-gray-700">

                        {item.name ||
                          "Unknown"}

                      </td>


                      {/* Quantity */}

                      <td className="px-6 py-4 text-sm text-gray-700">

                        {item.quantity || 1}

                      </td>


                      {/* Amount */}

                      <td className="px-6 py-4 text-sm font-medium text-gray-800">

                        ₹
                        {Number(
                          booking.totalAmount
                        ).toLocaleString("en-IN")}

                      </td>


                      {/* Date */}

                      <td className="px-6 py-4 text-sm text-gray-600">

                        {new Date(
                          booking.bookedAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          }
                        )}

                      </td>


                      {/* Status */}

                      <td className="px-6 py-4">

                        <select
                          value={booking.status}
                          disabled={
                            updatingBookingId ===
                            booking._id
                          }
                          onChange={e =>
                            handleStatusChange(
                              booking._id,
                              e.target.value
                            )
                          }
                          className={`px-3 py-2 rounded-lg text-xs font-medium border outline-none cursor-pointer ${
                            booking.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                              : booking.status === "Approved"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : booking.status === "Completed"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-red-100 text-red-700 border-red-200"
                          }`}
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Approved">
                            Approved
                          </option>

                          <option value="Completed">
                            Completed
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </td>


                      {/* Action */}

                      <td className="px-6 py-4 text-center">

                        <button
                          className="p-2 rounded-lg text-gray-500 hover:bg-green-100 hover:text-green-700"
                          title="View Booking"
                        >

                          <Eye size={18} />

                        </button>

                      </td>

                    </tr>

                  )

                })}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </main>

  )
}

export default AdminBookings