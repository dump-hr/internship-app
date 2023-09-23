import { TextField } from '@mui/material';
import { GridFilterInputValueProps } from '@mui/x-data-grid';

type FilterSingleSelectProps = {
  filterProps: GridFilterInputValueProps;
  items: Record<string, string>;
};

const FilterSingleSelect = ({
  filterProps,
  items,
}: FilterSingleSelectProps) => {
  const { item, applyValue, focusElementRef } = filterProps;

  return (
    <TextField
      id={`contains-input-${item.id}`}
      value={item.value}
      onChange={(event) => applyValue({ ...item, value: event.target.value })}
      select
      inputRef={focusElementRef}
      SelectProps={{
        native: true,
      }}
    >
      <option value="">All</option>
      {Object.keys(items).map((option) => (
        <option key={option} value={option}>
          {items[option]}
        </option>
      ))}
    </TextField>
  );
};

export default FilterSingleSelect;
