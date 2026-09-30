import { useEffect, useState } from "react"
import EquipmentCard from "./EquipmentCard"

import {
  Tractor,
  Wheat,
  Shovel,
  Droplets,
  Search
} from "lucide-react"

function Rentals({ onBook }) {

  const [equipment, setEquipment] =
    useState([])

  const [selectedCategory, setSelectedCategory] =
    useState("All")

  const [searchText, setSearchText] =
    useState("")


  // =========================
  // FETCH EQUIPMENT
  // =========================

  useEffect(() => {

    async function fetchEquipment() {

      try {

        const response = await fetch(
          "http://localhost:5000/api/equipment"
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

        console.error(
          "Failed to load equipment:",
          err
        )

      }

    }

    fetchEquipment()

  }, [])


  // =========================
  // FILTER EQUIPMENT
  // =========================

  const filteredEquipment =
    equipment.filter(
      (item) => {

        const matchesCategory =
          selectedCategory === "All" ||
          item.category === selectedCategory

        const searchValue =
          searchText
            .toLowerCase()
            .trim()

        const matchesSearch =
          item.name
            .toLowerCase()
            .includes(searchValue) ||
          item.category
            .toLowerCase()
            .includes(searchValue)

        return (
          matchesCategory &&
          matchesSearch
        )

      }
    )


  return (

    <main className="p-6">

      {/* =========================
          PAGE HEADING
      ========================= */}

      <div>

        <p className="text-green-600 text-sm font-medium mb-1">
          Farm Equipment Rental
        </p>

        <h1 className="text-2xl font-bold text-gray-900">
          Rent Equipment
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Choose the equipment you need for your farm.
        </p>

      </div>


      {/* =========================
          SEARCH
      ========================= */}

      <div className="mt-6 relative max-w-md">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search equipment..."
          value={searchText}
          onChange={(e) =>
            setSearchText(e.target.value)
          }
          className="w-full border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-green-500"
        />

      </div>


      {/* =========================
          CATEGORY FILTER
      ========================= */}

      <div className="flex flex-wrap gap-3 mt-5">

        <button
          onClick={() =>
            setSelectedCategory("All")
          }
          className={
            selectedCategory === "All"
              ? "px-4 py-2 rounded-xl bg-green-700 text-white text-sm font-semibold"
              : "px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200"
          }
        >
          All
        </button>


        <button
          onClick={() =>
            setSelectedCategory("Tractors")
          }
          className={
            selectedCategory === "Tractors"
              ? "px-4 py-2 rounded-xl bg-green-700 text-white text-sm font-semibold"
              : "px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200"
          }
        >
          Tractors
        </button>


        <button
          onClick={() =>
            setSelectedCategory("Harvesting")
          }
          className={
            selectedCategory === "Harvesting"
              ? "px-4 py-2 rounded-xl bg-green-700 text-white text-sm font-semibold"
              : "px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200"
          }
        >
          Harvesting
        </button>


        <button
          onClick={() =>
            setSelectedCategory("Tillage")
          }
          className={
            selectedCategory === "Tillage"
              ? "px-4 py-2 rounded-xl bg-green-700 text-white text-sm font-semibold"
              : "px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200"
          }
        >
          Tillage
        </button>


        <button
          onClick={() =>
            setSelectedCategory("Irrigation")
          }
          className={
            selectedCategory === "Irrigation"
              ? "px-4 py-2 rounded-xl bg-green-700 text-white text-sm font-semibold"
              : "px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200"
          }
        >
          Irrigation
        </button>

      </div>


      {/* =========================
          EQUIPMENT GRID
      ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">

        {filteredEquipment.map((item) => (

          <EquipmentCard
            key={item._id}
            name={item.name}
            price={item.price}
            availability={item.availability}
            image={
              `/equipment/${item.name
                .toLowerCase()
                .replaceAll(" ", "-")}.png`
            }
            onBook={onBook}
          />

        ))}

      </div>


      {/* =========================
          NO RESULTS
      ========================= */}

      {filteredEquipment.length === 0 && (

        <div className="text-center py-12">

          <p className="text-gray-500">
            No equipment found.
          </p>

        </div>

      )}

    </main>

  )

}

export default Rentals