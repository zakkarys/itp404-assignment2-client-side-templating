const redditTemplate = Handlebars.compile(
	document.getElementById('reddit-template').innerHTML
	);

Handlebars.registerHelper('subreddit', function(commas) {
	return commas.toLocaleString('eng');
});

$('#subreddit-link').submit(async function(event) {
  event.preventDefault();
  $('#results').toggleClass('loader');
  $('#results').html('');

try {
let subredditsearch = $('#search').val();

let listing = await $.getJSON('https://www.reddit.com/r/' + subredditsearch + '.json');
let sanitizedHtml = redditTemplate({ listing }); 
$('#results').html(sanitizedHtml); 
$('#results').toggleClass('loader');
} catch (error) {
	$('#results').html('<p>Oops, something went wrong.</p>')
}

});