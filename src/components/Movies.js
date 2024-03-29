import React, { useState } from "react";
import Items from "./Items";
import { useEffect } from "react";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
export default function Movies() {
  const apiKey = process.env.REACT_APP_NEWS_API;
  console.log(apiKey)
  const results = [
    {
      genre: ["Action", "Comedy", "Thriller"],
      imageurl: [
        "https://m.media-amazon.com/images/M/MV5BMWMzYWE2NDgtN2JiMy00MTZlLWJhODktYzBmMDg4NjUwYTYxXkEyXkFqcGdeQXVyNTM1Mzk2ODI@._V1_UX182_CR0,0,182,268_AL_.jpg",
      ],
      imdbid: "tt6244266",
      imdbrating: 7.8,
      released: 2020,
      synopsis:
        "Two days after the 2016 U.S. Presidential Election, a young careerist is abducted by an at-large intelligence operative carrying a mysterious briefcase, while being hotly pursued by a driven agency director and her dull-witted team.",
      title: "Counterintelligence",
      type: "movie",
    },
    {
      genre: ["Action", "Thriller"],
      imageurl: [
        "https://m.media-amazon.com/images/M/MV5BMTA4M2NjMGUtNzJlOS00NTUzLTkyOTYtZTY2ZGM3M2Q4M2E0XkEyXkFqcGdeQXVyNzU4NzkzNzE@._V1_UX182_CR0,0,182,268_AL_.jpg",
      ],
      imdbid: "tt9286908",
      imdbrating: 7.6,
      released: 2020,
      synopsis:
        "In a bid to save the last of his family, Gutjuk, a young Aboriginal man, teams up with ex-soldier Travis to track down Baywara, the most dangerous warrior in the Territory, his uncle.",
      title: "High Ground",
      type: "movie",
    },
  ];

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("a");
  const [search, setSearch] = useState("");
  const [filter , setFilter]=useState({
    start_year:'',
    end_year:'',
    language:''

  })
  console.log(search);
  const updateMovies = async () => {
    // setPage(1);
    const url =
      `https://ott-details.p.rapidapi.com/advancedsearch?start_year=2022&type=movie&min_imdb=5&language=hindi&sort=latest&genre=${genre}&page=${page}&cacheBuster=` +
      new Date().getTime();
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "799278072dmsheb0969cb3e38372p1cb2f2jsn97cde5cdec15",
        "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMovies(result.results);

      // console.log(result.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    updateMovies();
    // setPage(1);
  }, [genre]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const url =
      `https://ott-details.p.rapidapi.com/advancedsearch?start_year=2022&type=movie&min_imdb=5&sort=latest&genre=${genre}&page=${page}&cacheBuster=` +
      new Date().getTime();
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "799278072dmsheb0969cb3e38372p1cb2f2jsn97cde5cdec15",
        "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMovies(movies.concat(result.results));
      // console.log(result.results);
    } catch (error) {
      console.log(error);
    }
  };
  const genreNews = (genre_needed) => {
    setGenre(genre_needed);
    setPage(1);
  };
  const handleChange= async(e)=>{
    setFilter({
      ...filter,
      [e.target.name]:e.target.value
    })
    const url =
      `https://ott-details.p.rapidapi.com/advancedsearch?start_year=${filter.start_year}&end_year=${filter.end_year}&language=${filter.language}&type=movie&min_imdb=5&sort=latest&genre=${genre}&page=${page}&cacheBuster=` +
      new Date().getTime();
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "799278072dmsheb0969cb3e38372p1cb2f2jsn97cde5cdec15",
        "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMovies(result.results);

      // console.log(result.results);
    } catch (error) {
      console.log(error);
    }


  }
  return (
    <>
      <div className="bg-black p-5 h-full">
        {/* Genre button */}
        <div className="flex justify-center text-white">
          <div className="grid grid-cols-4 gap-x-5 ">
            <button
              className=" flex justify-center hover:border-b-2 items-center border-[#c2410c] hover:border-0 px-2 py-1 hover:font-bold rounded-md text-md cursor-pointer"
              onClick={() => genreNews("Action")}
            >
              Action
            </button>
            <button
              className=" flex justify-center border-b-2 items-center border-black hover:border-[#c2410c] px-10 hover:font-bold rounded-md text-md py-1 cursor-pointer"
              onClick={() => genreNews("Comedy")}
            >
              Comedy
            </button>
            <button
              className=" flex justify-center border-b-2  border-black items-center hover:border-[#c2410c] px-2 hover:font-bold rounded-md text-md py-1 cursor-pointer"
              onClick={() => genreNews("Thriller")}
            >
              Thriller
            </button>
            <button
              className=" flex justify-center border-b-2  border-black items-center hover:border-[#c2410c] px-2  hover:font-bold rounded-md text-md py-1 cursor-pointer"
              onClick={() => genreNews("Horror")}
            >
              Horror
            </button>
          </div>
        </div>
        {/* Search bar */}
        <div className="flex justify-center my-4">
          <div>
            <div class="w-full max-w-xs">
              <form class="">
                <div class="">
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="movie"
                    type="text"
                    placeholder="Movie Name"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>
          <div>
            <button className="bg-white mx-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              Search{" "}
            </button>
          </div>
        </div>
        {/* Advanced Filter form */}
        <div className="flex justify-center">
        <form class="w-full max-w-lg">
          <div class="flex justify-start -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
             
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                
                placeholder="Start Year"
                name="start_year"
                value={filter.start_year}
                onChange={handleChange}
                type="number"
              />
              
            </div>
            <div class="w-full md:w-1/2 px-3">
             
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                name="end_year"
                placeholder="End year"
                value={filter.end_year}
                onChange={handleChange}
                
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                name="language"
                type="text"
                placeholder="Language"
                value={filter.language}
                onChange={handleChange}
              />
            </div>
          </div>
          
        </form>
        </div>
        <InfiniteScroll
          key={`${genre}-${page}`}
          dataLength={movies?.length}
          next={fetchMoreData}
          hasMore={page < 5}
          loader={<Spinner />}
          endMessage={
            <p className="text-white flex justify-center font-semibold text-md">
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="grid grid-cols-6">
            {movies
              ? movies
                  .filter((element) => {
                    return search.toLowerCase() === ""
                      ? element
                      : element.title.toLowerCase().includes(search);
                  })
                  .map((element) => {
                    return (
                      <div className="" key={element?.imdbid}>
                        <Items
                          title={element?.title}
                          rating={element?.imdbrating}
                          genre={element?.genre.slice(0, 2)}
                          image={
                            element?.hasOwnProperty("imageurl")
                              ? element.imageurl.length > 0
                                ? element.imageurl
                                : "https://www.reelviews.net/resources/img/default_poster.jpg"
                              : "https://www.reelviews.net/resources/img/default_poster.jpg"
                          }
                        />
                      </div>
                    );
                  })
              : null}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
