import { useState, useEffect } from "react";

export function Pokemon(){
  const[input, setInput] = useState("");
  const[error, setError] = useState("");
  const[loading, setLoading] = useState("");
  const[pokeName, setPokeName] = useState("ditto");

  //get pokemon image
  const getPokemon = async (name) =>{
    if(!name){
      setError("No Pokemon Entered, enjoy this and try again!");  
      return `https://i.etsystatic.com/34682343/r/il/8ed38b/4775607228/il_fullxfull.4775607228_6o8y.jpg`;
    }
    name = name.toLowerCase();
    setError("");
    setLoading("Loading...");
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = await response.json().catch(async () => {
      console.log("failed to fetch, show strongg diglett");  
      return;
    });
    setLoading("");
    
    if(pokemon !== undefined){
      setPokeName(name);
      return pokemon.sprites.front_shiny;
    }
    //show whatever you want if failure, right here

    // const p = await fetch(`https://pokeapi.co/api/v2/pokemon/diglett`
    // ).then((r) =>{
    //   return r.json();
    // })
    // return p.sprites.front_shiny;
    setPokeName("Hot digtrio");
    setError("Pokemon wasn't found, enjoy this and try another!");
   return `https://i.etsystatic.com/34682343/r/il/8ed38b/4775607228/il_fullxfull.4775607228_6o8y.jpg`;
  }

  const[pokeImage, setPokeImage] = useState("");
  //first image shown is ditto
  useEffect(() =>{
    getPokemon("ditto").then(pic => setPokeImage(pic));
  }, []);
  
  return(
    <div className="Pokemon">
      <h2>Pokemon: {pokeName}</h2>
      <img height="500"src ={pokeImage} alt={`Pokemon ${pokeName}`}/>
      <h1>{loading}</h1>
      <h2>
        <input  className="textI" type="text" placeholder="pokemon name" onChange={e => setInput(e.target.value)}/>
      </h2>
      <h3>  
        <button className="button" type="button" onClick={async e => setPokeImage(await getPokemon(input))}>get Pokemon</button>  
      </h3>
      {error}
    </div>
  );
}