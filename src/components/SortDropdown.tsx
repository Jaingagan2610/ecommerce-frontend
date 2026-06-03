interface Props {
  value: string;
  onChange: (
    value: string
  ) => void;
}

const SortDropdown = ({
  value,
  onChange,
}: Props) => {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value
        )
      }
    >
      <option value="">
        Sort
      </option>

      <option value="priceAsc">
        Price Low To High
      </option>

      <option value="priceDesc">
        Price High To Low
      </option>
    </select>
  );
};

export default SortDropdown;