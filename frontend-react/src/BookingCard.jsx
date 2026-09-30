
function BookingCard(props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">

      <div className="flex justify-between items-center">

        <div>
          <h3 className="font-bold text-gray-800">
            {props.equipment}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Booking ID: {props.bookingId}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            props.status === "Approved"
              ? "bg-green-100 text-green-700"
              : props.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {props.status}
        </span>

      </div>

      <div className="flex justify-between mt-4 text-sm text-gray-600">

        <p>
          Date: {props.date}
        </p>

        <p>
          Amount: ₹{props.amount}
        </p>

      </div>

    </div>
  )
}

export default BookingCard