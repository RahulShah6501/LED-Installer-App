import React from "react";

function EquipmentSelector({ equipment, selectedModel, setSelectedModel }) {
  return (
    <div>
      <label htmlFor="equipment">Select Equipment:</label>
      <select
        id="equipment"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        <option value="">Select a model</option>
        {equipment.map((item) => (
          <option key={item["Screen MFR"]} value={item["Screen MFR"]}>
            {item.Make} - {item["Screen Size"]} inches
          </option>
        ))}
      </select>
    </div>
  );
}

export default EquipmentSelector;
