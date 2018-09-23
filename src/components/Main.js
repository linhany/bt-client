import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Profile from '../Profile';
import CountryListing from './CountryListing';
import ItemListing from './ItemListing';
import ItemDetail from './ItemDetail';
import OfferToHelp from '../OfferToHelp';
import CreateRequest from '../CreateRequest';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/profile' component={Profile}/>
      <Route path="/country-listing" component={CountryListing} />
      <Route path="/item-listing" component={ItemListing} />
      <Route path="/item-detail" component={ItemDetail} />
      <Route path="/offer-to-help" component={OfferToHelp} />
      <Route path="/create-request" component={CreateRequest} />
    </Switch>
  </main>
)

export default Main;
