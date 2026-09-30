import { useState } from "react"

import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2
} from "lucide-react"

function Cart({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  onBookingSuccess
}) {
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("success")
  const [isBooking, setIsBooking] = useState(false)

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  async function handleConfirmBooking() {
    const token = localStorage.getItem("token")

    if (!token) {
      setMessage("Please login before confirming a booking.")
      setMessageType("error")
      return
    }

    if (cart.length === 0) {
      setMessage("Your cart is empty.")
      setMessageType("error")
      return
    }

    setIsBooking(true)
    setMessage("")

    try {
      const res = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify({
            items: cart,
            totalAmount: totalAmount
          })
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.message || "Booking failed.")
        setMessageType("error")
        setIsBooking(false)
        return
      }

      setMessage(
        data.message || "Booking created successfully!"
      )
      setMessageType("success")

      /*
        Booking was successfully saved.
        Now clear the React cart.
      */
     onBookingSuccess()
setIsBooking(false)

     
    } catch (error) {
      console.error(error)

      setMessage(
        "Server error while creating booking."
      )

      setMessageType("error")
      setIsBooking(false)
    }
  }

  return (
    <main className="p-6">

      {/* Page Heading */}
      <div>
        <p className="text-green-600 text-sm font-medium mb-1">
          Your Selection
        </p>

        <h1 className="text-2xl font-bold text-gray-900">
          Cart
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Review the equipment you selected.
        </p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mt-5 px-4 py-3 rounded-xl text-sm ${
            messageType === "success"
              ? "bg-green-50 text-green-700 border border-green-100"
              : "bg-red-50 text-red-600 border border-red-100"
          }`}
        >
          {message}
        </div>
      )}

      {cart.length === 0 ? (

        /* Empty Cart */
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm">

          <div className="flex flex-col items-center justify-center py-16">

            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
              <ShoppingCart
                size={30}
                className="text-green-700"
              />
            </div>

            <h2 className="text-lg font-bold text-gray-900 mt-5">
              Your cart is empty
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Select equipment from the Rentals page.
            </p>

          </div>

        </div>

      ) : (

        /* Cart With Items */
        <div className="grid grid-cols-3 gap-6 mt-8">

          {/* Cart Items */}
          <div className="col-span-2 space-y-4">

            {cart.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
              >

                <div className="flex items-center gap-5">

                  {/* Image */}
                  <div className="w-28 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  {/* Details */}
                  <div className="flex-1">

                    <h2 className="text-lg font-bold text-gray-900">
                      {item.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.price} / day
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mt-4">

                      <span className="text-sm text-gray-500">
                        Quantity
                      </span>

                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">

                        <button
                          onClick={() => onDecrease(index)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => onIncrease(index)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                        >
                          <Plus size={14} />
                        </button>

                      </div>

                    </div>

                  </div>

                  {/* Price */}
                  <div className="text-right">

                    <p className="text-lg font-bold text-green-700">
                      ₹{item.price * item.quantity}
                    </p>

                    <button
                      onClick={() => onRemove(index)}
                      className="mt-3 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Order Summary */}
          <div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

              <h2 className="text-lg font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="flex items-center justify-between mt-5">

                <span className="text-sm text-gray-500">
                  Items
                </span>

                <span className="font-semibold text-gray-900">
                  {cart.length}
                </span>

              </div>

              <div className="flex items-center justify-between mt-3">

                <span className="text-sm text-gray-500">
                  Total
                </span>

                <span className="text-xl font-bold text-green-700">
                  ₹{totalAmount}
                </span>

              </div>

              <div className="border-t border-gray-100 mt-5 pt-5">

                <button
                  onClick={handleConfirmBooking}
                  disabled={isBooking}
                  className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isBooking
                    ? "Confirming..."
                    : "Confirm Booking"}
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </main>
  )
}

export default Cart