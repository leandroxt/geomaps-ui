import React, { ChangeEvent, ReactElement, useState } from 'react';
import axios from 'axios';

interface Props {
  onSelectLayer: (name: string) => void;
}

export default function Header({ onSelectLayer }: Props): ReactElement<Props> {
  const [search, setSearch] = useState<string>('');
  const [suggestions, setSuggestions] = useState<{ id: number; name: string }[]>([]);

  async function onSearch({ currentTarget }: ChangeEvent<HTMLInputElement>): Promise<void> {
    const { value } = currentTarget;
    setSearch(() => value);

    if (value === '') {
      setSuggestions(() => []);
      return;
    }

    const response = await axios.get(`/api/municipio/search?name=${value}`);
    setSuggestions(() => [...response.data]);
  }

  function onSelectSuggestion(name: string): void {
    onSelectLayer(name);
    setSuggestions(() => []);
    setSearch(() => '');
  }

  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="/#">GeoMaps</a>
      <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Procure por municípios..."
          aria-label="Procure por municípios..."
          value={search}
          onChange={onSearch}
        />
        <div style={{ position: 'absolute', width: '100%' }}>
          <div className="list-group">
            {suggestions.map((s) => (
              <button
                key={s.id}
                type="button"
                className="list-group-item list-group-item-action"
                onClick={() => onSelectSuggestion(s.name)}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

      </div>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <a className="nav-link" href="/#">Sair</a>
        </li>
      </ul>
    </nav>
  );
}
