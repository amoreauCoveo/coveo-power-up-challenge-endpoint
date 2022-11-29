const trivia = [
    "The charcoal drawing in <i>Titanic</i> was drawn by movie director James Cameron himself.",
    "The first movie to feature a flushing toilet was Alfred Hitchcock's <i>Psycho</i>, in 1960.",
    "The movie <i>Toy Story 2</i> was accidentally deleted when it was 90% done, and was only saved because the technical director had a copy at home while working remotely.",
    "The script for <i>Taxi Driver</i> was written in just two weeks.",
    "The snow we see in <i>The Wizard of Oz</i> is actually asbestos.",
    "The house in <i>Up</i> is held up by 10,297 balloons, each of which were individually added by animators.",
    "The sound of the raptors from <i>Jurassic Park</i> are taken from recordings of tortoises mating.",
    "The famous line “We're gonna need a bigger boat” from <i>Jaws</i> was improvised.",
    "Due to its small budget and huge success, the most profitable movie of all time is <i>Paranormal Activity</i>.",
    "When adjusted for inflation, the highest-grossing film of all time is <i>Gone With The Wind</i>, which made over US$3.7M, adjusted for 2020.",
    "George Lucas's dog inspired two characters from his movies. His dog's name is Indiana (like Indiana Jones), and its size in the front seat of his car inspired the creation of Chewbacca from Star Wars.",
    "Before 1940, Oscar winners were given in advance to newspapers, before the actual ceremony.",
    "The lines of cryptic code from <i>The Matrix</i> are symbols from a sushi cookbook.",
    "The cat from the opening scene of <i>The Godfather</i> was a stray found on the Paramount lot.",
    "Tom Hanks was not paid for his role in <i>Forrest Gump</i>. Instead, he decided to take a percentage of the profit from the movie, now estimated at around $40M.",
    "Keanu Reeves performed almost 95% of his fight scenes in <i>John Wick: Chapter 2</i>.",
    "Because actor Sean Bean was scared of flying, he would often spend two hours climbing a mountain fully dressed as Boromir to shoot scenes for <i>The Lord of the Rings: The Followship of the Ring</i>.",
    "The only line Legolas ever says to Frodo in The Lord of the Rings trilogy is “and you have my bow”.",
    "If you add all the scenes taking place in 1912 in the movie <i>Titanic</i>, it adds up to two hours and forty minutes, the exact time it took for the real Titanic to sink.",
    "Brad Pitt and Edward Norton both learned how to make soap for <i>Fight Club</i>.",
    "Brandon Fraser almost died when filming <i>The Mummy</i> during the hanging scene, and had to be resuscitated.",
    "To lighten the mood, Robin Williams told jokes and performed comedy sketches on the set of <i>Schindler's List</i>. Some of his jokes ended up being used for his character in <i>Aladdin</i>.",
    "Stanley Kubrick destroyed almost all the props and sets from <i>2001: A Space Odyssey</i> because he didn't want them to be used in any lesser science fiction films.",
    "James Cameron was convinced CGI effects were ready for his next movie, <i>Avatar</i>, when he saw Gollum in <i>The Lord of the Rings: The Two Towers</i>.",
    "The mask used in <i>Halloween</i> is a Captain Kirk face mask spray-painted white, with teased out hair, and with reshaped eye holes.",
    "The <a href=\"https://www.youtube.com/watch?v=xn6hhrX34Pw\">Wilhelm Scream</a> is a stock sound effect used in over 400 films and TV shows, including all Star Wars and Indiana Jones films, two Lord of the Rings, most Tarantino movies, and many Disney animated classics.",
    "In order to subconsciously destabilize the audience, the movie <i>Seven</i> shot all the office scenes in houses refurnished as offices and all the home scenes in offices refurbished as living spaces."
]

const triviaToShow = trivia[Math.floor(Math.random() * trivia.length)];

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#triviaquote").innerHTML = triviaToShow;

    const root = document.querySelector("#search");
    Coveo.$$(root).on("doneBuildingQuery", function (e, args) {
        let currentQuery = args.queryBuilder.expression.parts[0];
        if (currentQuery) {
            currentQuery = currentQuery.toLowerCase();
        }
        console.log(currentQuery);
        if (currentQuery == "goncharov" || currentQuery == "martin scorsese") {
            args.queryBuilder.constantExpression.parts[0] += " OR @source=secret";
        }
    })
});