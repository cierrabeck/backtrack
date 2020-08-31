import React from "react";
import "./Content.scss";

const Content = props => {
  const backgroundStyles = {
    backgroundImage:`url(${
      props.items[0].album.images[0].url
    })`,
  };

  const originalityScore = getOriginalityScore()
  const mostBasic = getMostBasic()
  const mostObscure = getMostObscure()

  function getOriginalityScore() {
    var total = 0
    for (const song of props.items.slice(0, 20)) {
      total += song.popularity
    }
    return 100-Math.round(total/20)
  }

  function mapOriginality() {
    if (originalityScore<10) {
      return ("congratulations, you have the most basic music taste")
    } else if (originalityScore<20) {
      return ("while you have some obscure tracks in your mix, most of your music is mainstream")
    } else if (originalityScore<30) {
      return ("while you have some obscure tracks in your mix, most of your music is mainstream")
    } else if (originalityScore<40) {
      return ("while you have some obscure tracks in your mix, most of your music is mainstream")
    } else if (originalityScore<50) {
      return ("while you have some obscure tracks in your mix, most of your music is mainstream")
    } else if (originalityScore<70) {
      return ("while you have some obscure tracks in your mix, most of your music is mainstream")
    } else if (originalityScore<90) {
      return ("while you have some obscure tracks in your mix, most of your music is mainstream")
    } else {
      return ("you only listen to SUPER obscure music. where do you even find these?")
    }
  }

  function getMostObscure() {
    var mostObscure = props.items[0]
    for (const song of props.items.slice(0, 20)) {
      if (song.popularity < mostObscure.popularity) {
        mostObscure = song;
      }
    }
    console.log(mostObscure)
    return mostObscure
  }

  function getMostBasic() {
    var mostBasic = props.items[0]
    for (const song of props.items.slice(0, 20)) {
      if (song.popularity > mostBasic.popularity) {
        mostBasic = song;
      }
    }
    console.log(mostBasic)
    return mostBasic
  }


  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet"></link>
      <div className="main">
        <h3> your month in review </h3>
        <div className="originalityScore">
          <h2 className="originalityh2"> originality score </h2>
          <p className="disc"/>
          <div className="plaque">
            <h4 className="score"> {originalityScore} </h4>
            <h2 className="scoreDescription"> {mapOriginality()} </h2>
          </div>
        </div>
        <div className="plaques">
          <div className="most"> 
            <h2 className="originalityh2"> most obscure song </h2>
            <img src={mostObscure.album.images[0].url} className="cover"/>
            <h2 className="songTitle"> {mostObscure.name} by {mostObscure.artists[0].name} </h2>
          </div>
          <div className="most"> 
            <h2 className="originalityh2"> most basic song </h2>
            <img src={mostBasic.album.images[0].url} className="cover"/>
            <h2 className="songTitle"> {mostBasic.name} by {mostBasic.artists[0].name} </h2>
          </div>
        </div>

        <div className="top-songs">
          <div className="covers">
            <img src={props.items[4].album.images[0].url} className="album-cover"/>
            <img src={props.items[3].album.images[0].url} className="album-cover1"/>
            <img src={props.items[2].album.images[0].url} className="album-cover2"/>
            <img src={props.items[1].album.images[0].url} className="album-cover3"/>
            <img src={props.items[0].album.images[0].url} className="album-cover4"/>
          </div>
          <div className="songs"> 
          <h1>TOP 5 TRACKS: </h1> 
            <ol>
              <li>{props.items[0].name} by {props.items[0].artists[0].name}</li>
              <li>{props.items[1].name} by {props.items[1].artists[0].name}</li>
              <li>{props.items[2].name} by {props.items[2].artists[0].name}</li>
              <li>{props.items[3].name} by {props.items[3].artists[0].name}</li>
              <li>{props.items[4].name} by {props.items[4].artists[0].name}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
