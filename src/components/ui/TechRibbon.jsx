export default function TechRibbon({ items = [] }) {
  const doubled = [...items, ...items]

  return (
    <div className="tech-ribbon" aria-label="Tech stack ribbon">
      <div className="tech-ribbon-track">
        {doubled.map((item, index) => (
          <span className="tech-ribbon-item" key={`${item}-${index}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
