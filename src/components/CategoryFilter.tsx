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

  const toggleCategory = (
    categoryId: string
  ) => {

    const updatedCategories =
      selected.includes(categoryId)
        ? selected.filter(
          (id) => id !== categoryId
        )
        : [
          ...selected,
          categoryId,
        ];

    onChange(updatedCategories);
  };

  return (
    <div>
      <h3>Categories</h3>

      {categories.map((category) => (
        <label
          key={category.id}
          style={{
            display: "block",
            marginBottom: "6px",
          }}
        >
          <input
            type="checkbox"
            checked={selected.includes(
              String(category.id)
            )}
            onChange={() =>
              toggleCategory(
                String(category.id)
              )
            }
          />

          {" "}
          {category.name}
        </label>
      ))}
    </div>
  );
};

export default CategoryFilter;