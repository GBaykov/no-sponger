import react, { useState } from 'react';
import './index.css';
import star from '../../assets/star.svg';
import emptyStar from '../../assets/empty-star.svg';
import location from '../../assets/location.svg';

export type CardProps = {
  profession: string;
  town: string;
  type_of_work: string;
  payment_to?: string;
  payment_from?: string;
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

  return (
    <div className="card">
      <div className="card__content content">
        <div className="content__head head">
          <p className="head-title">{profession}</p>
          <img src={isChosen ? star : emptyStar} alt="star" className="head-star" />
        </div>
        <div className="content__info info">
          {currency ? (
            <p className="info-salary">зп {currency}</p>
          ) : (
            <p className="info-salary">зп от {payment_to}</p>
          )}

          <p className="info-typeofwork card-text">{type_of_work}</p>
        </div>
        <div className="content__location location">
          <img src={location} alt="location" className="location-icon" />
          <p className="card-text">{town}</p>
        </div>
      </div>
    </div>
  );
};
