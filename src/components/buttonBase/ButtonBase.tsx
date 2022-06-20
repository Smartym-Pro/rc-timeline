import { ReactNode, useRef, SyntheticEvent } from 'react';
import React from 'react';
import { EventStyle } from '../../common/interface';

export interface ButtonBaseProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  children?: ReactNode;
  style?: EventStyle;
  id?: string;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonBase = (props: ButtonBaseProps) => {
  const { id, onClick, className, style, children, onMouseDown, onMouseUp } = props;

  const buttonRef = useRef(null);

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }
  };

  const buttonClassName: string = `Kalend__button ${className} Kalend__ButtonBase`;

  return (
    <button
      id={id}
      ref={buttonRef}
      onClick={onButtonClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className={buttonClassName}
      style={style}
    >
      {children}
    </button>
  );
};

export default ButtonBase;
