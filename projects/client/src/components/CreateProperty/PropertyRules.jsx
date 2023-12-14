import React, { useState } from "react";

const PropertyRules = ({ propertyRules, setPropertyRules }) => {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmedText = inputText.trim();
      if (trimmedText !== "") {
        setItems((prevItems) => [...prevItems, trimmedText]);
        setInputText("");
        setPropertyRules((prevRules) => [...prevRules, trimmedText]);
      }
    }
  };

  return (
    <div className="my-4">
      <input
        type="text"
        className="w-full p-2 border"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter to add to the list..."
      />

      <ul className="pl-4 mt-2 list-disc">
        {items.map((item, index) => (
          <li key={index} className="mb-1">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyRules;
