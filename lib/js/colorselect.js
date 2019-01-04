function colorSelect(option) {
	var defaultColors = ["#a0522d","#cd5c5c","#FF4500","#008B8B","#B8860B"];
	var classes = {
		list: "colorselect__list",
		item: "colorselect__list-item",
		active: "colorselect__list-item--active"
	}
	var element = document.querySelector(option.el);
	var list = document.createElement("div");
	var colors = option.colors || defaultColors;
	var resolution = true;

	function getDefaultColor() {
		element.style.background = colors[0];
		element.setAttribute("data-color", colors[0])
	}

	function listenElement() {
		list.classList.add(classes.list);
		element.appendChild(list);
		element.addEventListener("click", switchElement);

		function switchElement(e) {
			e.stopPropagation();

			if(resolution) {
				list.style.display = "block";
				resolution = false;
			} else {
				list.style.display = "none";
				resolution = true;
			}
		}
	}

	function listenItem() {
		colors.forEach(i => {
			var item = document.createElement("div");
			
			item.classList.add(classes.item);
			item.style.background = i;
			item.addEventListener("click", changeActive);
			list.appendChild(item);

			function changeActive(e) {
				var $this = e.target;

				removeActive();
				$this.classList.add(classes.active);

				element.style.background = i;
				element.setAttribute("data-color", i);

				if(colorSelect.change) {
					colorSelect.change();
				}
			}
		})
	}

	function removeActive() {
		var item = document.querySelectorAll("." + classes.item);

		for(var i = 0; i < item.length; i++) {
			item[i].classList.remove(classes.active);
		}
	}

	function init() {
		getDefaultColor();
		listenElement();
		listenItem();
	}

	init();
}