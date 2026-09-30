import { useState } from "react"
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Tractor,
  Leaf,
  ShieldCheck
} from "lucide-react"

function Register({ onLogin }) {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    setMessage("")
    setError("")

    // Check passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username,
            email,
            password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Registration failed")
        return
      }

      setMessage("Account created successfully!")

      // Go to Login after successful registration
      setTimeout(() => {
        onLogin()
      }, 1000)

    } catch (error) {

      setError(
        "Unable to connect to the server. Make sure the backend is running."
      )

    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/farm-background.jpg')",
        backgroundAttachment: "fixed"
      }}
    >

      <div className="min-h-screen bg-black/35">

        {/* Header */}

        <header className="h-20 bg-green-950/95 flex items-center justify-between px-10">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Tractor size={23} className="text-green-400" />
            </div>

            <div>

              <h1 className="text-2xl font-bold text-white">
                FARMTECH
              </h1>

              <p className="text-xs text-green-200">
                Smart Farming, Better Future
              </p>

            </div>

          </div>

          <div className="hidden md:flex items-center gap-2 text-green-100">

            <Leaf size={20} className="text-green-400" />

            <span className="text-sm">
              Smart Farming, Better Future
            </span>

          </div>

        </header>

        {/* Main */}

        <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-10">

          <div className="w-full max-w-5xl bg-black/65 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

            {/* Left Section */}

            <div className="p-10 md:p-12 text-white flex flex-col justify-center">

              <p className="text-green-400 font-semibold text-sm mb-3">
                JOIN FARMTECH
              </p>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Start Farming
                <br />
                Smarter
              </h2>

              <p className="text-gray-200 mt-5 text-lg leading-relaxed max-w-md">
                Create your FarmTech account and get easy
                access to agricultural equipment rentals.
              </p>

              <div className="grid grid-cols-3 mt-10 border-t border-white/20 pt-7">

                <div className="text-center px-2">

                  <Tractor
                    size={30}
                    className="mx-auto text-green-400"
                  />

                  <p className="text-sm text-gray-200 mt-3">
                    Wide Range
                    <br />
                    of Equipment
                  </p>

                </div>

                <div className="text-center px-2 border-x border-white/20">

                  <Leaf
                    size={30}
                    className="mx-auto text-green-400"
                  />

                  <p className="text-sm text-gray-200 mt-3">
                    Trusted
                    <br />
                    by Farmers
                  </p>

                </div>

                <div className="text-center px-2">

                  <ShieldCheck
                    size={30}
                    className="mx-auto text-green-400"
                  />

                  <p className="text-sm text-gray-200 mt-3">
                    Safe &
                    <br />
                    Secure Booking
                  </p>

                </div>

              </div>

            </div>

            {/* Right Section */}

            <div className="p-10 md:p-12 border-t md:border-t-0 md:border-l border-white/20">

              <div className="max-w-md mx-auto">

                <h2 className="text-3xl font-bold text-white">
                  Create Account
                </h2>

                <p className="text-gray-300 mt-2">
                  Register to get started with FarmTech
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4"
                >

                  {/* Username */}

                  <div className="relative">

                    <User
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                    />

                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full bg-white/10 border border-white/25 text-white placeholder-gray-300 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    />

                  </div>

                  {/* Email */}

                  <div className="relative">

                    <Mail
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                    />

                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white/10 border border-white/25 text-white placeholder-gray-300 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    />

                  </div>

                  {/* Password */}

                  <div className="relative">

                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-white/10 border border-white/25 text-white placeholder-gray-300 rounded-xl py-3.5 pl-12 pr-12 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                  {/* Confirm Password */}

                  <div className="relative">

                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                    />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full bg-white/10 border border-white/25 text-white placeholder-gray-300 rounded-xl py-3.5 pl-12 pr-12 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                  {/* Error */}

                  {error && (
                    <p className="text-red-400 text-sm">
                      {error}
                    </p>
                  )}

                  {/* Success */}

                  {message && (
                    <p className="text-green-400 text-sm">
                      {message}
                    </p>
                  )}

                  {/* Create Account */}

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-500 text-white py-3.5 rounded-xl font-bold transition"
                  >
                    Create Account
                  </button>

                </form>

                {/* Login */}

                <p className="text-center text-sm text-gray-300 mt-6">

                  Already have an account?{" "}

                  <button
                    onClick={onLogin}
                    className="text-green-400 font-semibold hover:text-green-300"
                  >
                    Login
                  </button>

                </p>

              </div>

            </div>

          </div>

        </main>

        {/* Footer */}

        <div className="text-center pb-6">

          <p className="text-gray-200 text-sm">
            © 2026 FarmTech. All rights reserved.
          </p>

        </div>

      </div>

    </div>
  )
}

export default Register