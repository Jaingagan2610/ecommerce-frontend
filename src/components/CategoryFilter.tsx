import type { Category } from "../interfaces/Product";

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
  const handleChange = (id: string) => {
    if (selected.includes(id)) {
      onChange(
        selected.filter((item) => item !== id)
      );
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div>
      <h3>Categories</h3>

      {categories.map((category) => (
        <div key={category.id}>
          <input
            type="checkbox"
            checked={selected.includes(
              category.id.toString()
            )}
            onChange={() =>
              handleChange(category.id.toString())
            }
          />

          {category.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;