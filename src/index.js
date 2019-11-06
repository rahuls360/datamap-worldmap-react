import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Datamap from "datamaps";

import "./styles.css";

function App() {
  useEffect(() => {
    var myMap = new Datamap({
      element: document.getElementById("basic"),
      scope: "world",
      responsive: true,
      fills: {
        defaultFill: "#bbb",
        firstWorld: "green",
        thirdWorld: "yellow",
        interestingSpot: "purple",
        boringSpot: "blue"
      },
      geographyConfig: {
        popupOnHover: true,
        highlightOnHover: true,
        highlightFillColor: "red",
        popupTemplate: function(geography, data) {
          return (
            '<div class="hoverinfo">' +
            geography.properties.name +
            " - Year of formation:" +
            data.formationDate +
            " "
          );
        }
      },
      data: {
        // Country Codes list https://countrycode.org/
        USA: {
          fillKey: "firstWorld",
          formationDate: 1900
        },
        CHN: {
          fillKey: "thirdWorld",
          formationDate: 1700
        },
        JPN: {
          fillKey: "firstWorld",
          formationDate: 1930
        },
        AUS: {
          fillKey: "firstWorld",
          formationDate: 1350
        },
        IND: {
          fillKey: "thirdWorld",
          formationDate: 1500
        }
      }
    });

    // Manage responsiveness
    window.addEventListener("resize", function() {
      myMap.resize();
    });

    // configure arc
    myMap.arc(
      [
        {
          origin: "USA",
          destination: "JPN",
          options: {
            strokeWidth: 10,
            strokeColor: "rgba(100, 10, 200, 0.4)",
            greatArc: true,
            animationSpeed: 3000
          }
        },
        {
          origin: {
            latitude: 30.194444,
            longitude: -97.67
          },
          destination: {
            latitude: 13.793333,
            longitude: 77.290556
          }
        }
      ],
      { strokeWidth: 2, arcSharpness: 2.5 }
    );

    // configure bubbles
    myMap.bubbles(
      [
        {
          name: "Tourist Spot 1",
          radius: 5,
          centered: "IND",
          tourist: 3800,
          fillKey: "boringSpot"
        },
        {
          name: "Tourist Spot 2",
          radius: 5,
          tourist: 1500,
          centered: "USA",
          fillKey: "boringSpot"
        },
        {
          name: "Tourist Spot 3",
          radius: 5,
          tourist: 15000,
          fillKey: "interestingSpot",
          latitude: 11.415,
          longitude: 165.1619
        },
        {
          name: "Tourist Spot 4",
          radius: 5,
          tourist: 50000,
          fillKey: "interestingSpot",
          latitude: 73.482,
          longitude: 54.5854
        }
      ],
      {
        popupTemplate: function(geo, data) {
          return (
            '<div class="hoverinfo">' +
            data.name +
            "<br /> No of Tourists:" +
            data.tourist
          );
        }
      }
    );

    //load legend
    myMap.legend();
  }, []);
  return (
    <div>
      <div
        id="basic"
        style={{ position: "relative", width: "auto%", height: "30%" }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
