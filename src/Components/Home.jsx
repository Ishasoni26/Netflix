import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from "axios";
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlusSquare} from "react-icons/ai"

const apiKey = "68478a1e4ea7bc62867471f7990d7d69"
const url ="https://api.themoviedb.org/3/movie"
const imgUrl ="https://image.tmdb.org/t/p/w500"
const upcoming ="upcoming"
const nowPlaying = "now_playing"
const popular = "popular"
const topRated = "top_rated"

const Card = ({img})=>(
  <img className='card' src= {img} alt="cover" />
)
const Row =({title, arr=[]})=> (
  <div className='row'>
    <h2>{title}</h2>
    <div>
{
  arr.map((item , index)=>(
      <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
  ))
  }
</div>

</div>

)

const Home = () => {
  const[upcomingMovies,setUpcomingMovies]= useState([]);
  const[nowPlayingMovies,setNowPlayingMovies]= useState([]);
  const[PopularMovies,setPopularMovies]= useState([]);
  const[TopRatedMovies,setTopRatedMovies]= useState([]);
  useEffect(() => {
  const fetchUpcoming = async()=>{
    const {data:{results}} = await axios.get(`${url}/${upcoming}?api_key=${apiKey}`)
    setUpcomingMovies(results)
    
  };
  const fetchNowPlaying = async()=>{
    const {data:{results}} = await axios.get(`${url}/${nowPlaying}?api_key=${apiKey}`)
   setNowPlayingMovies(results)
  
  };
  const fetchPopular = async()=>{
    const {data:{results}} = await axios.get(`${url}/${popular}?api_key=${apiKey}`)
  setPopularMovies(results)
   
  };
  const fetchTopRated = async()=>{
    const {data:{results}} = await axios.get(`${url}/${topRated}?api_key=${apiKey}`)
    setTopRatedMovies(results)
    
  };
  fetchUpcoming()
  fetchNowPlaying()
  fetchPopular()
  fetchTopRated()

  },[])

  return (
    <section className="home">
      <div className="banner" style={{
        backgroundImage:upcomingMovies[3]? `url(${`${imgUrl}/${upcomingMovies[4].poster_path}`})`:"rgb(16, 16, 16)"
      }}>

        {upcomingMovies[1] && (<h1>{upcomingMovies[1].original_title}</h1>)}
        {upcomingMovies[1] && (<p>{upcomingMovies[1].overview}</p>)}

        <div>
          <button><BiPlay/> Play</button>
          <button>My List <AiOutlinePlusSquare/></button>
        </div>
        
      </div>
      <Row title={"Upcoming"} arr={upcomingMovies}/>
      <Row title={"now Playing"} arr={nowPlayingMovies}/>
      <Row title={"Popular"} arr={PopularMovies}/>
      <Row title={"Top Rated"} arr={TopRatedMovies}/>
     
    </section>
  )
}

export default Home
