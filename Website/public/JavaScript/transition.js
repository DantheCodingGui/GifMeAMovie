var searchExpanded = false;
var quizExpanded = false;

const DESKTOP = 0;
const MOBILE_PORTRAIT = 1;
const MOBILE_LANDSCAPE = 2;

const SEARCH = 0;
const QUIZ = 1;

var screenType;

SetScreenType();
//ensures that if mobile users change orientation website will
//respond without a reload

function OrientationChange() {
	document.getElementById("search-container").style.display = "initial";
	document.getElementById("quiz-container").style.display = "initial";
	window.setTimeout(SetScreenType,10);
}

function SetScreenType() {
	if (window.matchMedia("screen and (max-device-width: 499px) and (max-aspect-ratio: 121/80)").matches)
		screenType = MOBILE_PORTRAIT;
	else if (window.matchMedia("screen and (min-device-width: 500px)and (max-device-width: 749px) and (min-aspect-ratio: 121/80)").matches)
		screenType = MOBILE_LANDSCAPE;
	else 
		screenType = DESKTOP;
	//window.alert("screen type: " + screenType);
}
//document.addEventListener("orientationchange", SetScreenType(), false);

//expand the home page search button to the full page content
function ExpandSearch() { 
	unload = document.getElementById("search-load");
	load = document.getElementById("search-full");
	switch(screenType) {
		case DESKTOP: {
			if (quizExpanded) //prevents user expanding both pages when pressed fast enough
				return;
			searchExpanded = true;
			unload.style.opacity = 0;
			DelayTransitions(unload, load, true, SEARCH);
			break;
		}
		case MOBILE_PORTRAIT: {
			unload.style.display = "none";
			load.style.display = "block";
			ExpandContent(SEARCH, "height");
			break;
		}
		case MOBILE_LANDSCAPE: {
			unload.style.display = "none";
			load.style.display = "block";
			ExpandContent(SEARCH, "width");
			break;
		}
	}
}
function RecedeSearch() { //recede the full page content back to the home page
	unload = document.getElementById("search-full");
	load = document.getElementById("search-load");
	switch(screenType) {
		case DESKTOP: {
			searchExpanded = false;
			unload.style.opacity = 0;
			DelayTransitions(unload, load, false, SEARCH);
			break;
		}
		case MOBILE_PORTRAIT: {
			unload.style.display = "none";
			load.style.display = "block";
			RecedeContent(SEARCH, "height");
			document.getElementById("search-container").style.position = "initial";
			document.getElementById("quiz-container").style.position = "initial";
			break;
		}
		case MOBILE_LANDSCAPE: {
			unload.style.display = "none";
			load.style.display = "block";
			RecedeContent(SEARCH, "width");
			document.getElementById("search-container").style.position = "initial";
			document.getElementById("quiz-container").style.position = "initial";
			break;
		}
	}
}

function ExpandQuiz() {//expand the home page play button to the full quiz content
	unload = document.getElementById("quiz-load");
	load = document.getElementById("quiz-full");
	switch(screenType) {
		case DESKTOP: {
			if (searchExpanded)
					return;
			quizExpanded = true;
			unload.style.opacity = 0;
			DelayTransitions(unload, load, true, QUIZ);
			break;
		}
		case MOBILE_PORTRAIT: {
			unload.style.display = "none";
			load.style.display = "block";
			ExpandContent(QUIZ, "height");
			document.getElementById("quiz-container").style.top = "0px";
			break;
		}
		case MOBILE_LANDSCAPE: {
			unload.style.display = "none";
			load.style.display = "block";
			ExpandContent(QUIZ, "width");
			break;
		}
	}
	//Starts the quiz logic
	showGif();
	nextquestion();
}
function RecedeQuiz() {
	unload = document.getElementById("quiz-full");
	load = document.getElementById("quiz-load");
	switch(screenType) {
		case DESKTOP: {
			quizExpanded = false;
			unload.style.opacity = 0;
			DelayTransitions(unload, load, false, QUIZ);
			break;
		}
		case MOBILE_PORTRAIT: {
			document.getElementById("quiz-container").style.top = "50%";
			unload.style.display = "none";
			load.style.display = "block";
			RecedeContent(QUIZ, "height");
			document.getElementById("search-container").style.position = "initial";
			document.getElementById("quiz-container").style.position = "initial";
			break;
		}
		case MOBILE_LANDSCAPE: {
			unload.style.display = "none";
			load.style.display = "block";
			RecedeContent(QUIZ, "width");
			document.getElementById("search-container").style.position = "initial";
			document.getElementById("quiz-container").style.position = "initial";
			break;
		}
	}	
	//Reset the quiz
	current = -1;
	score = 0;	
}

function ExpandGif() { //transitions from search page to results page
	unload = document.getElementById("search-full");
	load = document.getElementById("search-gif");
	switch(screenType) {
		case DESKTOP: {
			unload.style.opacity = 0;
			DelayTransitions(unload, load, -1, QUIZ);
			break;
		}
		case MOBILE_PORTRAIT:
		case MOBILE_LANDSCAPE: {
			unload.style.display = "none";
			load.style.display = "block";
			break;
		}
	}	
}
function RecedeGif() { //transitions from results page back to search page
	document.getElementById("film-name").value = '';
	unload = document.getElementById("search-gif");
	load = document.getElementById("search-full");
	switch(screenType) {
		case DESKTOP: {
			unload.style.opacity = 0;
			DelayTransitions(unload, load, -1, QUIZ);
			break;
		}
		case MOBILE_PORTRAIT: 
		case MOBILE_LANDSCAPE: {
			unload.style.display = "none";
			load.style.display = "block";
			break;
		}
	}	
}

//expands the search or play div to full page width/height to show 
//their corresponding content
function ExpandContent (sideToExpand, dimention) {
	if (sideToExpand == SEARCH) {
		focusSide = document.getElementById("search-container");
		otherSide = document.getElementById("quiz-container");
	}
	else if (sideToExpand == QUIZ) {
		focusSide = document.getElementById("quiz-container");
		otherSide = document.getElementById("search-container");
	}
	focusSide.style[dimention] = "100%";
	focusSide.style.backgroundSize = "100% 100%";
	focusSide.style.position = "absolute";
	otherSide.style.position = "relative";
	otherSide.style.zIndex = -1;
	focusSide.style.zIndex = 5;
}


//opposite of above function, returns full page back to initial state
function RecedeContent (sideToRecede, dimention) {
	if (sideToRecede == SEARCH) {
		focusSide = document.getElementById("search-container");
		otherSide = document.getElementById("quiz-container");
	}
	else if (sideToRecede == QUIZ) {
		focusSide = document.getElementById("quiz-container");
		otherSide = document.getElementById("search-container");
	}

	focusSide.style.backgroundSize = "200% 100%";
	focusSide.style[dimention] = "50%";
	focusSide.style.zIndex = 1;
	otherSide.style.zIndex = -1;
}

//brings elements into and out of view, while dealing with transition lengths
function DelayTransitions(unload, load, expand, side) {
	setTimeout(function() { //delays removal of button by transition length
		unload.style.display = "none";
	}, 300);
	if (expand != -1) {
		setTimeout(function() {
			if (expand)
				ExpandContent(side, "width");
			else
				RecedeContent(side, "width");
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
function init() {
	if (screenType != DESKTOP)
		return;
	left = document.getElementById("search-load");
	right = document.getElementById("quiz-load");
	setTimeout(function() {
			left.style.fontSize = "75px";
	}, 100);
	setTimeout(function() {
		right.style.fontSize = "75px";
	}, 200);
}
