"use client"

import { useEffect, useState } from "react"

interface Product {
  name: string
  price: number
  type: "product" | "service"
  description: string
}

interface ProductCategory {
  name: string
  description: string
  icon: string
  products: Product[]
}

const productCategories: ProductCategory[] = [
  {
    name: "Food & Restaurants",
    description:
      "Discover restaurants, cafes, food delivery and dining options around Residential Community.",
    icon: "🍔",
    products: [
      {
        name: "Restaurants",
        price: 299,
        type: "service",
        description: "Book a table at your preferred restaurant.",
      },
      {
        name: "Cafes",
        price: 199,
        type: "service",
        description: "Explore cafes and reserve your table.",
      },
      {
        name: "Fast Food",
        price: 149,
        type: "product",
        description: "Order your favourite fast food.",
      },
      {
        name: "Food Delivery",
        price: 99,
        type: "service",
        description: "Get food delivered to your location.",
      },
      {
        name: "Bakery",
        price: 199,
        type: "product",
        description: "Fresh bakery products and cakes.",
      },
      {
        name: "Sweets & Desserts",
        price: 249,
        type: "product",
        description: "Order sweets and desserts.",
      },
      {
        name: "Catering",
        price: 999,
        type: "service",
        description: "Book catering for your event.",
      },
      {
        name: "Tiffin Service",
        price: 120,
        type: "service",
        description: "Daily home-style tiffin service.",
      },
    ],
  },

  {
    name: "Grocery & Shopping",
    description:
      "Find groceries, daily essentials, shopping and local stores in one place.",
    icon: "🛒",
    products: [
      {
        name: "Grocery Stores",
        price: 500,
        type: "product",
        description: "Buy groceries and household essentials.",
      },
      {
        name: "Supermarkets",
        price: 500,
        type: "product",
        description: "Shop from supermarkets.",
      },
      {
        name: "Daily Essentials",
        price: 199,
        type: "product",
        description: "Everyday household essentials.",
      },
      {
        name: "Fruits & Vegetables",
        price: 149,
        type: "product",
        description: "Fresh fruits and vegetables.",
      },
      {
        name: "Dairy Products",
        price: 99,
        type: "product",
        description: "Milk, curd, paneer and other dairy products.",
      },
      {
        name: "Clothing",
        price: 799,
        type: "product",
        description: "Shop clothing and fashion products.",
      },
      {
        name: "Electronics",
        price: 999,
        type: "product",
        description: "Electronic products and accessories.",
      },
      {
        name: "Local Shops",
        price: 299,
        type: "product",
        description: "Discover products from local shops.",
      },
    ],
  },

  {
    name: "Movies & Entertainment",
    description:
      "Explore movies, cinema, events and entertainment options.",
    icon: "🎬",
    products: [
      {
        name: "Movies",
        price: 199,
        type: "product",
        description: "Book your movie experience.",
      },
      {
        name: "Cinema",
        price: 249,
        type: "service",
        description: "Find nearby cinema options.",
      },
      {
        name: "Events",
        price: 299,
        type: "service",
        description: "Discover local events.",
      },
      {
        name: "Entertainment",
        price: 199,
        type: "service",
        description: "Entertainment activities and experiences.",
      },
      {
        name: "Gaming",
        price: 299,
        type: "service",
        description: "Gaming zones and activities.",
      },
      {
        name: "Kids Activities",
        price: 199,
        type: "service",
        description: "Activities and experiences for kids.",
      },
      {
        name: "Local Events",
        price: 149,
        type: "service",
        description: "Explore events happening nearby.",
      },
      {
        name: "Tickets & Booking",
        price: 99,
        type: "service",
        description: "Book tickets for available activities.",
      },
    ],
  },

  {
    name: "Hotels & Stays",
    description:
      "Find hotels, guest houses, accommodation and event venues.",
    icon: "🏨",
    products: [
      {
        name: "Hotels",
        price: 1499,
        type: "service",
        description: "Book a hotel room.",
      },
      {
        name: "Guest Houses",
        price: 999,
        type: "service",
        description: "Book a guest house.",
      },
      {
        name: "Short Stays",
        price: 799,
        type: "service",
        description: "Book accommodation for short stays.",
      },
      {
        name: "Accommodation",
        price: 1299,
        type: "service",
        description: "Find suitable accommodation.",
      },
      {
        name: "Resorts",
        price: 2499,
        type: "service",
        description: "Book a resort stay.",
      },
      {
        name: "Banquet Halls",
        price: 4999,
        type: "service",
        description: "Book a banquet hall.",
      },
      {
        name: "Party Venues",
        price: 2999,
        type: "service",
        description: "Find and book party venues.",
      },
      {
        name: "Conference Halls",
        price: 3999,
        type: "service",
        description: "Book conference facilities.",
      },
    ],
  },

  {
    name: "Health & Pharmacy",
    description:
      "Access pharmacies, clinics, healthcare, diagnostics and wellness options.",
    icon: "💊",
    products: [
      {
        name: "Pharmacy",
        price: 199,
        type: "product",
        description: "Purchase pharmacy products.",
      },
      {
        name: "Clinics",
        price: 499,
        type: "service",
        description: "Book a clinic appointment.",
      },
      {
        name: "Hospitals",
        price: 999,
        type: "service",
        description: "Find healthcare facilities.",
      },
      {
        name: "Diagnostic Labs",
        price: 499,
        type: "service",
        description: "Book diagnostic tests.",
      },
      {
        name: "Healthcare",
        price: 499,
        type: "service",
        description: "Healthcare services.",
      },
      {
        name: "Wellness",
        price: 299,
        type: "service",
        description: "Wellness services.",
      },
      {
        name: "Physiotherapy",
        price: 599,
        type: "service",
        description: "Book physiotherapy services.",
      },
      {
        name: "Home Healthcare",
        price: 799,
        type: "service",
        description: "Healthcare services at home.",
      },
    ],
  },

  {
    name: "Education",
    description:
      "Discover schools, coaching, training and learning opportunities.",
    icon: "🎓",
    products: [
      {
        name: "Schools",
        price: 999,
        type: "service",
        description: "Explore schools.",
      },
      {
        name: "Coaching",
        price: 999,
        type: "service",
        description: "Find coaching programs.",
      },
      {
        name: "Training Centers",
        price: 1499,
        type: "service",
        description: "Explore training centers.",
      },
      {
        name: "Learning Centers",
        price: 999,
        type: "service",
        description: "Learning and development programs.",
      },
      {
        name: "Computer Courses",
        price: 1499,
        type: "service",
        description: "Computer and IT courses.",
      },
      {
        name: "Tuition",
        price: 799,
        type: "service",
        description: "Find tuition services.",
      },
      {
        name: "Competitive Exam Preparation",
        price: 1999,
        type: "service",
        description: "Competitive exam preparation.",
      },
      {
        name: "Skill Development",
        price: 1499,
        type: "service",
        description: "Skill development courses.",
      },
    ],
  },

  {
    name: "Salon & Beauty",
    description:
      "Find salons, beauty, grooming and personal care options.",
    icon: "💇",
    products: [
      {
        name: "Salons",
        price: 399,
        type: "service",
        description: "Book a salon appointment.",
      },
      {
        name: "Beauty Parlours",
        price: 499,
        type: "service",
        description: "Book beauty services.",
      },
      {
        name: "Spa",
        price: 799,
        type: "service",
        description: "Book spa services.",
      },
      {
        name: "Haircut & Styling",
        price: 299,
        type: "service",
        description: "Haircut and styling services.",
      },
      {
        name: "Makeup",
        price: 999,
        type: "service",
        description: "Professional makeup services.",
      },
      {
        name: "Skin Care",
        price: 599,
        type: "service",
        description: "Skin care services.",
      },
      {
        name: "Personal Care",
        price: 399,
        type: "service",
        description: "Personal care services.",
      },
      {
        name: "Grooming",
        price: 399,
        type: "service",
        description: "Grooming services.",
      },
    ],
  },

  {
    name: "Fitness & Sports",
    description:
      "Explore gyms, fitness centers, yoga, swimming and sports facilities.",
    icon: "🏋️",
    products: [
      {
        name: "Gyms",
        price: 999,
        type: "service",
        description: "Find and join a gym.",
      },
      {
        name: "Fitness Centers",
        price: 999,
        type: "service",
        description: "Fitness center services.",
      },
      {
        name: "Yoga",
        price: 599,
        type: "service",
        description: "Yoga classes.",
      },
      {
        name: "Sports",
        price: 399,
        type: "service",
        description: "Sports activities.",
      },
      {
        name: "Swimming",
        price: 499,
        type: "service",
        description: "Swimming facilities.",
      },
      {
        name: "Zumba",
        price: 599,
        type: "service",
        description: "Zumba classes.",
      },
      {
        name: "Personal Training",
        price: 999,
        type: "service",
        description: "Personal fitness training.",
      },
      {
        name: "Sports Facilities",
        price: 399,
        type: "service",
        description: "Book sports facilities.",
      },
    ],
  },

  {
    name: "Travel & Transport",
    description:
      "Find transport, taxi, rental, travel and mobility options.",
    icon: "🚗",
    products: [
      {
        name: "Car Rental",
        price: 1499,
        type: "service",
        description: "Book a rental car.",
      },
      {
        name: "Taxi",
        price: 299,
        type: "service",
        description: "Book a taxi.",
      },
      {
        name: "Travel Booking",
        price: 499,
        type: "service",
        description: "Book your travel.",
      },
      {
        name: "Local Transport",
        price: 199,
        type: "service",
        description: "Local transportation.",
      },
      {
        name: "Airport Transfer",
        price: 799,
        type: "service",
        description: "Book airport transfer.",
      },
      {
        name: "Bus Booking",
        price: 499,
        type: "service",
        description: "Book a bus journey.",
      },
      {
        name: "Outstation Travel",
        price: 1499,
        type: "service",
        description: "Book outstation travel.",
      },
      {
        name: "Transport Services",
        price: 999,
        type: "service",
        description: "Transportation services.",
      },
    ],
  },

  {
    name: "Local Businesses",
    description:
      "Discover useful local businesses, dealers, vendors and professional services.",
    icon: "🛍️",
    products: [
      {
        name: "Local Stores",
        price: 299,
        type: "product",
        description: "Explore products from local stores.",
      },
      {
        name: "Business Directory",
        price: 0,
        type: "service",
        description: "Find local businesses.",
      },
      {
        name: "Nearby Shops",
        price: 299,
        type: "product",
        description: "Discover nearby shops.",
      },
      {
        name: "Service Providers",
        price: 499,
        type: "service",
        description: "Find verified service providers.",
      },
      {
        name: "Professional Services",
        price: 999,
        type: "service",
        description: "Professional services.",
      },
      {
        name: "Local Dealers",
        price: 499,
        type: "service",
        description: "Find local dealers.",
      },
      {
        name: "Local Vendors",
        price: 299,
        type: "product",
        description: "Explore local vendors.",
      },
      {
        name: "Other Businesses",
        price: 299,
        type: "service",
        description: "Discover other local businesses.",
      },
    ],
  },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(null)

  const [cart, setCart] = useState<Product[]>([])

  // Load cart
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("mi-pass-cart")

      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Could not load cart:", error)
    }
  }, [])

  // Save cart
  useEffect(() => {
    try {
      localStorage.setItem(
        "mi-pass-cart",
        JSON.stringify(cart)
      )
    } catch (error) {
      console.error("Could not save cart:", error)
    }
  }, [cart])

  // Add item
  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product]

    setCart(updatedCart)

    localStorage.setItem(
      "mi-pass-cart",
      JSON.stringify(updatedCart)
    )

    alert(`${product.name} added to cart.`)
  }

  // Remove item
  const removeFromCart = (index: number) => {
    const updatedCart = cart.filter(
      (_, itemIndex) => itemIndex !== index
    )

    setCart(updatedCart)

    localStorage.setItem(
      "mi-pass-cart",
      JSON.stringify(updatedCart)
    )
  }

  // Cart total
  const cartTotal = cart.reduce(
    (total, product) => total + product.price,
    0
  )

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#ffffff",
      }}
    >
      {/* =====================================================
          HEADER
          PRODUCTS MUST BE FIRST
      ===================================================== */}

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
          ← Residential
        </a>

        {/* NAVBAR */}

        <nav
          style={{
            display: "flex",
            gap: "28px",
            alignItems: "center",
            fontWeight: 700,
            flexWrap: "wrap",
          }}
        >
          {/* 1 - PRODUCTS */}

          <a
            href="/products"
            style={{
              color: "#5b24e8",
              textDecoration: "none",
            }}
          >
            Products
          </a>

          {/* 2 - MY SERVICES */}

          <a
            href="/services"
            style={{
              color: "#101d4b",
              textDecoration: "none",
            }}
          >
            My Services
          </a>

          {/* 3 - MY SOCIETY */}

          <a
            href="/society"
            style={{
              color: "#101d4b",
              textDecoration: "none",
            }}
          >
            My Society
          </a>

          {/* 4 - MY LIFE */}

          <a
            href="/life"
            style={{
              color: "#101d4b",
              textDecoration: "none",
            }}
          >
            My Life
          </a>

          {/* 5 - LOGIN */}

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

      {/* =====================================================
          CART BAR
      ===================================================== */}

      {cart.length > 0 && (
        <div
          style={{
            position: "sticky",
            top: "73px",
            zIndex: 90,
            background: "#101d4b",
            color: "#ffffff",
            padding: "14px 7vw",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong>
              🛒 Cart: {cart.length} item(s)
            </strong>

            <span
              style={{
                marginLeft: "15px",
                opacity: 0.85,
              }}
            >
              Total: ₹{cartTotal}
            </span>
          </div>

          <a
            href="/cart"
            style={{
              background: "#5b24e8",
              color: "#ffffff",
              padding: "10px 18px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Go to Cart
          </a>
        </div>
      )}

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        style={{
          padding: "85px 7vw 65px",
          background:
            "linear-gradient(135deg, #ffffff 0%, #faf7ff 55%, #fff7fc 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "10px 18px",
              borderRadius: "30px",
              background: "#eee8ff",
              color: "#5b24e8",
              fontWeight: 800,
              fontSize: "14px",
              marginBottom: "25px",
            }}
          >
            ✓ RESIDENTIAL COMMUNITY DIGITAL ECOSYSTEM
          </div>

          <h1
            style={{
              fontSize: "clamp(44px, 7vw, 78px)",
              lineHeight: 1.02,
              color: "#101d4b",
              margin: "0 0 25px",
              fontWeight: 800,
            }}
          >
            Everything Residential Community
            <br />

            <span
              style={{
                background:
                  "linear-gradient(90deg, #5b24e8, #c21c9a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              has to offer.
            </span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#687087",
              maxWidth: "760px",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Discover food, shopping, entertainment, hotels,
            healthcare, education and everyday options around
            Residential Community.
          </p>
        </div>
      </section>

      {/* =====================================================
          PRODUCTS SECTION
      ===================================================== */}

      <section
        style={{
          padding: "75px 7vw 100px",
          background: "#f8f9fc",
        }}
      >
        <div
          style={{
            maxWidth: "1250px",
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
            EXPLORE PRODUCTS
          </p>

          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              color: "#101d4b",
              margin: "0 0 15px",
              fontWeight: 800,
            }}
          >
            Everything in one place
          </h2>

          <p
            style={{
              color: "#687087",
              fontSize: "17px",
              lineHeight: 1.7,
              maxWidth: "720px",
              marginBottom: "45px",
            }}
          >
            Choose a category to see available products and
            services.
          </p>

          {/* =================================================
              CATEGORY LIST
          ================================================= */}

          {!selectedCategory && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "28px",
              }}
            >
              {productCategories.map((category) => (
                <article
                  key={category.name}
                  style={{
                    padding: "30px",
                    background: "#ffffff",
                    borderRadius: "22px",
                    border: "1px solid #e4e5ec",
                    boxShadow:
                      "0 10px 30px rgba(35, 25, 80, 0.06)",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "17px",
                      background: "#f1edff",
                      fontSize: "30px",
                      marginBottom: "20px",
                    }}
                  >
                    {category.icon}
                  </div>

                  <h2
                    style={{
                      color: "#101d4b",
                      fontSize: "24px",
                      margin: "0 0 10px",
                      fontWeight: 800,
                    }}
                  >
                    {category.name}
                  </h2>

                  <p
                    style={{
                      color: "#687087",
                      lineHeight: 1.6,
                      margin: "0 0 20px",
                    }}
                  >
                    {category.description}
                  </p>

                  <p
                    style={{
                      color: "#687087",
                      fontSize: "14px",
                      marginBottom: "20px",
                    }}
                  >
                    {category.products.length} available
                    options
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedCategory(category)
                    }
                    style={{
                      width: "100%",
                      border: "none",
                      padding: "14px 20px",
                      borderRadius: "12px",
                      fontWeight: 800,
                      color: "#ffffff",
                      cursor: "pointer",
                      background:
                        "linear-gradient(90deg, #5b24e8, #c21c9a)",
                    }}
                  >
                    Explore {category.name}
                  </button>
                </article>
              ))}
            </div>
          )}

          {/* =================================================
              SELECTED CATEGORY
          ================================================= */}

          {selectedCategory && (
            <div>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                style={{
                  border: "none",
                  background: "#ffffff",
                  color: "#101d4b",
                  padding: "12px 18px",
                  borderRadius: "10px",
                  fontWeight: 800,
                  cursor: "pointer",
                  marginBottom: "30px",
                  boxShadow:
                    "0 5px 20px rgba(0,0,0,0.06)",
                }}
              >
                ← Back to Categories
              </button>

              {/* CATEGORY HEADER */}

              <div
                style={{
                  background: "#ffffff",
                  padding: "30px",
                  borderRadius: "22px",
                  marginBottom: "30px",
                  border: "1px solid #e4e5ec",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                  }}
                >
                  <div
                    style={{
                      width: "65px",
                      height: "65px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "18px",
                      background: "#f1edff",
                      fontSize: "32px",
                    }}
                  >
                    {selectedCategory.icon}
                  </div>

                  <div>
                    <h2
                      style={{
                        margin: 0,
                        color: "#101d4b",
                        fontSize: "30px",
                      }}
                    >
                      {selectedCategory.name}
                    </h2>

                    <p
                      style={{
                        margin: "6px 0 0",
                        color: "#687087",
                      }}
                    >
                      {selectedCategory.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  PRODUCT/SERVICE CARDS
              ================================================= */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(270px, 1fr))",
                  gap: "22px",
                }}
              >
                {selectedCategory.products.map(
                  (product) => (
                    <article
                      key={product.name}
                      style={{
                        background: "#ffffff",
                        borderRadius: "18px",
                        padding: "24px",
                        border: "1px solid #e4e5ec",
                        boxShadow:
                          "0 8px 25px rgba(35, 25, 80, 0.05)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "15px",
                        }}
                      >
                        <span
                          style={{
                            background:
                              product.type === "service"
                                ? "#eee8ff"
                                : "#e8f8ee",
                            color:
                              product.type === "service"
                                ? "#5b24e8"
                                : "#18864b",
                            padding: "6px 10px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: 800,
                          }}
                        >
                          {product.type === "service"
                            ? "SERVICE"
                            : "PRODUCT"}
                        </span>

                        <span
                          style={{
                            color: "#101d4b",
                            fontWeight: 900,
                            fontSize: "20px",
                          }}
                        >
                          {product.price === 0
                            ? "Free"
                            : `₹${product.price}`}
                        </span>
                      </div>

                      <h3
                        style={{
                          color: "#101d4b",
                          margin: "0 0 10px",
                          fontSize: "21px",
                        }}
                      >
                        {product.name}
                      </h3>

                      <p
                        style={{
                          color: "#687087",
                          lineHeight: 1.6,
                          minHeight: "52px",
                          marginBottom: "20px",
                        }}
                      >
                        {product.description}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          addToCart(product)
                        }
                        style={{
                          width: "100%",
                          border: "none",
                          padding: "13px 18px",
                          borderRadius: "11px",
                          fontWeight: 800,
                          color: "#ffffff",
                          cursor: "pointer",
                          background:
                            "linear-gradient(90deg, #5b24e8, #c21c9a)",
                        }}
                      >
                        {product.type === "service"
                          ? "Book Now"
                          : "Add to Cart"}
                      </button>
                    </article>
                  )
                )}
              </div>

              {/* =================================================
                  CURRENT CART
              ================================================= */}

              {cart.length > 0 && (
                <div
                  style={{
                    marginTop: "45px",
                    background: "#ffffff",
                    borderRadius: "20px",
                    padding: "25px",
                    border: "1px solid #e4e5ec",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                      gap: "15px",
                      flexWrap: "wrap",
                    }}
                  >
                    <h2
                      style={{
                        color: "#101d4b",
                        margin: 0,
                      }}
                    >
                      🛒 Current Cart
                    </h2>

                    <a
                      href="/cart"
                      style={{
                        background:
                          "linear-gradient(90deg, #5b24e8, #c21c9a)",
                        color: "#ffffff",
                        padding: "10px 18px",
                        borderRadius: "10px",
                        textDecoration: "none",
                        fontWeight: 800,
                      }}
                    >
                      View Cart
                    </a>
                  </div>

                  {cart.map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "center",
                        padding: "14px 0",
                        borderBottom:
                          "1px solid #eeeeee",
                        gap: "15px",
                      }}
                    >
                      <div>
                        <strong
                          style={{
                            color: "#101d4b",
                          }}
                        >
                          {item.name}
                        </strong>

                        <div
                          style={{
                            color: "#687087",
                            fontSize: "13px",
                            marginTop: "4px",
                          }}
                        >
                          {item.type === "service"
                            ? "Service"
                            : "Product"}
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                        }}
                      >
                        <strong
                          style={{
                            color: "#101d4b",
                          }}
                        >
                          ₹{item.price}
                        </strong>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(index)
                          }
                          style={{
                            border: "none",
                            background: "#ffecec",
                            color: "#d22",
                            padding: "7px 10px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: 700,
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <strong
                      style={{
                        fontSize: "20px",
                        color: "#101d4b",
                      }}
                    >
                      Total
                    </strong>

                    <strong
                      style={{
                        fontSize: "24px",
                        color: "#5b24e8",
                      }}
                    >
                      ₹{cartTotal}
                    </strong>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}