import React from 'react';

function Rating(props) {
  const { rating, numReviews, caption } = props;
  return (
    <div className="rating">
      <span>
        <ion-icon
          name={
            rating >= 1
              ? 'star'
              : rating >= 0.5
              ? 'star-half'
              : 'star-outline'
          }
        >
        </ion-icon>
      </span>
      <span>
        <ion-icon
          name={
            rating >= 2
              ? 'star'
              : rating >= 1.5
              ? 'star-half'
              : 'star-outline'
          }
        ></ion-icon>
      </span>
      <span>
        <ion-icon
          name={
            rating >= 3
              ? 'star'
              : rating >= 2.5
              ? 'star-half'
              : 'star-outline'
          }
        ></ion-icon>
      </span>
      <span>
        <ion-icon
          name={
            rating >= 4
              ? 'star'
              : rating >= 3.5
              ? 'star-half'
              : 'star-outline'
          }
        ></ion-icon>
      </span>
      <span>
        <ion-icon
          name={
            rating >= 5
              ? 'star'
              : rating >= 4.5
              ? 'star-half'
              : 'star-outline'
          }
        ></ion-icon>
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{' ' + numReviews + ' reviews'}</span>
      )}
    </div>
  );
}
export default Rating;