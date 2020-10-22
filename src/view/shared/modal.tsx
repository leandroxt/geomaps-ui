/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  ReactElement, MouseEvent,
} from 'react';
import classnames from 'utils/classnames';
import style from './modal.module.css';

interface Props {
  isOpen: boolean;
  onClose: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactElement | ReactElement[] | Element;
}

export default function Modal({ isOpen, onClose, children }: Props): ReactElement<Props> {
  const css = classnames({
    [style.modal]: true,
    [style.modalopen]: isOpen,
  });

  return (
    <div className={css}>
      <div className={style['modal-content']}>
        <span
          className={style.close}
          onClick={onClose}
          tabIndex={0}
          role="button"
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}
