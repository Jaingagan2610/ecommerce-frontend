interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown = ({
  value,
  onChange,
}: Props) => {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    >
      <option value="">Default</option>

      <option value="priceAsc">
        Price Low → High
      </option>

      <option value="priceDesc">
        Price High → Low
      </option>

      <option value="nameAsc">
        Name A → Z
      </option>
    </select>
  );
};

export default SortDropdown;