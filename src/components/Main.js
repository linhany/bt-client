import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
<<<<<<< HEAD
import Profile from '../Profile';
import CountryListing from './CountryListing';
import ItemListing from './ItemListing';
import ItemDetail from './ItemDetail';
import OfferToHelp from '../OfferToHelp';
import CreateRequest from '../CreateRequest';
=======

import Profile from './Profile';
import CountryListing from './CountryListing';
import ItemListing from './ItemListing';
import OfferToHelp from './OfferToHelp';
>>>>>>> 938ea18fc1b2232e14176fe0a3d27d7e4c7f913c

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/profile' component={Profile}/>
      <Route path="/country-listing" component={CountryListing} />
<<<<<<< HEAD
      <Route path="/item-listing" component={ItemListing} />
      <Route path="/item-detail" component={ItemDetail} />
      <Route path="/offer-to-help" component={OfferToHelp} />
      <Route path="/create-request" component={CreateRequest} />
=======
      <Route path="/offer-to-help" component={OfferToHelp} />
      <Route path="/item-listing/:country" component={ItemListing} />
>>>>>>> 938ea18fc1b2232e14176fe0a3d27d7e4c7f913c
    </Switch>
  </main>
)

export default Main;
