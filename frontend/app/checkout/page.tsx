"use client"

import { useEffect, useState } from "react"

interface CartItem {
  name: string
  price: number
  type: "product" | "service"
  description: string
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("UPI")

  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("mi-pass-cart")

      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Unable to load cart:", error)
    }

    setLoaded(true)
  }, [])

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  )

  const handlePlaceOrder = () => {
    if (!name.trim()) {
      alert("Please enter your name.")
      return
    }

    if (!phone.trim()) {
      alert("Please enter your phone number.")
      return
    }

    if (!address.trim()) {
      alert("Please enter your address.")
      return
    }

    if (cart.length === 0) {
      alert("Your cart is empty.")
      return
    }

    const order = {
      id: "ORD-" + Date.now(),
      name,
      phone,
      address,
      paymentMethod,
      items: cart,
      total,
      status: "Confirmed",
      date: new Date().toISOString(),
    }

    localStorage.setItem(
      "mi-pass-last-order",
      JSON.stringify(order)
    )

    localStorage.removeItem("mi-pass-cart")

    setOrderPlaced(true)
  }

  if (!loaded) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8f9fc",
          color: "#101d4b",
          fontSize: "20px",
          fontWeight: 700,
        }}
      >
        Loading checkout...
      </main>
    )
  }

  if (orderPlaced) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f8f9fc",
          padding: "80px 7vw",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: "25px",
            padding: "50px 35px",
            textAlign: "center",
            border: "1px solid #e4e5ec",
            boxShadow:
              "0 15px 40px rgba(35, 25, 80, 0.08)",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "#e8f8ee",
              color: "#18864b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              margin: "0 auto 25px",
            }}
          >
            ✓
          </div>

          <h1
            style={{
              color: "#101d4b",
              fontSize: "40px",
              margin: "0 0 15px",
            }}
          >
            Order Confirmed
          </h1>

          <p
            style={{
              color: "#687087",
              fontSize: "17px",
              lineHeight: 1.7,
            }}
          >
            Your order/service booking has been successfully
            created.
          </p>

          <p
            style={{
              color: "#687087",
              marginBottom: "30px",
            }}
          >
            Your selected services and orders can now be
            connected to your user dashboard.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/services"
              style={{
                background:
                  "linear-gradient(90deg, #5b24e8, #c21c9a)",
                color: "#ffffff",
                padding: "14px 22px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              My Services
            </a>

            <a
              href="/products"
              style={{
                background: "#101d4b",
                color: "#ffffff",
                padding: "14px 22px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8f9fc",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          padding: "16px 6vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#ffffff",
          borderBottom: "1px solid #eeeeee",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <a
          href="/"
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: "#101d4b",
            textDecoration: "none",
          }}
        >
          ← MI PASS
        </a>

        <nav
          style={{
            display: "flex",
            gap: "28px",
            alignItems: "center",
            fontWeight: 700,
            flexWrap: "wrap",
          }}
        >
          <a
            href="/society"
            style={{
              color: "#101d4b",
              textDecoration: "none",
            }}
          >
            My Society
          </a>

          <a
            href="/services"
            style={{
              color: "#101d4b",
              textDecoration: "none",
            }}
          >
            My Services
          </a>

          <a
            href="/products"
            style={{
              color: "#101d4b",
              textDecoration: "none",
            }}
          >
            Products
          </a>

          <a
            href="/life"
            style={{
              color: "#101d4b",
              textDecoration: "none",
            }}
          >
            My Life
          </a>

          <a
            href="/login"
            style={{
              background: "#101d4b",
              color: "#ffffff",
              padding: "12px 22px",
              borderRadius: "12px",
              textDecoration: "none",
            }}
          >
            Login
          </a>
        </nav>
      </header>

      {/* CHECKOUT */}
      <section
        style={{
          padding: "65px 7vw 100px",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              color: "#5b24e8",
              fontWeight: 800,
              letterSpacing: "1.5px",
              marginBottom: "10px",
            }}
          >
            CHECKOUT
          </p>

          <h1
            style={{
              color: "#101d4b",
              fontSize: "clamp(40px, 6vw, 62px)",
              margin: "0 0 15px",
              fontWeight: 800,
            }}
          >
            Complete your order
          </h1>

          <p
            style={{
              color: "#687087",
              fontSize: "17px",
              lineHeight: 1.7,
              marginBottom: "40px",
            }}
          >
            Enter your details and select your preferred
            payment method.
          </p>

          {cart.length === 0 ? (
            <div
              style={{
                background: "#ffffff",
                borderRadius: "22px",
                padding: "50px 30px",
                textAlign: "center",
                border: "1px solid #e4e5ec",
              }}
            >
              <div
                style={{
                  fontSize: "55px",
                  marginBottom: "15px",
                }}
              >
                🛒
              </div>

              <h2
                style={{
                  color: "#101d4b",
                  marginBottom: "10px",
                }}
              >
                Your cart is empty
              </h2>

              <p
                style={{
                  color: "#687087",
                  marginBottom: "25px",
                }}
              >
                Please add a product or service first.
              </p>

              <a
                href="/products"
                style={{
                  display: "inline-block",
                  background:
                    "linear-gradient(90deg, #5b24e8, #c21c9a)",
                  color: "#ffffff",
                  padding: "14px 25px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: 800,
                }}
              >
                Go to Products
              </a>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(0, 1fr) 360px",
                gap: "30px",
                alignItems: "start",
              }}
            >
              {/* CUSTOMER DETAILS */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "22px",
                  padding: "30px",
                  border: "1px solid #e4e5ec",
                  boxShadow:
                    "0 10px 30px rgba(35, 25, 80, 0.06)",
                }}
              >
                <h2
                  style={{
                    color: "#101d4b",
                    marginTop: 0,
                    marginBottom: "25px",
                  }}
                >
                  Customer Details
                </h2>

                <label
                  style={{
                    display: "block",
                    color: "#101d4b",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your full name"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "1px solid #dcdde5",
                    marginBottom: "20px",
                    fontSize: "15px",
                    outline: "none",
                  }}
                />

                <label
                  style={{
                    display: "block",
                    color: "#101d4b",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="Enter your phone number"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "1px solid #dcdde5",
                    marginBottom: "20px",
                    fontSize: "15px",
                    outline: "none",
                  }}
                />

                <label
                  style={{
                    display: "block",
                    color: "#101d4b",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  Address
                </label>

                <textarea
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  placeholder="Enter your address"
                  rows={5}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "1px solid #dcdde5",
                    marginBottom: "25px",
                    fontSize: "15px",
                    resize: "vertical",
                    outline: "none",
                  }}
                />

                <h2
                  style={{
                    color: "#101d4b",
                    marginBottom: "20px",
                  }}
                >
                  Payment Method
                </h2>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "15px",
                    border: "1px solid #e4e5ec",
                    borderRadius: "12px",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <span>
                    <strong>UPI</strong>
                    <br />
                    <small style={{ color: "#687087" }}>
                      Google Pay, PhonePe, Paytm etc.
                    </small>
                  </span>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "15px",
                    border: "1px solid #e4e5ec",
                    borderRadius: "12px",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={paymentMethod === "Card"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <span>
                    <strong>Debit / Credit Card</strong>
                    <br />
                    <small style={{ color: "#687087" }}>
                      Secure card payment.
                    </small>
                  </span>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "15px",
                    border: "1px solid #e4e5ec",
                    borderRadius: "12px",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Cash"
                    checked={paymentMethod === "Cash"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <span>
                    <strong>Cash / Pay Later</strong>
                    <br />
                    <small style={{ color: "#687087" }}>
                      Available where supported.
                    </small>
                  </span>
                </label>
              </div>

              {/* ORDER SUMMARY */}
              <aside
                style={{
                  background: "#ffffff",
                  borderRadius: "22px",
                  padding: "28px",
                  border: "1px solid #e4e5ec",
                  boxShadow:
                    "0 10px 30px rgba(35, 25, 80, 0.06)",
                  position: "sticky",
                  top: "100px",
                }}
              >
                <h2
                  style={{
                    color: "#101d4b",
                    marginTop: 0,
                  }}
                >
                  Order Summary
                </h2>

                {cart.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "15px",
                      padding: "14px 0",
                      borderBottom:
                        "1px solid #eeeeee",
                    }}
                  >
                    <div>
                      <strong
                        style={{
                          color: "#101d4b",
                          fontSize: "15px",
                        }}
                      >
                        {item.name}
                      </strong>

                      <div
                        style={{
                          color: "#687087",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {item.type === "service"
                          ? "Service"
                          : "Product"}
                      </div>
                    </div>

                    <strong
                      style={{
                        color: "#101d4b",
                      }}
                    >
                      ₹{item.price}
                    </strong>
                  </div>
                ))}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    color: "#687087",
                  }}
                >
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "12px",
                    color: "#687087",
                  }}
                >
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>

                <div
                  style={{
                    borderTop: "1px solid #eeeeee",
                    marginTop: "20px",
                    paddingTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <strong
                    style={{
                      color: "#101d4b",
                      fontSize: "19px",
                    }}
                  >
                    Total
                  </strong>

                  <strong
                    style={{
                      color: "#5b24e8",
                      fontSize: "24px",
                    }}
                  >
                    ₹{total}
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  style={{
                    width: "100%",
                    marginTop: "25px",
                    border: "none",
                    background:
                      "linear-gradient(90deg, #5b24e8, #c21c9a)",
                    color: "#ffffff",
                    padding: "16px",
                    borderRadius: "12px",
                    fontWeight: 800,
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Confirm Order
                </button>

                <a
                  href="/cart"
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: "12px",
                    color: "#101d4b",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  ← Back to Cart
                </a>
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}