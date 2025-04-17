import React, { useEffect, useState } from "react";
import "../Styles/Container.css";

function Container({ resetStreak, addStreak, score }) {
  const [books, setBooks] = useState([]);
  const [chosen, setChosen] = useState([]);
  useEffect(() => {
    let r = [];
    console.log("aa");
    const series = ["Malazan", "Discworld", "Wheel+of+Time"];
    const url = `https://openlibrary.org/search.json?q=${series[Math.floor(Math.random() * 3)]}&limit=6&language:en`;
    async function fetchData() {
      try {
        const response = await fetch(url, {
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error(`Response Status:${response.status}`);
        }
        const json = await response.json();
        for (let n = 0; n < 6; n++) {
          r.push({
            title: json.docs[n].title,
            coverID: json.docs[n].cover_i,
          });
        }
        setBooks(r);
        books.sort(() => Math.random() - 0.5);
        return json.docs;
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
    return () => {
      setBooks([]);
    };
  }, [score]);

  const testChosen = function (id) {
    if (chosen.includes(id)) {
      resetStreak();
      return false;
    } else {
      setChosen([...chosen, id]);
      addStreak();
      return true;
    }
  };
  return (
    <ul
      onClick={(event) => {
        event.stopPropagation();
        let target = event.target;
        if (testChosen(target.id)) {
          books.sort(() => Math.random() - 0.5);
        } else {
          books.sort(() => Math.random() - 0.5);
          setChosen([]);
        }
      }}
    >
      {books.map((book) => {
        const url = `https://covers.openlibrary.org/b/id/${book.coverID}-M.jpg`;
        return (
          <li key={book.coverID}>
            <img src={url} alt={book.title} id={book.coverID} />
            <p>{book.title}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default Container;
