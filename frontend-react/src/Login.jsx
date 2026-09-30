import { useState } from "react"

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Tractor,
  Leaf,
  ShieldCheck
} from "lucide-react"

function Login({ onLogin, onRegister }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {

    e.preventDefault()

    setError("")
    setLoading(true)

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {

        setError(
          data.message || "Login failed"
        )

        setLoading(false)

        return
      }

      // STORE JWT TOKEN

      localStorage.setItem(
        "token",
        data.token
      )


      // STORE USERNAME

      if (data.username) {

        localStorage.setItem(
          "username",
          data.username
        )

      }


      // STORE EMAIL

      localStorage.setItem(
        "email",
        email
      )


      // STORE ROLE

      localStorage.setItem(
        "role",
        data.role
      )


      // LOGIN SUCCESSFUL

      onLogin(data.role)

    } catch (error) {

      setError(
        "Unable to connect to the server. Make sure the backend is running."
      )

    } finally {

      setLoading(false)

    }
  }

  return (

    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/farm-background.png')",
        backgroundAttachment: "fixed"
      }}
    >

      <div className="min-h-screen bg-black/35">


        {/* HEADER */}

        <header className="h-20 bg-green-950/95 flex items-center justify-between px-10">

          {/* FARMTECH BRANDING */}

          <div className="flex items-center gap-3">

            {/* LOGO */}

            <img
              src="/farmtech-logo.png"
              alt="FarmTech Logo"
              className="w-12 h-12 object-contain"
            />


            {/* BRAND TEXT */}

            <div>

              <h1 className="text-2xl font-bold tracking-tight">

                <span className="text-black">
                  FARM
                </span>

                <span className="text-green-400">
                  TECH
                </span>

              </h1>

              <p className="text-xs text-green-200">
                Smart Farming, Better Future
              </p>

            </div>

          </div>


          {/* RIGHT HEADER */}

          <div className="hidden md:flex items-center gap-2 text-green-100">

            <Leaf
              size={20}
              className="text-green-400"
            />

            <span className="text-sm">
              Smart Farming, Better Future
            </span>

          </div>

        </header>


        {/* MAIN */}

        <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-10">

          <div className="w-full max-w-5xl bg-black/65 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">


            {/* LEFT SECTION */}

            <div className="p-10 md:p-12 text-white flex flex-col justify-center">

              {/* LOGO */}

              <div className="mb-7">

                <img
                  src="/farmtech-logo.png"
                  alt="FarmTech"
                  className="w-36 h-36 object-contain"
                />

              </div>


              <p className="text-green-400 font-semibold text-sm mb-3">
                WELCOME TO
              </p>


              <h2 className="text-4xl md:text-5xl font-bold leading-tight">

                <span className="text-white">
                  FARM
                </span>

                <span className="text-green-400">
                  TECH
                </span>

              </h2>


              <p className="text-gray-200 mt-5 text-lg leading-relaxed max-w-md">
                Order farming equipment online easily
                and efficiently.
              </p>


              {/* FEATURES */}

              <div className="grid grid-cols-3 mt-10 border-t border-white/20 pt-7">


                {/* FEATURE 1 */}

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


                {/* FEATURE 2 */}

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


                {/* FEATURE 3 */}

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


            {/* RIGHT SECTION */}

            <div className="p-10 md:p-12 border-t md:border-t-0 md:border-l border-white/20">

              <div className="max-w-md mx-auto">


                <h2 className="text-3xl font-bold text-white">
                  Login to Continue
                </h2>


                <p className="text-gray-300 mt-2">
                  Access your account to book equipment
                </p>


                {/* LOGIN FORM */}

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >


                  {/* EMAIL */}

                  <div className="relative">

                    <Mail
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                    />

                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                      className="w-full bg-white/10 border border-white/25 text-white placeholder-gray-300 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    />

                  </div>


                  {/* PASSWORD */}

                  <div className="relative">

                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                      className="w-full bg-white/10 border border-white/25 text-white placeholder-gray-300 rounded-xl py-4 pl-12 pr-12 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    />


                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                    >

                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}

                    </button>

                  </div>


                  {/* ERROR */}

                  {error && (

                    <p className="text-red-400 text-sm">
                      {error}
                    </p>

                  )}


                  {/* LOGIN BUTTON */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition"
                  >

                    {loading
                      ? "Logging in..."
                      : "Login"}

                  </button>

                </form>


                {/* REGISTER */}

                <p className="text-center text-sm text-gray-300 mt-7">

                  Don't have an account?{" "}

                  <button
                    onClick={onRegister}
                    className="text-green-400 font-semibold hover:text-green-300"
                  >
                    Register
                  </button>

                </p>

              </div>

            </div>

          </div>

        </main>


        {/* FOOTER */}

        <div className="text-center pb-6">

          <p className="text-gray-200 text-sm">
            © 2026 FarmTech. All rights reserved.
          </p>

        </div>

      </div>

    </div>
  )
}

export default Login