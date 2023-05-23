import { fetchVacancies } from '../services/Api';
import { AppState } from '../types';

export async function getVacancies(state: AppState) {
  const keyword = state.searhWord;
  const payment_from = +state.from;
  const payment_to = +state.to;
  const catalogues = state.catalogue;
  const no_agreement = 1;
  const count = 4;
  const page = 1;
  const published = 1;

  const vacancies = await fetchVacancies(
    count,
    page,
    no_agreement,
    keyword,
    payment_from,
    payment_to,
    catalogues,
    published,
  );
  return vacancies;
}
