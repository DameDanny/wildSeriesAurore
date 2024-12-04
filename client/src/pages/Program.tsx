import { useEffect, useState } from "react";
import "./program.css";

interface seriesProps {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
}

function Program() {
  const [series, setSeries] = useState<seriesProps[] | []>([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((res) => res.json())
      .then((data) => setSeries(data));
  });

  return (
    <>
      <div className="seriesTotal">
        {series.length === 0 ? (
          <p>Nothing to see here</p>
        ) : (
          series.map((serie) => (
            <figure key={serie.id}>
              <img src={serie.poster} alt={serie.title} />
              <h2>{serie.title}</h2>
              <p>{serie.synopsis}</p>
            </figure>
          ))
        )}
      </div>
    </>
  );
}

export default Program;
