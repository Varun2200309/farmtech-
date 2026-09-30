import { useState } from "react"

import {
  User,
  Lock,
  Bell,
  ShieldCheck
} from "lucide-react"


function AdminSettings() {

  const username =
    localStorage.getItem("username") || "FarmTech Admin"

  const email =
    localStorage.getItem("email") || "admin@farmtech.com"


  // ==========================
  // PASSWORD FORM VISIBILITY
  // ==========================

  const [showPasswordForm, setShowPasswordForm] =
    useState(false)


  // ==========================
  // PASSWORD STATES
  // ==========================

  const [currentPassword, setCurrentPassword] =
    useState("")

  const [newPassword, setNewPassword] =
    useState("")

  const [confirmPassword, setConfirmPassword] =
    useState("")

  const [message, setMessage] =
    useState("")

  const [error, setError] =
    useState("")


  // ==========================
  // CHANGE PASSWORD
  // ==========================

  async function handleChangePassword() {

    setMessage("")
    setError("")


    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {

      setError(
        "Please fill all password fields"
      )

      return
    }


    if (newPassword !== confirmPassword) {

      setError(
        "New password and confirm password do not match"
      )

      return
    }


    try {

      const token =
        localStorage.getItem("token")


      const response = await fetch(
        "http://localhost:5000/api/auth/change-password",
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              "Bearer " + token
          },

          body: JSON.stringify({
            currentPassword,
            newPassword
          })
        }
      )


      const data =
        await response.json()


      if (!response.ok) {

        setError(
          data.message ||
          "Failed to change password"
        )

        return
      }


      setMessage(
        "Password changed successfully"
      )


      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

      setShowPasswordForm(false)


    } catch (err) {

      console.error(
        "Change password error:",
        err
      )

      setError(
        "Unable to connect to server"
      )

    }

  }


  return (

    <main className="p-8">

      {/* Page Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-gray-800">
          Settings
        </h2>

        <p className="text-gray-500 mt-1">
          Manage your administrator account and preferences
        </p>

      </div>


      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">


        {/* Admin Profile */}

        <div className="bg-white rounded-2xl border border-gray-200 p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">

              <User
                size={21}
                className="text-green-700"
              />

            </div>

            <div>

              <h3 className="font-semibold text-gray-800">
                Admin Profile
              </h3>

              <p className="text-sm text-gray-500">
                Your administrator information
              </p>

            </div>

          </div>


          <div className="space-y-5">

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>

              <input
                type="text"
                value={username}
                readOnly
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-600 outline-none"
              />

            </div>


            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                readOnly
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-600 outline-none"
              />

            </div>


            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>

              <input
                type="text"
                value="Administrator"
                readOnly
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-600 outline-none"
              />

            </div>

          </div>

        </div>


        {/* Security */}

        <div className="bg-white rounded-2xl border border-gray-200 p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">

              <Lock
                size={21}
                className="text-blue-700"
              />

            </div>

            <div>

              <h3 className="font-semibold text-gray-800">
                Security
              </h3>

              <p className="text-sm text-gray-500">
                Manage account security
              </p>

            </div>

          </div>


          {/* Success / Error Message */}

          {message && (
            <p className="text-sm text-green-600 mb-4">
              {message}
            </p>
          )}

          {error && (
            <p className="text-sm text-red-600 mb-4">
              {error}
            </p>
          )}


          {/* Password form hidden initially */}

          {!showPasswordForm && (

            <div className="space-y-4">

              <div className="p-4 bg-gray-50 rounded-xl">

                <p className="font-medium text-gray-800">
                  Password
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Change your administrator account password.
                </p>

              </div>


              <button
                onClick={() => {

                  setError("")
                  setMessage("")

                  setShowPasswordForm(true)

                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl"
              >
                Change Password
              </button>

            </div>

          )}


          {/* Password form shown after clicking */}

          {showPasswordForm && (

            <div className="space-y-5">

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>

                <input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>


              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>


              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>


              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => {

                    setCurrentPassword("")
                    setNewPassword("")
                    setConfirmPassword("")

                    setError("")

                    setShowPasswordForm(false)

                  }}
                  className="w-1/2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl"
                >
                  Cancel
                </button>


                <button
                  type="button"
                  onClick={handleChangePassword}
                  className="w-1/2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl"
                >
                  Update Password
                </button>

              </div>

            </div>

          )}

        </div>


        {/* Notifications */}

        <div className="bg-white rounded-2xl border border-gray-200 p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 rounded-xl bg-yellow-100 flex items-center justify-center">

              <Bell
                size={21}
                className="text-yellow-700"
              />

            </div>

            <div>

              <h3 className="font-semibold text-gray-800">
                Notifications
              </h3>

              <p className="text-sm text-gray-500">
                Manage notification preferences
              </p>

            </div>

          </div>


          <div className="space-y-5">

            <label className="flex items-center justify-between">

              <div>

                <p className="font-medium text-gray-800">
                  New Bookings
                </p>

                <p className="text-sm text-gray-500">
                  Notify when a new booking is created
                </p>

              </div>

              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 accent-green-600"
              />

            </label>


            <label className="flex items-center justify-between">

              <div>

                <p className="font-medium text-gray-800">
                  New Users
                </p>

                <p className="text-sm text-gray-500">
                  Notify when a new farmer registers
                </p>

              </div>

              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 accent-green-600"
              />

            </label>


            <label className="flex items-center justify-between">

              <div>

                <p className="font-medium text-gray-800">
                  Maintenance Alerts
                </p>

                <p className="text-sm text-gray-500">
                  Receive equipment maintenance alerts
                </p>

              </div>

              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 accent-green-600"
              />

            </label>

          </div>

        </div>


        {/* Account Status */}

        <div className="bg-white rounded-2xl border border-gray-200 p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">

              <ShieldCheck
                size={21}
                className="text-purple-700"
              />

            </div>

            <div>

              <h3 className="font-semibold text-gray-800">
                Account Status
              </h3>

              <p className="text-sm text-gray-500">
                Administrator account information
              </p>

            </div>

          </div>


          <div className="space-y-4">

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">

              <span className="text-sm text-gray-600">
                Account Status
              </span>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                Active
              </span>

            </div>


            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">

              <span className="text-sm text-gray-600">
                Account Role
              </span>

              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                Administrator
              </span>

            </div>


            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">

              <span className="text-sm text-gray-600">
                Authentication
              </span>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                JWT Enabled
              </span>

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}

export default AdminSettings