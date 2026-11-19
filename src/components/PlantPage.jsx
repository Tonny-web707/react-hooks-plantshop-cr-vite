import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({
  plants,
  onAddPlant,
  onToggleStock,
  searchTerm,
  onSearchChange,
}) {
  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant} />

      <Search
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />

      <PlantList
        plants={plants}
        onToggleStock={onToggleStock}
      />
    </main>
  );
}

export default PlantPage;