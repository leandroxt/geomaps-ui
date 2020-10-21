/* eslint-disable camelcase */
import React, {
  ChangeEvent, FormEvent, ReactElement, useState,
} from 'react';
import axios from 'modules/axios';
import { placeMarkerAndPanTo } from 'modules/map';

interface Location {
  location: google.maps.LatLngLiteral;
}

interface Address {
  formatted_address: string;
  geometry: Location;
}

const RESPONSE_STATUS = {
  ZERO_RESULTS: 'ZERO_RESULTS',
  OK: 'OK',
};

interface Props {
  onClose: () => void;
}

export default function Geocoder({ onClose }: Props): ReactElement<Props> {
  const [results, setResults] = useState<Address[]>([]);
  const [status, setStatus] = useState('');
  const [address, setAddress] = useState('');
  function onChange({ currentTarget }: ChangeEvent<HTMLInputElement>): void {
    if (status !== '') {
      setStatus(() => '');
    }
    const { value } = currentTarget;
    setAddress(() => value);
  }

  async function onSubmitSearch(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const response = await axios.get(`/geocoder?address=${address}`);
    const { results: geocoderResults, status: responseStatus } = response.data;
    setResults(() => geocoderResults);
    setStatus(() => responseStatus);
  }

  function closeStatus(): void {
    setStatus(() => '');
    setAddress(() => '');
  }

  function openLocation(a: Address): () => void {
    return () => {
      placeMarkerAndPanTo(a.geometry.location);
      onClose();
    };
  }

  return (
    <form onSubmit={onSubmitSearch}>
      <div className="form-group">
        <label htmlFor="recipient-name" className="col-form-label">Digite o endereço:</label>
        <input type="text" className="form-control" value={address} onChange={onChange} />
      </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-primary">Procurar</button>
      </div>
      {RESPONSE_STATUS.ZERO_RESULTS === status && (
        <div className="alert alert-primary" role="alert">
          Nenhum endereço encontrado.
          <button type="button" className="btn btn-link" onClick={closeStatus}>Fechar</button>
        </div>
      )}
      {results.length > 0 && (
        <>
          <h6>Endreços encontrados:</h6>
          <div className="list-group">
            {results.map((res) => (
              <button
                key={res.geometry.location.lat}
                type="button"
                className="d-flex align-items-center justify-content-between list-group-item list-group-item-action"
                onClick={openLocation(res)}
              >
                {res.formatted_address}
                <span className="material-icons">my_location</span>
              </button>
            ))}
          </div>

        </>
      )}
    </form>
  );
}
