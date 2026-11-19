import React, { useEffect, useState } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  // Store all plants
  const [plants, setPlants] = useState([]);

  // Store the search text
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch plants when the app first loads
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  // Add a new plant to the backend
  function addPlant(newPlant) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((plant) => {
        setPlants((previousPlants) => [...previousPlants, plant]);
      })
      .catch((error) => console.error("Error adding plant:", error));
  }

  // Mark a plant as sold out
  function toggleStock(id) {
    setPlants((previousPlants) =>
      previousPlants.map((plant) =>
        plant.id === id
          ? { ...plant, soldOut: !plant.soldOut }
          : plant
      )
    );
  }

  // Filter plants using the search text
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />

      <PlantPage
        plants={filteredPlants}
        onAddPlant={addPlant}
        onToggleStock={toggleStock}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </div>
  );
}

export default App;