function myCalendar(id, year, month) {
	var Dlast = new Date(year,month+1,0).getDate(),
	prevDlast = new Date(year,month,0).getDate(),
	D = new Date(year,month,Dlast),
	DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
	prevDNlast = new Date(D.getFullYear(),D.getMonth()-1,prevDlast).getDay(),
	DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
	n = 0,
	m = 1,
	calendar = '<tr>',
	month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
	days=["Понедельник, ","Вторник, ","Среда, ","Четверг, ","Пятница, ","Суббота, ","Воскресенье, "];

	for(var  i = ((prevDlast - prevDNlast) + 1); i <= prevDlast; i++) 
	{
		calendar += "<td class='behind_month'>" + '<span class="black">' + days[n] + '</span>' + i;
		n++;
	}

	for(var  i = 1; i <= Dlast; i++) 
	{
		if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) 
		{
			if(n <= 6)
			{
				calendar += '<td class="today active">' + days[n] + '<span class="nums">' + i + '</span>';
				n++;
			}
			else
			{
				calendar += '<td class="today active">' + '<span class="nums">' + i + '</span>';
			}			
		}
		else
		{
			if(n <= 6)
			{
				calendar += "<td class='active'>"+ days[n] + '<span class="nums">' + i + '</span>';
				n++;
			}
			else
			{
				calendar += "<td class='active'>" + '<span class="nums">' + i + '</span>';
			}
			
		}
		if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
			calendar += '<tr>';
		}
	}
	for(var  i = DNlast; i < 7; i++) 
	{
		if(DNlast!=0)
		{
			calendar += "<td class='behind_month'>" + m;
			m++;
		}
	}
	document.querySelector('#'+id+' tbody').innerHTML = calendar;
	document.querySelector('#'+id+' thead .current').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
	document.querySelector('#'+id+' thead .current').dataset.month = D.getMonth();
	document.querySelector('#'+id+' thead .current').dataset.year = D.getFullYear();
}

function showItems(list){
	for (var i = 0; i < list.length; i++) 
	{
		var str = [];
		str = list[i].company.split(' ',3);
		$("#main_table tbody tr .active .nums").each(function(){
			if($('#main_table thead .current').text() == str[1] + ' ' + str[2])
			{
				if ($(this).text() == str[0])
				{
					$(this).parent().append("<p class='evnt'>" + list[i].name + "</p>");
					$(this).parent().append("<p class='parts'>" + list[i].people + "</p>");
					$(this).parent().append("<p class='info'>" + list[i].inform + "</p>");
					$(this).parent().addClass("item");
				}
			}
			
		});
	}
}

var list = [{id:"1", name:"Happy birthday", company:"3 Октябрь 2017", people: "Pavel", inform: ""},{id:"2", name:"Машина ремонт", company:"14 Октябрь 2017", people: "Pavel", inform: ""},{id: "3", name: "Митинг на Болотной", company: "6 Март 2017", people: "Pavel", inform: ""}, {id: "4", name: "Отчет о митинге", company: "2 Апрель 2017", people: "Pavel", inform: ""}, {id: "5", name: "Забрать штаны Болотного у ", company: "15 Апрель 2017", people: "Pavel", inform: ""}, {id: "6", name: "Встреча с Болотниковым Мишей", company: "23 Апрель 2017", people: "Pavel", inform: ""}, {id: "7", name: "Митинг на Болотной 2", company: "1 Май 2017", people: "Pavel", inform: ""}, {id: "8", name: "Свозить болонку к ветеринару", company: "16 Май 2017", people: "Pavel", inform: ""}, {id: "9", name: "Рецепт Болоньезе", company: "21 Май 2017", people: "Pavel", inform: ""}, {id: "10", name: "Отпуск в Болонье", company: "29 Май 2017", people: "Pavel", inform: ""}];

$(document).ready(function(){

	list = localStorage.foo ? JSON.parse(localStorage.foo) : [];

	console.log(list);

	myCalendar("main_table", new Date().getFullYear(), new Date().getMonth());
	showItems(list);


	$('#main_table thead .prev').click(function() {
		$(".add_item_full").hide();
		myCalendar("main_table", document.querySelector('#main_table thead .current').dataset.year, parseFloat(document.querySelector('#main_table thead .current').dataset.month)-1);
		showItems(list);
	});

	$('#main_table thead .next').click(function() {
		$(".add_item_full").hide();
		myCalendar("main_table", document.querySelector('#main_table thead .current').dataset.year, parseFloat(document.querySelector('#main_table thead .current').dataset.month)+1);
		showItems(list);
	});

	$('#main_table thead .tod').click(function() {
		$(".add_item_full").hide();
		myCalendar("main_table", new Date().getFullYear(), new Date().getMonth());
		showItems(list);
	});

//кнопка добавить
$(".main_head .add").on("click", function(){
	$(".add_item").show(500);
	$(".add_item_full").hide(500);
	$("#num_day").focus();
	$("#main_table tbody tr .active").css("outline", "none");
	$("#main_table tbody tr .active").css("background-color", "#fff");
	$(".item").css("background-color", "#c2e4fe");
	$(".today").css("background-color", "#bdf2b8");
});

//кнопка очистить
$(".main_head .clear").on("click", function(){
	localStorage.clear();
	myCalendar("main_table", document.querySelector('#main_table thead .current').dataset.year, parseFloat(document.querySelector('#main_table thead .current').dataset.month));
});

//кнопка закрить
$(".close").click(function(){
	$(".add_item").hide(500);
	$("#new_item").val('');
	$("#num_day").val('');
	$(".add_item_full").hide(500);
	$("#main_table tbody tr .active").css("outline", "none");
	$("#main_table tbody tr .active").css("background-color", "#fff");
	$(".item").css("background-color", "#c2e4fe");
	$(".today").css("background-color", "#bdf2b8");
});	


//додавання айтема
var id = list.length;
$(".add_item a").click(function(){
	
	var name = $("#new_item").val();
	var company = $("#num_day").val();
	if(name != '' && company != '' && company.length<3)
	{

		
		$("#main_table tbody tr .active .nums").each(function(){
			if($(this).text() == company)
			{
				company += ' ' + $('#main_table thead .current').text();
				list[id] = {id: id + 1, name: name, company: company, people: "", inform: ""};
				id++;
				$(this).parent().append("<p>" + name + "</p>");
				$(this).parent().addClass("item");
			}
		});
		$(".today").css("background-color", "#bdf2b8");
		$("#new_item").val('');
		$("#num_day").val('');
		$(".add_item").hide(500);
	}
	else if (name == '')
	{
		$("#new_item").focus();
	}
	else
	{
		$("#num_day").focus();
	}
	$(".item").css("background-color", "#c2e4fe");
	$(".today").css("background-color", "#bdf2b8");
	
	localStorage.foo = JSON.stringify(list);
});


//search
$('#mysearch').meta_input({
	data: list,
	suggestTemplate: '<table class="custom-suggest"><tr><td><b>{{name}}</b><br><small>{{company}}</small></td></tr></table>'
});


//додавання форми до комірки
$("#main_table tbody tr .active").click(function(){
	$(".add_item_full").hide();
	$(".add_item").hide(300);
	$("#new_item").val('');
	$("#num_day").val('');

	$("#main_table tbody tr .active").css("outline", "none");
	$("#main_table tbody tr .active").css("background-color", "#fff");
	$(".item").css("background-color", "#c2e4fe");
	$(".today").css("background-color", "#bdf2b8");

	$(".add_item_full").show(200);
	$(this).css("outline", "auto 5px -webkit-focus-ring-color");
	$(this).css("background-color", "#c2e4fe");
	var pos = $(this).offset();
	var date = $(this).find(".nums").text();
	var evnt1 = $(this).find(".evnt").text();
	var parts1 = $(this).find(".parts").text();
	var descr1 = $(this).find(".info").text();
	$("#event").val(evnt1);
	$("#participants").val(parts1);
	$("#descript").val(descr1);
	$(".date").text(date + ' ' + $('#main_table thead .current').text());
	$(".add_item_full").offset({top: pos.top - 35, left: pos.left + 190});
});

//додавання айтема до комірки
$("#ready").click(function(){
	var ev = $("#event").val();
	var dt = $(".date").text();
	var parts = $("#participants").val();
	var info = $("#descript").val();
	var isItemNew = true;

	if(dt != '' && ev != '')
	{
		for(var i = 0; i < list.length; i++)
		{
			if(dt == list[i].company)
			{
				list[i] = {id: list[i].id, name: ev, company: dt, people: parts, inform: info};
				isItemNew = false;
				$(".add_item_full").hide();
				myCalendar("main_table", document.querySelector('#main_table thead .current').dataset.year, parseFloat(document.querySelector('#main_table thead .current').dataset.month));
				showItems(list);
				localStorage.foo = JSON.stringify(list);
			}
		}
		if (isItemNew == true)
		{
			list[id] = {id: id + 1, name: ev, company: dt, people: parts, inform: info};
			id++;
			console.log(list);
			$(".add_item_full").hide();
			myCalendar("main_table", document.querySelector('#main_table thead .current').dataset.year, parseFloat(document.querySelector('#main_table thead .current').dataset.month));
			showItems(list);
			localStorage.foo = JSON.stringify(list);
		}
	}

});

//видалення айтема з комірки
$("#del").click(function(){
	var dt = $(".date").text();
	for(var i = 0; i < list.length; i++)
	{
		if(dt == list[i].company)
		{
			list.splice(list[i].id - 1,1);
			$(".add_item_full").hide();
			myCalendar("main_table", document.querySelector('#main_table thead .current').dataset.year, parseFloat(document.querySelector('#main_table thead .current').dataset.month));
			showItems(list);
			localStorage.foo = JSON.stringify(list);
		}
	}
});


});