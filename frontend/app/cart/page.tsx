"use client"

import { useEffect, useState } from "react"

interface CartItem {
  name: string
  price: number
  type: "product" | "service"
  description: string
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)

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

  const removeItem = (index: number) => {
    const updatedCart = cart.filter(
      (_, itemIndex) => itemIndex !== index
    )

    setCart(updatedCart)
    localStorage.setItem("mi-pass-cart", JSON.stringify(updatedCart))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("mi-pass-cart")
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  )

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
        Loading cart...
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

      {/* PAGE */}
      <section
        style={{
          padding: "70px 7vw 100px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {/* TITLE */}
          <div style={{ marginBottom: "40px" }}>
            <p
              style={{
                color: "#5b24e8",
                fontWeight: 800,
                letterSpacing: "1.5px",
                marginBottom: "10px",
              }}
            >
              YOUR CART
            </p>

            <h1
              style={{
                fontSize: "clamp(40px, 6vw, 64px)",
                lineHeight: 1.05,
                color: "#101d4b",
                margin: "0 0 15px",
                fontWeight: 800,
              }}
            >
              Your selected items
            </h1>

            <p
              style={{
                color: "#687087",
                fontSize: "17px",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Review your products and services before checkout.
            </p>
          </div>

          {/* EMPTY CART */}
          {cart.length === 0 && (
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e4e5ec",
                borderRadius: "22px",
                padding: "60px 30px",
                textAlign: "center",
                boxShadow:
                  "0 10px 30px rgba(35, 25, 80, 0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "60px",
                  marginBottom: "20px",
                }}
              >
                🛒
              </div>

              <h2
                style={{
                  color: "#101d4b",
                  margin: "0 0 12px",
                  fontSize: "30px",
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
                Add products or book services from Products.
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
                Browse Products
              </a>
            </div>
          )}

          {/* CART WITH ITEMS */}
          {cart.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(0, 1fr) 340px",
                gap: "30px",
                alignItems: "start",
              }}
            >
              {/* ITEMS */}
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e4e5ec",
                  borderRadius: "22px",
                  padding: "28px",
                  boxShadow:
                    "0 10px 30px rgba(35, 25, 80, 0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h2
                    style={{
                      color: "#101d4b",
                      margin: 0,
                    }}
                  >
                    Cart Items
                  </h2>

                  <button
                    type="button"
                    onClick={clearCart}
                    style={{
                      border: "none",
                      background: "#ffecec",
                      color: "#d22",
                      padding: "9px 14px",
                      borderRadius: "9px",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Clear Cart
                  </button>
                </div>

                {cart.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    style={{
                      padding: "20px 0",
                      borderBottom:
                        index === cart.length - 1
                          ? "none"
                          : "1px solid #eeeeee",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "inline-block",
                            background:
                              item.type === "service"
                                ? "#eee8ff"
                                : "#e8f8ee",
                            color:
                              item.type === "service"
                                ? "#5b24e8"
                                : "#18864b",
                            padding: "5px 9px",
                            borderRadius: "15px",
                            fontSize: "11px",
                            fontWeight: 800,
                            marginBottom: "8px",
                          }}
                        >
                          {item.type === "service"
                            ? "SERVICE"
                            : "PRODUCT"}
                        </div>

                        <h3
                          style={{
                            color: "#101d4b",
                            margin: "0 0 7px",
                            fontSize: "21px",
                          }}
                        >
                          {item.name}
                        </h3>

                        <p
                          style={{
                            color: "#687087",
                            margin: 0,
                            lineHeight: 1.5,
                          }}
                        >
                          {item.description}
                        </p>
                      </div>

                      <div
                        style={{
                          textAlign: "right",
                          minWidth: "100px",
                        }}
                      >
                        <strong
                          style={{
                            color: "#101d4b",
                            fontSize: "20px",
                          }}
                        >
                          ₹{item.price}
                        </strong>

                        <br />

                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          style={{
                            marginTop: "10px",
                            border: "none",
                            background: "transparent",
                            color: "#d22",
                            cursor: "pointer",
                            fontWeight: 700,
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* SUMMARY */}
              <aside
                style={{
                  background: "#ffffff",
                  border: "1px solid #e4e5ec",
                  borderRadius: "22px",
                  padding: "28px",
                  boxShadow:
                    "0 10px 30px rgba(35, 25, 80, 0.06)",
                  position: "sticky",
                  top: "100px",
                }}
              >
                <h2
                  style={{
                    color: "#101d4b",
                    margin: "0 0 25px",
                  }}
                >
                  Order Summary
                </h2>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#687087",
                    marginBottom: "15px",
                  }}
                >
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#687087",
                    marginBottom: "15px",
                  }}
                >
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#687087",
                    marginBottom: "20px",
                  }}
                >
                  <span>Delivery / Booking</span>
                  <span>Calculated later</span>
                </div>

                <div
                  style={{
                    borderTop: "1px solid #eeeeee",
                    paddingTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong
                    style={{
                      color: "#101d4b",
                      fontSize: "18px",
                    }}
                  >
                    Total
                  </strong>

                  <strong
                    style={{
                      color: "#5b24e8",
                      fontSize: "25px",
                    }}
                  >
                    ₹{total}
                  </strong>
                </div>

                <a
                  href="/checkout"
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: "25px",
                    background:
                      "linear-gradient(90deg, #5b24e8, #c21c9a)",
                    color: "#ffffff",
                    padding: "15px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: 800,
                  }}
                >
                  Proceed to Checkout
                </a>

                <a
                  href="/products"
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: "12px",
                    color: "#101d4b",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: 700,
                    border: "1px solid #e4e5ec",
                  }}
                >
                  Continue Shopping
                </a>
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}