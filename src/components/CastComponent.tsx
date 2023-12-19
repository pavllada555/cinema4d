// CastComponent.tsx
import React from 'react';
import { CastComponentProps } from '@/interfaces';

const CastComponent: React.FC<CastComponentProps> = ({ casts }) => {
  return (
    <div className="card-slider flex flex-col md:flex-row flex-wrap p-4 lg:pl-48 mr-10">
      {casts.map((cast, index) => (
        <div key={index} className="flex-none w-full md:w-1/2 lg:w-1/4 xl:w-1/6 p-2">
          <div className="card w-full bg-back_cast border border-black-600 p-4">
            <h5 className="card-title">{cast.name}</h5>
            <img className="card-img-top w-24" src={cast.url_small_image} alt={cast.name} />
            <p className="card-text">{cast.character_name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CastComponent;
