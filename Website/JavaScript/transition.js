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


//expands the left or right div to full page width to show 
//their corresponding content
function ExpandContent (sideToExpand) {
	if (sideToExpand == 0) {
		focusSide = document.getElementById("search-container");
		otherSide = document.getElementById("quiz-container");
		focusSide.style.left = 0;
	}
	else if (sideToExpand == 1) {
		focusSide = document.getElementById("quiz-container");
		otherSide = document.getElementById("search-container");
		focusSide.style.right = 0;
	}
	focusSide.style.width = "100%";
	focusSide.style.backgroundSize = "100% 100%";
	focusSide.style.position = "absolute";
	focusSide.style.top = 0;
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
	focusSide.style.width = "50%";
	focusSide.style.backgroundSize = "200% 100%";
	focusSide.style.position = "initial";
	focusSide.style.right = 0;
	focusSide.style.top = 0;
	otherSide.style.position = "initial";
	otherSide.style.zIndex = 1;
	focusSide.style.zIndex = 1;
}

//toggles visibility of the two elements in the left and right div's
function ToggleElemLoad (side) {
	if (side == 0) { //just clicked 'Search'
		butn = document.getElementById("search-load");
		content = document.getElementById("search-full");	
	}
	else if (side == 1) { //just clicked 'Play'
		butn = document.getElementById("quiz-load");
		content = document.getElementById("quiz-full");
	}
	butn.style.opacity = 0;
	DelayStateTransitions(butn, content, side);	
}

//brings elements into and out of view, while dealing with transition lengths
function DelayStateTransitions(unload, load, side) {
	setTimeout(function() { //delays removal of button by transition length
		unload.style.display = "none";
	}, 300);
	setTimeout(function() {
		ExpandContent(side);
	}, 400);
	setTimeout(function() {
		load.style.display = "block";
	}, 900);
	setTimeout(function() {
		load.style.opacity = 1;
	}, 950);
}

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
