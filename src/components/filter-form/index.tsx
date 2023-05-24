import React, { useContext, useEffect, useCallback, useState } from 'react';
import './index.css';
import { Button, Group, Select, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import cross from '../../assets/cross.svg';
import arrowDown from '../../assets/down-errow.svg';
import { AppContext } from '../../store/context';
import { ActionType, CataloguesResponse } from '../../types';
import useComponentDidMount from '../../hooks/useComponentDidMount';
import { fetchCatalogues, fetchVacancies } from '../../services/Api';
import { Spinner } from '../spinner';
import { getVacancies } from '../../utils/getVacancies';

export type FormData = {
  catalogue: string;
  from: number | '' | undefined;
  to: number | '' | undefined;
};

export const FilterForm = () => {
  const { state, dispatch } = useContext(AppContext);
  const isComponentMounted = useComponentDidMount();
  // const [catas, setCatas] = useState<CataloguesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [selectData, setSelectData] = useState<SelectedData | null>(null);
  const [currentCatalogue, setCurrentCatalogue] = useState('');
  const [currentCatKey, setCurrentKey] = useState(0);

  async function onFormSubmit(e: FormData) {
    dispatch({
      type: ActionType.SetVacsPage,
      payload: { vacsPage: 0 },
    });
    dispatch({
      type: ActionType.SetIsLoading,
      payload: { isLoading: true },
    });
    const vacancies = await getVacancies(state);
    dispatch({
      type: ActionType.SetVacsResp,
      payload: { vacsResp: vacancies },
    });

    dispatch({
      type: ActionType.SetIsLoading,
      payload: { isLoading: false },
    });
  }

  const form = useForm<{
    catalogue: string;
    from: number | '' | undefined;
    to: number | '' | undefined;
  }>({
    initialValues: {
      catalogue: '',
      from: '',
      to: '',
    },

    validate: {},
  });

  useEffect(() => {
    if (state.selectData) {
      const currentkey = state.selectData.find((item) => item.value === currentCatalogue)?.key;
      if (currentkey) {
        dispatch({
          type: ActionType.SetCatalogue,
          payload: { catalogue: currentkey },
        });
        setCurrentKey(currentkey);
      }
    }
  }, [currentCatalogue]);

  const onInputChange = useCallback(
    (e: number | string | null, type: string) => {
      if (type === 'catalogue') {
        form.setFieldValue('catalogue', String(e));
        setCurrentCatalogue(String(e));
      }

      if (type === 'from') {
        if (e) {
          dispatch({
            type: ActionType.SetFrom,
            payload: { from: String(e) },
          });
          form.setFieldValue('from', +e);
        } else {
          form.setFieldValue('from', '');
        }
      }
      if (type === 'to') {
        if (e) {
          dispatch({
            type: ActionType.SetTo,
            payload: { to: String(e) },
          });
          form.setFieldValue('to', +e);
        } else {
          form.setFieldValue('to', '');
        }
      }
    },
    [state.from, state.to, dispatch],
  );

  const addFilterSelectData = (catalogues: CataloguesResponse) => {
    setIsLoading(true);
    if (catalogues) {
      const filterSelectData: {
        value: string;
        label: string;
        key: number;
      }[] = catalogues?.map((catalogue) => {
        const cata = {
          value: catalogue.title_rus,
          label: catalogue.title_rus,
          key: catalogue.key,
        };
        return cata;
      });
      dispatch({
        type: ActionType.SetSelectData,
        payload: { selectData: filterSelectData },
      });
    }
    setIsLoading(false);
  };

  const setCatalogues = async () => {
    try {
      setIsLoading(true);
      const catalogues = await fetchCatalogues();
      dispatch({
        type: ActionType.SetCatalogues,
        payload: { catalogues: catalogues },
      });

      setIsLoading(false);
      setIsError(false);

      addFilterSelectData(catalogues);
    } catch {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (isComponentMounted) {
      setCatalogues();
    }
  }, [isComponentMounted]);

  return (
    <section className="form-block">
      {!isLoading && !isError && (
        <form onSubmit={form.onSubmit((e) => onFormSubmit(e))} onReset={form.onReset}>
          <div className="form-head">
            <p className="form-head-text">Фильтры</p>
            <button type="reset" className="reset-btn">
              Сбросить все
              <img src={cross} />
            </button>
          </div>

          <div className="form-inputs">
            <p className="form-text">Отрасль</p>
            {state.selectData && (
              <Select
                data-elem={'industry-select'}
                clearable
                value={form.values.catalogue}
                name="catalogue"
                onChange={(e) => onInputChange(e, 'catalogue')}
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
                data={state.selectData}
              />
            )}
            <p className="form-text">Оклад</p>
            <NumberInput
              data-elem="salary-from-input"
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
              data-elem="salary-to-input"
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
              data-elem="search-button"
              w="100%"
              h={42}
              type="submit"
              bg="#5E96FC"
              styles={{
                label: { fontFamily: 'Inter', fontWeight: 'normal', fontSize: '14px' },
                root: { borderRadius: '8px' },
              }}
            >
              Применить
            </Button>
          </Group>
        </form>
      )}
      {isLoading && <Spinner />}
    </section>
  );
};
