"use client"

import { useState } from "react"

const societySections = [
  {
    title: "Notices",
    icon: "📢",
    description: "Society announcements, important updates and circulars.",
  },
  {
    title: "Events",
    icon: "📅",
    description: "View upcoming society events and activities.",
  },
  {
    title: "Complaints",
    icon: "🛠️",
    description: "Submit and track your society complaints.",
  },
  {
    title: "Maintenance",
    icon: "💰",
    description: "View maintenance information and payment status.",
  },
  {
    title: "Residents",
    icon: "👥",
    description: "Access the resident directory and community information.",
  },
  {
    title: "Parking",
    icon: "🚗",
    description: "Manage parking information and vehicle details.",
  },
  {
    title: "Visitor Management",
    icon: "🔐",
    description: "Manage visitors and society entry information.",
  },
  {
    title: "Helpdesk",
    icon: "📞",
    description: "Get help from society management and support.",
  },
]

const notices = [
  {
    title: "Water Supply Maintenance",
    date: "10 Aug 2026",
    description:
      "Water supply maintenance work is scheduled. Residents are requested to plan accordingly.",
  },
  {
    title: "Independence Day Event",
    date: "08 Aug 2026",
    description:
      "Society Independence Day celebration details and participation information.",
  },
  {
    title: "Maintenance Payment Reminder",
    date: "05 Aug 2026",
    description:
      "Residents are requested to check their maintenance payment status.",
  },
]

const events = [
  {
    title: "Independence Day Celebration",
    date: "15 Aug 2026",
    time: "10:00 AM",
    location: "Society Community Area",
  },
  {
    title: "Resident Meeting",
    date: "18 Aug 2026",
    time: "06:00 PM",
    location: "Community Hall",
  },
  {
    title: "Society Cleanliness Drive",
    date: "22 Aug 2026",
    time: "08:00 AM",
    location: "Society Main Gate",
  },
]

export default function Society() {
  const [activeSection, setActiveSection] = useState("Home")

  const showSection = (section: string) => {
    setActiveSection(section)
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
              color: "#101d4b",
              textDecoration: "none",
            }}
          >
            My Services
          </a>

          <a
            href="/society"
            style={{
              color: "#5b24e8",
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
          padding: "70px 7vw 50px",
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
            MY SOCIETY
          </p>

          <h1
            style={{
              fontSize: "clamp(42px, 6vw, 65px)",
              lineHeight: 1.05,
              color: "#101d4b",
              margin: "0 0 18px",
              fontWeight: 800,
            }}
          >
            HL City Community
          </h1>

          <p
            style={{
              color: "#687087",
              fontSize: "17px",
              lineHeight: 1.7,
              maxWidth: "720px",
              margin: 0,
            }}
          >
            Stay connected with your society through notices,
            events, maintenance, complaints, security and
            community services.
          </p>
        </div>
      </section>

      {/* ================= DASHBOARD ================= */}

      <section
        style={{
          padding: "45px 7vw 100px",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
          }}
        >
          {/* QUICK NAVIGATION */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(145px, 1fr))",
              gap: "12px",
              marginBottom: "40px",
            }}
          >
            <button
              type="button"
              onClick={() => showSection("Home")}
              style={{
                padding: "15px",
                borderRadius: "12px",
                border: "none",
                background:
                  activeSection === "Home"
                    ? "#5b24e8"
                    : "#ffffff",
                color:
                  activeSection === "Home"
                    ? "#ffffff"
                    : "#101d4b",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow:
                  "0 5px 18px rgba(35,25,80,0.06)",
              }}
            >
              🏠 Home
            </button>

            {societySections.map((section) => (
              <button
                key={section.title}
                type="button"
                onClick={() =>
                  showSection(section.title)
                }
                style={{
                  padding: "15px",
                  borderRadius: "12px",
                  border: "none",
                  background:
                    activeSection === section.title
                      ? "#5b24e8"
                      : "#ffffff",
                  color:
                    activeSection === section.title
                      ? "#ffffff"
                      : "#101d4b",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow:
                    "0 5px 18px rgba(35,25,80,0.06)",
                }}
              >
                {section.icon} {section.title}
              </button>
            ))}
          </div>

          {/* ================= HOME ================= */}

          {activeSection === "Home" && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "20px",
                  marginBottom: "35px",
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    padding: "25px",
                    borderRadius: "20px",
                    border: "1px solid #e4e5ec",
                  }}
                >
                  <div style={{ fontSize: "30px" }}>
                    📢
                  </div>

                  <h3
                    style={{
                      color: "#101d4b",
                      marginBottom: "8px",
                    }}
                  >
                    Latest Notices
                  </h3>

                  <p
                    style={{
                      color: "#687087",
                      lineHeight: 1.6,
                    }}
                  >
                    Stay updated with important society
                    announcements.
                  </p>

                  <button
                    type="button"
                    onClick={() => showSection("Notices")}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#5b24e8",
                      fontWeight: 800,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    View Notices →
                  </button>
                </div>

                <div
                  style={{
                    background: "#ffffff",
                    padding: "25px",
                    borderRadius: "20px",
                    border: "1px solid #e4e5ec",
                  }}
                >
                  <div style={{ fontSize: "30px" }}>
                    📅
                  </div>

                  <h3
                    style={{
                      color: "#101d4b",
                      marginBottom: "8px",
                    }}
                  >
                    Upcoming Events
                  </h3>

                  <p
                    style={{
                      color: "#687087",
                      lineHeight: 1.6,
                    }}
                  >
                    See upcoming community events and
                    activities.
                  </p>

                  <button
                    type="button"
                    onClick={() => showSection("Events")}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#5b24e8",
                      fontWeight: 800,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    View Events →
                  </button>
                </div>

                <div
                  style={{
                    background: "#ffffff",
                    padding: "25px",
                    borderRadius: "20px",
                    border: "1px solid #e4e5ec",
                  }}
                >
                  <div style={{ fontSize: "30px" }}>
                    🛠️
                  </div>

                  <h3
                    style={{
                      color: "#101d4b",
                      marginBottom: "8px",
                    }}
                  >
                    Need Help?
                  </h3>

                  <p
                    style={{
                      color: "#687087",
                      lineHeight: 1.6,
                    }}
                  >
                    Submit a complaint or contact the
                    society helpdesk.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      showSection("Complaints")
                    }
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#5b24e8",
                      fontWeight: 800,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Raise Complaint →
                  </button>
                </div>
              </div>

              {/* ALL FEATURES */}

              <h2
                style={{
                  color: "#101d4b",
                  fontSize: "32px",
                  marginBottom: "20px",
                }}
              >
                Society Services
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "18px",
                }}
              >
                {societySections.map((section) => (
                  <button
                    key={section.title}
                    type="button"
                    onClick={() =>
                      showSection(section.title)
                    }
                    style={{
                      textAlign: "left",
                      background: "#ffffff",
                      border: "1px solid #e4e5ec",
                      borderRadius: "18px",
                      padding: "25px",
                      cursor: "pointer",
                      boxShadow:
                        "0 8px 25px rgba(35,25,80,0.05)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "32px",
                        marginBottom: "15px",
                      }}
                    >
                      {section.icon}
                    </div>

                    <h3
                      style={{
                        color: "#101d4b",
                        margin: "0 0 8px",
                        fontSize: "20px",
                      }}
                    >
                      {section.title}
                    </h3>

                    <p
                      style={{
                        color: "#687087",
                        lineHeight: 1.6,
                        margin: "0 0 15px",
                      }}
                    >
                      {section.description}
                    </p>

                    <strong
                      style={{
                        color: "#5b24e8",
                      }}
                    >
                      Open →
                    </strong>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ================= NOTICES ================= */}

          {activeSection === "Notices" && (
            <div>
              <SectionHeader
                icon="📢"
                title="Society Notices"
                description="Important announcements and updates from HL City."
              />

              <div
                style={{
                  display: "grid",
                  gap: "18px",
                }}
              >
                {notices.map((notice) => (
                  <article
                    key={notice.title}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e4e5ec",
                      borderRadius: "18px",
                      padding: "25px",
                      boxShadow:
                        "0 8px 25px rgba(35,25,80,0.05)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "flex-start",
                        gap: "20px",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            color: "#101d4b",
                            margin: "0 0 8px",
                            fontSize: "22px",
                          }}
                        >
                          📢 {notice.title}
                        </h3>

                        <p
                          style={{
                            color: "#687087",
                            lineHeight: 1.6,
                            margin: "0 0 12px",
                          }}
                        >
                          {notice.description}
                        </p>
                      </div>

                      <span
                        style={{
                          color: "#5b24e8",
                          fontWeight: 800,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {notice.date}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          `${notice.title}\n\n${notice.description}\n\nDate: ${notice.date}`
                        )
                      }
                      style={{
                        marginTop: "10px",
                        border: "none",
                        background:
                          "linear-gradient(90deg, #5b24e8, #c21c9a)",
                        color: "#ffffff",
                        padding: "11px 18px",
                        borderRadius: "10px",
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      View Notice
                    </button>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* ================= EVENTS ================= */}

          {activeSection === "Events" && (
            <div>
              <SectionHeader
                icon="📅"
                title="Society Events"
                description="Upcoming activities and events for residents."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "20px",
                }}
              >
                {events.map((event) => (
                  <article
                    key={event.title}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e4e5ec",
                      borderRadius: "18px",
                      padding: "25px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "35px",
                        marginBottom: "15px",
                      }}
                    >
                      📅
                    </div>

                    <h3
                      style={{
                        color: "#101d4b",
                        margin: "0 0 12px",
                      }}
                    >
                      {event.title}
                    </h3>

                    <p
                      style={{
                        color: "#687087",
                        margin: "7px 0",
                      }}
                    >
                      <strong>Date:</strong> {event.date}
                    </p>

                    <p
                      style={{
                        color: "#687087",
                        margin: "7px 0",
                      }}
                    >
                      <strong>Time:</strong> {event.time}
                    </p>

                    <p
                      style={{
                        color: "#687087",
                        margin: "7px 0 18px",
                      }}
                    >
                      <strong>Location:</strong>{" "}
                      {event.location}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          `Event: ${event.title}\nDate: ${event.date}\nTime: ${event.time}\nLocation: ${event.location}`
                        )
                      }
                      style={{
                        width: "100%",
                        border: "none",
                        background:
                          "linear-gradient(90deg, #5b24e8, #c21c9a)",
                        color: "#ffffff",
                        padding: "12px",
                        borderRadius: "10px",
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      View Event
                    </button>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* ================= COMPLAINTS ================= */}

          {activeSection === "Complaints" && (
            <div>
              <SectionHeader
                icon="🛠️"
                title="Complaints & Help"
                description="Raise an issue and keep track of society support requests."
              />

              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e4e5ec",
                  borderRadius: "20px",
                  padding: "30px",
                  maxWidth: "750px",
                }}
              >
                <h3
                  style={{
                    color: "#101d4b",
                    marginTop: 0,
                  }}
                >
                  Raise a Complaint
                </h3>

                <label
                  style={{
                    display: "block",
                    color: "#101d4b",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  Complaint Type
                </label>

                <select
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: "10px",
                    border: "1px solid #dcdde5",
                    marginBottom: "18px",
                  }}
                >
                  <option>Maintenance</option>
                  <option>Security</option>
                  <option>Cleaning</option>
                  <option>Parking</option>
                  <option>Water Supply</option>
                  <option>Other</option>
                </select>

                <label
                  style={{
                    display: "block",
                    color: "#101d4b",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  Description
                </label>

                <textarea
                  rows={5}
                  placeholder="Describe your complaint..."
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "13px",
                    borderRadius: "10px",
                    border: "1px solid #dcdde5",
                    marginBottom: "18px",
                    resize: "vertical",
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Complaint submitted successfully."
                    )
                  }
                  style={{
                    border: "none",
                    background:
                      "linear-gradient(90deg, #5b24e8, #c21c9a)",
                    color: "#ffffff",
                    padding: "13px 22px",
                    borderRadius: "10px",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Submit Complaint
                </button>
              </div>
            </div>
          )}

          {/* ================= MAINTENANCE ================= */}

          {activeSection === "Maintenance" && (
            <SimpleSection
              icon="💰"
              title="Maintenance"
              description="View your society maintenance information."
              items={[
                "Current Month Maintenance: ₹2,500",
                "Payment Status: Pending",
                "Due Date: 15 Aug 2026",
                "Previous Payment: ₹2,500",
              ]}
            />
          )}

          {/* ================= RESIDENTS ================= */}

          {activeSection === "Residents" && (
            <SimpleSection
              icon="👥"
              title="Residents"
              description="Resident directory and community information."
              items={[
                "Resident Directory",
                "Family Members",
                "Community Groups",
                "Resident Support",
              ]}
            />
          )}

          {/* ================= PARKING ================= */}

          {activeSection === "Parking" && (
            <SimpleSection
              icon="🚗"
              title="Parking"
              description="Manage your parking and vehicle information."
              items={[
                "My Parking Slot",
                "Vehicle Registration",
                "Visitor Parking",
                "Parking Rules",
              ]}
            />
          )}

          {/* ================= VISITOR MANAGEMENT ================= */}

          {activeSection === "Visitor Management" && (
            <SimpleSection
              icon="🔐"
              title="Visitor Management"
              description="Manage visitor entry and security information."
              items={[
                "Add New Visitor",
                "Expected Visitors",
                "Visitor History",
                "Security Contact",
              ]}
            />
          )}

          {/* ================= HELPDESK ================= */}

          {activeSection === "Helpdesk" && (
            <SimpleSection
              icon="📞"
              title="Society Helpdesk"
              description="Contact society management and support."
              items={[
                "Society Office",
                "Security Desk",
                "Maintenance Team",
                "Emergency Contact",
              ]}
            />
          )}
        </div>
      </section>
    </main>
  )
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div
      style={{
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          fontSize: "40px",
          marginBottom: "10px",
        }}
      >
        {icon}
      </div>

      <h2
        style={{
          color: "#101d4b",
          fontSize: "35px",
          margin: "0 0 10px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: "#687087",
          fontSize: "16px",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  )
}

/* =========================================================
   SIMPLE SECTION
========================================================= */

function SimpleSection({
  icon,
  title,
  description,
  items,
}: {
  icon: string
  title: string
  description: string
  items: string[]
}) {
  return (
    <div>
      <SectionHeader
        icon={icon}
        title={title}
        description={description}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "18px",
        }}
      >
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() =>
              alert(`${item} section selected.`)
            }
            style={{
              textAlign: "left",
              background: "#ffffff",
              border: "1px solid #e4e5ec",
              borderRadius: "16px",
              padding: "22px",
              color: "#101d4b",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow:
                "0 8px 25px rgba(35,25,80,0.05)",
            }}
          >
            {item}

            <span
              style={{
                display: "block",
                marginTop: "10px",
                color: "#5b24e8",
                fontSize: "14px",
              }}
            >
              Open →
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}