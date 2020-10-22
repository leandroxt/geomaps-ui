/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, useState } from 'react';
import Modal from 'view/shared/modal';

export interface Props {
  icon: string;
  title: string;
  component: any;
}

export default function Feature({ icon, title, component: Component }: Props): ReactElement<Props> {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal(): void {
    setIsOpen((ps) => !ps);
  }

  return (
    <li key={icon} className="nav-item">
      <button
        className="d-flex align-items-center btn btn-info btn-sm mb-2 ml-2"
        type="button"
        onClick={toggleModal}
        style={{ textDecoration: 'none' }}
      >
        <span className="material-icons">{icon}</span>
        {title}
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <Component onClose={toggleModal} />
      </Modal>
    </li>
  );
}
