interface Product {
  name: string
}

interface ProductCardProps {
  name: string
  description: string
  icon: string
  products: Product[]
}

export function ProductCard({
  name,
  description,
  icon,
  products,
}: ProductCardProps) {
  return (
    <article
      className="card"
      style={{
        padding: "30px",
        background: "#ffffff",
        borderRadius: "22px",
        border: "1px solid #e4e5ec",
        boxShadow: "0 10px 30px rgba(35, 25, 80, 0.06)",
      }}
    >
      {/* Icon */}
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
        {icon}
      </div>

      {/* Category Name */}
      <h2
        style={{
          color: "#101d4b",
          fontSize: "24px",
          margin: "0 0 10px",
          fontWeight: 800,
        }}
      >
        {name}
      </h2>

      {/* Description */}
      <p
        style={{
          color: "#687087",
          lineHeight: 1.6,
          margin: "0 0 24px",
        }}
      >
        {description}
      </p>

      {/* Products */}
      <h3
        style={{
          color: "#101d4b",
          fontSize: "16px",
          marginBottom: "12px",
        }}
      >
        Available Options
      </h3>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {products.map((product) => (
          <li
            key={product.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 0",
              color: "#424b63",
              borderBottom: "1px solid #f0f0f4",
            }}
          >
            <span
              style={{
                color: "#5b24e8",
                fontWeight: 800,
              }}
            >
              ✓
            </span>

            <span>{product.name}</span>
          </li>
        ))}
      </ul>

      {/* Explore Button */}
      <button
        type="button"
        className="btn btn-gradient"
        style={{
          width: "100%",
          marginTop: "22px",
          border: "none",
          padding: "14px 20px",
          borderRadius: "12px",
          fontWeight: 800,
          color: "#ffffff",
          cursor: "pointer",
        }}
      >
        Explore {name}
      </button>
    </article>
  )
}