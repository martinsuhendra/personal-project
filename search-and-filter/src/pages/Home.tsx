import {Container} from '@mui/material';
import React, {FunctionComponent} from 'react';
import Heading from '../components/Heading';
import PeopleList from '../components/PeopleList';
import Filtration from '../components/Filtration';

const Home: FunctionComponent = () => {
  return (
    <Container>
      <Heading mt={8} label="Example With Search And Filter" />
      <Filtration />
      <PeopleList />
    </Container>
  );
};

export default Home;
