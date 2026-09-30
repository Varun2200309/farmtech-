document.addEventListener("DOMContentLoaded", () => {
  const AUTH_API = "http://localhost:5000/api/auth";
  const BOOKINGS_API = "http://localhost:5000/api/bookings/my";
  const CREATE_BOOKING_API = "http://localhost:5000/api/bookings";

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const authMsg = document.getElementById("auth-msg");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginLink = document.getElementById("loginLink");
  const profileLink = document.getElementById("profileLink");
  const profileDropdown = document.getElementById("profileDropdown");
  const bookNowBtn = document.getElementById("book-now");
  const bookingSection = document.getElementById("my-bookings");
  const bookingList = document.getElementById("booking-list");
  const loginBox = document.getElementById("loginBox");
  const registerBox = document.getElementById("registerBox");
  const toRegister = document.getElementById("toRegister");
  const toLogin = document.getElementById("toLogin");

  let cart = [];

  const enableCartButtons = () =>
    document.querySelectorAll(".add-btn").forEach(b => b.disabled = false);

  const disableCartButtons = () =>
    document.querySelectorAll(".add-btn").forEach(b => b.disabled = true);

  const showMsg = (msg, color = "green") => {
    authMsg.innerText = msg;
    authMsg.style.color = color;
  };

  function displayCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    cart.forEach(item => {
      cartItems.innerHTML += `
        <div class="cart-item">
          <strong>${item.name}</strong>
          <button class="quantity-btn minus-btn" data-name="${item.name}">−</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn plus-btn" data-name="${item.name}">+</button>
          <span>₹${(item.price * item.quantity).toLocaleString("en-IN")}</span>
        </div>
      `;
    });

    setupQuantityButtons();
  }

  function setupQuantityButtons() {
    document.querySelectorAll(".plus-btn").forEach(button => {
      button.onclick = () => {
        const item = cart.find(i => i.name === button.dataset.name);
        if (item) item.quantity++;
        updateCart();
      };
    });

    document.querySelectorAll(".minus-btn").forEach(button => {
      button.onclick = () => {
        const item = cart.find(i => i.name === button.dataset.name);

        if (item) {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            cart = cart.filter(i => i.name !== button.dataset.name);
          }
        }

        updateCart();
      };
    });
  }

  function updateCart() {
    displayCart();

    const total = cart.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    document.getElementById("cart-total").innerText =
      "Total: ₹" + total.toLocaleString("en-IN");

    bookNowBtn.disabled = cart.length === 0;
  }

  function loadProfile() {
    document.getElementById("profile-username").innerText =
      localStorage.getItem("username") || "";

    document.getElementById("profile-email").innerText =
      localStorage.getItem("email") || "";
  }

  // INITIAL STATE
  if (localStorage.getItem("token")) {
    logoutBtn.style.display = "inline";
    if (loginLink) loginLink.style.display = "none";
   if (profileDropdown) profileDropdown.style.display = "inline-block";
    enableCartButtons();
    loadProfile();
    document.getElementById("profile").style.display = "block";
    loadMyBookings();
  } else {
    disableCartButtons();
    if (profileLink) profileLink.style.display = "none";
  }

  // LOGIN
  loginForm.onsubmit = async e => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    try {
      const res = await fetch(AUTH_API + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        showMsg(data.message || "Login failed", "red");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);

      showMsg("Welcome " + data.username + " 🌱");

      loginForm.reset();
      logoutBtn.style.display = "inline";
      if (loginLink) loginLink.style.display = "none";
     if (profileDropdown) profileDropdown.style.display = "inline-block";

      enableCartButtons();
      loadMyBookings();
      loadProfile();
      document.getElementById("profile").style.display = "block";

    } catch (err) {
      console.error(err);
      showMsg("Server error", "red");
    }
  };

  // REGISTER
  registerForm.onsubmit = async e => {
    e.preventDefault();

    const username = document.getElementById("regUsername").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const confirmPassword = document.getElementById("regConfirm").value.trim();

    if (password !== confirmPassword) {
      showMsg("Passwords do not match", "red");
      return;
    }

    try {
      const res = await fetch(AUTH_API + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        showMsg(data.message || "Registration failed", "red");
        return;
      }

      showMsg(data.message || "Registration successful 🌾");
      registerForm.reset();

    } catch (err) {
      console.error(err);
      showMsg("Server error", "red");
    }
  };

  // LOGIN / REGISTER SWITCH
  toRegister.onclick = e => {
    e.preventDefault();
    loginBox.style.display = "none";
    registerBox.style.display = "block";
  };

  toLogin.onclick = e => {
    e.preventDefault();
    registerBox.style.display = "none";
    loginBox.style.display = "block";
  };

  // LOGOUT
  logoutBtn.onclick = () => {
    localStorage.clear();
    location.reload();
  };

  // ADD TO CART
  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.onclick = () => {
      const item = btn.parentElement;
      const name = item.querySelector("h3").innerText;

      const price = parseInt(
        item.querySelector(".price").innerText
          .replace("₹", "")
          .replace(",", "")
      );

      const existingItem = cart.find(i => i.name === name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({
          name: name,
          price: price,
          quantity: 1
        });
      }

      updateCart();
    };
  });

  // BOOK NOW
  bookNowBtn.onclick = async () => {
    const token = localStorage.getItem("token");

    const total = cart.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    console.log("CART BEFORE BOOKING:", cart);

    try {
      const res = await fetch(CREATE_BOOKING_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          items: cart,
          totalAmount: total
        })
      });

      const data = await res.json();

      if (!res.ok) {
        showMsg(data.message || "Booking failed", "red");
        return;
      }

      showMsg(data.message);

      cart = [];
      updateCart();
      loadMyBookings();

    } catch (err) {
      console.error(err);
      showMsg("Server error while booking", "red");
    }
  };

  // MY BOOKINGS
  async function loadMyBookings() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(BOOKINGS_API, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      const bookings = await res.json();

      // BOOKING SUMMARY
      const totalBookings = bookings.length;
      const cancelledBookings = bookings.filter(
        b => b.status === "Cancelled"
      ).length;
      const activeBookings = totalBookings - cancelledBookings;

      const totalSpent = bookings.reduce(
        (sum, b) => sum + b.totalAmount,
        0
      );

      document.getElementById("total-bookings").innerText = totalBookings;
      document.getElementById("active-bookings").innerText = activeBookings;
      document.getElementById("cancelled-bookings").innerText = cancelledBookings;
      document.getElementById("total-spent").innerText =
        totalSpent.toLocaleString("en-IN");

      // PROFILE BOOKING HISTORY
      const profileHistory =
        document.getElementById("profile-booking-history");

      if (profileHistory) {
        profileHistory.innerHTML = "";

        bookings.forEach(b => {
          profileHistory.innerHTML += `
            <div>
              <strong>${new Date(b.bookedAt).toLocaleString()}</strong>
              <ul>
                ${b.items.map(i => `
                  <li>
                    ${i.name} × ${i.quantity || 1} -
                    ₹${(i.price * (i.quantity || 1)).toLocaleString("en-IN")}
                  </li>
                `).join("")}
              </ul>
              <p>Total: ₹${b.totalAmount.toLocaleString("en-IN")}</p>
              <p>Status: <strong>${b.status}</strong></p>
            </div>
          `;
        });
      }

      // MY BOOKINGS
      bookingList.innerHTML = "";
      bookingSection.style.display = "block";

      bookings.forEach(b => {
        bookingList.innerHTML += `
          <div class="booking-item">
            <strong>${new Date(b.bookedAt).toLocaleString()}</strong>
            <ul>
              ${b.items.map(i => `
                <li>
                  ${i.name} × ${i.quantity || 1} -
                  ₹${i.price.toLocaleString("en-IN")} each
                </li>
              `).join("")}
            </ul>
            <p>Total: ₹${b.totalAmount.toLocaleString("en-IN")}</p>
            <p>Status: <strong>${b.status}</strong></p>
            ${
              b.status !== "Cancelled"
                ? `<button class="cancel-booking-btn" data-id="${b._id}">
                     Cancel Booking
                   </button>`
                : ""
            }
          </div>
        `;
      });

      // CANCEL BOOKING
      document.querySelectorAll(".cancel-booking-btn").forEach(button => {
        button.onclick = async () => {
          const bookingId = button.dataset.id;
          const token = localStorage.getItem("token");

          try {
            const res = await fetch(
              `http://localhost:5000/api/bookings/${bookingId}/cancel`,
              {
                method: "PATCH",
                headers: {
                  Authorization: "Bearer " + token
                }
              }
            );

            const data = await res.json();

            if (!res.ok) {
              showMsg(data.message || "Cancellation failed", "red");
              return;
            }

            showMsg(
              data.message || "Booking cancelled successfully ❌"
            );

            loadMyBookings();

          } catch (err) {
            console.error(err);
            showMsg("Server error while cancelling booking", "red");
          }
        };
      });

    } catch (err) {
      console.error(err);
      showMsg("Failed to load bookings", "red");
    }
  }

});