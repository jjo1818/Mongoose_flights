import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";

// AAU, I want to view a list of all flights (index view) that displays each flight's airline, flight no., and departure date/time

function Index(props) {
  // can't use hooks or state
  // can't use event listeners in the same way
  return (
    <DefaultLayout>

      <div className="d-flex flex-column flex-wrap justify-content-around align-items-center">
        <h1>Welcome to Augustus Airlines - Index</h1>

        {/* buttons */}
        <div className="d-flex">
          <a href="/flights/new">
            <button type="button" className="btn btn-outline-primary mx-3">
              Add...
            </button>
          </a>
          <form action="/flights/clear?_method=DELETE" method="POST">
            <button className="btn btn-outline-danger">Delete</button>
          </form>
        </div>

        {/* <div className="flex-column justify-content-center align-items-center">
          <div>
            <ol>
              <li>Flights list that displays each flight's airline, flight no., and departure date/time</li>
            </ol>
          </div>
        </div> */}

        <ul>
            
          {props.flights.map((flight, index) => 
            <div key={index} >
                <a href={`/flights/${flight._id}`}>
              <li >
                
                  <strong>Airline: {flight.airline}</strong>
                  <div></div>
                  <strong>Flight No.: {flight.flightNo}</strong>
                  <br /> 
                  <strong>Departure Time: {flight.departs.toLocaleTimeString()}</strong>
                  <br />
                  <strong>Departure Day: {flight.departs.toLocaleDateString()}</strong>
                  <br />
                  <strong>Airport: {flight.airport}</strong>
                  <br />
                  {/* <strong>Destinations: {flight.destinations}</strong> */}
                  <br />
                
                </li>
                </a>
            </div>
        )}
        </ul>
      </div>
    </DefaultLayout>
  );
}

export default Index;