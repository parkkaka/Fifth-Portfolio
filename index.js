'use strict';
class TopContainer {
	static count = 0;
	constructor() {
		this.bottomContainer = new BottomContainer();
		this.objToDoListInfo = {};
		this.starRating = '⭐';
	}
	createToDoListInfo() {
		const inputValue = document.querySelector('.divTopContainer input[type="text"]').value;
		document.querySelector('.divBottomContainer').innerHTML += `
			<ul class="ulContainer">
				<li class="liToDoListName">${inputValue}</li>
				<li><input class="inputCheckBox" type="checkbox"></li>
				<button class="buttonMinus">-</button>
				<li class="liStarRating">${this.starRating}</li>
				<button class="buttonPlus">+</button>
				<input type="hidden" name="idIndex" value="${TopContainer.count}">
				<li class="liDeleteToDoListItem">삭제</li>
			</ul>
		`;
		this.objToDoListInfo = { id: TopContainer.count, strToDoListName: inputValue, check: false, rating: 1 };
		document.querySelector('.divTopContainer input[type="text"]').focus();
		document.querySelector('.divTopContainer input[type="text"]').value = '';
		this.bottomContainer.getToDoListInfo(this.objToDoListInfo);
		this.bottomContainer.checkToDoListItem();
		this.bottomContainer.checkResetToDoList();
		this.bottomContainer.deleteToDoListItem();
		this.bottomContainer.allDeleteToDoListItem();
		this.bottomContainer.clickRatingPlusMinus();
		TopContainer.count++;
	}
	createClickToDoListItem() {
		const inputValue = document.querySelector('.divTopContainer input[type="text"]');
		document.querySelector('.buttonClick').addEventListener('click', () => {
			if (inputValue.value != '') {
				this.createToDoListInfo();
			} else {
				inputValue.focus();
			}
		});
	}
	createKeyToDoListItem() {
		const inputValue = document.querySelector('.divTopContainer input[type="text"]');
		inputValue.addEventListener('keypress', (event) => {
			if (inputValue.value != '' && event.keyCode == 13) {
				this.createToDoListInfo();
			}
		});
	}
}

class BottomContainer {
	constructor() {
		this.objToDoListInfo = {};
		this.arrToDoListInfo = [];
	}

	getToDoListInfo(objToDoList) {
		this.objToDoListInfo = objToDoList;
		this.arrToDoListInfo.push(this.objToDoListInfo);
	}
	checkToDoListItem() {
		document.querySelectorAll('input[type="checkbox"]').forEach((value) => {
			value.addEventListener('click', (event) => {
				this.arrToDoListInfo = this.arrToDoListInfo.map((value01) => {
					if (value01['id'] == event.target.parentElement.parentElement.querySelector('input[type="hidden"]').value) {
						if (event.target.checked) {
							value01['check'] = true;
						} else {
							value01['check'] = false;
						}
					}
					return value01;
				});
				console.log(this.arrToDoListInfo);
			});
		});
	}
	checkResetToDoList() {
		document.querySelector('.buttonClick').addEventListener('click', () => {
			this.arrToDoListInfo = this.arrToDoListInfo.map((value) => {
				value['check'] = false;
				return value;
			});
		});
	}
	deleteToDoListItem() {
		document.querySelectorAll('.liDeleteToDoListItem').forEach((value) => {
			value.addEventListener('click', (event) => {
				this.arrToDoListInfo = this.arrToDoListInfo.filter((value01) => {
					return value01['id'] != event.target.parentElement.querySelector('input[type="hidden"]').value;
				});
				event.target.parentElement.remove();
				console.log(this.arrToDoListInfo);
			});
		});
	}
	allDeleteToDoListItem() {
		document.querySelector('.buttonAllDelete').addEventListener('click', () => {
			const divBottomContainer = document.querySelector('.divBottomContainer');
			while (divBottomContainer.hasChildNodes()) {
				divBottomContainer.removeChild(divBottomContainer.firstChild);
				this.arrToDoListInfo.shift();
			}
			document.querySelector('.divTopContainer input[type="text"]').focus();
			document.querySelector('.divTopContainer input[type="text"]').value = '';
			console.log(this.arrToDoListInfo);
			TopContainer.count = 0;
		});
	}
	clickRatingPlusMinus() {
		document.querySelectorAll('.buttonMinus').forEach((value) => {
			value.addEventListener('click', (event) => {
				this.arrToDoListInfo = this.arrToDoListInfo.map((value01) => {
					console.log(value01['id'] == event.target.parentElement.querySelector('input[type="hidden"]').value);
					value01['id'] == event.target.parentElement.querySelector('input[type="hidden"]').value && value01['rating'] > 1 && --value01['rating'];
					console.log(this.arrToDoListInfo);
					return value01;
				});
				const liStarRating = event.target.parentElement.querySelector('.liStarRating');
				let liStarRatingSplit = liStarRating.textContent.split('');
				if (liStarRating.textContent.length != 1) {
					liStarRatingSplit.pop();
				}
				liStarRating.innerHTML = liStarRatingSplit.join('');
			});
		});
		document.querySelectorAll('.buttonPlus').forEach((value) => {
			value.addEventListener('click', (event) => {
				this.arrToDoListInfo = this.arrToDoListInfo.map((value01) => {
					value01['id'] == event.target.parentElement.querySelector('input[type="hidden"]').value && value01['rating'] < 5 && ++value01['rating'];
					console.log(this.arrToDoListInfo);
					return value01;
				});
				const liStarRating = event.target.parentElement.querySelector('.liStarRating');
				if (liStarRating.textContent.length != 5) {
					liStarRating.innerHTML += '⭐';
				}
			});
		});
	}
}
class ToDoList {
	constructor() {
		this.topContainer = new TopContainer();
	}
	main() {
		this.topContainer.createClickToDoListItem();
		this.topContainer.createKeyToDoListItem();
	}
}
const objToDoList = new ToDoList();
objToDoList.main();
