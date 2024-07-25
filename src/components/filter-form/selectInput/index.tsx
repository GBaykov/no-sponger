import { Select } from '@mantine/core';

import { FC } from 'react';
import classes from './selectInput.module.css';
import ArrowIcon from '@/components/icons/ArrowIcon';
import { SelectedData } from '@/types';

type SelectInputProps = {
  formValue: string;
  onChangeHandler: (value: number | string | null, type: string) => void;
  data: SelectedData;
};

export const SelectInput: FC<SelectInputProps> = ({ formValue, onChangeHandler, data }) => {
  return (
    <Select
      clearable
      value={formValue}
      name="catalogues"
      onChange={(e) => onChangeHandler(e, 'catalogues')}
      w="100%"
      // mb={20}
      h={42}
      p={0}
      rightSection={<ArrowIcon />}
      rightSectionWidth={30}
      classNames={{
        input: classes.input,
        rightSection: classes.rightSection,
        wrapper: classes.wrapper,
        root: classes.root,
      }}
      // styles={{
      //   rightSection: { pointerEvents: 'none', color: '#ACADB9', marginRight: '6px' },
      //   input: { borderRadius: '8px' },
      // }}
      placeholder="Выберете отрасль"
      data={data}
    />
  );
};
