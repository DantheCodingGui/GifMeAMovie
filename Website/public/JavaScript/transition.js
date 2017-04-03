var searchExpanded = false;
var quizExpanded = false;
var searchResultsExpanded = false;

//deals with issues involved with single page website
//handles browser back button presses
window.onpopstate = function(event) { 
	if (searchExpanded && !searchResultsExpanded)
		RecedeSearch();
	else if (searchResultsExpanded)
		RecedeGif();
	else if (quizExpanded)
		RecedeQuiz();
}
function ExpandSearch() { //expand the home page search button to the full page content
	if (quizExpanded) //prevents user expanding both pages when pressed fast enough
		return;
	searchExpanded = true;
	history.pushState({page: "Search"}, "search", "#search");
	unload = document.getElementById("search-load");
	load = document.getElementById("search-full");
	unload.style.opacity = 0;
	DelayStateTransitions(unload, load, true, 0);
}
function RecedeSearch() { //recede the full page content back to the home page
	searchExpanded = false;
	unload = document.getElementById("search-full");
	load = document.getElementById("search-load");
	unload.style.opacity = 0;
	DelayStateTransitions(unload, load, false, 0);
}

function ExpandQuiz() {//expand the home page play button to the full quiz content
	if (searchExpanded)
		return;
	quizExpanded = true;
	history.pushState({page: "Quiz"}, "Quiz", '#quiz');
	unload = document.getElementById("quiz-load");
	load = document.getElementById("quiz-full");
	unload.style.opacity = 0;
	DelayStateTransitions(unload, load, true, 1);
	//Starts the quiz
	showGif();
	nextquestion();
}
function RecedeQuiz() {
	quizExpanded = false;
	unload = document.getElementById("quiz-full");
	load = document.getElementById("quiz-load");
	unload.style.opacity = 0;
	DelayStateTransitions(unload, load, false, 1);	
	//Reset the quiz
	current = -1;
	score = 0;	
}

function ExpandGif() { //transitions from search page to results page
	//document.body.style.cursor = "wait";
	searchResultsExpanded = true;
	history.pushState({page: "Search-Results"}, "Search Results", "#results");
	unload = document.getElementById("search-full");
	load = document.getElementById("search-gif");
	unload.style.opacity = 0;
	DelayStateTransitions(unload, load, -1, 0);
}
function RecedeGif() { //transitions from results page back to search page
	searchResultsExpanded = false;
	document.getElementById("film-name").value = '';
	unload = document.getElementById("search-gif");
	load = document.getElementById("search-full");
	unload.style.opacity = 0;
	DelayStateTransitions(unload, load, -1 , 1);
}

//expands the left or right div to full page width to show 
//their corresponding content
function ExpandContent (sideToExpand) {
	if (sideToExpand == 0) {
		focusSide = document.getElementById("search-container");
		otherSide = document.getElementById("quiz-container");
	}
	else if (sideToExpand == 1) {
		focusSide = document.getElementById("quiz-container");
		otherSide = document.getElementById("search-container");
	}
	focusSide.style.width = "100%";
	focusSide.style.backgroundSize = "100% 100%";
	focusSide.style.position = "absolute";
	otherSide.style.position = "relative";
	otherSide.style.zIndex = -1;
	focusSide.style.zIndex = 5;
}


//opposite of above function, returns full page back to initial state
function RecedeContent (sideToRecede) {
	if (sideToRecede == 0) {
		focusSide = document.getElementById("search-container");
		otherSide = document.getElementById("quiz-container");
	}
	else if (sideToRecede == 1) {
		focusSide = document.getElementById("quiz-container");
		otherSide = document.getElementById("search-container");
	}
	focusSide.style.top = 0;
	focusSide.style.backgroundSize = "200% 100%";
	focusSide.style.width = "50%";
	focusSide.style.zIndex = 1;
	otherSide.style.zIndex = -1;
}

//brings elements into and out of view, while dealing with transition lengths
function DelayStateTransitions(unload, load, expand, side) {
	setTimeout(function() { //delays removal of button by transition length
		unload.style.display = "none";
	}, 300);
	if (expand != -1) {
		setTimeout(function() {
			if (expand)
				ExpandContent(side);
			else
				RecedeContent(side);
		}, 400);
	}
	setTimeout(function() {
		load.style.display = "block";
	}, 900);
	setTimeout(function() {
		load.style.opacity = 1;
	}, 950);
}

/*expands button text into view when the home page is loaded*/
function LoadButtons() {
	left = document.getElementById("search-load");
	right = document.getElementById("quiz-load");
	setTimeout(function() {
			left.style.fontSize = "75px";
	}, 100);
	setTimeout(function() {
		right.style.fontSize = "75px";
	}, 200);
}
