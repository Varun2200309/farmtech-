import { useEffect, useState } from "react"

import {
  Users,
  UserCheck,
  UserX,
  Search,
  Eye
} from "lucide-react"

function AdminUsers() {

  const [users, setUsers] = useState([])

  const [searchText, setSearchText] =
    useState("")

  const [selectedRole, setSelectedRole] =
    useState("All Roles")

  const [selectedStatus, setSelectedStatus] =
    useState("All Status")

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState("")


  // ==========================
  // FETCH USERS
  // ==========================

  useEffect(() => {

    async function fetchUsers() {

      try {

        const token =
          localStorage.getItem("token")

        const response = await fetch(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        )


        if (!response.ok) {

          throw new Error(
            "Failed to fetch users"
          )

        }


        const data =
          await response.json()

        setUsers(data)

      } catch (err) {

        console.error(err)

        setError(
          "Unable to load users"
        )

      } finally {

        setLoading(false)

      }

    }


    fetchUsers()

  }, [])


  // ==========================
  // FILTER USERS
  // ==========================

  const filteredUsers = users.filter(
    user => {

      const matchesSearch =
        user.username
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          ) ||

        user.email
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          )


      const matchesRole =
        selectedRole === "All Roles" ||
        (
          selectedRole === "Admin" &&
          user.role === "admin"
        ) ||
        (
          selectedRole === "Farmer" &&
          user.role === "user"
        )


      return (
        matchesSearch &&
        matchesRole
      )

    }
  )


  // ==========================
  // STATISTICS
  // ==========================

  const totalUsers =
    users.length


  const activeUsers =
    users.length


  const inactiveUsers = 0


  const adminUsers =
    users.filter(
      user => user.role === "admin"
    ).length


  // ==========================
  // UI
  // ==========================

  return (

    <main className="p-8">

      {/* Page Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-gray-800">
          Users
        </h2>

        <p className="text-gray-500 mt-1">
          Manage registered FarmTech users
        </p>

      </div>


      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">


        {/* Total Users */}

        <div className="bg-white rounded-2xl p-6 border border-gray-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Users
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-2">
                {totalUsers}
              </h3>

            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

              <Users
                size={23}
                className="text-blue-600"
              />

            </div>

          </div>

        </div>


        {/* Active Users */}

        <div className="bg-white rounded-2xl p-6 border border-gray-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Active Users
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-2">
                {activeUsers}
              </h3>

            </div>

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">

              <UserCheck
                size={23}
                className="text-green-600"
              />

            </div>

          </div>

        </div>


        {/* Inactive Users */}

        <div className="bg-white rounded-2xl p-6 border border-gray-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Inactive Users
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-2">
                {inactiveUsers}
              </h3>

            </div>

            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">

              <UserX
                size={23}
                className="text-red-600"
              />

            </div>

          </div>

        </div>


        {/* Admin Users */}

        <div className="bg-white rounded-2xl p-6 border border-gray-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Admin Users
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-2">
                {adminUsers}
              </h3>

            </div>

            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">

              <UserCheck
                size={23}
                className="text-purple-600"
              />

            </div>

          </div>

        </div>

      </div>


      {/* Search & Filters */}

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
              placeholder="Search users..."
              value={searchText}
              onChange={e =>
                setSearchText(
                  e.target.value
                )
              }
              className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>


          {/* Role */}

          <select
            value={selectedRole}
            onChange={e =>
              setSelectedRole(
                e.target.value
              )
            }
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          >

            <option>All Roles</option>
            <option>Farmer</option>
            <option>Admin</option>

          </select>


          {/* Status */}

          <select
            value={selectedStatus}
            onChange={e =>
              setSelectedStatus(
                e.target.value
              )
            }
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          >

            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>

          </select>

        </div>

      </div>


      {/* Loading */}

      {loading && (

        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">

          <p className="text-gray-500">
            Loading users...
          </p>

        </div>

      )}


      {/* Error */}

      {!loading && error && (

        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-5">

          {error}

        </div>

      )}


      {/* Users Table */}

      {!loading && !error && (

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-200">

            <h3 className="font-semibold text-gray-800">
              Registered Users
            </h3>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    User ID
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Name
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Email
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Role
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

                {filteredUsers.map(user => (

                  <tr
                    key={user._id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >

                    {/* ID */}

                    <td className="px-6 py-4 text-sm font-medium text-gray-700">

                      {user._id.slice(-6)}

                    </td>


                    {/* Name */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">

                          {user.username.charAt(0).toUpperCase()}

                        </div>

                        <span className="text-sm font-medium text-gray-800">

                          {user.username}

                        </span>

                      </div>

                    </td>


                    {/* Email */}

                    <td className="px-6 py-4 text-sm text-gray-600">

                      {user.email}

                    </td>


                    {/* Role */}

                    <td className="px-6 py-4">

                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">

                        {user.role === "admin"
                          ? "Admin"
                          : "Farmer"}

                      </span>

                    </td>


                    {/* Status */}

                    <td className="px-6 py-4">

                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">

                        Active

                      </span>

                    </td>


                    {/* Action */}

                    <td className="px-6 py-4 text-center">

                      <button
                        className="p-2 rounded-lg text-gray-500 hover:bg-green-100 hover:text-green-700"
                        title="View User"
                      >

                        <Eye size={18} />

                      </button>

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

export default AdminUsers