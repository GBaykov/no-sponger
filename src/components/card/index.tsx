import react, { useState, useEffect } from 'react';
import './index.css';
import star from '../../assets/star.svg';
import emptyStar from '../../assets/empty-star.svg';
import location from '../../assets/location.svg';
import dot from '../../assets/dot.svg';
import { Vacancy } from '../../types/vacancies';
import { getFromStorage, removeFromStorage, setToStorage } from '../../utils/localstorage';

export type CardProps = {
  vacancy: Vacancy;
};

export const Card = ({ vacancy }: CardProps) => {
  const [isChosen, setIsChosen] = useState(false);
  const { profession, town, type_of_work, payment_to, payment_from, payment, currency, id } =
    vacancy;
  // removeFromStorage('chosen');
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
        <p className="info-salary">
          з/п {payment} {currency}
        </p>
      );
    } else if (payment_to && payment_from && payment_from > 0 && payment_to > 0) {
      return (
        <p className="info-salary">
          з/п {payment_from} - {payment_to} {currency}
        </p>
      );
    } else if (!payment_to && payment_from) {
      return (
        <p className="info-salary">
          з/п от {payment_from} {currency}
        </p>
      );
    } else if (payment_to && !payment_from) {
      return (
        <p className="info-salary">
          з/п до {payment_to} {currency}
        </p>
      );
    }
  };

  return (
    <div className="card">
      <div className="card__content">
        <div className="content__head ">
          <p className="card__head-title">{profession}</p>
          <button onClick={(e) => onStarClick(e)} className="star-btn">
            {' '}
            <img src={isChosen ? star : emptyStar} alt="star" className="card__head-star" />
          </button>
        </div>
        <div className="content__info ">
          {PaymentBlock()}
          {/* {payment_to ? (
            <p className="info-salary">
              з/п {payment_from} - {payment_to} {currency}
            </p>
          ) : (
            <p className="info-salary">
              з/п от {payment_from} {currency}
            </p>
          )}
          {payment_to && payment_from && (
            <p className="info-salary">
              з/п {payment_from} - {payment_to} {currency}
            </p>
          )} */}
          {/* {!payment_to && payment_from && (
            <p className="info-salary">
              з/п от {payment_from} {currency}
            </p>
          )} */}

          <img src={dot} alt="dot" className="dot" />
          <p className="info-typeofwork card-text">{type_of_work.title}</p>
        </div>
        <div className="card__content-location ">
          <img src={location} alt="location" className="location-icon" />
          <p className="card-text">{town.title}</p>
        </div>
      </div>
    </div>
  );
};
