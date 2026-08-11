"use client"

import { useEffect, useMemo, useState } from "react"

interface ServiceItem {
  name: string
  price: number
  type: "product" | "service"
  description: string
}

interface Order {
  id: string
  name: string
  phone: string
  address: string
  paymentMethod: string
  items: ServiceItem[]
  total: number
  status: string
  date: string
}

type FilterType = "all" | "active" | "completed"

export default function ServicesPage() {
  const [order, setOrder] = useState<Order | null>(null)
  const [filter, setFilter] = useState<FilterType>("active")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem("mi-pass-last-order")

      if (savedOrder) {
        setOrder(JSON.parse(savedOrder))
      }
    } catch (error) {
      console.error("Unable to load order:", error)
    }

    setLoaded(true)
  }, [])

  const orderDate = useMemo(() => {
    if (!order?.date) return ""

    try {
      return new Date(order.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    } catch {
      return order.date
    }
  }, [order])

  const activeItems =
    order?.items.filter(
      (item) => item.type === "service"
    ) || []

  const purchasedProducts =
    order?.items.filter(
      (item) => item.type === "product"
    ) || []

  const completedItems: ServiceItem[] = []

  const displayedItems =
    filter === "active"
      ? activeItems
      : filter === "completed"
        ? completedItems
        : order?.items || []

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
        Loading My Services...
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
      {/* ================= HEADER ================= */}

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
        {/* LOGO */}

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

        {/* NAVIGATION */}

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
            href="/products"
            style={{
              color: "#101d4b",
              textDecoration: "none",
            }}
          >
            Products
          </a>

          <a
            href="/services"
            style={{
              color: "#5b24e8",
              textDecoration: "none",
            }}
          >
            My Services
          </a>

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

      {/* ================= HERO ================= */}

      <section
        style={{
          padding: "75px 7vw 55px",
          background:
            "linear-gradient(135deg, #ffffff 0%, #faf7ff 55%, #fff7fc 100%)",
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
            MY SERVICES
          </p>

          <h1
            style={{
              color: "#101d4b",
              fontSize: "clamp(40px, 6vw, 64px)",
              lineHeight: 1.05,
              margin: "0 0 18px",
              fontWeight: 800,
            }}
          >
            Your services,
            <br />
            all in one place.
          </h1>

          <p
            style={{
              color: "#687087",
              fontSize: "17px",
              lineHeight: 1.7,
              maxWidth: "700px",
              margin: 0,
            }}
          >
            View the products and services you have purchased
            or booked through MI PASS.
          </p>
        </div>
      </section>

      {/* ================= MAIN ================= */}

      <section
        style={{
          padding: "55px 7vw 100px",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
          }}
        >
          {/* ================= NO ORDER ================= */}

          {!order && (
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e4e5ec",
                borderRadius: "24px",
                padding: "65px 30px",
                textAlign: "center",
                boxShadow:
                  "0 10px 30px rgba(35,25,80,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "65px",
                  marginBottom: "20px",
                }}
              >
                📋
              </div>

              <h2
                style={{
                  color: "#101d4b",
                  margin: "0 0 12px",
                  fontSize: "30px",
                }}
              >
                No services yet
              </h2>

              <p
                style={{
                  color: "#687087",
                  fontSize: "16px",
                  lineHeight: 1.6,
                  maxWidth: "550px",
                  margin: "0 auto 25px",
                }}
              >
                You haven't purchased or booked anything yet.
                Explore Products to find products and services
                available in HL City.
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
                Explore Products →
              </a>
            </div>
          )}

          {/* ================= ORDER EXISTS ================= */}

          {order && (
            <>
              {/* SUMMARY CARDS */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "18px",
                  marginBottom: "35px",
                }}
              >
                {/* ACTIVE */}

                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "18px",
                    padding: "25px",
                    border: "1px solid #e4e5ec",
                    boxShadow:
                      "0 8px 25px rgba(35,25,80,0.05)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#687087",
                      marginBottom: "8px",
                    }}
                  >
                    Active Services
                  </div>

                  <strong
                    style={{
                      color: "#5b24e8",
                      fontSize: "32px",
                    }}
                  >
                    {activeItems.length}
                  </strong>
                </div>

                {/* PRODUCTS */}

                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "18px",
                    padding: "25px",
                    border: "1px solid #e4e5ec",
                    boxShadow:
                      "0 8px 25px rgba(35,25,80,0.05)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#687087",
                      marginBottom: "8px",
                    }}
                  >
                    Purchased Products
                  </div>

                  <strong
                    style={{
                      color: "#18864b",
                      fontSize: "32px",
                    }}
                  >
                    {purchasedProducts.length}
                  </strong>
                </div>

                {/* TOTAL */}

                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "18px",
                    padding: "25px",
                    border: "1px solid #e4e5ec",
                    boxShadow:
                      "0 8px 25px rgba(35,25,80,0.05)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#687087",
                      marginBottom: "8px",
                    }}
                  >
                    Order Total
                  </div>

                  <strong
                    style={{
                      color: "#101d4b",
                      fontSize: "32px",
                    }}
                  >
                    ₹{order.total}
                  </strong>
                </div>

                {/* STATUS */}

                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "18px",
                    padding: "25px",
                    border: "1px solid #e4e5ec",
                    boxShadow:
                      "0 8px 25px rgba(35,25,80,0.05)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#687087",
                      marginBottom: "8px",
                    }}
                  >
                    Order Status
                  </div>

                  <strong
                    style={{
                      color: "#18864b",
                      fontSize: "20px",
                    }}
                  >
                    {order.status}
                  </strong>
                </div>
              </div>

              {/* ================= ORDER INFO ================= */}

              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e4e5ec",
                  borderRadius: "22px",
                  padding: "28px",
                  marginBottom: "30px",
                  boxShadow:
                    "0 8px 25px rgba(35,25,80,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#687087",
                        margin: "0 0 6px",
                        fontSize: "13px",
                      }}
                    >
                      ORDER ID
                    </p>

                    <strong
                      style={{
                        color: "#101d4b",
                        fontSize: "18px",
                      }}
                    >
                      {order.id}
                    </strong>
                  </div>

                  <div>
                    <p
                      style={{
                        color: "#687087",
                        margin: "0 0 6px",
                        fontSize: "13px",
                      }}
                    >
                      ORDER DATE
                    </p>

                    <strong
                      style={{
                        color: "#101d4b",
                        fontSize: "16px",
                      }}
                    >
                      {orderDate}
                    </strong>
                  </div>

                  <div>
                    <p
                      style={{
                        color: "#687087",
                        margin: "0 0 6px",
                        fontSize: "13px",
                      }}
                    >
                      PAYMENT
                    </p>

                    <strong
                      style={{
                        color: "#101d4b",
                        fontSize: "16px",
                      }}
                    >
                      {order.paymentMethod}
                    </strong>
                  </div>
                </div>
              </div>

              {/* ================= FILTERS ================= */}

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "25px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  onClick={() => setFilter("active")}
                  style={{
                    border: "none",
                    padding: "11px 18px",
                    borderRadius: "10px",
                    fontWeight: 800,
                    cursor: "pointer",
                    background:
                      filter === "active"
                        ? "#5b24e8"
                        : "#ffffff",
                    color:
                      filter === "active"
                        ? "#ffffff"
                        : "#101d4b",
                    boxShadow:
                      "0 5px 15px rgba(35,25,80,0.06)",
                  }}
                >
                  Active
                </button>

                <button
                  type="button"
                  onClick={() => setFilter("completed")}
                  style={{
                    border: "none",
                    padding: "11px 18px",
                    borderRadius: "10px",
                    fontWeight: 800,
                    cursor: "pointer",
                    background:
                      filter === "completed"
                        ? "#5b24e8"
                        : "#ffffff",
                    color:
                      filter === "completed"
                        ? "#ffffff"
                        : "#101d4b",
                    boxShadow:
                      "0 5px 15px rgba(35,25,80,0.06)",
                  }}
                >
                  Completed
                </button>

                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  style={{
                    border: "none",
                    padding: "11px 18px",
                    borderRadius: "10px",
                    fontWeight: 800,
                    cursor: "pointer",
                    background:
                      filter === "all"
                        ? "#5b24e8"
                        : "#ffffff",
                    color:
                      filter === "all"
                        ? "#ffffff"
                        : "#101d4b",
                    boxShadow:
                      "0 5px 15px rgba(35,25,80,0.06)",
                  }}
                >
                  All Items
                </button>
              </div>

              {/* ================= ITEMS ================= */}

              {displayedItems.length === 0 ? (
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e4e5ec",
                    borderRadius: "20px",
                    padding: "45px 25px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "45px",
                      marginBottom: "12px",
                    }}
                  >
                    📭
                  </div>

                  <h3
                    style={{
                      color: "#101d4b",
                      margin: "0 0 8px",
                    }}
                  >
                    No items in this section
                  </h3>

                  <p
                    style={{
                      color: "#687087",
                      margin: 0,
                    }}
                  >
                    Your {filter} services will appear here.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "22px",
                  }}
                >
                  {displayedItems.map((item, index) => (
                    <article
                      key={`${item.name}-${index}`}
                      style={{
                        background: "#ffffff",
                        border: "1px solid #e4e5ec",
                        borderRadius: "20px",
                        padding: "25px",
                        boxShadow:
                          "0 8px 25px rgba(35,25,80,0.05)",
                      }}
                    >
                      {/* TYPE */}

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "18px",
                        }}
                      >
                        <span
                          style={{
                            background:
                              item.type === "service"
                                ? "#eee8ff"
                                : "#e8f8ee",
                            color:
                              item.type === "service"
                                ? "#5b24e8"
                                : "#18864b",
                            padding: "6px 10px",
                            borderRadius: "20px",
                            fontSize: "11px",
                            fontWeight: 800,
                          }}
                        >
                          {item.type === "service"
                            ? "SERVICE"
                            : "PRODUCT"}
                        </span>

                        <span
                          style={{
                            background: "#e8f8ee",
                            color: "#18864b",
                            padding: "6px 10px",
                            borderRadius: "20px",
                            fontSize: "11px",
                            fontWeight: 800,
                          }}
                        >
                          CONFIRMED
                        </span>
                      </div>

                      {/* NAME */}

                      <h2
                        style={{
                          color: "#101d4b",
                          margin: "0 0 10px",
                          fontSize: "22px",
                        }}
                      >
                        {item.name}
                      </h2>

                      {/* DESCRIPTION */}

                      <p
                        style={{
                          color: "#687087",
                          lineHeight: 1.6,
                          minHeight: "50px",
                          margin: "0 0 20px",
                        }}
                      >
                        {item.description}
                      </p>

                      {/* PRICE */}

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingTop: "15px",
                          borderTop:
                            "1px solid #eeeeee",
                        }}
                      >
                        <span
                          style={{
                            color: "#687087",
                            fontSize: "14px",
                          }}
                        >
                          Amount
                        </span>

                        <strong
                          style={{
                            color: "#101d4b",
                            fontSize: "21px",
                          }}
                        >
                          ₹{item.price}
                        </strong>
                      </div>

                      {/* DETAILS BUTTON */}

                      <button
                        type="button"
                        onClick={() =>
                          alert(
                            `${item.name}\n\nStatus: Confirmed\nAmount: ₹${item.price}`
                          )
                        }
                        style={{
                          width: "100%",
                          marginTop: "18px",
                          border: "1px solid #e4e5ec",
                          background: "#ffffff",
                          color: "#101d4b",
                          padding: "12px",
                          borderRadius: "10px",
                          fontWeight: 800,
                          cursor: "pointer",
                        }}
                      >
                        View Details
                      </button>
                    </article>
                  ))}
                </div>
              )}

              {/* ================= PURCHASED PRODUCTS ================= */}

              {purchasedProducts.length > 0 && (
                <div
                  style={{
                    marginTop: "40px",
                    background: "#ffffff",
                    border: "1px solid #e4e5ec",
                    borderRadius: "22px",
                    padding: "28px",
                  }}
                >
                  <h2
                    style={{
                      color: "#101d4b",
                      margin: "0 0 8px",
                    }}
                  >
                    Purchased Products
                  </h2>

                  <p
                    style={{
                      color: "#687087",
                      marginBottom: "25px",
                    }}
                  >
                    Products purchased through MI PASS.
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gap: "12px",
                    }}
                  >
                    {purchasedProducts.map(
                      (product, index) => (
                        <div
                          key={`${product.name}-${index}`}
                          style={{
                            display: "flex",
                            justifyContent:
                              "space-between",
                            alignItems: "center",
                            padding: "15px",
                            background: "#f8f9fc",
                            borderRadius: "12px",
                            gap: "15px",
                          }}
                        >
                          <div>
                            <strong
                              style={{
                                color: "#101d4b",
                              }}
                            >
                              {product.name}
                            </strong>

                            <div
                              style={{
                                color: "#687087",
                                fontSize: "13px",
                                marginTop: "4px",
                              }}
                            >
                              Purchased
                            </div>
                          </div>

                          <strong
                            style={{
                              color: "#18864b",
                            }}
                          >
                            ₹{product.price}
                          </strong>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* ================= BOTTOM ACTION ================= */}

              <div
                style={{
                  marginTop: "40px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="/products"
                  style={{
                    background:
                      "linear-gradient(90deg, #5b24e8, #c21c9a)",
                    color: "#ffffff",
                    padding: "14px 25px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: 800,
                  }}
                >
                  Explore More Products →
                </a>

                <a
                  href="/"
                  style={{
                    background: "#101d4b",
                    color: "#ffffff",
                    padding: "14px 25px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: 800,
                  }}
                >
                  Back to Home
                </a>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}