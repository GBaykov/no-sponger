import react, { useState } from 'react';
import './index.css';
import star from '../../assets/star.svg';
import emptyStar from '../../assets/empty-star.svg';
import location from '../../assets/location.svg';
import dot from '../../assets/dot.svg';

export type CardProps = {
  profession: string;
  town: string;
  type_of_work: string;
  payment_to?: number;
  payment_from?: number;
  currency?: string;
};

export const Card = ({
  profession,
  town,
  type_of_work,
  payment_to,
  payment_from,
  currency,
}: CardProps) => {
  const [isChosen, setIsChosen] = useState(false);

  const onStarClick = (e: react.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.preventDefault();
    setIsChosen(!isChosen);
  };

  return (
    <div className="card">
      <div className="card__content">
        <div className="content__head ">
          <p className="card__head-title">{profession}</p>
          <img
            onClick={(e) => onStarClick(e)}
            src={isChosen ? star : emptyStar}
            alt="star"
            className="card__head-star"
          />
        </div>
        <div className="content__info ">
          {/* {currency && <p className="info-salary">зп {currency}</p>} */}

          {payment_to ? (
            <p className="info-salary">
              з/п {payment_from} - {payment_to} {currency}
            </p>
          ) : (
            <p className="info-salary">
              з/п от {payment_from} {currency}
            </p>
          )}
          {/* {payment_to && payment_from && (
            <p className="info-salary">
              з/п {payment_from} - {payment_to} {currency}
            </p>
          )}
          {!payment_to && payment_from && (
            <p className="info-salary">
              з/п от {payment_from} {currency}
            </p>
          )} */}

          <img src={dot} alt="dot" className="dot" />
          <p className="info-typeofwork card-text">{type_of_work}</p>
        </div>
        <div className="card__content-location ">
          <img src={location} alt="location" className="location-icon" />
          <p className="card-text">{town}</p>
        </div>
      </div>
    </div>
  );
};
