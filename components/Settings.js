import React from "react";

export default function Settings({
    amount,
    setAmount,
    category,
    setCategory,
    difficulty,
    setDifficulty,
    startGame,
    // highScores
}) {
    return (
    <div id="container">
        <div className="settings">
            <label htmlFor="amount">Number of questions: </label>
            <input type="number" min="1" max="50" id="amount" value={amount} onChange={e => setAmount(e.target.value)}></input>
         </div>
         <br></br>

        <div className="settings">
            <label htmlFor="category">Category: </label>
            <select id="category" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">Any</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals & Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science & Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">Entertainment: Japanese Anime & Manga</option>
                <option value="32">Entertainment: Cartoon & Animations</option>
            </select>
        </div>
         <br></br>

        <div className="settings">
            <label htmlFor="difficulty">Difficulty: </label>
            <select id="difficulty" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
         </div>
         <br></br>

         {/* <div className="scores">
            <h3>High Scores</h3>
            <ol>
                {highScores.map((s, i) => (
                    <li
                        key={i}>
                        {s.score}/{s.total}
                    </li>
                ))}
            </ol>    
         </div> */}

         <button className="startBtn" onClick={startGame}>Start Game</button>
       </div>
    )
}