/*useless for the time being, remove later if not needed
function ExpandSearch () {
	but = document.getElementById("search-container");
	but.style.width = "100%";
	but.style.backgroundSize = "100% 100%";
	but.style.position = "absolute";
	but.style.left = 0;
	but.style.top = 0;
	document.getElementById("quiz-container").style.position = "relative";
	document.getElementById("quiz-container").style.zIndex = -1;
	but.style.zIndex = 5;
}

function ExpandQuiz () {
	but = document.getElementById("quiz-container");
	but.style.width = "100%";
	but.style.backgroundSize = "100% 100%";
	but.style.position = "absolute";
	but.style.right = 0;
	but.style.top = 0;
	document.getElementById("search-container").style.position = "relative";
	document.getElementById("search-container").style.zIndex = -1;
	but.style.zIndex = 5;
}
*/

function ExpandSearch() {
	unload = document.getElementById("search-load");
	load = document.getElementById("search-full");
	unload.style.opacity = 0;
	DelayStateTransitions(unload, load, true, 0);
}

function ExpandQuiz() {
	unload = document.getElementById("quiz-load");
	load = document.getElementById("quiz-full");
	unload.style.opacity = 0;
	DelayStateTransitions(unload, load, true, 1);
}

function RecedeSearch() {
	unload = document.getElementById("search-full");
	load = document.getElementById("search-load");
	unload.style.opacity = 0;
	DelayStateTransitions(unload, load, false, 0);
}

function RecedeQuiz() {
	unload = document.getElementById("quiz-full");
	load = document.getElementById("quiz-load");
	unload.style.opacity = 0;
	DelayStateTransitions(unload, load, false, 1);	
}
/*searchLoad = false;
quizLoad = false;

//toggles visibility of the two elements in the left and right div's
function ToggleElemLoad (side) {
	if (side == 0) { //just clicked 'Search'
		if (searchLoad == false) {
			unload = document.getElementById("search-load");
			load = document.getElementById("search-full");
			expand = searchLoad = true;
		}
		else {
			unload = document.getElementById("search-full");
			load = document.getElementById("search-load");
			expand = searchLoad = false;
		}
	}
	else if (side == 1) { //just clicked 'Play'
		if (quizLoad == false) {
			unload = document.getElementById("quiz-load");
			load = document.getElementById("quiz-full");
			expand = quizLoad = true;
		}
		else {
			unload = document.getElementById("quiz-full");
			load = document.getElementById("quiz-load");
			expand = quizLoad = false;
		}
	}
	unload.style.opacity = 0;
	DelayStateTransitions(unload, load, expand, side);	
}
*/

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
	//focusSide.style.top = 0;
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
	setTimeout(function() {
		if (expand)
			ExpandContent(side);
		else
			RecedeContent(side);
	}, 400);
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
