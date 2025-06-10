var count;
var delta = new Object();
var lastDeltaString = '';
var goAgain = false;
var counting = false;
var focusedElementId = '';
var savingInProgress = false;
var seekStatus;

function catchActiveElementId() {
	focusedElementId = document.activeElement.id;
}

function restoreFocus() {
	document.getElementById(focusedElementId).focus();
}

function reStart(){

	if(goAgain == true){
		goAgain = false;
		count=3;
		countDown();
	}
	else{
		highStart();
	}
}

function highStart(){

	count=14;
	
	if(counting != true)
		countDown();
}

function lowStart(){
	
	if(count==0){
		goAgain = true;
	}
	else{
		count=3;
	
		if(counting != true)
			countDown();
	}
}

function countDown(){

	//document.getElementById('countdown').innerHTML=count;

	count--;
	counting = true;
	
	if(count == 0){
	
		counting = false;
	
		if(elementIds.length > 0 || mappingElementIds.length > 0){
		
		    if(savingInProgress!=true && seekStatus!=true){
		        
		    	delta = new Object();
		    	mappingFields = new Object();
			
	    		var element;
	    		var fieldName;
	    		var value;
	    		var inputType; //input types are checkbox, select or text,...
	    		for(var x=0; x<elementIds.length; x++){
		    		element = document.getElementById(elementIds[x]);
		    		inputType = element.getAttribute("type");
		    		fieldName = elementIds[x].substring(elementIds[x].indexOf('KEYFIELD-')+9,elementIds[x].length).toLowerCase();
		    		if (inputType == "checkbox") 
		    			value = element.checked;
		    		else if (fieldName.indexOf("street", fieldName.length - "street".length) !== -1)
		    			value = getFirstLineStreet(element.value) ;
		    		else
		    			value = element.value;

    				delta[fieldName] = value;
	    		}
		    	for(var x=0; x<mappingElementIds.length; x++){
		    		element = document.getElementById(mappingElementIds[x]);
		    		inputType = element.getAttribute("type");
		    		fieldName = mappingElementIds[x].substring(mappingElementIds[x].indexOf('MAPPINGFIELD-')+13,mappingElementIds[x].length).toLowerCase();
		    		if (inputType == "checkbox") 
		    			value = element.checked;
		    		else if (fieldName.indexOf("street", fieldName.length - "street".length) !== -1)
		    			value = getFirstLineStreet(element.value) ;
		    		else
		    			value = element.value;

				    mappingFields[fieldName] = value;
			    }
			
			    var deltaString = JSON.stringify(delta);
			    var mappingFieldsJSON = JSON.stringify(mappingFields);
			
		    	if(deltaString != lastDeltaString || mappingFieldsJSON != lastMappingFieldsJSON){
		    		seekStatusOn();
		    		lastDeltaString = deltaString;
		    		lastMappingFieldsJSON = mappingFieldsJSON;
		    		sporadicDupeCheck(deltaString, mappingFieldsJSON);
		    	}
		    	else{
		    		highStart();
		    	}
		    }
		    else{
		        highStart();
		    }
		}
		else{
			fetchKeyFieldIds();
		}
	}
	else{
		window.setTimeout(countDown,1000);
	}
}

function getFirstLineStreet(street) {
	if (street == null || street.length == 0)
		return '';
	var lines = street.split("\n");
	return lines.length<=0 ? street : lines[0];
}