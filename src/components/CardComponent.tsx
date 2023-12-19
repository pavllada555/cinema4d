// src/components/CardComponent.tsx
import React, {useState} from 'react';
import styles from './CardComponent.module.css';
import Link from 'next/link';
import { CardProps } from '@/interfaces';


const CardComponent: React.FC<CardProps> = ({id, title, imgSrc, backgroundClass, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`max-w-300px relative border-radius-30 overflow-hidden mx-15px ${styles.card} ${isHovered && styles.hovered}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className={`w-full h-full absolute z-minus-1 ${styles.background} ${styles[backgroundClass]}`}
      />
      <div className={`p-30px ${styles.content}`}>
        <img
          className={`w-full max-w-full border-radius-10 ${styles.img}`}
          src={imgSrc}
          alt={`${title} poster`}
        />
        <div className={`info mt-20px ${styles.info}`}>
          {isHovered && (
            <div className={`overlay ${styles.overlay}`}>
              <Link href="/details/[id]" as={`/details/${id}`}>
                <button className={`detailsButton ${styles.detailsButton}`}>Details</button>
              </Link>
            </div>
          )}
        </div>
        <h2 className={`font-weight-500 text-black ${styles.title}`}>{title}</h2>
        <p className={`text-ababab text-14px ${styles.description}`}>{description}</p>
      </div>
    </div>
  );
};

export default CardComponent;
