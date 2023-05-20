import React, { useContext, useCallback, SyntheticEvent } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import './index.css';
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Select,
  MultiSelect,
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import cross from '../../assets/cross.svg';
import arrowDown from '../../assets/down-errow.svg';
import { AppContext } from '../../store/context';
import { ActionType } from '../../types';

export const FilterForm = () => {
  const { state, dispatch } = useContext(AppContext);

  const form = useForm({
    initialValues: {
      branch: '',
      from: 0,
      to: 0,
      termsOfService: false,
    },

    validate: {},
  });

  const onInputSelect = (e: SyntheticEvent<HTMLInputElement>) => {
    console.log(e);
    if (e) {
      dispatch({ type: ActionType.SetField, payload: { branch: e.currentTarget.value } });
      form.setFieldValue('branch', e.currentTarget.value);
    }
  };

  const onInputChange = useCallback(
    (e: number | string | null, type: string) => {
      if (e) {
        if (type === 'branch') {
          dispatch({
            type: ActionType.SetField,
            payload: { branch: String(e) },
          });
          form.setFieldValue('branch', String(e));
        }
        if (type === 'from') {
          dispatch({
            type: ActionType.SetFrom,
            payload: { from: String(e) },
          });
          form.setFieldValue('from', +e);
        }
        if (type === 'to') {
          dispatch({
            type: ActionType.SetTo,
            payload: { to: String(e) },
          });
          form.setFieldValue('to', +e);
        }
      }
    },
    [state.from, state.to, dispatch],
  );
  console.log(form.values);
  return (
    <section className="form-block">
      <form onSubmit={form.onSubmit((values) => console.log(values))} onReset={form.onReset}>
        <div className="form-head">
          <p className="form-head-text">Фильтры</p>
          <button type="reset" className="reset-btn">
            Сбросить все
            <img src={cross} />
          </button>
        </div>

        <div className="form-inputs">
          <p className="form-text">Отрасль</p>
          <Select
            value={form.values.branch}
            name="branch"
            onChange={(e) => onInputChange(e, 'branch')}
            w="100%"
            mb={20}
            h={42}
            p={0}
            rightSection={<img src={arrowDown} width="14px" />}
            rightSectionWidth={30}
            styles={{
              rightSection: { pointerEvents: 'none', color: '#ACADB9', marginRight: '6px' },
              input: { borderRadius: '8px' },
            }}
            placeholder="Выберете отрасль"
            data={[
              { value: 'React', label: 'React' },
              { value: 'Angular', label: 'Angular' },
              { value: 'Svelte', label: 'Svelte' },
            ]}
          />
          <p className="form-text">Оклад</p>
          <NumberInput
            value={form.values.from}
            name="from"
            onChange={(e) => onInputChange(e, 'from')}
            w="100%"
            mb={8}
            h={42}
            placeholder="От"
            styles={{
              input: { borderRadius: '8px' },
              rightSection: { padding: '0px 0', marginRight: '4px' },
              controlUp: {
                borderColor: 'white',
                color: '#ACADB9',
                cursor: 'pointer',
                svg: { marginBottom: '-6px' },
              },
              controlDown: {
                borderColor: 'white',
                color: '#ACADB9',
                cursor: 'pointer',
                svg: { marginTop: '-6px' },
              },
            }}
          />

          <NumberInput
            value={form.values.to}
            onChange={(e) => onInputChange(e, 'to')}
            name="to"
            w="100%"
            h={42}
            placeholder="До"
            styles={{
              rightSection: { marginRight: '4px' },
              input: { borderRadius: '8px' },
              controlUp: {
                borderColor: 'white',
                color: '#ACADB9',
                cursor: 'pointer',
                svg: { marginBottom: '-6px' },
              },
              controlDown: {
                borderColor: 'white',
                color: '#ACADB9',
                cursor: 'pointer',
                svg: { marginTop: '-6px' },
              },
            }}
          />
        </div>
        <Group position="center" mt={20}>
          <Button
            w="100%"
            h={42}
            type="submit"
            styles={{
              label: { fontFamily: 'Inter', fontWeight: 'normal', fontSize: '14px' },
              root: { borderRadius: '8px' },
            }}
          >
            Применить
          </Button>
        </Group>
      </form>
    </section>
  );
};
