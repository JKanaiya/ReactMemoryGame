import React, { useEffect, useState } from "react";
import "../Styles/Container.css";

function Container({ resetStreak, addStreak }) {
  let books = [];
  const [cardList, setCardList] = useState([]);
  const [chosen, setChosen] = useState([]);
  const series = ["Malazan", "Discworld", "Wheel+of+Time"];
  useEffect(() => {
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
          books.push({
            title: json.docs[n].title,
            coverID: json.docs[n].cover_i,
          });
        }
        if (cardList.length == 0) {
          rollCards();
        }
        return json.docs;
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
    return () => {
      books = [];
    };
  });

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

  const rollCards = function () {
    setCardList(
      books.map((book) => {
        const url = `https://covers.openlibrary.org/b/id/${book.coverID}-M.jpg`;
        return (
          <li key={book.coverID}>
            <img src={url} alt={book.title} id={book.coverID} />
            <p>{book.title}</p>
          </li>
        );
      }),
    );
  };
  return (
    <ul
      onClick={(event) => {
        event.stopPropagation();
        let target = event.target;
        if (testChosen(target.id)) {
          rollCards();
        } else {
          setChosen([]);
        }
      }}
    >
      {cardList}
    </ul>
  );
}

export default Container;
