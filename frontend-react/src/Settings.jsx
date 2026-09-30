import { useEffect, useState } from "react"

import {
  User,
  Bell,
  Lock,
  ShieldCheck,
  Save
} from "lucide-react"

function Settings() {

  const username =
    localStorage.getItem("username") || "User"

  const email =
    localStorage.getItem("email") || "Email not available"

  const [bookingUpdates, setBookingUpdates] =
    useState(true)

  const [promotionalNotifications, setPromotionalNotifications] =
    useState(false)

  const [message, setMessage] = useState("")

  const [messageType, setMessageType] =
    useState("success")

  const [showPasswordForm, setShowPasswordForm] =
    useState(false)

  const [currentPassword, setCurrentPassword] =
    useState("")

  const [newPassword, setNewPassword] =
    useState("")

  const [confirmPassword, setConfirmPassword] =
    useState("")

  const [changingPassword, setChangingPassword] =
    useState(false)

  useEffect(() => {

    const savedBookingUpdates =
      localStorage.getItem("bookingUpdates")

    const savedPromotionalNotifications =
      localStorage.getItem(
        "promotionalNotifications"
      )

    if (savedBookingUpdates !== null) {
      setBookingUpdates(
        savedBookingUpdates === "true"
      )
    }

    if (savedPromotionalNotifications !== null) {
      setPromotionalNotifications(
        savedPromotionalNotifications === "true"
      )
    }

  }, [])

  function handleSaveChanges() {

    localStorage.setItem(
      "bookingUpdates",
      bookingUpdates
    )

    localStorage.setItem(
      "promotionalNotifications",
      promotionalNotifications
    )

    setMessage("Settings saved successfully.")
    setMessageType("success")

    setTimeout(() => {
      setMessage("")
    }, 3000)
  }

  async function handleChangePassword(e) {

    e.preventDefault()

    setMessage("")

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setMessage("Please fill all password fields.")
      setMessageType("error")
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage(
        "New password and confirm password do not match."
      )
      setMessageType("error")
      return
    }

    if (newPassword === currentPassword) {
      setMessage(
        "New password must be different from the current password."
      )
      setMessageType("error")
      return
    }

    const token = localStorage.getItem("token")

    if (!token) {
      setMessage(
        "Please login again to change your password."
      )
      setMessageType("error")
      return
    }

    setChangingPassword(true)

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/change-password",
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },

          body: JSON.stringify({
            currentPassword,
            newPassword
          })
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setMessage(
          data.message || "Failed to change password."
        )
        setMessageType("error")
        setChangingPassword(false)
        return
      }

      setMessage(
        data.message ||
        "Password changed successfully."
      )

      setMessageType("success")

      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

      setShowPasswordForm(false)

      setChangingPassword(false)

    } catch (error) {

      console.error(error)

      setMessage(
        "Server error while changing password."
      )

      setMessageType("error")
      setChangingPassword(false)
    }
  }

  return (
    <main className="p-6">

      {/* Page Header */}

      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          Settings
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Manage your FarmTech account and preferences.
        </p>

      </div>

      {/* Account Settings */}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-6">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">

            <User
              size={20}
              className="text-green-700"
            />

          </div>

          <div>

            <h2 className="font-bold text-gray-900">
              Account Settings
            </h2>

            <p className="text-gray-500 text-sm">
              Manage your basic account information.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-5 mt-6">

          {/* Username */}

          <div>

            <label className="text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              value={username}
              readOnly
              className="w-full border border-gray-200 rounded-lg px-4 py-3 mt-2 text-sm outline-none bg-gray-50"
            />

          </div>

          {/* Email */}

          <div>

            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              readOnly
              className="w-full border border-gray-200 rounded-lg px-4 py-3 mt-2 text-sm outline-none bg-gray-50"
            />

          </div>

        </div>

      </div>

      {/* Notifications */}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-5">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">

            <Bell
              size={20}
              className="text-blue-700"
            />

          </div>

          <div>

            <h2 className="font-bold text-gray-900">
              Notifications
            </h2>

            <p className="text-gray-500 text-sm">
              Choose which notifications you want to receive.
            </p>

          </div>

        </div>

        <div className="mt-6 space-y-4">

          {/* Booking Updates */}

          <label className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-900">
                Booking Updates
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Receive updates about your bookings.
              </p>

            </div>

            <input
              type="checkbox"
              checked={bookingUpdates}
              onChange={(e) =>
                setBookingUpdates(e.target.checked)
              }
              className="w-4 h-4 accent-green-700"
            />

          </label>

          {/* Promotional Notifications */}

          <label className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-900">
                Promotional Notifications
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Receive information about offers and new equipment.
              </p>

            </div>

            <input
              type="checkbox"
              checked={promotionalNotifications}
              onChange={(e) =>
                setPromotionalNotifications(
                  e.target.checked
                )
              }
              className="w-4 h-4 accent-green-700"
            />

          </label>

        </div>

      </div>

      {/* Security */}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-5">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">

            <Lock
              size={20}
              className="text-purple-700"
            />

          </div>

          <div>

            <h2 className="font-bold text-gray-900">
              Security
            </h2>

            <p className="text-gray-500 text-sm">
              Manage your account security.
            </p>

          </div>

        </div>

        {/* Change Password Button */}

        {!showPasswordForm && (
          <button
            type="button"
            onClick={() => setShowPasswordForm(true)}
            className="flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-semibold mt-5 hover:bg-gray-50"
          >

            <ShieldCheck size={17} />

            Change Password

          </button>
        )}

        {/* Change Password Form */}

        {showPasswordForm && (

          <form
            onSubmit={handleChangePassword}
            className="mt-6 max-w-xl"
          >

            {/* Current Password */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Current Password
              </label>

              <input
                type="password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                placeholder="Enter current password"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 mt-2 text-sm outline-none focus:border-green-600"
              />

            </div>

            {/* New Password */}

            <div className="mt-4">

              <label className="text-sm font-medium text-gray-700">
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 mt-2 text-sm outline-none focus:border-green-600"
              />

            </div>

            {/* Confirm Password */}

            <div className="mt-4">

              <label className="text-sm font-medium text-gray-700">
                Confirm New Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 mt-2 text-sm outline-none focus:border-green-600"
              />

            </div>

            {/* Form Buttons */}

            <div className="flex gap-3 mt-5">

              <button
                type="submit"
                disabled={changingPassword}
                className="bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-800 disabled:opacity-50"
              >
                {changingPassword
                  ? "Changing..."
                  : "Change Password"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowPasswordForm(false)
                  setCurrentPassword("")
                  setNewPassword("")
                  setConfirmPassword("")
                }}
                className="border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>

            </div>

          </form>

        )}

      </div>

      {/* Message */}

      {message && (
        <div
          className={`mt-5 rounded-xl px-4 py-3 text-sm ${
            messageType === "error"
              ? "bg-red-50 text-red-700 border border-red-100"
              : "bg-green-50 text-green-700 border border-green-100"
          }`}
        >
          {message}
        </div>
      )}

      {/* Save Button */}

      <div className="flex justify-end mt-6">

        <button
          onClick={handleSaveChanges}
          className="flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800"
        >

          <Save size={17} />

          Save Changes

        </button>

      </div>

    </main>
  )
}

export default Settings