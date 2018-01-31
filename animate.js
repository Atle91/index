function render(){
	if(state.pause) return;
	state.gear.element.css(
		"transform","translate(0, -50%) rotate("+state.gear.rotation+"deg)"
		);
	state.chain.element.css(
		"background-position", "0px "+state.chain.position+"px"
		);

	state.container.element.css({
		transition: "top linear .2s",
		top: state.container.top+"px"
	});		
}
function animatePullBack(scrolls){
	state.gear.element.css({
		transition: "transform linear ."+Math.abs(scrolls)+"s",
		transform:"translate(0, -50%) rotate("+(30*scrolls)+"deg)"
	});
	state.chain.element.css({
		transition: "background-position linear ."+Math.abs(scrolls)+"s",
		backgroundPosition: "0px "+(increment*Math.abs(scrolls))+"px"
	});
	fadeOut();
	state.container.element.css({
		transition: "top linear ."+Math.abs(scrolls)+"s",
		top: 0+"px"
	});	
	setTimeout(() => {
		
		state.container.element.css(
			"transition", "top linear .2s"
			)}, 600)
}


function animateNextSection(){
	state.pause = true;

	state.container.element.css({
		transition: "top linear .6s",
		top: -window.innerHeight+"px",
	})

	setTimeout(() => {
		state.container.element.css({
			transition: "none",
			top: "0px",
		})
		fadeOut();
		window.scrollBy(0, window.innerHeight)
		state.pause = false;
		state.container.top = 0;
	},600)
}
function animatePreviousSection(){
	state.pause = true;

	state.container.element.css({
		transition: "top linear .6s",
		top: window.innerHeight+"px",
	})

	setTimeout(() => {
		state.container.element.css({
			transition: "none",
			top: "0px",
		})
		fadeOut();
		window.scrollBy(0, -window.innerHeight)
		state.pause = false;
		state.container.top = 0;
	},600)
}
function fadeIn(){
	$(".gear-container").css("opacity", "1");
}
function fadeOut(){
	$(".gear-container").css("opacity", "0");
}
