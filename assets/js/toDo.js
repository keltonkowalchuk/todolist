function toDoItem(id,text) {
	this.id = id;
	this.text = text;
	this.isComplete = false;
};

var toDoController = {
	
	totalTodos: 0,
	toDoList: [],

	init : function() {
		toDoController.bindActions();
	},

	bindActions : function() {
		$('.inputToDo').on("keyup", function(e){
			if(e.keyCode == 13){
				var text = $('.inputToDo').val();
				toDoController.createToDoItem(text);
				$('.inputToDo').val('');
			}
		});

		$(document).on("click", ".checkbox input", function(){
			toDoController.completeToDoItem($(this).attr("id"));
		});
	},
  
	createToDoItem : function(text) {
		var newToDoItem = new toDoItem(this.totalTodos,text);
		this.toDoList.push(newToDoItem);
		this.totalTodos++;
		this.updateView();
	},
	
	completeToDoItem : function(id) {
		for(i in this.toDoList) {
			if(this.toDoList[i].id == id) {
				this.toDoList[i].isComplete = true; 
			}
		}
		this.updateView();
	},
  
	updateView : function() {
		document.getElementById('checkList').innerHTML = '';
		for(i in this.toDoList) {
			if(!this.toDoList[i].isComplete) {
				var div = document.createElement('div');
				div.className = 'checkbox';
				div.innerHTML = '<label> <input type="checkbox" id="'+ this.toDoList[i].id +'" value="">' + this.toDoList[i].text + '</label>';
				document.getElementById('checkList').appendChild(div);
			}
		}	
	}
};

$(document).ready(function(){
	toDoController.init();
});