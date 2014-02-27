function toDoItem(id,text) {
	this.id = id;
	this.text = text;
	this.isComplete = false;
};

var toDoController = {
	
	totalTodos: 0,
	toDoList: [],
  
	createToDoItem : function(text) {
		var toDoItem = new toDoItem(this.totalTodos,text);
		this.toDoList.push(toDoItem);
		this.totalTodos++;
		this.updateListView();
	},
	
	completeToDoItem : function(id) {
		for(i in this.toDoList) {
			if(this.toDoList[i].id == id) {
				this.toDoList[i].isComplete = true; 
			}
		}
		toDoController.updateListView();
	},
  
	updateListView : function() {
		document.getElementById('checkList').innerHTML = '';
		for(i in this.toDoList) {
			if(!this.toDoList[i].isComplete) {
				var div = document.createElement('div');
				div.className = 'checkbox';
				div.innerHTML = '<label> <input type="checkbox" id="'+ this.toDoList[i].id +'" value="">' + this.toDoList[i].text + '</label>';
				document.getElementById('checkList').appendChild(div);
			}
		}	
	},

	init : {

		createDisplay : function() {
			$('.inputToDo').on("keyup", function(e){
				if(e.keyCode == 13){
					var text = $('.inputToDo').val();
					toDoController.createToDoItem(text);
					$('.inputToDo').val('');
				}
			});
		},

		deleteDisplay : function() {
			$(document).on("click", ".checkbox input", function(){
				toDoController.completeToDoItem($(this).attr("id"));
				$(this).parent().parent().hide();
			})
		}
	}

};

$(document).ready(function(){
	toDoController.init.createDisplay();
	toDoController.init.deleteDisplay();
});