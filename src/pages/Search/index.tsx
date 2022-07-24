import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

type FormData = {
  user: string;
};

type Github = {
  url: string;
  followers: string;
  location: string;
  name: string;
  avatar_url: string;
};

const Search = () => {
  const [github, setGithub] = useState<Github>();
  const [formData, setFormData] = useState<FormData>({ user: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .get(`https://api.github.com/users/${formData.user}`)
      .then((response) => {
        setGithub(response.data);
      })
      .catch((error) => {
        setGithub(undefined);
      });
  };

  return (
    <div className="search-container">
      <div className="container search-card">
        <h1>Encontre um perfil Github</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="user"
              value={formData.user}
              className="search-input"
              placeholder="Usuário Github"
              onChange={handleChange}
            />
            <button type="submit" className="btn search-button">
              Encontrar
            </button>
          </div>
        </form>
      </div>
      {github && (
        <div className="information-card-container">
          <img className="img" src={github.avatar_url} />
          <div className="inf-card-content">
            <h4>Informações</h4>
            <div className="card">
              <ResultCard title="Perfil: " description={github.url} />
            </div>
            <div className="card">
              <ResultCard title="Seguidores: " description={github.followers} />
            </div>
            <div className="card">
              <ResultCard title="Localidade: " description={github.location} />
            </div>
            <div className="card">
              <ResultCard title="Nome: " description={github.name} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
