import { useState } from "react"

import AdminSidebar from "./AdminSidebar"
import AdminHeader from "./AdminHeader"
import AdminDashboard from "./AdminDashboard"
import AdminBookings from "./AdminBookings"
import AdminEquipment from "./AdminEquipment"
import AdminUsers from "./AdminUsers"
import AdminSettings from "./AdminSettings"

function AdminPanel({ onLogout }) {

  const [currentPage, setCurrentPage] =
    useState("dashboard")


  function handleNavigate(page) {

    setCurrentPage(page)

  }


  return (

    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}

      <AdminSidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />


      {/* Main Area */}

      <div className="flex-1">

        {/* Header */}

        <AdminHeader />


        {/* Pages */}

        {currentPage === "dashboard" && (
         <AdminDashboard
  onNavigate={handleNavigate}
/>
        )}


        {currentPage === "bookings" && (
          <AdminBookings />
        )}


        {currentPage === "equipment" && (
          <AdminEquipment />
        )}


        {currentPage === "users" && (
          <AdminUsers />
        )}


        {currentPage === "settings" && (
          <AdminSettings />
        )}

      </div>

    </div>

  )
}

export default AdminPanel