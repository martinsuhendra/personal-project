import {Container} from '@mui/material';
import React, {FunctionComponent} from 'react';
import Heading from '../components/Heading';
import PeopleList from '../components/PeopleList';
import SearchAndFilter from '../components/SearchAndFilter';

const Home: FunctionComponent = () => {
  return (
    <Container>
      <Heading mt={4} label="Example With Search And Filter" />
      <SearchAndFilter />
      <PeopleList />
    </Container>
  );
};

export default Home;
