import { useState } from "react"

import {
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  X
} from "lucide-react"

function EquipmentCard(props) {
  const [quantity, setQuantity] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const isAvailable = props.availability === "Available"

  function increaseQuantity() {
    if (isAvailable) {
      setQuantity(quantity + 1)
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  function handleBookClick() {
    if (isAvailable) {
      setShowConfirmation(true)
    }
  }

  function handleConfirm() {
    if (props.onBook) {
      props.onBook({
        name: props.name,
        price: props.price,
        quantity: quantity,
        image: props.image
      })
    }

    setShowConfirmation(false)
  }

  return (
    <>
      {/* Equipment Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition duration-200">

        {/* Image */}
        <div className="h-36 bg-gray-100 overflow-hidden">
          <img
            src={props.image}
            alt={props.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Content */}
        <div className="p-5">

          {/* Name + Availability */}
          <div className="flex items-start justify-between gap-3">

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {props.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Agricultural Equipment
              </p>
            </div>

            <span
              className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ${
                isAvailable
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {props.availability}
            </span>

          </div>

          {/* Price */}
          <div className="mt-4">

            <span className="text-2xl font-bold text-gray-900">
              ₹{props.price}
            </span>

            <span className="text-sm text-gray-500">
              {" "} / day
            </span>

          </div>

          {/* Quantity */}
          <div className="flex items-center justify-between mt-5">

            <span className="text-sm text-gray-500">
              Quantity
            </span>

            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">

              {/* Minus */}
              <button
                onClick={decreaseQuantity}
                disabled={!isAvailable}
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                <Minus size={15} />
              </button>

              {/* Quantity Number */}
              <span className="w-8 text-center font-semibold text-sm">
                {quantity}
              </span>

              {/* Plus */}
              <button
                onClick={increaseQuantity}
                disabled={!isAvailable}
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                <Plus size={15} />
              </button>

            </div>

          </div>

          {/* Total */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

            <span className="text-sm text-gray-500">
              Total
            </span>

            <span className="font-bold text-green-700">
              ₹{props.price * quantity}
            </span>

          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-4">

            {/* Details */}
            <button
              className="flex-1 border border-green-700 text-green-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-50"
            >
              Details
              <ArrowRight size={16} />
            </button>

            {/* Book */}
            <button
              onClick={handleBookClick}
              disabled={!isAvailable}
              className="flex-1 bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={17} />
              Book
            </button>

          </div>

        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-96 rounded-2xl shadow-xl p-6">

            {/* Popup Header */}
            <div className="flex items-center justify-between">

              <h2 className="text-lg font-bold text-gray-900">
                Add to Cart?
              </h2>

              <button
                onClick={() => setShowConfirmation(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>

            </div>

            {/* Message */}
            <p className="text-sm text-gray-500 mt-5">
              Do you want to add this equipment to your cart?
            </p>

            {/* Popup Buttons */}
            <div className="flex justify-end gap-3 mt-7">

              {/* Cancel */}
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              {/* Add to Cart */}
              <button
                onClick={handleConfirm}
                className="px-5 py-2.5 bg-green-700 text-white rounded-xl text-sm font-semibold hover:bg-green-800"
              >
                Add to Cart
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  )
}

export default EquipmentCard