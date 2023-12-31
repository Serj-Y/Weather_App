import React from "react";

type TopButtonType = {
  setQuery: (value: string) => void;
};

export default function TopButtons({ setQuery }: TopButtonType) {
  const cites = [
    {
      id: 1,
      title: "Kyiv",
    },
    {
      id: 2,
      title: "London",
    },
    {
      id: 3,
      title: "Milan",
    },
    {
      id: 4,
      title: "Washington",
    },
  ];

  return (
    <div className="flex justify-between items-center my-6">
      {cites.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium cursor-pointer transition ease-out hover:scale-125"
          onClick={() => setQuery(city.title)}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}
