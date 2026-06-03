import type { Category } from "../interfaces/Category";

interface Props {
  categories: Category[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

const CategoryFilter = ({
  categories,
  selected,
  onChange,
}: Props) => {

  const toggleCategory = (categoryId: string) => {
    const updatedCategories = selected.includes(categoryId)
      ? selected.filter((id) => id !== categoryId)
      : [...selected, categoryId];

    onChange(updatedCategories);
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "1.25rem",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        minWidth: "240px",
      }}
    >
      <h3
        style={{
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "var(--text-dark)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "0.5rem",
          marginBottom: "0.25rem",
        }}
      >
        Filter by Category
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {categories.map((category) => {
          const isChecked = selected.includes(String(category.id));
          return (
            <label
              key={category.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.6rem 0.75rem",
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
                backgroundColor: isChecked ? "var(--primary-light)" : "transparent",
                color: isChecked ? "var(--primary)" : "var(--text-main)",
                fontWeight: isChecked ? 600 : 500,
                fontSize: "0.925rem",
                transition: "var(--transition-fast)",
              }}
              onMouseOver={(e) => {
                if (!isChecked) e.currentTarget.style.backgroundColor = "var(--bg-app)";
              }}
              onMouseOut={(e) => {
                if (!isChecked) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleCategory(String(category.id))}
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "4px",
                  border: "1.5px solid var(--border)",
                  accentColor: "var(--primary)",
                  cursor: "pointer",
                }}
              />
              
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid var(--border)",
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}

              <span style={{ flexGrow: 1 }}>{category.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;