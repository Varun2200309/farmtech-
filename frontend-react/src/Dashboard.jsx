import { useEffect, useState } from "react"

import Sidebar from "./Sidebar"
import Header from "./Header"
import BookingCard from "./BookingCard"
import Rentals from "./Rentals"
import Cart from "./Cart"
import MyBookings from "./MyBookings"
import BookingHistory from "./BookingHistory"
import Profile from "./Profile"
import Settings from "./Settings"

import {
  CalendarDays,
  Tractor,
  CheckCircle2,
  IndianRupee
} from "lucide-react"

const equipment = [
  {
    name: "Tractor",
    price: 1500,
    availability: "Available",
    category: "Agricultural Equipment",
    image: "/equipment/tractor.png"
  },
  {
    name: "Harvester",
    price: 2500,
    availability: "Available",
    category: "Harvesting Equipment",
    image: "/equipment/harvester.png"
  },
  {
    name: "Plough",
    price: 800,
    availability: "Not Available",
    category: "Tillage Equipment",
    image: "/equipment/plough.png"
  }
]

function Dashboard({ onLogout }) {
  const [currentPage, setCurrentPage] =
    useState("dashboard")

  const [cart, setCart] = useState([])

  const [bookings, setBookings] = useState([])

  const username =
    localStorage.getItem("username") || "User"

  const [loadingBookings, setLoadingBookings] =
    useState(true)

  useEffect(() => {
    loadDashboardBookings()
  }, [])

  async function loadDashboardBookings() {
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
          data.message ||
            "Failed to load dashboard bookings."
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

  function handleNavigate(page) {
    setCurrentPage(page)
  }

  /* =========================
     ADD TO CART
  ========================= */

  function handleAddToCart(item) {
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (cartItem) =>
          cartItem.name === item.name
      )

      if (existingItem) {
        return previousCart.map((cartItem) =>
          cartItem.name === item.name
            ? {
                ...cartItem,
                quantity:
                  cartItem.quantity +
                  item.quantity
              }
            : cartItem
        )
      }

      return [...previousCart, item]
    })
  }

  /* =========================
     INCREASE QUANTITY
  ========================= */

  function handleIncreaseQuantity(index) {
    setCart((previousCart) =>
      previousCart.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    )
  }

  /* =========================
     DECREASE QUANTITY
  ========================= */

  function handleDecreaseQuantity(index) {
    setCart((previousCart) =>
      previousCart.map((item, itemIndex) =>
        itemIndex === index &&
        item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      )
    )
  }

  /* =========================
     REMOVE FROM CART
  ========================= */

  function handleRemoveFromCart(index) {
    setCart((previousCart) =>
      previousCart.filter(
        (_, itemIndex) =>
          itemIndex !== index
      )
    )
  }

  /* =========================
     DASHBOARD STATISTICS
  ========================= */

  const totalBookings = bookings.length

  const cancelledBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Cancelled"
    ).length

  const activeBookings =
    totalBookings - cancelledBookings

  const completedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Completed"
    ).length

  const totalSpent = bookings.reduce(
    (total, booking) =>
      total + (booking.totalAmount || 0),
    0
  )

  const recentBookings =
    bookings.slice(0, 3)

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}

      <Sidebar
        onLogout={onLogout}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      <div className="flex-1">

        {/* Header */}

        <Header
          onNavigate={handleNavigate}
        />

        {/* =========================
            RENTALS
        ========================= */}

        {currentPage === "rentals" ? (

          <Rentals
            onBook={handleAddToCart}
          />

        ) : currentPage === "cart" ? (

          <Cart
            cart={cart}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
            onRemove={handleRemoveFromCart}
            onBookingSuccess={() => {
              setCart([])
              loadDashboardBookings()
            }}
          />

        ) : currentPage === "bookings" ? (

          <MyBookings />

        ) : currentPage === "history" ? (

          <BookingHistory />

        ) : currentPage === "profile" ? (

          <Profile />

        ) : currentPage === "settings" ? (

          <Settings />

        ) : (

          /* =========================
             DASHBOARD
          ========================= */

          <main className="p-6">

            {/* =========================
                WELCOME
            ========================= */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-green-600 text-sm font-medium mb-1">
                    Welcome back  👋
                  </p>

                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome Back, {username}
                  </h1>

                  <p className="text-gray-500 text-sm mt-2">
                    Manage your equipment rentals
                    and bookings from one place.
                  </p>

                </div>

                <button
                  onClick={() =>
                    handleNavigate("rentals")
                  }
                  className="bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800"
                >
                  Browse Rentals
                </button>

              </div>

            </div>

            {/* =========================
                STATISTICS
            ========================= */}

            <div className="grid grid-cols-4 gap-5 mt-6">

              {/* Total Bookings */}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Total Bookings
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-2">
                      {loadingBookings
                        ? "..."
                        : totalBookings}
                    </h2>

                  </div>

                  <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center">

                    <CalendarDays
                      size={22}
                      className="text-green-700"
                    />

                  </div>

                </div>

              </div>

              {/* Active Rentals */}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Active Rentals
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-2">
                      {loadingBookings
                        ? "..."
                        : activeBookings}
                    </h2>

                  </div>

                  <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center">

                    <Tractor
                      size={22}
                      className="text-green-700"
                    />

                  </div>

                </div>

              </div>

              {/* Completed */}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Completed
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-2">
                      {loadingBookings
                        ? "..."
                        : completedBookings}
                    </h2>

                  </div>

                  <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center">

                    <CheckCircle2
                      size={22}
                      className="text-green-700"
                    />

                  </div>

                </div>

              </div>

              {/* Total Spent */}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Total Spent
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-2">
                      {loadingBookings
                        ? "..."
                        : `₹${totalSpent.toLocaleString(
                            "en-IN"
                          )}`}
                    </h2>

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

            {/* =========================
                MAIN DASHBOARD GRID
            ========================= */}

            <div className="grid grid-cols-4 gap-5 mt-7">

              {/* =========================
                  EQUIPMENT INFORMATION
              ========================= */}

              <div className="col-span-3">

                <div className="flex items-center justify-between mb-4">

                  <div>

                    <h2 className="text-lg font-bold text-gray-900">
                      Available Equipment
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Explore the equipment available
                      for your farming needs.
                    </p>

                  </div>

                </div>

                {/* Equipment Cards */}

                <div className="grid grid-cols-3 gap-4">

                  {equipment.map((item) => (

                    <div
                      key={item.name}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                    >

                      {/* Image */}

                      <div className="h-36 bg-gray-100 overflow-hidden">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />

                      </div>

                      {/* Information */}

                      <div className="p-4">

                        <div className="flex items-start justify-between gap-2">

                          <div>

                            <h3 className="text-lg font-bold text-gray-900">
                              {item.name}
                            </h3>

                            <p className="text-xs text-gray-500 mt-1">
                              {item.category}
                            </p>

                          </div>

                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
                              item.availability ===
                              "Available"
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-600"
                            }`}
                          >
                            {item.availability}
                          </span>

                        </div>

                        <div className="mt-4">

                          <span className="text-xl font-bold text-gray-900">
                            ₹{item.price}
                          </span>

                          <span className="text-xs text-gray-500">
                            {" "} / day
                          </span>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                {/* Booking Instruction */}

                <div className="mt-4 bg-green-50 border border-green-100 rounded-2xl p-4">

                  <p className="text-sm text-green-800">

                    🌱 Want to rent equipment? Visit{" "}

                    <button
                      onClick={() =>
                        handleNavigate("rentals")
                      }
                      className="font-bold underline hover:text-green-900"
                    >
                      Rentals
                    </button>{" "}

                    to select equipment, choose quantity
                    and add it to your cart.

                  </p>

                </div>

              </div>

              {/* =========================
                  RECENT BOOKINGS
              ========================= */}

              <div className="space-y-5">

                <div>

                  <div className="flex items-center justify-between mb-3">

                    <h2 className="text-lg font-bold text-gray-900">
                      Recent Bookings
                    </h2>

                    <button
                      onClick={() =>
                        handleNavigate("bookings")
                      }
                      className="text-green-700 text-sm font-semibold hover:text-green-900"
                    >
                      View All
                    </button>

                  </div>

                  <div className="space-y-3">

                    {loadingBookings ? (

                      <p className="text-sm text-gray-500">
                        Loading bookings...
                      </p>

                    ) : recentBookings.length === 0 ? (

                      <p className="text-sm text-gray-500">
                        No bookings yet.
                      </p>

                    ) : (

                      recentBookings.map(
                        (booking) => (

                          <BookingCard
                            key={booking._id}
                            equipment={
                              booking.items
                                ?.map(
                                  (item) =>
                                    item.name
                                )
                                .join(", ") ||
                              "Equipment"
                            }
                            bookingId={
                              booking._id
                            }
                            status={
                              booking.status
                            }
                            date={new Date(
                              booking.bookedAt
                            ).toLocaleDateString(
                              "en-IN"
                            )}
                            amount={
                              booking.totalAmount
                            }
                          />

                        )
                      )

                    )}

                  </div>

                </div>

              </div>

            </div>

            {/* =========================
                BOTTOM BANNER
            ========================= */}

            <div className="mt-7 bg-green-700 rounded-2xl p-6 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-white">
                  Grow More, Stress Less 🌱
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Get the right equipment for your
                  farming needs.
                </p>

              </div>

              <button
                onClick={() =>
                  handleNavigate("rentals")
                }
                className="bg-white text-green-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-50"
              >
                Explore Rentals →
              </button>

            </div>

          </main>

        )}

      </div>

    </div>
  )
}

export default Dashboard