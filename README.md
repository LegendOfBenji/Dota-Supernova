# Dota Supernova - A gaming data visualization

Dota 2 has become one of the largest esports games in history, with its global tournament The International breaking $30 million as of 2019. While the professional scene is flourishing, many casual and veteran gamers also enjoy the game. This project represents a data visualization of both of the scenes, with data both on the macro and granular level, depending on what the user wishes to see.

<h3>How to use</h3>

The chart itself is mostly intuitive. The chart will render information from lowest to highest order of specificity. Users may also click the center of the chart to go up one level.

<h3>Technologies handled</h3>

<a href="https://docs.opendota.com/#section/Introduction">The Dota 2 API</a> and D3.js are the libraries utilized for this project, the sunburst chart in particular. The rest is done in vanilla javascript.

<h3>Wireframe</h3>
<ul>
  <li>(a) will allow users to pick at the highest level what kind of information they wish to see, whether it be matches, players, rankings, or teams.</li>
  <li>(b) shows the next level of specificity, showing options such as which player to choose from, what team, or a specific match.</li>
  <li>(c) represents the most granular level of data, showing information from that match, a players specific stats, or the averages of a team.</li>
  <li>(d) will accredit the libraries used, as well as include links to my personal github and linkedin.</li>
  <li>(e) consists of two options, casual or professional gameplay. The sunburst chart will then give information based on the specified option.</li>
</ul>
<img src="https://frapwithfriends1-seeds.s3.amazonaws.com/Screen+Shot+2019-10-14+at+8.21.56+PM.png" />
