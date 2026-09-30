import { useEffect, useState } from "react"

import {
  Search,
  Plus,
  Tractor,
  Pencil,
  Trash2,
  X
} from "lucide-react"


function AdminEquipment() {

  const [equipment, setEquipment] =
    useState([])

  const [searchText, setSearchText] =
    useState("")

  const [selectedCategory, setSelectedCategory] =
    useState("All")

  const [selectedAvailability, setSelectedAvailability] =
    useState("All")

  const [showModal, setShowModal] =
    useState(false)

  const [editingEquipment, setEditingEquipment] =
    useState(null)

  const [formData, setFormData] = useState({
    name: "",
    category: "Tractors",
    price: "",
    availability: "Available"
  })


  // ==========================
  // FETCH EQUIPMENT
  // ==========================

  useEffect(() => {

    async function fetchEquipment() {

      try {

        const token =
          localStorage.getItem("token")

        const response = await fetch(
          "http://localhost:5000/api/admin/equipment",
          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        )


        if (!response.ok) {

          throw new Error(
            "Failed to fetch equipment"
          )

        }


        const data =
          await response.json()

        setEquipment(data)

      } catch (err) {

        console.error(err)

      }

    }


    fetchEquipment()

  }, [])


  // ==========================
  // SEARCH + FILTER
  // ==========================

  const filteredEquipment =
    equipment.filter((item) => {

      const searchValue =
        searchText.toLowerCase().trim()

      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(searchValue) ||
        item.category
          .toLowerCase()
          .includes(searchValue)

      const matchesCategory =
        selectedCategory === "All" ||
        item.category === selectedCategory

      const matchesAvailability =
        selectedAvailability === "All" ||
        item.availability === selectedAvailability

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability
      )
    })


  // ==========================
  // FORM CHANGE
  // ==========================

  function handleFormChange(e) {

    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }))
  }


  // ==========================
  // OPEN ADD MODAL
  // ==========================

  function handleAddEquipment() {

    setEditingEquipment(null)

    setFormData({
      name: "",
      category: "Tractors",
      price: "",
      availability: "Available"
    })

    setShowModal(true)
  }


  // ==========================
  // OPEN EDIT MODAL
  // ==========================

  function handleEditEquipment(item) {

    setEditingEquipment(item)

    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      availability: item.availability
    })

    setShowModal(true)
  }


  // ==========================
  // SAVE EQUIPMENT
  // ==========================
async function handleSaveEquipment(e) {

  e.preventDefault()

  if (!formData.name || !formData.price) {
    return
  }

  try {

    const token =
      localStorage.getItem("token")


    // ==========================
    // ADD EQUIPMENT
    // ==========================

    if (!editingEquipment) {

      const response = await fetch(
        "http://localhost:5000/api/admin/equipment",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + token
          },

          body: JSON.stringify({
            name: formData.name,
            category: formData.category,
            price: Number(formData.price),
            availability:
              formData.availability
          })
        }
      )


      if (!response.ok) {

        throw new Error(
          "Failed to add equipment"
        )

      }


      const newEquipment =
        await response.json()


      setEquipment((previous) => [
        ...previous,
        newEquipment
      ])

    }


    // ==========================
    // EDIT EQUIPMENT
    // ==========================

    else {

      const response = await fetch(
        `http://localhost:5000/api/admin/equipment/${editingEquipment._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + token
          },

          body: JSON.stringify({
            name: formData.name,
            category: formData.category,
            price: Number(formData.price),
            availability:
              formData.availability
          })
        }
      )


      if (!response.ok) {

        throw new Error(
          "Failed to update equipment"
        )

      }


      const updatedEquipment =
        await response.json()


      setEquipment((previous) =>
        previous.map((item) =>
          item._id === updatedEquipment._id
            ? updatedEquipment
            : item
        )
      )

    }


    // ==========================
    // RESET FORM
    // ==========================

    setShowModal(false)

    setEditingEquipment(null)

    setFormData({
      name: "",
      category: "Tractors",
      price: "",
      availability: "Available"
    })


  } catch (err) {

    console.error(err)

    alert(
      "Failed to save equipment"
    )

  }

}

  // ==========================
  // DELETE EQUIPMENT
  // ==========================

  async function handleDeleteEquipment(id) {

  const confirmed =
    window.confirm(
      "Are you sure you want to delete this equipment?"
    )

  if (!confirmed) {
    return
  }


  try {

    const token =
      localStorage.getItem("token")


    const response = await fetch(
      `http://localhost:5000/api/admin/equipment/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization:
            "Bearer " + token
        }
      }
    )


    if (!response.ok) {

      throw new Error(
        "Failed to delete equipment"
      )

    }


    // Remove the deleted equipment
    // from React state

    setEquipment((previous) =>
      previous.filter(
        (item) => item._id !== id
      )
    )


  } catch (err) {

    console.error(err)

    alert(
      "Failed to delete equipment"
    )

  }

}

  return (
    <main className="p-6">

      {/* PAGE HEADING */}

      <div className="flex items-start justify-between">

        <div>

          <p className="text-green-600 text-sm font-medium mb-1">
            Equipment Management
          </p>

          <h1 className="text-2xl font-bold text-gray-900">
            Equipment
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage farm equipment available for rental.
          </p>

        </div>

        <button
          onClick={handleAddEquipment}
          className="flex items-center gap-2 bg-green-700 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-green-800"
        >
          <Plus size={18} />
          Add Equipment
        </button>

      </div>


      {/* STATISTICS */}

      <div className="grid grid-cols-4 gap-5 mt-6">

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

          <p className="text-sm text-gray-500">
            Total Equipment
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-2">
            {equipment.length}
          </h2>

        </div>


        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

          <p className="text-sm text-gray-500">
            Available
          </p>

          <h2 className="text-2xl font-bold text-green-600 mt-2">

            {
              equipment.filter(
                (item) =>
                  item.availability === "Available"
              ).length
            }

          </h2>

        </div>


        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

          <p className="text-sm text-gray-500">
            Unavailable
          </p>

          <h2 className="text-2xl font-bold text-red-600 mt-2">

            {
              equipment.filter(
                (item) =>
                  item.availability === "Unavailable"
              ).length
            }

          </h2>

        </div>


        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

          <p className="text-sm text-gray-500">
            Maintenance
          </p>

          <h2 className="text-2xl font-bold text-orange-600 mt-2">

            {
              equipment.filter(
                (item) =>
                  item.availability === "Maintenance"
              ).length
            }

          </h2>

        </div>

      </div>


      {/* SEARCH + FILTERS */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mt-6">

        <div className="flex items-center gap-4">

          <div className="flex-1 flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">

            <Search
              size={19}
              className="text-gray-400"
            />

            <input
              type="text"
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
              placeholder="Search equipment..."
              className="flex-1 outline-none text-sm text-gray-700"
            />

          </div>


          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value)
            }
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none"
          >

            <option value="All">
              All Categories
            </option>

            <option value="Tractors">
              Tractors
            </option>

            <option value="Harvesting">
              Harvesting
            </option>

            <option value="Tillage">
              Tillage
            </option>

            <option value="Irrigation">
              Irrigation
            </option>

          </select>


          <select
            value={selectedAvailability}
            onChange={(e) =>
              setSelectedAvailability(
                e.target.value
              )
            }
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none"
          >

            <option value="All">
              All Availability
            </option>

            <option value="Available">
              Available
            </option>

            <option value="Unavailable">
              Unavailable
            </option>

            <option value="Maintenance">
              Maintenance
            </option>

          </select>

        </div>

      </div>


      {/* EQUIPMENT TABLE */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-6 overflow-hidden">

        <div className="p-5 border-b border-gray-100">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">

              <Tractor
                size={20}
                className="text-green-700"
              />

            </div>

            <div>

              <h2 className="text-lg font-bold text-gray-900">
                Equipment List
              </h2>

              <p className="text-sm text-gray-500">
                Manage equipment available on FarmTech.
              </p>

            </div>

          </div>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Equipment
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Category
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Price / Day
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Availability
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-gray-100">

              {filteredEquipment.map((item) => (

                <tr
                  key={item._id}
                  className="hover:bg-gray-50"
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">

                        <Tractor
                          size={19}
                          className="text-green-700"
                        />

                      </div>

                      <p className="font-semibold text-gray-800 text-sm">
                        {item.name}
                      </p>

                    </div>

                  </td>


                  <td className="px-5 py-4">

                    <p className="text-sm text-gray-600">
                      {item.category}
                    </p>

                  </td>


                  <td className="px-5 py-4">

                    <p className="font-semibold text-gray-800 text-sm">
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </p>

                    <p className="text-xs text-gray-500">
                      per day
                    </p>

                  </td>


                  <td className="px-5 py-4">

                    <span
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                        item.availability === "Available"
                          ? "bg-green-50 text-green-700"
                          : item.availability === "Maintenance"
                          ? "bg-orange-50 text-orange-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {item.availability}
                    </span>

                  </td>


                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          handleEditEquipment(item)
                        }
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-700"
                        title="Edit equipment"
                      >

                        <Pencil size={16} />

                      </button>


                      <button
                        onClick={() =>
                          handleDeleteEquipment(
                            item._id
                          )
                        }
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600"
                        title="Delete equipment"
                      >

                        <Trash2 size={16} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {filteredEquipment.length === 0 && (

          <div className="p-10 text-center">

            <Tractor
              size={36}
              className="mx-auto text-gray-400 mb-3"
            />

            <h3 className="font-semibold text-gray-800">
              No equipment found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try changing your search or filters.
            </p>

          </div>

        )}

      </div>


      {/* ADD / EDIT MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">

            <div className="flex items-center justify-between p-6 border-b border-gray-100">

              <div>

                <h2 className="text-xl font-bold text-gray-900">

                  {editingEquipment
                    ? "Edit Equipment"
                    : "Add Equipment"}

                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Enter equipment details below.
                </p>

              </div>


              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"
              >

                <X size={19} />

              </button>

            </div>


            <form
              onSubmit={handleSaveEquipment}
              className="p-6 space-y-5"
            >

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equipment Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Example: Tractor"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600"
                />

              </div>


              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600"
                >

                  <option value="Tractors">
                    Tractors
                  </option>

                  <option value="Harvesting">
                    Harvesting
                  </option>

                  <option value="Tillage">
                    Tillage
                  </option>

                  <option value="Irrigation">
                    Irrigation
                  </option>

                </select>

              </div>


              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Per Day
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  placeholder="Example: 1500"
                  min="0"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600"
                />

              </div>


              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>

                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleFormChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600"
                >

                  <option value="Available">
                    Available
                  </option>

                  <option value="Unavailable">
                    Unavailable
                  </option>

                  <option value="Maintenance">
                    Maintenance
                  </option>

                </select>

              </div>


              <div className="flex items-center justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-green-700 text-white text-sm font-semibold hover:bg-green-800"
                >

                  {editingEquipment
                    ? "Save Changes"
                    : "Add Equipment"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  )
}

export default AdminEquipment