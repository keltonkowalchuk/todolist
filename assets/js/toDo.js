function toDoItem(id,text) {
	this.id = id;
	this.text = text;
	this.isComplete = false;
};

var toDoController = {
	// Global variables
	totalTodos: 0,
	toDoList: {},

	init : function() {
		toDoController.bindActions();
	},

	bindActions : function() {
		// On enter, create todo with text
		$('.inputToDo').on("keyup", function(e){
			if(e.keyCode == 13){
				var text = $('.inputToDo').val();
				toDoController.createToDoItem(text);
				$('.inputToDo').val('');
			}
		});
		// On click of checkbox, mark item as completed
		$(document).on("click", ".checkbox input", function(){
			toDoController.completeToDoItem($(this).attr("id"));
		});
	},
  
	createToDoItem : function(text) {
		// Create new toDoItem with inputted text
		var newToDoItem = new toDoItem(this.totalTodos++,text);
		// Add toDoItem to hashmap
		this.toDoList[newToDoItem.id] = newToDoItem;
		// Update HTML
		this.updateView();
	},
	
	completeToDoItem : function(id) {
		// Set toDo matching ID to complete
		this.toDoList[id].isComplete = true;
		// Update HTML
		this.updateView();
	},
  
	updateView : function() {
		// Erase HTML
		document.getElementById('checkList').innerHTML = '';
		// Loop through list and display noncomplete toDos
		for(var i in this.toDoList) {
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