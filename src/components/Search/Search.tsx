import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import Input from '../Input/Input';
import useSearchHook from '../../Hooks/useSearchHook';

import './Search.css';
import { Props } from './Search.interface';
import { Chatrooms } from '../../screens/Root.interface';
import { RootReducerState } from '../../redux/reducers/rootReducer.interface';

const Search: FC<Props> = (): React.ReactElement => {
  //* ---------------------------------------------------
  //* State search handler
  const [search, setSearch] = useState('');
  const handleSearch = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  //* ---------------------------------------------------
  //* Search requests
  const dialogs = useSelector((state: RootReducerState): Chatrooms => {
    return state.dialogsReducer.dialogs;
  });

  //* ---------------------------------------------------
  //* Search logic
  useSearchHook({ dialogs, search });

  return (
    <div className="search">
      <FontAwesomeIcon className="icon search__icon" icon={faSearch} />
      <Input
        className="search__input"
        value={search}
        type="text"
        placeholder="Search Here"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
