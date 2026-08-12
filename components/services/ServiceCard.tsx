interface Service {
  name: string
}

interface ServiceCardProps {
  name: string
  description?: string
  services?: Service[]
}

export function ServiceCard({
  name,
  description,
  services = [],
}: ServiceCardProps) {
  return (
    <article className="card">
      <h2>{name}</h2>

      {description && <p>{description}</p>}

      {services.length > 0 && (
        <>
          <h3>Services</h3>

          <ul className="service-sublist">
            {services.map((service) => (
              <li key={service.name}>
                <span className="service-check">✓</span>
                <span>{service.name}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <button className="btn btn-gradient">
        Request Service
      </button>
    </article>
  )
}