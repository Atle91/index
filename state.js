let state;
const width = (window.innerWidth*0.05)+20;
const increment = window.innerHeight / (100/(width/3.5)*12.9);
let previousY, currentY;
let touchScroll = 0;
$(document).ready(() => {
	let pullback;
	function setSize(){
		state.gear.element.css({
			width: width+"px",
			left: width/4.13
		});
		state.chain.element.css({
			width: Math.round(width/3.5)+"px",
			backgroundSize: Math.round(width/3.5)+"px",
			backgroundPosition: "0px "+(increment*0.8)+"px"
		})
	}

	state = {
		pause: false,
		scrolls: 0,
		container: {
			element: $(".home-wrapper"),
			top: 0,
		},
		gear: {
			element: $(".gear"),
			rotation: 0,
		},
		chain: {
			element: $(".chain"),
			position: increment,
		},
		section: 0,
	}


	function pullBack(){
		state.container.top = 0;
		state.chain.position = 0;
		state.gear.rotation = 0;
		animatePullBack(state.scrolls);
		state.scrolls = 0;
	}
	function scrollDown(){
		updateTransformDown();
		pullSectionUp();

		state.scrolls--;
		if(state.scrolls <= -5) nextSection();
	}

	function scrollUp(){
		updateTransformUp();
		pullSectionDown();

		state.scrolls++;
		if(state.scrolls >= 5) previousSection();
	}


	function nextSection(){
		clearTimeout(pullback);
		state.scrolls = 0;
		animateNextSection();
		state.section++;
		
	}
	function previousSection(){
		clearTimeout(pullback);
		state.scrolls = 0;
		animatePreviousSection();
		state.section--;
	}

	function updateTransformUp(){
		state.chain.position += increment;
		state.gear.rotation -= 30;
	}
	function updateTransformDown(){
		state.chain.position -= increment;
		state.gear.rotation += 30;
	}
	function pullSectionUp(){
		state.container.top -= 50;
	}
	function pullSectionDown(){
		state.container.top += 50;
	}
	
	document.addEventListener("touchmove",function(e){
		currentY = e.touches[0].screenY;
		let up = Boolean(currentY > previousY);
		let down = Boolean(currentY < previousY);
		let diff = Math.abs(currentY) - Math.abs(previousY); 
		if(previousY){
			touchScroll = up ? touchScroll+diff:touchScroll-diff;

			if(Math.abs(touchScroll) > 20){
				scroll(e, up, down);
				touchScroll = 0;
			}
			
		}
			previousY = currentY;
		
		
	})
	
	window.addEventListener("wheel", function(e){
		e.preventDefault();
		let down = Boolean(e.deltaY > 0);
		let up = Boolean(e.deltaY < 0);
		scroll(e, up, down);
	})
	setSize();

	function scroll(e, up, down){

		
		clearTimeout(pullback);
		
		if(!state.pause){
			fadeIn();
			pullback = setTimeout(() => pullBack(), 300);
			if(down > 0 && state.section !== 6) scrollDown();
			else if(up && state.section !== 0) scrollUp();
			render();
		}
	}
console.log("updated")
})