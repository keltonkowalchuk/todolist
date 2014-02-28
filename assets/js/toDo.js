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
		$(document).on("change", "[type='checkbox']", function(){
			toDoController.toggleToDoItem($(this).attr("id"));
		});

		$(document).on("click", "a.delete", function(){
			toDoController.deleteToDoItem($(this).attr("id"));
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

	deleteToDoItem : function(id) {
		// Delete item from hashmap based on id
		delete this.toDoList[id];
		// Update HTML
		this.updateView();
	},
	
	toggleToDoItem : function(id) {
		// Set toDo matching ID to complete/incomplete
		this.toDoList[id].isComplete = !this.toDoList[id].isComplete;
		// Update HTML
		this.updateView();
	},
  
	updateView : function() {
		// Erase HTML
		$('.todo-checklist tbody').html('');
		$('.completed-checklist tbody').html('');
		// Loop through list and add toDos to either checklist or completed
		for(var i in this.toDoList) {
			if(!this.toDoList[i].isComplete) {
				var newRow = '<tr><td class="col-md-1"><input type="checkbox" id="'+ this.toDoList[i].id +'"></td><td class="col-md-10">' + this.toDoList[i].text + '</td><td class="col-md-1 text-right"><a href="#" id="'+ this.toDoList[i].id +'" class="delete"><i class="glyphicon glyphicon-remove"></i></a></td></tr>';
				$('.todo-checklist tbody').append(newRow);
			} else {
				var newRow = '<tr><td class="col-md-1"><input type="checkbox" id="'+ this.toDoList[i].id +'" checked></td><td class="col-md-10">' + this.toDoList[i].text + '</td><td class="col-md-1 text-right"><a href="#" id="'+ this.toDoList[i].id +'" class="delete"><i class="glyphicon glyphicon-remove"></i></a></td></tr>';
				$('.completed-checklist tbody').append(newRow);
			}
		}	
	}
};

$(document).ready(function(){
	toDoController.init();
});