import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home';
import Brands from './Brands';
import WorkshopAndPrices from './WorkshopAndPrices';
import Contact from './Contact';
import ProductDetails from './ProductDetails';
import ComplaintsAndReturnPolicies from './ComplaintsAndReturnPolicies';
import AboutUs from './AboutUs.js';
import NotFound from './NotFound.js'; 

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/maerker' component={Brands}/>
      <Route exact path='/vaerksted-og-priser' component={WorkshopAndPrices}/>
      <Route exact path='/kontakt' component={Contact}/>
      <Route path='/produkt/:productId' component={ProductDetails}/>
      <Route path='/reklamation-og-returregler' component={ComplaintsAndReturnPolicies}/>
      <Route path='/om-os' component={AboutUs} />
      <Route path="*" component={NotFound} />
    </Switch>
  </main>
)

export default Main;
