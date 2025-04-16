import React, { useEffect } from "react";
import "../Styles/Container.css";

function Container() {
  const books = [];
  const series = ["Malazan", "Discworld", "Wheel+of+Time"];
  useEffect(() => {
    const url = `https://openlibrary.org/search.json?q=${series[Math.floor(Math.random() * 3)]}&limit=12`;
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
        console.log(books);
        return json.docs;
      } catch (error) {
        console.error(error.message);
      }
    }
    // TODO: Find out how to add the .then functionality to allow implementation of cardList properly to allow the proper return
    fetchData();
    return () => {};
  });
  const cardList = books.map((book) => {
    const url = `https://covers.openlibrary.org/b/id/${book.coverID}.jpg`;
    return (
      <li>
        <p>{book.title}</p>
        <img src={url} alt="" />
      </li>
    );
  });
  const turl = `https://covers.openlibrary.org/b/id/${374277}.jpg`;
  return (
    <ul>
      <img src={turl} alt="" />
    </ul>
  );
}

export default Container;
