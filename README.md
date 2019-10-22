# Dota Supernova - A gaming data visualization

Dota 2 has become one of the largest esports games in history, with its global tournament The International breaking $30 million as of 2019. While the professional scene is flourishing, many casual and veteran gamers also enjoy the game. This project represents a data visualization of both of the scenes, with data both on the macro and granular level, depending on what the user wishes to see. <a href="https://legendofbenji.github.io/Dota-Supernova/">Live Demo</a>

<h3>MVPs Features</h3>

<ul>
  <li>Users will be able to click on information on the sunburst chart itself to get more specific information about the piece of information that they are interested in.</li>
  <li>A simple toggle feature will allow for information between professional and casual matches, rendering two similar charts but with different information</li>
  <li>The information will be displayed on the chart itself, which will display information both with text and visuals.</li>
</ul>

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

<h3>Implementation Timeline</h3>

<ol>
  <li>Day 1: Learn D3 sunburst charts and gain more insight on how to best utilize the dota API. The intitial steps will be to learn about how to use D3, followed by learning how to implement the sunburst chart in particular, finally with gleaming information from the Dota API.</li>
  <li>Day 2: implement the switch functionality between pro and normal information as well as the highest layer of the sunburst. The initial steps will be to be parsing the information properly from the Dota 2 API in two separate CSV files before adding this functionality.</li>
  <li>Day 3: implement the rest of the sunburst chart functionality, make sure it all works as intended through spot testing. The focus here will be to ensure that all of the information renders as intended, and that the toggling functionality also works. Going over the CSV chart at the end to see if there is any other interesting information that could be added, or any extra unnecessary information that could be taken away to make the graph look cleaner.</li>
  <li>Day 4: clean up css and any minor bugs that may still linger. Add information regarding linkedin, github, add the title and footer, make it look professional and ready for presentation.</li>  
</ol>
