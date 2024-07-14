import react, { useState, useEffect, useContext } from 'react';
import './index.css';
import star from '../../assets/star.svg';
import emptyStar from '../../assets/empty-star.svg';
import location from '../../assets/location.svg';
import dot from '../../assets/dot.svg';
import { Vacancy } from '../../types/vacancies';
import { getFromStorage, setToStorage } from '../../utils/localstorage';
import { ActionType } from '../../types';
import { AppContext } from '../../store/context';

export type CardProps = {
  vacancy: Vacancy;
  isBlack?: boolean;
};

export const Card = ({ vacancy, isBlack }: CardProps) => {
  const { state, dispatch } = useContext(AppContext);
  const [isChosen, setIsChosen] = useState(false);
  const { profession, town, type_of_work, payment_to, payment_from, payment, currency, id } =
    vacancy;
  // const navigate = useNavigate();

  const onStarClick = (e: react.MouseEvent<HTMLImageElement | HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setIsChosen(!isChosen);
    if (isChosen) {
      const vacs = getFromStorage('chosen');
      if (vacs) {
        const vacsArr: Vacancy[] = JSON.parse(vacs);
        const newVacsArr = vacsArr.filter((item) => item.id !== vacancy.id);
        const vacsToString = JSON.stringify(newVacsArr);
        setToStorage(`chosen`, vacsToString);
      }
    } else {
      const vacs = getFromStorage('chosen');
      if (vacs) {
        const vacsArr: Vacancy[] = JSON.parse(vacs);
        vacsArr.push(vacancy);
        const vacsToString = JSON.stringify(vacsArr);
        setToStorage(`chosen`, vacsToString);
      } else {
        const vacancyToString = JSON.stringify(vacancy);
        setToStorage(`chosen`, `[${vacancyToString}]`);
      }
    }
    e.stopPropagation();
  };

  useEffect(() => {
    const vacs = getFromStorage('chosen');
    if (vacs) {
      const vacsArr: Vacancy[] = JSON.parse(vacs);
      const isInChosen = vacsArr.find((item) => item.id === vacancy.id);
      if (isInChosen) {
        setIsChosen(true);
      }
    }
  }, []);

  const PaymentBlock = () => {
    if (!payment_to && !payment_from && payment) {
      return (
        <p className={`${isBlack ? 'info-salary blackSalary' : 'info-salary'}`}>
          з/п {payment} {currency}
        </p>
      );
    } else if (payment_to && payment_from && payment_from > 0 && payment_to > 0) {
      return (
        <p className={`${isBlack ? 'info-salary blackSalary' : 'info-salary'}`}>
          з/п {payment_from} - {payment_to} {currency}
        </p>
      );
    } else if (!payment_to && payment_from) {
      return (
        <p className={`${isBlack ? 'info-salary blackSalary' : 'info-salary'}`}>
          з/п от {payment_from} {currency}
        </p>
      );
    } else if (payment_to && !payment_from) {
      return (
        <p className={`${isBlack ? 'info-salary blackSalary' : 'info-salary'}`}>
          з/п до {payment_to} {currency}
        </p>
      );
    }
  };

  const onCardClick = () => {
    dispatch({
      type: ActionType.SetCurrentVacancy,
      payload: { currentVacancy: vacancy },
    });
    dispatch({
      type: ActionType.SetActiveLink,
      payload: { activeLink: '/vacancy' },
    });
    // navigate('/vacancy');
  };

  return (
    <div
      data-elem={`vacancy-${vacancy.id}`}
      className={`${isBlack ? 'card blackCard' : 'card'}`}
      onClick={() => onCardClick()}
    >
      <div className="card__content">
        <div className={`${isBlack ? 'content__head blackTitle' : 'content__head'}`}>
          <p className={`${isBlack ? 'card__head-title blackTitle' : 'card__head-title'}`}>
            {profession}
          </p>
          <button
            onClick={(e) => onStarClick(e)}
            className="star-btn"
            data-elem={`vacancy-${vacancy.id}-shortlist-button`}
          >
            {' '}
            <img src={isChosen ? star : emptyStar} alt="star" className="card__head-star" />
          </button>
        </div>
        <div className="content__info ">
          {PaymentBlock()}
          <img src={dot} alt="dot" className="dot" />
          <p
            className={`${
              isBlack ? 'info-typeofwork card-text blackWork' : 'info-typeofwork card-text'
            }`}
          >
            {type_of_work.title}
          </p>
        </div>
        <div
          className={`${
            isBlack ? 'card__content-location blackLocation' : 'card__content-location'
          }`}
        >
          <img src={location} alt="location" className="location-icon" />
          <p className="card-text">{town.title}</p>
        </div>
      </div>
    </div>
  );
};
