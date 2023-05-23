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
  currency: string;
  payment: number | null;
};

export const Card = ({
  profession,
  town,
  type_of_work,
  payment_to,
  payment_from,
  payment,
  currency,
}: CardProps) => {
  const [isChosen, setIsChosen] = useState(false);

  const onStarClick = (e: react.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.preventDefault();
    setIsChosen(!isChosen);
  };
  const PaymentBloch = () => {
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
          <img
            onClick={(e) => onStarClick(e)}
            src={isChosen ? star : emptyStar}
            alt="star"
            className="card__head-star"
          />
        </div>
        <div className="content__info ">
          {PaymentBloch()}
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
