//UE_App_ViewModel - start

app.model = {
	Match: function (title, obj, showBadge) {
		var $c = this;

		$c.title = title;
		$c.obj = obj;
		$c.showBadge = showBadge;
		$c.ids = [];
		$c.records = [];
		// $c.isDupable = obj == null || obj == '' || (meta.tabInfos[obj].iconUrl != null && (meta.obj == 'Lead' || obj == 'Lead' || meta.obj == obj));
		$c.isDupable = obj == null || obj == '' || (meta.tabInfos[obj].isAccessible != null && (meta.obj == 'Lead' || obj == 'Lead' || meta.obj == obj));

		/*
		Object.defineProperty(this, 'countTotal', {
			get: function() {
				return this.ids == null ? 0 : this.ids.length;
			}
		});
		Object.defineProperty(this, 'countDisplaying', {
			get: function() {
				return this.records == null ? 0 : this.records.length;
			}
		});
		Object.defineProperty(this, 'countRemaining', {
			get: function() {
				return this.countTotal - this.countDisplaying;
			}
		});*/

		$c.countTotal = function() {
			return this.ids == null ? 0 : this.ids.length;
		}
		$c.countDisplaying = function() {
			return this.records == null ? 0 : this.records.length;
		}
		$c.countRemaining = function() {
			return this.countTotal() - this.countDisplaying();
		}
	}
}

app.vm = {
	alert: { visible: false, isDupes: false, type: '', content: '', isMinimized: false},
	validation: [],
	dupes: {
		visible: false,
		matches: {
			'top': new app.model.Match('Top Duplicate Matches', '', false),
			'baccount': new app.model.Match('Account Duplicates', 'Account', true),
			'paccount': new app.model.Match('Person Account Duplicates', 'Account', true),
			'contact': new app.model.Match('Contact Duplicates', 'Contact', true),
			'lead': new app.model.Match('Lead Duplicates', 'Lead', true)
		},
		matches_iterator: ['top','baccount','paccount','contact','lead'],
		topMatches: {},
		topMatch: {},
		countDupesTotal: 0
	},
	uiStates: { isSaving: false, isSeeking: false, isHavingDupes: false, isDirty: false, isError: false, isAllowSave: false  },
	service: { potentialDuplicatesString:'', lastPotentialDuplicatesString:'', deltaString:'', lastDeltaString:'', mappingFieldsJSON:'', lastMappingFieldsJSON:'' },
	lowStartTimer: null,
	meta: meta,
	resx: meta.resx,
	isSfc: !meta.isSf1,
	isMobile: function () {
		var temp = navigator.userAgent.toLowerCase();
		return temp.indexOf('mobile') > 0 || temp.indexOf('iphone') > 0 || temp.indexOf('android') > 0;
	},

	digest: function () {
		for(var prop in app.cmp){
			if(app.cmp.hasOwnProperty(prop)){
				app.cmp[prop].digest();
			}
		}

		app.util.resize();
	},

	config: {
		RECORDS_PER_PATCH: 5
	}
}

for(var key in app.vm.resx){
	if(app.vm.resx.hasOwnProperty(key)){
		var newKey = key.replace(/[.\s]+/g, '_')
		app.vm.resx[newKey] = app.vm.resx[key];
	}
}

//UE_App_ViewModel - end

//UE_App_Component - start

app.cmp = {};

app.cmp.alert = new function() {
	var $c = this;

	$c.renderer = {};

	$c.init = function() {
		$c.renderer = new Ractive({
			el:'.bootstrap-sf1',
			append: true,
			template: '#tmpl_alert',
			magic: true,
			data: app.vm
		});

		$c.renderer.observe('alert.visible alert.isMinimized', function() { app.util.resize(); }, { defer: true });
		$c.renderer.observe('uiStates.isSeeking', $c.onSeeking );
		$c.renderer.observe('uiStates.isSaving', $c.onSaving );

		$c.renderer.on('onShowAccounts', app.cmp.dupes.onShowAccounts);
		$c.renderer.on('onShowContacts', app.cmp.dupes.onShowContacts);
		$c.renderer.on('onShowLeads', app.cmp.dupes.onShowLeads);
		$c.renderer.on('onShowTop', app.cmp.dupes.onShowTop);
		$c.renderer.on('onHide', $c.hide);

		$c.renderer.on('onView', app.cmp.dupes.onView);
		$c.renderer.on('onEdit', app.cmp.dupes.onEdit);
		$c.renderer.on('onAddToAccount', app.cmp.dupes.onAddToAccount);
		$c.renderer.on('onEmail', app.cmp.dupes.onEmail);
		$c.renderer.on('onMerge', app.cmp.dupes.onMerge);
		$c.renderer.on('onConvert', app.cmp.dupes.onConvert);

	}

	$c.digest = function (){
		$c.renderer.update();
	}

	$c.hide = function(){
		$c.renderer.set('alert.visible', false);
	}

	$c.success = function (msgContent){
		this.show('success', msgContent);
	}

	$c.warning = function (msgContent){
		this.show('warning', msgContent);
	}

	$c.danger = function(msgContent){
		this.show('danger', msgContent);
	}

	$c.info = function (msgContent){
		this.show('info', msgContent);
	}

	$c.dupes = function (msgContent){
		$c.show('danger', msgContent, true);
	}

	$c.show = function (msgType, msgContent, isDupes){

		if(msgContent.includes('class')){
			msgContent = msgContent.replace('class=\"slds-vf-messages\"', '');
		}
		console.log('encodedmsgContent:      ' + msgContent);
		$c.renderer.set({
			'alert.visible': true,
			'alert.type': msgType,
			'alert.content': msgContent,
			'alert.isDupes': isDupes == true
		});
	}

	$c.onSeeking = function (val) {
		if(val){
			$c.renderer.set({
				'alert.type': 'info',
				'alert.content': app.vm.meta.resx['msg.info.seekingdupes'],
				'alert.visible': true
			});
		}
		else{
			app.vm.alert.visible = false;
			app.vm.alert.isMinimized = false;
		}
	}

	$c.onSaving = function (val) {
		if(val){
			$c.renderer.set({
				'alert.type': 'info',
				'alert.content': 'Saving record...',
				'alert.visible': true,
				'alert.isDupes': false
			});
		}
		else{
			app.vm.alert.visible = false;
			app.vm.alert.isMinimized = false;
		}
	}
}

app.cmp.dupes = new function (){
	var $c = this;

	$c.renderer = {};

	$c.init = function() {
		$c.renderer = new Ractive({
			el:'.bootstrap-sf1',
			append: true,
			template: '#tmpl_dupes',
			magic: true,
			data: app.vm
		});

		$c.renderer.observe('dupes.visible', function() { app.util.resize(); }, { defer: true });

		$c.renderer.on('onHide', $c.hide);
		$c.renderer.on('onShowAccounts', $c.onShowAccounts);
		$c.renderer.on('onShowContacts', $c.onShowContacts);
		$c.renderer.on('onShowLeads', $c.onShowLeads);
		$c.renderer.on('onShowTop', $c.onShowTop);
		$c.renderer.on('onShowMore', onShowMore);

		$c.renderer.on('onView', $c.onView);
		$c.renderer.on('onEdit', $c.onEdit);
		$c.renderer.on('onAddToAccount', $c.onAddToAccount);
		$c.renderer.on('onEmail', $c.onEmail);
		$c.renderer.on('onMerge', $c.onMerge);
		$c.renderer.on('onConvert', $c.onConvert);
	}

	$c.digest = function (){
		$c.renderer.update();
	}

	$c.show = function () {
		$c.renderer.set('dupes.visible', true);
	}

	$c.hide = function () {
		$c.renderer.set('dupes.visible', false);
	}

	//ui interaction events
	$c.onShowAccounts = function (ev) { onShowScrollTo('#dupes-records-baccount'); }
	$c.onShowContacts = function (ev) { onShowScrollTo('#dupes-records-contact'); }
	$c.onShowLeads = function (ev) { onShowScrollTo('#dupes-records-lead'); }
	$c.onShowTop = function (ev) { onShowScrollTo('#dupes-records-top'); }

	var onShowScrollTo = function (targetSelector){
		app.vm.dupes.visible = true;
		targetSelector = $(targetSelector).is(":visible") ? targetSelector : '#dupes-records-top';

		$('.cdupes.page-container').animate({scrollTop:$(targetSelector).position().top - 15}, 300)
	}

	$c.onMerge = function (el) {
		if(app.vm.meta.obj == 'Account' && $(el.node).data('type') == 'Account'){
			app.util.openInWindow('/merge/accmergewizard.jsp?goNext=+Next+&cid=' + app.vm.meta.entity.Id + '&cid=' + $(el.node).data('recordid'));
		}
	}

	$c.onConvert = function (el) {
		if($(el.node).data('type') == 'Lead'){
			app.util.openInWindow('/lead/leadconvert.jsp?id=' + $(el.node).data('recordid') + '&RetURL=/' + $(el.node).data('recordid'));
		}
	}

	$c.onView = function (el) {
		var objType = $(el.node).data('type');
		if(objType == 'Lead' || objType == 'Contact' || objType == 'Account' ){
			var status = 'blocked';
			sendStats(objType, status);
		}
		//debugger;
		app.util.openInNewWindowOrTab('/' + $(el.node).data('recordid'));
	}

	$c.onEdit = function (el) {
		var objType = $(el.node).data('type');
		if(objType == 'Lead' || objType == 'Contact' || objType == 'Account' ){
			var status = 'blocked';
			sendStats(objType, status);
		}
		// debugger;
		if(objType == 'Account'){
			$c.edit_account(el);
		}
		else if(objType == 'Contact'){
			$c.edit_contact(el);
		}
		else if(objType == 'Lead'){
			$c.edit_lead(el);
		}
	}

	$c.onAddToAccount = function (el) {
		var objType = $(el.node).data('type');

		if(app.vm.meta.obj == 'Lead'){
			openUrlWithParams(app.util.getLeadFieldsAsContact(), '/apex/' + app.vm.meta.namespace  + '__uniquecontactnavigation?con4_lkid=' + $(el.node).data('recordid'));
		}
		else if(app.vm.meta.obj == 'Contact'){
			openUrlWithParams(app.util.getContactFields(), '/apex/' + app.vm.meta.namespace  + '__uniquecontactnavigation?con4_lkid=' + $(el.node).data('recordid'));
		}
	}

	$c.edit_lead = function (el) {
		if (app.vm.meta.obj == "Lead") {
			openUrlWithParams(app.util.getLeadFields(), '/apex/' + app.vm.meta.namespace  + '__uniqueleadnavigation?id=' + $(el.node).data('recordid'));
		}
		else if (app.vm.meta.obj == "Contact"){
			openUrlWithParams(app.util.getContactFieldsAsLead(), '/apex/' + app.vm.meta.namespace  + '__uniqueleadnavigation?id=' + $(el.node).data('recordid'));
		}
		else {
			openUrlWithParams(app.util.getAccountFieldsAsLead(), '/apex/' + app.vm.meta.namespace  + '__uniqueleadnavigation?id=' + $(el.node).data('recordid'));
		}
	}

	$c.edit_contact = function (el) {
		if (app.vm.meta.obj == "Lead") {
			openUrlWithParams(app.util.getLeadFieldsAsContact(), '/apex/' + app.vm.meta.namespace  + '__uniquecontactnavigation?id=' + $(el.node).data('recordid'));
		}
		else if (app.vm.meta.obj == "Contact"){
			openUrlWithParams(app.util.getContactFields(), '/apex/' + app.vm.meta.namespace  + '__uniquecontactnavigation?id=' + $(el.node).data('recordid'));
		}
		else {
			app.util.openInNewWindowOrTab('/' + $(el.node).data('recordid') + '/e');
		}
	}

	$c.edit_account = function (el) {
		if (app.vm.meta.obj == "Account") {
			openUrlWithParams(app.util.getAccountFields(), '/apex/' + app.vm.meta.namespace  + '__uniqueaccountnavigation?id=' + $(el.node).data('recordid'));
		}
		else {
			app.util.openInNewWindowOrTab('/' + $(el.node).data('recordid') + '/e');
		}
	}

	$c.onEmail = function (el) {
		var e = $(el.node);
		var recId = e.data('recordid');
		app.util.openInNewWindowOrTab("/_ui/core/email/author/EmailAuthor?p2_lkid=" + recId + "&rtype=" + recId.substring(0,3) + "&retURL=%2F" + recId);
	}

	var openUrlWithParams = function (ob, url, newWindow) {
		for(var f in ob){
			if(ob.hasOwnProperty(f) && ob[f] != ''){
				url += '&' + f + '=' + ob[f];
			}
		}
		if(newWindow == true)
			app.util.openInNewWindowOrTab(url);
		else
			app.util.openInWindow(url);
	}

	var onShowMore = function (el) {
		var listType = $(el.node).data("listname");
		console.log('Listype:       ' + listType);
		app.sv.loadRecords(listType);
	}
}

//UE_App_Component - end


//UE_App_Helper - start
function getInput(fieldApiName){
	return $("[id$='"+fieldApiName+"']");
}

function sendStats(objectName, status){
	debugger;

	if(window.location.href.indexOf("Contact") > -1) {
		UniqueEntry.uniqueSF1ContactExt.sendStatsDMS(objectName, status, function(result, event){
			console.log('calling remote functiont ');
		}, {escape: true});
	}

	if(window.location.href.indexOf("Lead") > -1){
		UniqueEntry.uniqueSF1LeadExt.sendStatsDMS(objectName, status, function(result, event){
			console.log('calling remote function');
		}, {escape: true});
	}

	if(window.location.href.indexOf("Account") > -1){
		UniqueEntry.uniqueSF1AccountExt.sendStatsDMS(objectName, status, function(result, event){
			console.log('calling remote function');
		}, {escape: true});
	}
	debugger;

}


function getInputIdEndsWith(fieldApiName){
	return $("[id$='"+fieldApiName+"']");
}

function getApiName(inputId){
	return inputId.slice(inputId.indexOf('FIELD-') + 6);
}

function setFocusOnLoad() {

}

Array.prototype.clear = function (){
	this.splice(0, this.length);
}

Array.prototype.pushAll = function (items){
	this.push.apply(this, items);
}

app.util = new function (){
	var $c = this;

	$c.resize = function () {
		if(app.vm.isSfc){
			//css class when sidebar is shown
			var pnlMainCss = 'col-lg-9 col-md-8 col-sm-7 hidden-xs'
			var pnlSideCss = 'col-lg-3 col-md-4 col-sm-5 col-xs-12';
			var fieldCssOn = 'col-lg-6 col-md-6 col-sm-12 col-xs-12';
			var fieldCssOff = 'col-lg-6 col-md-6 col-sm-6 col-xs-12';
			/*
			$('.alert').toggleClass(pnlMainCss, app.vm.dupes.visible);
			$('.cdupes, .cdupes > .navbar').toggleClass(pnlSideCss, app.vm.dupes.visible);
			$('.dupes-alert-msg').toggleClass('col-sm-4', !app.vm.dupes.visible).toggleClass('col-md-4 col-sm-6', app.vm.dupes.visible);
			$('.dupes-alert-record').toggleClass('col-md-8 hidden-sm', app.vm.dupes.visible);
			$('.dupes-alert-showall').toggleClass('hidden', app.vm.dupes.visible && !app.vm.alert.isMinimized);
				*/


			$('.alert').toggleClass(pnlMainCss, app.vm.dupes.visible);
			$('.cdupes, .cdupes > .navbar').toggleClass(pnlSideCss, app.vm.dupes.visible);
			$('.dupes-alert-msg').toggleClass('col-sm-4', !app.vm.dupes.visible).toggleClass('col-md-3 col-sm-8', app.vm.dupes.visible);
			$('.dupes-alert-record').toggleClass('col-md-8 hidden-sm', app.vm.dupes.visible);
			$('.dupes-alert-showall')
				.toggleClass('col-sm-4 col-xs-6', !app.vm.alert.isMinimized)
				.toggleClass('col-xs-12', app.vm.alert.isMinimized)
				.toggleClass('col-md-1', app.vm.dupes.visible && !app.vm.alert.isMinimized);


			$('.dupes-alert-showall > .pnl-iconography').toggleClass('hidden', app.vm.dupes.visible && !app.vm.alert.isMinimized);

			if(app.vm.alert.isMinimized){
				var alertSize = $('.pnl-iconography').width() + $('.glyphicon-resize-full').width();
				$('.alert').css('width', (alertSize + 65) + 'px');
			}
			else{
				$('.alert').css('width', '');
			}

			$('.cdupes.page-container').height($(window).height()-49);

		}
		else{
			//css class when sidebar is shown
			var pnlMainCss = 'col-lg-9 col-md-8 col-sm-7 hidden-xs'
			var pnlSideCss = 'col-lg-3 col-md-4 col-sm-5 col-xs-12';
			var fieldCssOn = 'col-lg-6 col-md-6 col-sm-12 col-xs-12';
			var fieldCssOff = 'col-lg-6 col-md-6 col-sm-6 col-xs-12';
			//toggle css when sidebar is shown

			$('.cmain, .alert, .clookup').toggleClass(pnlMainCss, app.vm.dupes.visible);
			$('.cdupes').toggleClass(pnlSideCss, app.vm.dupes.visible);
			$('.row > .form-group').removeClass(app.vm.dupes.visible ? fieldCssOff : fieldCssOn).addClass(app.vm.dupes.visible ? fieldCssOn : fieldCssOff);

			$('.dupes-alert-msg').toggleClass('col-sm-4', !app.vm.dupes.visible).toggleClass('col-md-4 col-sm-6', app.vm.dupes.visible);
			//$('.dupes-alert-record').toggleClass('col-md-4 hidden-sm', app.vm.dupes.visible);
			//$('.dupes-alert-showall').toggleClass('col-sm-4', !app.vm.dupes.visible).toggleClass('col-md-4 col-sm-6', app.vm.dupes.visible);
			$('.dupes-alert-record').toggleClass('col-md-8 hidden-sm', app.vm.dupes.visible);
			$('.dupes-alert-showall').toggleClass('hidden', app.vm.dupes.visible);


			$('.page-container').height($(window).height() - 49);
			$('.cmain.page-container > .container-fluid').css('padding-top', app.vm.alert.visible ? $('div.alert').outerHeight() : 0);
		}
	}

	$c.validate = function () {
		var errors = [];
		var msg = '';

		$('.requiredBlock').parent().find('select, input').not(':disabled').each(function() {
			var $field = $(this);
			if(($field.val() == null || $field.val() == '') && app.vm.meta.fields[getApiName(this.id)] != null){
				// errors.push({label: app.vm.meta.fields[getApiName(this.id)].label, message: app.vm.resx['msg_validation_field_required']});

				// devine into 2 cases:
				// 1 for Multiple select Picklist, because of Validation only searchs for Require Block to check for value
				// not the Hidden Fields contains value of Multiple Select.
				if(this.type == 'select-multiple'){
					var selecOpts = $('[id$=multipicklist-HIDDEN-' + getApiName(this.id) + ']').val();
					if(selecOpts == undefined || selecOpts == ""){
						errors.push({label: app.vm.meta.fields[getApiName(this.id)].label, message: app.vm.resx['msg_validation_field_required']});
					}
				} else {
					errors.push({label: app.vm.meta.fields[getApiName(this.id)].label, message: app.vm.resx['msg_validation_field_required']});
				}
			}
		})


		if(errors.length > 0){
			msg += app.vm.resx['msg_error_save'];
			msg += '<ul>';
			for(var i = 0; i < errors.length; i++){
				msg += '<li>' + errors[i].label + ': ' + errors[i].message + '</li>';
			}
			msg += '</ul';
		}

		return msg;
	}

	$c.openInNewWindowOrTab = function (url){
		if(app.vm.isMobile()){
			$c.openInWindow(meta.communityURL + url);
		}
		else{
			//le & sf1
			if (sforce.one != null){
				sforce.one.navigateToURL(meta.communityURL + url);
			}
			//service cloud console
			else if (sforce.console != null){
				sforce.console.openPrimaryTab(null,meta.communityURL +  url, true);
			}
			//sfc
			else {
				window.open(meta.communityURL + url);
			}
		}
	}

	$c.openInWindow = function (url){
		if (sforce.one != null){
			//alert('2');
			sforce.one.navigateToURL(meta.communityURL + url);
			//sforce.one.navigateToSObject(url.splice(1));
		}
		else if(typeof(srcSelf) == 'function'){ //Checks that it is in console
			console.log('srcSelf("' + url + '"');
			//alert('1');
			srcSelf(url);
		}
			//else if (sforce.console != null){
			//  window.location.href = url;
		//}
		else {
			//alert('3');
			window.location.href = meta.communityURL + url;
		}
	}

	$c.goToRecord = function (url){
		if (sforce.one != null){
			// sforce.one.navigateToURL(url);
			sforce.one.navigateToSObject(url.splice(1));
		}
		else {
			console.log('Navigate to Record Detail');
			lookupDetail();
		}
	}

	$c.bindFields = function () {

		bindCustomCss();
		bindPicklist();
		bindTabIndex();
		bindOnChange();

		function bindOnChange() {
			//bind onchange event to all fields
			if(app.vm.meta.settings.isUeEnabled){
				var fields = $("[id*='KEYFIELD-'], [id*='MAPPINGFIELD-']");
				fields.on("input", function(){
					app.con.onInput();
				});
			}
			else{
				$("[id*='FIELD-']").on("input", function(){
					app.con.onInput();
				});
			}
		}

		function bindTabIndex() {
			//set tabindex and focus on first inputfields
			var minIndex = 1000000;
			$("[id*='FIELD-']").each(function(){
				var fid = this.id.slice(this.id.indexOf('FIELD-') + 6);
				if(meta.fields[fid]!= null){
					$(this).attr('tabindex',meta.fields[fid].tabOrder);
					minIndex = Math.min(meta.fields[fid].tabOrder, minIndex);
				}
			})

			$('[tabindex=' + minIndex + ']').focus();
		}

		function bindCustomCss() {
			//apply custom css for long text fields
			$('form textarea').filter(function() {
				return  $(this).attr("maxlength") > 500;
			}).addClass('bigTextArea');
		}

		function bindPicklist() {
			$('[id*=picklist-HIDDEN-]').each(function() {
				var apiName = this.id.slice(this.id.indexOf('HIDDEN-') + 7);
				var fieldMeta = meta.fields[apiName];
				var val = meta.entity[apiName];

				var $hdn = $(this);
				var $dummy = $('<select></select>');

				var picklistId = 'FIELD-' + apiName;
				if(meta.ueConfig.kfs.indexOf(apiName.toLowerCase()) > -1){
					picklistId = 'KEY' + picklistId;
				}else if(meta.ueConfig.mfs.indexOf(apiName.toLowerCase()) > -1){
					picklistId = 'MAPPING' + picklistId;
				}

				$dummy.attr('id', picklistId);
				$dummy.attr('class', $hdn.attr('class'));

				if(fieldMeta.type.toLowerCase() == 'picklist'){
					$dummy.append('<option value="">--None--</option');
				}
				else{
					$dummy.attr('multiple','multiple');
				}

				$hdn.after($dummy);
				$dummy.change(function() {
					$hdn.val($dummy.val());
				})

				console.log(meta.entity[apiName]);
				var selected = false;
				for(var i = 0; i < fieldMeta.picklistValues.length; i++){
					var item = fieldMeta.picklistValues[i];
					if(item.active){
						$dummy.append('<option value="' + item.value + '" ' + (item.defaultValue && (meta.entity[apiName] == null) && (meta.entity["Id"] == null) ? 'selected' : '') + '>' + item.label + '</option>');
					}
					if(item.value ==  meta.entity[apiName]){
						selected = true;
					}
				}

				if(meta.entity[apiName] != null ){
					$dummy.val(meta.entity[apiName]);
				}

				if(!selected && $dummy.attr('multiple') !== 'multiple'){
					if(meta.entity[apiName]){
						$dummy.append('<option value="' + meta.entity[apiName] + '" label="'+meta.entity[apiName]+'">'+meta.entity[apiName]+'</option>');
						$dummy.val(meta.entity[apiName]);
					}
					//$dummy.append('<option value="' + meta.entity[apiName] + '" label="'+meta.entity[apiName]+'">'+meta.entity[apiName]+'</option>');
					//$dummy.val(meta.entity[apiName]);
				}

				if(fieldMeta.type.toLowerCase() == 'picklist'){
					$hdn.val($dummy.val());
				}
			});
		}
	}

	$c.checkFieldsChanged = function () {
		var elementIds = new Array();
		var mappingElementIds = new Array();
		console.log('Inside on check fields changed');

		$("input[id*='KEYFIELD-']").each(
			function(thing){
				elementIds.push($(this).attr("Id"));
			}
		);

		$("select[id*='KEYFIELD-']").each(
			function(thing){
				elementIds.push($(this).attr("Id"));
			}
		);

		$("textarea[id*='KEYFIELD-']").each(
			function(thing){
				elementIds.push($(this).attr("Id"));
			}
		);

		$("input[id*='MAPPINGFIELD-']").each(
			function(thing){
				mappingElementIds.push($(this).attr("Id"));
			}
		);

		$("select[id*='MAPPINGFIELD-']").each(
			function(thing){
				mappingElementIds.push($(this).attr("Id"));
			}
		);

		$("textarea[id*='MAPPINGFIELD-']").each(
			function(thing){
				mappingElementIds.push($(this).attr("Id"));
			}
		);

		var delta = new Object();
		var mappingFields = new Object();

		for(var x=0; x<elementIds.length; x++){
			if(elementIds[x].substring(elementIds[x].indexOf('KEYFIELD-')+9,elementIds[x].length).toLowerCase() == 'market__c'){
				console.log('Market field');
				var marketvalue = app.util.marketVal();
				console.log('market value is: ' + marketvalue);
				if(marketvalue){
					delta[elementIds[x].substring(elementIds[x].indexOf('KEYFIELD-')+9,elementIds[x].length).toLowerCase()] = marketvalue;
				}
				else{
					delta[elementIds[x].substring(elementIds[x].indexOf('KEYFIELD-')+9,elementIds[x].length).toLowerCase()] = '';
				}

			}
			else {

				delta[elementIds[x].substring(elementIds[x].indexOf('KEYFIELD-')+9,elementIds[x].length).toLowerCase()] =    ((document.getElementById(elementIds[x]).value).replace(/</g, '&lt;').replace(/>/g, '&gt;'));
			}
		}

		for(var x=0; x<mappingElementIds.length; x++){
			mappingFields[mappingElementIds[x].substring(mappingElementIds[x].indexOf('MAPPINGFIELD-')+13,mappingElementIds[x].length).toLowerCase()] =     document.getElementById(mappingElementIds[x]).value;
		}


		app.vm.service.deltaString = JSON.stringify(delta);
		app.vm.service.mappingFieldsJSON = JSON.stringify(mappingFields);

		var result = (app.vm.service.deltaString != app.vm.service.lastDeltaString || app.vm.service.mappingFieldsJSON != app.vm.service.lastMappingFieldsJSON);

		app.vm.service.lastDeltaString = app.vm.service.deltaString;
		app.vm.service.lastMappingFieldsJSON = app.vm.service.mappingFieldsJSON;



		return result;
	}

	$c.insertCard = function (listName, item) {
		app.vm.dupes.matches[listName].records.push(item);

		if(app.vm.dupes.topMatches[listName] != null) {
			return;
		}

		app.vm.dupes.topMatches[listName] = item;
		app.vm.dupes.matches.top.ids.clear();
		app.vm.dupes.matches.top.records.clear();

		for(var i = 1; i < app.vm.dupes.matches_iterator.length; i++ ){
			item = app.vm.dupes.topMatches[app.vm.dupes.matches_iterator[i]];

			if(item != null){
				app.vm.dupes.matches.top.records.push(item);
				console.log('ITEM::::     ' + item);
				app.vm.dupes.matches.top.ids.push(item.Id);
			}
		}
	}

	$c.marketVal = function(){
		var  countryVal = $("[id$='PrimaryCountryPicklist__c']").val();
		if(countryVal){
			try{
				var query1 = "SELECT Id, Market__c from CountryRegion__c where Name = " + countryVal + "";
				var query1 = sforce.connection.query("SELECT Id, Market__c from CountryRegion__c where Name ='"+ countryVal +"'");
				console.log('Records: ' + query1);
				var rec = query1.getArray("records");
				console.log(rec);
				marketVal = rec[0].Market__c;
				console.log('market value is:  ' + marketVal);
				return  marketVal;
			}
			catch(e){
				console.log('An Error has Occured. Error:' +e);
			}
		}
		else
			return '';

	}
	$c.getLeadFieldsAsContact = function(){
		return {
			'name_firstcon2'    : nullCheck(encodeURIComponent( $('[id$=FIELD-FirstName]').val() )),
			'name_lastcon2'     : nullCheck(encodeURIComponent( $('[id$=FIELD-LastName]').val() )),
			'con5'              : nullCheck(encodeURIComponent( $('[id$=FIELD-Title]').val() )),
			'con9'              : nullCheck(encodeURIComponent( $('[id$=FIELD-LeadSource]').val() )),
			'con10'             : nullCheck(encodeURIComponent( $('[id$=FIELD-Phone]').val() )),
			'con12'             : nullCheck(encodeURIComponent( $('[id$=FIELD-MobilePhone]').val() )),
			'con11'             : nullCheck(encodeURIComponent( $('[id$=FIELD-Fax]').val() )),
			'con15'             : nullCheck(encodeURIComponent( $('[id$=FIELD-Email]').val() )),
			'con19street'       : nullCheck(encodeURIComponent( $('[id$=FIELD-Street]').val() )),
			'con19city'         : nullCheck(encodeURIComponent( $('[id$=FIELD-City]').val() )),
			'con19state'        : nullCheck(encodeURIComponent( $('[id$=FIELD-State]').val() )),
			'con19zip'          : nullCheck(encodeURIComponent( $('[id$=FIELD-PostalCode]').val() )),
			'con19country'      : nullCheck(encodeURIComponent( $('[id$=FIELD-Country]').val() )),
			'con20'             : nullCheck(encodeURIComponent( $('[id$=FIELD-Description]').val() ))
		}
	}

	$c.getLeadFields = function(){
		return {
			'name_salutationlea2' : nullCheck(encodeURIComponent( $('[id$=FIELD-Salutation]').val() )),
			'name_firstlea2' : nullCheck(encodeURIComponent( $('[id$=FIELD-FirstName]').val() )),
			'name_lastlea2' : nullCheck(encodeURIComponent( $('[id$=FIELD-LastName]').val() )),
			'lea3' : nullCheck(encodeURIComponent( $('[id$=FIELD-Company]').val() )),
			'lea4' : nullCheck(encodeURIComponent( $('[id$=FIELD-Title]').val() )),
			'lea5' : nullCheck(encodeURIComponent( $('[id$=FIELD-LeadSource]').val() )),
			'lea6' : nullCheck(encodeURIComponent( $('[id$=FIELD-Industry]').val() )),
			'lea7' : nullCheck(encodeURIComponent( $('[id$=FIELD-AnnualRevenue]').val() )),
			'lea17' : nullCheck(encodeURIComponent( $('[id$=FIELD-Description]').val() )),
			'lea8' : nullCheck(encodeURIComponent( $('[id$=FIELD-Phone]').val() )),
			'lea9' : nullCheck(encodeURIComponent( $('[id$=FIELD-Mobilephone]').val() )),
			'lea10' : nullCheck(encodeURIComponent( $('[id$=FIELD-Fax]').val() )),
			'lea11' : nullCheck(encodeURIComponent( $('[id$=FIELD-Email]').val() )),
			'lea12' : nullCheck(encodeURIComponent( $('[id$=FIELD-Website]').val() )),
			'lea13' : nullCheck(encodeURIComponent( $('[id$=FIELD-Status]').val() )),
			'lea14' : nullCheck(encodeURIComponent( $('[id$=FIELD-Rating]').val() )),
			'lea15' : nullCheck(encodeURIComponent( $('[id$=FIELD-NumberOfEmployees]').val() )),
			'lea22' : nullCheck(encodeURIComponent( $('[id$=FIELD-HasOptedOutOfEmail]').val() )),
			'lea16street' : nullCheck(encodeURIComponent( $('[id$=FIELD-Street]').val() )),
			'lea16city' : nullCheck(encodeURIComponent( $('[id$=FIELD-City]').val() )),
			'lea16state' : nullCheck(encodeURIComponent( $('[id$=FIELD-State]').val() )),
			'lea16zip' : nullCheck(encodeURIComponent( $('[id$=FIELD-PostalCode]').val() )),
			'lea16country' : nullCheck(encodeURIComponent( $('[id$=FIELD-Country]').val() )),
			'lea21' : nullCheck(encodeURIComponent( $('[id$=FIELD-AssignmentRule]').val() )),
			'lea27' : nullCheck(encodeURIComponent( $('[id$=FIELD-DoNotCall]').val() )),
			'lea28' : nullCheck(encodeURIComponent( $('[id$=FIELD-HasOptedOutOfFax]').val() ))
		}
	}

	$c.getContactFieldsAsLead = function(){
		return {
			'name_firstlea2'    : nullCheck(encodeURIComponent( $('[id$=FIELD-FirstName]').val() )),
			'name_lastlea2'     : nullCheck(encodeURIComponent( $('[id$=FIELD-LastName]').val() )),
			'lea4'              : nullCheck(encodeURIComponent( $('[id$=FIELD-Title]').val() )),
			'lea5'              : nullCheck(encodeURIComponent( $('[id$=FIELD-LeadSource]').val() )),
			'lea8'             : nullCheck(encodeURIComponent( $('[id$=FIELD-Phone]').val() )),
			'lea9'             : nullCheck(encodeURIComponent( $('[id$=FIELD-MobilePhone]').val() )),
			'lea10'             : nullCheck(encodeURIComponent( $('[id$=FIELD-Fax]').val() )),
			'lea11'             : nullCheck(encodeURIComponent( $('[id$=FIELD-Email]').val() )),
			'lea16street'       : nullCheck(encodeURIComponent( $('[id$=FIELD-MailingStreet]').val() )),
			'lea16city'         : nullCheck(encodeURIComponent( $('[id$=FIELD-MailingCity]').val() )),
			'lea16state'        : nullCheck(encodeURIComponent( $('[id$=FIELD-MailingState]').val() )),
			'lea16zip'          : nullCheck(encodeURIComponent( $('[id$=FIELD-MailingPostalCode]').val() )),
			'lea16country'      : nullCheck(encodeURIComponent( $('[id$=FIELD-MailingCountry]').val() )),
			'con20'             : nullCheck(encodeURIComponent( $('[id$=FIELD-Description]').val() ))
		}
	}


	$c.getContactFields = function(){
		return {
			'name_salutationcon2' : nullCheck(encodeURIComponent( $('[id$=FIELD-Salutation]').val() )),
			'name_firstcon2' : nullCheck(encodeURIComponent( $('[id$=FIELD-FirstName]').val() )),
			'name_lastcon2' : nullCheck(encodeURIComponent( $('[id$=FIELD-LastName]').val() )),
			'con4_lkid' : nullCheck(encodeURIComponent( $('[id$=FIELD-AccountId_lkid]').val() )),
			'con4_lkold' : nullCheck(encodeURIComponent( $('[id$=FIELD-AccountId_lkold]').val() )),
			'con5' : nullCheck(encodeURIComponent( $('[id$=FIELD-Title]').val() )),
			'con6' : nullCheck(encodeURIComponent( $('[id$=FIELD-Department]').val() )),
			'con7' : nullCheck(encodeURIComponent( $('[id$=FIELD-Birthdate]').val() )),
			'con8_lkid' : nullCheck(encodeURIComponent( $('[id$=FIELD-ReportsToId]').val() )),
			'con8_lkold' : nullCheck(encodeURIComponent( $('[id$=FIELD-ReportsToName]').val() )),
			'con9' : nullCheck(encodeURIComponent( $('[id$=FIELD-LeadSource]').val() )),
			'con10' : nullCheck(encodeURIComponent( $('[id$=FIELD-Phone]').val() )),
			'con13' : nullCheck(encodeURIComponent( $('[id$=FIELD-HomePhone]').val() )),
			'con12' : nullCheck(encodeURIComponent( $('[id$=FIELD-MobilePhone]').val() )),
			'con14' : nullCheck(encodeURIComponent( $('[id$=FIELD-OtherPhone]').val() )),
			'con11' : nullCheck(encodeURIComponent( $('[id$=FIELD-Fax]').val() )),
			'con15' : nullCheck(encodeURIComponent( $('[id$=FIELD-Email]').val() )),
			'con16' : nullCheck(encodeURIComponent( $('[id$=FIELD-AssistantName]').val() )),
			'con17' : nullCheck(encodeURIComponent( $('[id$=FIELD-AssistantPhone]').val() )),
			'con23' : nullCheck(encodeURIComponent( $('[id$=FIELD-HasOptedOutOfEmail]').val() )),
			'con19street' : nullCheck(encodeURIComponent( $('[id$=FIELD-MailingStreet]').val() )),
			'con19city' : nullCheck(encodeURIComponent( $('[id$=FIELD-MailingCity]').val() )),
			'con19state' : nullCheck(encodeURIComponent( $('[id$=FIELD-MailingState]').val() )),
			'con19zip' : nullCheck(encodeURIComponent( $('[id$=FIELD-MailingPostalCode]').val() )),
			'con19country' : nullCheck(encodeURIComponent( $('[id$=FIELD-MailingCountry]').val() )),
			'con18street' : nullCheck(encodeURIComponent( $('[id$=FIELD-OtherStreet]').val() )),
			'con18city' : nullCheck(encodeURIComponent( $('[id$=FIELD-OtherCity]').val() )),
			'con18state' : nullCheck(encodeURIComponent( $('[id$=FIELD-OtherState]').val() )),
			'con18zip' : nullCheck(encodeURIComponent( $('[id$=FIELD-OtherPostalCode]').val() )),
			'con18country' : nullCheck(encodeURIComponent( $('[id$=FIELD-OtherCountry]').val() )),
			'con27' : nullCheck(encodeURIComponent( $('[id$=FIELD-DoNotCall]').val() )),
			'con28' : nullCheck(encodeURIComponent( $('[id$=FIELD-HasOptedOutOfFax]').val() )),
			'accid' : nullCheck(encodeURIComponent( $('[id$=FIELD-AccountId_lkid').val() ))
		}
	}

	$c.getAccountFieldsAsLead = function(){
		return {
			'lea3'             : nullCheck(encodeURIComponent( $('[id$=FIELD-Name]').val() )),
			'lea7'             : nullCheck(encodeURIComponent( $('[id$=FIELD-AnnualRevenue]').val() )),
			'lea10'             : nullCheck(encodeURIComponent( $('[id$=FIELD-Fax]').val() )),
			'lea6'             : nullCheck(encodeURIComponent( $('[id$=FIELD-Industry]').val() )),
			'lea15'             : nullCheck(encodeURIComponent( $('[id$=FIELD-NumberOfEmployees]').val() )),
			'lea8'             : nullCheck(encodeURIComponent( $('[id$=FIELD-Phone]').val() )),
			'lea14'             : nullCheck(encodeURIComponent( $('[id$=FIELD-Rating]').val() )),
			'lea12'             : nullCheck(encodeURIComponent( $('[id$=FIELD-Website]').val() )),
			'lea16street'       : nullCheck(encodeURIComponent( $('[id$=FIELD-BillingStreet]').val() )),
			'lea16city'         : nullCheck(encodeURIComponent( $('[id$=FIELD-BillingCity]').val() )),
			'lea16state'        : nullCheck(encodeURIComponent( $('[id$=FIELD-BillingState]').val() )),
			'lea16zip'          : nullCheck(encodeURIComponent( $('[id$=FIELD-BillingPostalCode]').val() )),
			'lea16country'      : nullCheck(encodeURIComponent( $('[id$=FIELD-BillingCountry]').val() )),
		}
	}
	$c.getAccountFields = function (){
		return {
			'acc2' : nullCheck(encodeURIComponent( $('[id$=FIELD-Name]').val() )),
			'acc3_lkid' : nullCheck(encodeURIComponent( $('[id$=FIELD-ParentId]').val() )),
			'acc5' : nullCheck(encodeURIComponent( $('[id$=FIELD-AccountNnumber]').val() )),
			'acc6' : nullCheck(encodeURIComponent( $('[id$=FIELD-Type]').val() )),
			'acc7' : nullCheck(encodeURIComponent( $('[id$=FIELD-Industry]').val() )),
			'acc8' : nullCheck(encodeURIComponent( $('[id$=FIELD-AnnualRevenue]').val() )),
			'acc9' : nullCheck(encodeURIComponent( $('[id$=FIELD-Rating]').val() )),
			'acc10' : nullCheck(encodeURIComponent( $('[id$=FIELD-Phone]').val() )),
			'acc11' : nullCheck(encodeURIComponent( $('[id$=FIELD-Fax]').val() )),
			'acc12' : nullCheck(encodeURIComponent( $('[id$=FIELD-Website]').val() )),
			'acc13' : nullCheck(encodeURIComponent( $('[id$=FIELD-TickerSymbol]').val() )),
			'acc14' : nullCheck(encodeURIComponent( $('[id$=FIELD-Ownership]').val() )),
			'acc15' : nullCheck(encodeURIComponent( $('[id$=FIELD-NumberOfEmployees]').val() )),
			'acc16' : nullCheck(encodeURIComponent( $('[id$=FIELD-SIC]').val() )),
			'acc17street' : nullCheck(encodeURIComponent( $('[id$=FIELD-BillingStreet]').val() )),
			'acc17city' : nullCheck(encodeURIComponent( $('[id$=FIELD-BillingCity]').val() )),
			'acc17state' : nullCheck(encodeURIComponent( $('[id$=FIELD-BillingState]').val() )),
			'acc17zip' : nullCheck(encodeURIComponent( $('[id$=FIELD-BillingPostalCode]').val() )),
			'acc17country' : nullCheck(encodeURIComponent( $('[id$=FIELD-BillingCountry]').val() )),
			'acc18street' : nullCheck(encodeURIComponent( $('[id$=FIELD-ShippingStreet]').val() )),
			'acc18city' : nullCheck(encodeURIComponent( $('[id$=FIELD-ShippingCity]').val() )),
			'acc18state' : nullCheck(encodeURIComponent( $('[id$=FIELD-ShippingState]').val() )),
			'acc18zip' : nullCheck(encodeURIComponent( $('[id$=FIELD-ShippingPostalCode]').val() )),
			'acc18country' : nullCheck(encodeURIComponent( $('[id$=FIELD-ShippingCountry]').val() )),
			'acc20' : nullCheck(encodeURIComponent( $('[id$=FIELD-Description]').val() )),
			'acc23' : nullCheck(encodeURIComponent( $('[id$=FIELD-Site]').val() )),
			'PersonMailingAddressstreet' : nullCheck(encodeURIComponent( $('[id$=FIELD-PersonMailingStreet]').val() )),
			'PersonMailingAddresscity' : nullCheck(encodeURIComponent( $('[id$=FIELD-PersonMailingCity]').val() )),
			'PersonMailingAddressstate' : nullCheck(encodeURIComponent( $('[id$=FIELD-PersonMailingState]').val() )),
			'PersonMailingAddresscountry' : nullCheck(encodeURIComponent( $('[id$=FIELD-PersonMailingCountry]').val() )),
			'PersonMailingAddresszip' : nullCheck(encodeURIComponent( $('[id$=FIELD-PersonMailingPostalCode]').val() )),
			'PersonOtherAddressstreet' : nullCheck(encodeURIComponent( $('[id$=FIELD-PersonOtherStreet]').val() )),
			'PersonOtherAddresscity' : nullCheck(encodeURIComponent( $('[id$=FIELD-PersonOtherCity]').val() )),
			'PersonOtherAddressstate' : nullCheck(encodeURIComponent( $('[id$=FIELD-PersonOtherState]').val() )),
			'PersonOtherAddresscountry' : nullCheck(encodeURIComponent( $('[id$=FIELD-PersonOtherCountry]').val() )),
			'PersonOtherAddresszip' : nullCheck(encodeURIComponent( $('[id$=FIELD-PersonOtherPostalCode]').val() ))
		}
	}

	var nullCheck = function (s){
		if(s=='undefined' || s=='null' || s=='000000000000000')
			return '';
		else
			return s;
	}
}
//UE_App_Helper - end

//UE_App_Controller - start

app.con = new function (){
	var $c = this;

	$c.init = function () {
		app.util.bindFields();

		for(var prop in app.cmp){
			if(app.cmp.hasOwnProperty(prop)){
				app.cmp[prop].init();
			}
		}
	}

	$c.onSeek = function () {
		debugger;
		console.log('Inside onseek');
		if(app.vm.uiStates.isSeeking || app.vm.uiStates.isSaving) {
			return;
		}
		app.vm.uiStates.isSeeking = true;

		app.sv.doSeek(app.vm.service.deltaString, app.vm.service.mappingFieldsJSON, $c.onSeek_complete);
		//parallel seek
		//app.sv.doSeekOnObject(app.vm.service.deltaString, app.vm.service.mappingFieldsJSON, $c.onSeek_complete);
	}

	$c.onSeek_complete = function () {
		app.vm.uiStates.isSeeking = false;
		app.vm.uiStates.isDirty = false;
		if(!app.vm.uiStates.isSaving){//Avoiding Update Alert bar when Saving
			if(app.vm.uiStates.isHavingDupes){
				var msg = app.vm.isMobile() ? app.vm.resx['msg.warning.duplicate'] : (response.exclamation + ' ' + app.vm.resx['msg.warning.duplicate.title']);
				app.cmp.alert.dupes(msg);
			}
			else{
				app.cmp.alert.hide();
			}
		}
	}


	$c.onSaveNew = function () {
		$c.onSave(true);
	}

	// $c.onCancel = function(){
	// 	$c.onCancel(true);
	// }

	$c.onSave = function (isSaveAndNew) {
		var validation = app.util.validate();
		if(validation != ''){
			app.cmp.alert.danger(validation);
			return;
		}
		app.vm.service.isSaveAndNew = isSaveAndNew == true;

		clearTimeout(app.vm.lowStartTimer);
		if(app.vm.meta.settings.isUeEnabled && app.util.checkFieldsChanged()){
			console.log('onseekbeforesave');
			$c.onSeekBeforeSave();
		}
		else{
			app.vm.uiStates.isSaving = true;
			app.sv.doSave($c.onSave_complete, { 'isSaveAndNew': app.vm.service.isSaveAndNew, 'isIgnoring': !app.vm.uiStates.isDirty && app.vm.uiStates.isHavingDupes && response.isAllowSave});
		}
	}

	$c.onSeekBeforeSave = function (){
		if(app.vm.meta.savePermission == 'allowSaveAtSeek'){
			//go straight to saving without re-Seek if AllowSaveArSeeking
			console.log('allowSaveAtSeek');
			app.vm.uiStates.isSaving = true;
			app.sv.doSave($c.onSave_complete, { 'isSaveAndNew': app.vm.service.isSaveAndNew, 'isIgnoring': true });
			return;
		}
		app.vm.uiStates.isSeeking = true;
		app.vm.service.lastPotentialDuplicatesString = response.mapDupesString;

		app.sv.doSeek(app.vm.service.deltaString, app.vm.service.mappingFieldsJSON, $c.onSeekBeforeSave_complete);
	}

	$c.onSeekBeforeSave_complete = function () {
		app.vm.uiStates.isSeeking = false;
		app.vm.uiStates.isDirty = false;

		app.vm.service.potentialDuplicatesString = response.mapDupesString;

		//if new dupes found
		if(app.vm.uiStates.isHavingDupes && app.vm.service.potentialDuplicatesString != app.vm.service.lastPotentialDuplicatesString){
			if(response.isAllowSave && confirm(meta.resx['msg.warning.continueSaving'])){
				app.vm.uiStates.isSaving = true;
				app.sv.doSave($c.onSave_complete, { 'isSaveAndNew': app.vm.service.isSaveAndNew, 'isIgnoring': true });
			}
			else{
				var msg = app.vm.isMobile() ? app.vm.resx['msg.warning.duplicate'] : response.exclamation + ' ' + app.vm.resx['msg.warning.duplicate.title'];
				app.cmp.alert.dupes(msg);
				app.vm.uiStates.isSaving = false;
			}
		}
		// 2016.09.29 fixing save action by clicking 2 time
		else{
			// force to saving record if there is not seekdupe record
			if(!app.vm.uiStates.isHavingDupes) {
				app.vm.uiStates.isSaving = true;
				app.sv.doSave($c.onSave_complete, { 'isSaveAndNew': app.vm.service.isSaveAndNew, 'isIgnoring': true });
			}
		}
		// 2016.09.29 fixing save action by clicking 2 time
	}

	$c.onSave_complete = function () {
		app.vm.uiStates.isSaving = false;
		console.log('new url from UE_app:  ' + newurl);
		if(response.hasMessages){
			app.cmp.alert.danger(app.vm.resx['msg.error.save'] + response.message);
		}
		else if (response.recordId == '' || response.goToUrl == ''){
			//check if standard dedup kicks in
			app.sv.doSeek_complete();
			//if no dups, and no errors message, then some hidden error happens!
			if(!app.vm.uiStates.isHavingDupes){
				app.cmp.alert.danger('Unexpected Error!');
			}
			else{
				$c.onSeek_complete();
			}
		}
		else {
			if(meta.obj == 'Account' && meta.tmEvaluate){
				try{
					app.vm.uiStates.isSaving = true;

					app.cmp.alert.info(app.vm.resx['msg.info.evaluating.assignmentrules']);

					var acc=new sforce.SObject("Account");
					acc.id= response.recordId;
					sforce.connection.assignmentRuleHeader = {};
					sforce.connection.assignmentRuleHeader.useDefaultRule = "true";
					result=sforce.connection.update([acc]);

					app.vm.uiStates.isSaving = false;
				}
				catch (e){
					app.vm.uiStates.isSaving = false;
					app.cmp.alert.danger('ERROR: ' + e);
					return;
				}
			}
			app.cmp.alert.success(app.vm.resx['msg.info.savesuccess']);
			app.vm.uiStates.isSaving = true;
			if(response.goToUrl == 'broadlook'){
				app.util.openInWindow('/apex/blds__ShieldUpdate?newid=' + response.recordId);
			}
			else if(response.goToUrl == 'new'){
				app.util.openInWindow(newurl);
			}
			else if(response.goToUrl == 'record'){
				// fixed "Saving" keeps spinning on SF1
				// app.util.goToRecord('/' + response.recordId);
				app.util.openInWindow('/' + response.recordId);
			}
			else if(response.goToUrl == 'tab'){
				// fixed "Saving" keeps spinning on SF1
				// app.util.goToRecord('/' + response.recordId);
				app.util.openInWindow('/' + response.recordId);
			}
		}
	}

	$c.onInput = function (){
		console.log('Inside on input function');
		app.vm.uiStates.isDirty = true;
		if(app.vm.meta.settings.isUeEnabled){
			clearTimeout(app.vm.lowStartTimer);

			app.vm.lowStartTimer = setTimeout(
				function (){
					if(app.util.checkFieldsChanged()){
						$c.onSeek();
					}
				}
				, 1000
			);
		}
	}
}

//UE_App_Controller - end



//UE_App_Service - start

app.sv = new function() {
	var $c = this;

	$c.timestamp = Date.now();

	$c.init = function (){
		$c.sObjects = {};//contains metadata information on account, contact and lead
		$c.dupQuery = {};//contains query for retrieving duplicate record

		//retrieve sobject info
		//var temp = sforce.connection.describeSObjects(['Account','Contact','Lead']);
		var temp = ['Account','Contact','Lead'];
		for(var i = 0; i < temp.length; i++) {
			$c.sObjects[temp[i]] = meta.tabInfos[temp[i]];
		}
		//
		for(var listType in app.vm.meta.selectedFields){ if (app.vm.meta.selectedFields.hasOwnProperty(listType)){
			var fieldsToQuery = [];
			var objType = listType.indexOf('account') > 0 ? 'Account' : (listType == 'contact' ? 'Contact' : 'Lead');
			var fieldMap = $c.sObjects[objType].fieldMap;

			app.vm.dupes.matches[listType].fieldMap = fieldMap;

			for(var i = 0; i < app.vm.meta.selectedFields[listType].length; i++){
				var fieldApi = app.vm.meta.selectedFields[listType][i];
				var field = fieldMap[fieldApi];

				if(field == null){
					//do nothing
				}
				else if (field.type == 'reference'){
					fieldsToQuery.push(field.relationshipName + '.Id');
					fieldsToQuery.push(field.relationshipName + '.Name');
				}
				else {
					fieldsToQuery.push(field.name);
				}
			}

			$c.dupQuery[listType] = 'SELECT Id, ' + fieldsToQuery.join() + ' FROM ' + objType;
		}}
	}
	$c.init();

	$c.doSeek = function (deltaString, mappingFieldsJSON, callback) {
		console.log('Inside doseek');
		$c.doSeek_callback = callback;
		$c.timestamp = Date.now();
		console.log('Delta String: ' + deltaString);

		action_seekDupes(deltaString, mappingFieldsJSON);
	}

	$c.doSeekOnObject = function (deltaString, mappingFieldsJSON, callback) {
		$c.doSeek_callback = callback;

		$c.timestamp = Date.now();

		if(meta.obj == 'Account'){
			var sObjNameList = ['baccount', 'paccount', 'lead'];
			for( var i = 0; i < sObjNameList.length;i++){
				var name = sObjNameList[i];
				UniqueEntry.uniqueSF1AccountExt.seekDupOnObject(name, app.vm.meta.cacheId , deltaString, mappingFieldsJSON, function(result, event){
					console.log(result);
					var rs = JSON.parse(result);
					for( key in rs ){
						$c.setResponseMapDupesStringValue(key, rs[key]);
						$c.doSeekOnObject_complete(key);
					}
				}, {escape: false});
			}

		}else if(meta.obj == 'Lead'){
			var sObjNameList = ['lead', 'baccount', 'paccount', 'contact'];
			for( var i = 0; i < sObjNameList.length;i++){
				var name = sObjNameList[i];
				UniqueEntry.uniqueSF1LeadExt.seekDupOnObject(name, app.vm.meta.cacheId , deltaString, mappingFieldsJSON, function(result, event){
					console.log(result);
					var rs = JSON.parse(result);
					for( key in rs ){
						$c.setResponseMapDupesStringValue(key, rs[key]);
						$c.doSeekOnObject_complete(key);
					}

				}, {escape: false});
			}
		}else if(meta.obj == 'Contact'){
			var sObjNameList = ['contact', 'lead'];
			for( var i = 0; i < sObjNameList.length;i++){
				var name = sObjNameList[i];
				UniqueEntry.uniqueSF1ContactExt.seekDupOnObject(name, app.vm.meta.cacheId , deltaString, mappingFieldsJSON, function(result, event){
					console.log(result);
					var rs = JSON.parse(result);
					for( key in rs ){
						$c.setResponseMapDupesStringValue(key, rs[key]);
						$c.doSeekOnObject_complete(key);
					}
				}, {escape: false});
			}

		}
	}

	$c.setResponseMapDupesStringValue = function(key, value){
		if(response.mapDupesString != ''){
			var mapDupes = JSON.parse(response.mapDupesString);
			mapDupes[key] = value;
			response.mapDupesString = JSON.stringify(mapDupes);
		}
	}

	$c.doSeek_complete = function (){
		app.vm.uiStates.isSeeking = false;
		debugger;
		if(response.mapDupesString != ''){
			var mapDupes = JSON.parse(response.mapDupesString);


			for (var i = 0; i < app.vm.dupes.matches_iterator.length; i++){
				var listName = encodeURIComponent(app.vm.dupes.matches_iterator[i]);

				// var enListname = btoa(listName);
				// console.log('Encoded list name:   ' + enListname);
				var list = app.vm.dupes.matches[listName];

				if(!list.isDupable){
					continue;
				}

				app.vm.dupes.topMatches[listName] = null;

				list.records.clear();
				list.ids.clear();

				if (mapDupes[listName] != null && mapDupes[listName].length > 0){
					list.ids.pushAll(mapDupes[listName]);

					$c.loadRecords(encodeURIComponent(listName));
				}
			}

			app.vm.dupes.topMatch = {};
			app.vm.uiStates.isHavingDupes =
				app.vm.dupes.matches.baccount.ids.length > 0
				|| app.vm.dupes.matches.paccount.ids.length > 0
				|| app.vm.dupes.matches.contact.ids.length > 0
				|| app.vm.dupes.matches.lead.ids.length > 0;

			getInput('Contact_Dupes_Ignored__c').val(app.vm.dupes.matches.contact.ids.length);
			getInput('Lead_Dupes_Ignored__c').val(app.vm.dupes.matches.lead.ids.length);
			getInput('Account_Dupes_Ignored__c').val(app.vm.dupes.matches.baccount.ids.length + app.vm.dupes.matches.paccount.ids.length);

			if(app.vm.uiStates.isHavingDupes){
				loadFirstRecord();
			}
		}
		else{
			app.vm.uiStates.isHavingDupes = false;
		}
		app.vm.uiStates.isAllowSave = response.isAllowSave;

		if($c.doSeek_callback){
			$c.doSeek_callback();
		}
	}

	$c.doSeekOnObject_complete = function (sObjName){
		app.vm.uiStates.isSeeking = false;

		if(response.mapDupesString != ''){
			var mapDupes = JSON.parse(response.mapDupesString);

			var listName = sObjName;
			console.log(listName);
			var list = app.vm.dupes.matches[listName];

			if(!list.isDupable){
				return;
			}

			app.vm.dupes.topMatches[listName] = null;

			list.records.clear();
			list.ids.clear();

			if (mapDupes[listName] != null && mapDupes[listName].length > 0){
				list.ids.pushAll(mapDupes[listName]);

				$c.loadRecords(listName);
			}

			app.vm.dupes.topMatch = {};
			app.vm.uiStates.isHavingDupes =
				app.vm.dupes.matches.baccount.ids.length > 0
				|| app.vm.dupes.matches.paccount.ids.length > 0
				|| app.vm.dupes.matches.contact.ids.length > 0
				|| app.vm.dupes.matches.lead.ids.length > 0;

			getInput('Contact_Dupes_Ignored__c').val(app.vm.dupes.matches.contact.ids.length);
			getInput('Lead_Dupes_Ignored__c').val(app.vm.dupes.matches.lead.ids.length);
			getInput('Account_Dupes_Ignored__c').val(app.vm.dupes.matches.baccount.ids.length + app.vm.dupes.matches.paccount.ids.length);

			if(app.vm.uiStates.isHavingDupes){
				loadFirstRecord();
			}
		}
		else{
			app.vm.uiStates.isHavingDupes = false;
		}
		app.vm.uiStates.isAllowSave = response.isAllowSave;

		if($c.doSeek_callback){
			$c.doSeek_callback();
		}
	}

	$c.doSave = function (callback, options) {
		console.log('Inside dosave');
		console.log('IsEmailChanged:    ' + isEmailChanged);
		console.log('bvdsecLookupId:    ' + bvdsecLookupId);
		$("[id$='BvD_Secondary_Source__c_lkid']").val(bvdsecLookupId);
		if(isEmailChanged){
			if(confirm('Warning - Please confirm that the client is made aware of any email changes as this will impact their login access to any customer applications')){
				$c.doSave_callback = callback;
				if(options.isSaveAndNew && options.isIgnoring){
					action_onSaveAndNewIgnoreAlert();
				}
				else if(options.isSaveAndNew && !options.isIgnoring){
					action_onSaveAndNew();
				}
				else if(!options.isSaveAndNew && options.isIgnoring){
					action_onSaveIgnoreAlert();
				}
				else if(!options.isSaveAndNew && !options.isIgnoring){
					action_onSave();
				}
			}
			else{
				app.vm.uiStates.isSaving = false;
			}
		}

		else{
			$c.doSave_callback = callback;
			if(options.isSaveAndNew && options.isIgnoring){
				action_onSaveAndNewIgnoreAlert();
			}
			else if(options.isSaveAndNew && !options.isIgnoring){
				action_onSaveAndNew();
			}
			else if(!options.isSaveAndNew && options.isIgnoring){
				action_onSaveIgnoreAlert();
			}
			else if(!options.isSaveAndNew && !options.isIgnoring){
				action_onSave();
			}
		}

	}

	$c.doSave_complete = function () {
		if($c.doSave_callback){
			$c.doSave_callback();
		}
	}

	$c.loadRecords = function (listName){
		try{
			console.log(listName);
			var match = app.vm.dupes.matches[listName];
			var listIds = match.ids.slice(match.countDisplaying(), match.countDisplaying() + app.vm.config.RECORDS_PER_PATCH);
			var fields = app.vm.meta.selectedFields[listName];
			var ts = $c.timestamp;

			match.loading = true;

			var query = $c.dupQuery[listName];
			var condition =  listIds.join("','");
			//var condition =  " WHERE ID IN ('" + listIds.join("','") +"')";

			//change from using Sforce query to RemoteAcction ( uniqueSF1BaseExt)
			if(meta.obj == 'Account'){
				// UniqueEntry.uniqueSF1AccountExt.loadRecordsRemote(query , condition, listName, function(result, event){
				//         $c.processLoadedRecord(result, event, match, listIds, fields, listName, ts);
				//     }, {escape:true});
				UniqueEntry.uniqueSF1AccountExt.loadRecordsRemoteAction(query , condition, listName, function(result, event){
					$c.processLoadedRecord(JSON.parse(result), event, match, listIds, fields, listName, ts);
				}, {escape: false});
			}else if(meta.obj == 'Lead'){
				// UniqueEntry.uniqueSF1LeadExt.loadRecordsRemote(query , condition, listName, function(result, event){
				//         $c.processLoadedRecord(result, event, match, listIds, fields, listName, ts);
				//     }, {escape:true});
				UniqueEntry.uniqueSF1LeadExt.loadRecordsRemoteAction(query , condition, listName, function(result, event){
					$c.processLoadedRecord(JSON.parse(result), event, match, listIds, fields, listName, ts);
				}, {escape: false});
			}else if(meta.obj == 'Contact'){
				// UniqueEntry.uniqueSF1ContactExt.loadRecordsRemote(query , condition, listName, function(result, event){
				//         $c.processLoadedRecord(result, event, match, listIds, fields, listName, ts);
				//     }, {escape:true});
				UniqueEntry.uniqueSF1ContactExt.loadRecordsRemoteAction(query , condition, listName, function(result, event){
					$c.processLoadedRecord(JSON.parse(result), event, match, listIds, fields, listName, ts);
				}, {escape: false});
			}

			// sforce.connection.query(query, {
			//     onSuccess: function(res){

			//         match.loading = false;
			//         if(ts != $c.timestamp || res == null || res.records == null || res.size != listIds.length){
			//             action_onLoadRecords(query, listName);
			//             return;
			//         }

			//         var records = ( res.records.constructor === Array) ? res.records : [res.records];

			//         //sort results based on order of IDs passed in the query
			//         var temp = [];
			//         for(var i = 0; i < listIds.length; i++){
			//             for(var j = records.length - 1 ; j >=0; j--){
			//                 if(records[j].Id == listIds[i]){
			//                     temp.push(records.splice(j,1)[0]);
			//                 }
			//             }
			//         }
			//         records = temp;

			//         for(var i = 0; i < records.length; i++){
			//             app.util.insertCard(listName, $c.generateCard(match.obj, records[i], fields, match.fieldMap));
			//         }
			//     },
			//     onFailure: function(e){
			//         console.log(e);
			//     }
			// });
		}
		catch(e){
			console.log(e);
		}
	}

	$c.processLoadedRecord = function(result, event, match, listIds, fields, listName, ts){
		if (event.status) {
			match.loading = false;
			if(ts != $c.timestamp || result == null ){
				// action_onLoadRecords(query, listName);
				return;
			}
			//var records = ( result.constructor === Array) ? res.records : [res.records];

			//sort results based on order of IDs passed in the query
			var temp = [];
			for(var i = 0; i < listIds.length; i++){
				for(var j = result.length - 1 ; j >=0; j--){
					if(result[j].Id == listIds[i]){
						temp.push(result.splice(j,1)[0]);
					}
				}
			}
			result = temp;
			for(var i = 0; i < result.length; i++){
				app.util.insertCard(listName, $c.generateCard(match.obj, result[i], fields, match.fieldMap));
			}

		}
		else if (event.type === 'exception')
		{
			console.log('1' + event.message);
		} else
		{
			console.log('2' + event.message);
		}
	}

	$c.generateCard = function(obj, item, fields, fieldMap){
		item.Name = sanitizeString(item.Name);
		var details = {
			Id: item.Id,
			Name: item.Name,
			fields: [],
			obj: obj
		};
		try{
			for(var j = 0; j < fields.length; j++){
				if(fields[j] == 'Id' || fields[j] == 'Name')
					continue;

				var field = fieldMap[fields[j]];
				var val = null;
				if (field.type == 'reference') {
					val = item[field.relationshipName];
					val.name = sanitizeString(val.Name);
					field.label = field.label.toLowerCase().endsWith('id') ? field.label.substring(0, field.label.length - 3) : field.label;
				}
				else if (field.type == 'address' && item[field.name] != null) {
					val = '';
					val += item[field.name].street == null ? '' : sanitizeString((item[field.name].street));
					val += item[field.name].city == null ? '' : sanitizeString((item[field.name].city)) + ', ';
					val += item[field.name].postalcode == null ? '' : sanitizeString((item[field.name].postalcode)) + '<br/>';
					val += item[field.name].country == null ? '' : sanitizeString((item[field.name].country));
				}
				else if (field.type == 'date') {
					var tempDate = moment(item[field.name], 'YYYY-MM-DD', true);
					val = tempDate.isValid() ? tempDate.format('L') : val;
				}
				else if (field.type == 'datetime') {
					var tempDateTime = moment(item[field.name], moment.ISO_8601, true);
					val = tempDateTime.isValid() ? tempDateTime.format('L LT') : val;
				}
				else {
					val = sanitizeString((item[field.name]));
				}
				if(val != null){
					details.fields.push({
						meta: field,
						value: val
					});
				}
			}
		}
		catch(e){
			console.log(e);
		}

		return details;
	}

	var loadFirstRecord = function(){
		var accountIds = app.vm.dupes.matches.baccount.ids;
		var paccountIds = app.vm.dupes.matches.paccount.ids;
		var contactIds = app.vm.dupes.matches.contact.ids;
		var leadIds = app.vm.dupes.matches.lead.ids;

		try{
			var query = listType = condition = '';
			if(accountIds != null && accountIds.length > 0){
				query = "SELECT Id, Name FROM Account ";
				//condition =  "WHERE Id = '" + accountIds[0] + "'";
				condition =  "" + accountIds[0];
				listType = 'baccount';
			}
			else if(paccountIds != null && paccountIds.length > 0){
				query = "SELECT Id, PersonEmail, Name, PersonContact.Name FROM Account ";
				// condition =  "WHERE Id = '" + paccountIds[0] + "'";
				condition =  "" + paccountIds[0];
				listType = 'paccount';
			}
			else if(contactIds != null && contactIds.length > 0){
				query = "SELECT Id, Email, Name, AccountId, Account.Name, Account.Website FROM Contact ";
				// condition =  "WHERE Id = '" + contactIds[0] + "'";
				condition =  "" + contactIds[0];
				listType = 'contact';
			}
			else if(leadIds != null && leadIds.length > 0){
				query = "SELECT Id, Email, Name, Company FROM Lead ";
				// condition =  "WHERE Id = '" + leadIds[0] + "'";
				condition =  "" + leadIds[0];
				listType = 'lead';
			}

			//query = "SELECT Id, Email, Name, AccountId, Account.Name, Account.Website FROM Contact WHERE Id = '" + contactIds[0] + "'";
			//listType = 'contact';
			//
			// 2016.10.11 fixed edited icon on alert bar start
			var type = '';
			if(listType == 'lead' || listType == 'Lead') {
				type = 'Lead';
			} else if(listType == 'contact' || listType == 'Contact') {
				type = 'Contact';
			} else if(listType == 'baccount' || listType == 'bAccount' || listType == 'pAccount' || listType == 'pAccount') {
				type = 'Account';
			}
			// 2016.10.11 fixed edited icon on alert bar end

			//change from using Sforce query to RemoteAcction ( uniqueSF1BaseExt)
			if(meta.obj == 'Account'){
				// UniqueEntry.uniqueSF1AccountExt.loadRecordsRemote(query , condition, listType, function(result, event){
				//         console.log(result);
				//         var rec = (result.constructor === Array) ? result[0] : result;
				//         rec.listType = listType;
				//         app.vm.dupes.topMatch = rec;
				//         console.log(app.vm.dupes.topMatch);
				//     }, {escape:true});
				UniqueEntry.uniqueSF1AccountExt.loadRecordsRemoteAction(query , condition, listType, function(result, event){
					console.log('Result:    ' + result);
					var lstObj = JSON.parse(result);
					console.log('lstObj:  ' + lstObj);
					var rec = (lstObj.constructor === Array) ? lstObj[0] : lstObj;
					console.log('REC:    ' + rec);
					rec.listType = listType;
					rec.Name = rec.Name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
					if(rec.Email){
						rec.Email = rec.Email.replace(/</g, '&lt;').replace(/>/g, '&gt;');
					}
					if(rec.Account){
						if(rec.Account.Name){
							rec.Account.Name = rec.Account.Name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
						}
					}
					console.log(rec.Name);
					console.log(typeof rec.Name);
					// 2016.10.11 fixed edited icon on alert bar start
					rec.type = type;
					// 2016.10.11 fixed edited icon on alert bar end
					app.vm.dupes.topMatch = rec;
				}, {escape: false});
			} else if(meta.obj == 'Lead'){
				// UniqueEntry.uniqueSF1LeadExt.loadRecordsRemote(query , condition, listType, function(result, event){
				//         var rec = (result.constructor === Array) ? result[0] : result;
				//         rec.listType = listType;
				//         app.vm.dupes.topMatch = rec;
				//     }, {escape:true});
				UniqueEntry.uniqueSF1LeadExt.loadRecordsRemoteAction(query , condition, listType, function(result, event){

					var lstObj = JSON.parse(result);

					var rec = (lstObj.constructor === Array) ? lstObj[0] : lstObj;

					rec.listType = listType;
					rec.Name = rec.Name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
					if(rec.Email){
						rec.Email = rec.Email.replace(/</g, '&lt;').replace(/>/g, '&gt;');
					}
					if(rec.Account){
						if(rec.Account.Name){
							rec.Account.Name = rec.Account.Name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
						}
					}

					// 2016.10.11 fixed edited icon on alert bar start
					rec.type = type;
					// 2016.10.11 fixed edited icon on alert bar end
					app.vm.dupes.topMatch = rec;
				}, {escape: false});
			} else if(meta.obj == 'Contact'){
				// UniqueEntry.uniqueSF1ContactExt.loadRecordsRemote(query , condition, listType, function(result, event){
				//         var rec = (result.constructor === Array) ? result[0] : result;
				//         rec.listType = listType;
				//         app.vm.dupes.topMatch = rec;
				//     }, {escape:true});
				UniqueEntry.uniqueSF1ContactExt.loadRecordsRemoteAction(query , condition, listType, function(result, event){
					console.log('Result:    ' + result);
					var lstObj = JSON.parse(result);
					console.log('lstObj:  ' + lstObj);
					var rec = (lstObj.constructor === Array) ? lstObj[0] : lstObj;
					console.log('REC:    ' + rec);
					rec.listType = listType;
					rec.Name = rec.Name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
					if(rec.Email){
						rec.Email = rec.Email.replace(/</g, '&lt;').replace(/>/g, '&gt;');
					}

					if(rec.Account){
						if(rec.Account.Name){
							rec.Account.Name = rec.Account.Name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
						}
					}
					console.log(rec.Name);
					console.log(typeof rec.Name);
					// 2016.10.11 fixed edited icon on alert bar start
					rec.type = type;
					// 2016.10.11 fixed edited icon on alert bar end
					app.vm.dupes.topMatch = rec;
				}, {escape: false});
			}

			// sforce.connection.query(query , {
			//     onSuccess: function(res){
			//         var rec = (res.records.constructor === Array) ? res.records[0] : res.records;
			//         rec.listType = listType;
			//         app.vm.dupes.topMatch = rec;
			//     },
			//     onFailure: function(res){}
			// });
		}
		catch(e){
			console.log(e)
		}
	}
}

var isEmailChanged = false;
var bvdsecLookupId;

// function marketVal(){

//     var  countryVal = $("[id$='PrimaryCountryPicklist__c']").val();
//     if(countryVal){
// 	    try{
// 	        var query1 = "SELECT Id, Market__c from CountryRegion__c where Name = " + countryVal + "";
// 	        var query1 = sforce.connection.query("SELECT Id, Market__c from CountryRegion__c where Name ='"+ countryVal +"'");
// 	        console.log('Records: ' + query1);
// 	        var rec = query1.getArray("records");
// 	        console.log(rec);
// 	        marketVal = rec[0].Market__c;
// 	        console.log('market value is:  ' + marketVal);
// 	        return  marketVal;
// 	        }
// 	        catch(e){
// 	            alert('An Error has Occured. Error:' +e);
// 	        }
//     }
//     else
//     	return null;

//  }



//UE_App_Service - end

//UE_Plugin_FTR - start

function getFullId(eid){
	return $("[id*='"+eid+"']").attr("Id");
}
var easydqConfig = {};
var easydqSource = '';
var defaultCountry = '';
var api_key = '';

$(function(){
	if(!meta.settings.isFtrEnabled){
		return;
	}
	onLoad_initEasydqConfig();
	onLoad_overrideEasydqConfig();
	onLoad_initDefaultValues();
	onLoad_startEasydq();
})

function onLoad_initEasydqConfig(){
	//sforce.connection.client = "HumanInference/DataQuality/";
	//sforce.connection.sessionId = "{!$Api.Session_ID}";
	var configData = meta.ftrConfig;

	jQuery.each(configData, function (idx, sfXml) {
		if (sfXml.key == 'user_country') {
			//TODO
		} else if(sfXml.key == 'api_key'){
			api_key = sfXml.value;
		} else if (sfXml.key == 'user_country_code') {
			defaultCountry = sfXml.value;
		} else if (sfXml.key == 'account_key_prefix') {
			//TODO//keyPrefixes.account = sfXml.value;
		} else if (sfXml.key == 'contact_key_prefix') {
			//TODO//keyPrefixes.contact = sfXml.value;
		} else if (sfXml.key == 'lib_src') {
			easydqSource = sfXml.value;
		} else {
			easydqConfig[sfXml.key] = sfXml.value;
		}
	});
	//easydqConfig.debug_mode = "true";
	//easydqConfig.api_key = "SFDC_{!LEFT($Organization.Id,15)}";//{!RIGHT(LEFT($Organization.Id,15),12)}";//"SFDC_00Db0000000YKBt";//"RLUE_b0000000YKBt";//{!RIGHT(LEFT($Organization.Id,15),12)}";
	//easydqConfig.channel = "salesforce";
	//easydqConfig.channel_client_id = "00Db0000000YKBt";
	if(meta.obj == 'Contact'){
		easydqConfig.person_name_id = [
			getFullId("FIELD-FirstName"),
			getFullId("FIELD-LastName")
		].join(',');
		easydqConfig.person_name_auto_select = "true";
		easydqConfig.title_id = getFullId("FIELD-Title");
		easydqConfig.given_name_id = getFullId("FIELD-FirstName");
		easydqConfig.family_name_id = getFullId("FIELD-LastName");
		easydqConfig.salutation_id = getFullId("FIELD-Salutation");

		easydqConfig.phone_number_id = [
			getFullId("FIELD-Phone"),
			getFullId("FIELD-HomePhone"),
			getFullId("FIELD-OtherPhone"),
			getFullId("FIELD-MobilePhone"),
			getFullId("FIELD-AssistantPhone"),
			getFullId("FIELD-Fax")
		].join(';');

		easydqConfig.email_address_id = getFullId("FIELD-Email");

		easydqConfig.street_name_id = [
			getFullId("FIELD-MailingStreet"),
			getFullId("FIELD-OtherStreet")
		].join(';');

		easydqConfig.city_id = [
			getFullId("FIELD-MailingCity"),
			getFullId("FIELD-OtherCity")
		].join(';');

		easydqConfig.postal_code_id = [
			getFullId("FIELD-MailingPostalCode"),
			getFullId("FIELD-OtherPostalCode")
		].join(';');

		if(getFullId("picklist-HIDDEN-MailingCountryCode") == null && getFullId("picklist-HIDDEN-OtherCountryCode") == null
			&& getFullId("picklist-HIDDEN-MailingStateCode") == null && getFullId("picklist-HIDDEN-OtherStateCode") == null){

			easydqConfig.country_id = [
				getFullId("FIELD-MailingCountry"),
				getFullId("FIELD-OtherCountry")
			].join(';');
			easydqConfig.province_id = [
				getFullId("FIELD-MailingState"),
				getFullId("FIELD-OtherState")
			].join(';');
			easydqConfig.address_ids = [
				[getFullId("FIELD-MailingStreet"), getFullId("FIELD-MailingPostalCode"), getFullId("FIELD-MailingCity"), getFullId("FIELD-MailingState")].join(','),
				[getFullId("FIELD-OtherStreet"), getFullId("FIELD-OtherPostalCode"), getFullId("FIELD-OtherCity"), getFullId("FIELD-OtherState")].join(',')
			].join(';');

			countryId = getFullId("FIELD-MailingCountry");
		}else{

			easydqConfig.country_id = [
				getFullId("picklist-HIDDEN-MailingCountryCode"),
				getFullId("picklist-HIDDEN-OtherCountryCode")
			].join(';');
			easydqConfig.province_id = [
				getFullId("picklist-HIDDEN-MailingStateCode"),
				getFullId("picklist-HIDDEN-OtherStateCode")
			].join(';');
			easydqConfig.address_ids = [
				[getFullId("FIELD-MailingStreet"), getFullId("FIELD-MailingPostalCode"), getFullId("FIELD-MailingCity"), getFullId("picklist-HIDDEN-MailingStateCode")].join(','),
				[getFullId("FIELD-OtherStreet"), getFullId("FIELD-OtherPostalCode"), getFullId("FIELD-OtherCity"), getFullId("picklist-HIDDEN-OtherStateCode")].join(',')
			].join(';');

			countryId = getFullId("picklist-HIDDEN-MailingCountryCode");
		}

		easydqConfig.countryForAddress_id = easydqConfig.country_id;
		easydqConfig.countryForPhone_id = [countryId,countryId,countryId,countryId,countryId,countryId].join(';');
	}
	else if(meta.obj == 'Account'){
		easydqConfig.phone_number_id = [
			getFullId("FIELD-Phone"),
			getFullId("FIELD-Fax")
		].join(';');

		easydqConfig.street_name_id = [
			getFullId("FIELD-BillingStreet"),
			getFullId("FIELD-ShippingStreet")
		].join(';');

		easydqConfig.city_id = [
			getFullId("FIELD-BillingCity"),
			getFullId("FIELD-ShippingCity")
		].join(';');

		easydqConfig.postal_code_id = [
			getFullId("FIELD-BillingPostalCode"),
			getFullId("FIELD-ShippingPostalCode")
		].join(';');

		if(getFullId("picklist-HIDDEN-BillingCountryCode") == null && getFullId("picklist-HIDDEN-ShippingCountryCode") == null
			&& getFullId("picklist-HIDDEN-BillingStateCode") == null && getFullId("picklist-HIDDEN-ShippingStateCode") == null){

			easydqConfig.country_id = [
				getFullId("FIELD-BillingCountry"),
				getFullId("FIELD-ShippingCountry")
			].join(';');
			easydqConfig.province_id = [
				getFullId("FIELD-BillingState"),
				getFullId("FIELD-ShippingState")
			].join(';');
			easydqConfig.address_ids = [
				[getFullId("FIELD-BillingStreet"), getFullId("FIELD-BillingPostalCode"), getFullId("FIELD-BillingCity"), getFullId("FIELD-BillingState")].join(','),
				[getFullId("FIELD-ShippingStreet"), getFullId("FIELD-ShippingPostalCode"), getFullId("FIELD-ShippingCity"), getFullId("FIELD-ShippingState")].join(',')
			].join(';');

			countryId = getFullId("FIELD-BillingCountry");
		}else{

			easydqConfig.country_id = [
				getFullId("picklist-HIDDEN-BillingCountryCode"),
				getFullId("picklist-HIDDEN-ShippingCountryCode")

			].join(';');
			easydqConfig.province_id = [
				getFullId("picklist-HIDDEN-BillingStateCode"),
				getFullId("picklist-HIDDEN-ShippingStateCode")
			].join(';');
			easydqConfig.address_ids = [
				[getFullId("FIELD-BillingStreet"), getFullId("FIELD-BillingPostalCode"), getFullId("FIELD-BillingCity"), getFullId("picklist-HIDDEN-BillingStateCode")].join(','),
				[getFullId("FIELD-ShippingStreet"), getFullId("FIELD-ShippingPostalCode"), getFullId("FIELD-ShippingCity"), getFullId("picklist-HIDDEN-ShippingStateCode")].join(',')
			].join(';');

			countryId = getFullId("picklist-HIDDEN-BillingCountryCode");
		}
		easydqConfig.countryForAddress_id = easydqConfig.country_id;

		easydqConfig.countryForPhone_id = [countryId,countryId].join(';');
	}
	else{//lead
		if(getFullId("picklist-HIDDEN-CountryCode") == null){
			countryId = getFullId("FIELD-Country");
		} else {
			countryId = getFullId("picklist-HIDDEN-CountryCode");
		}
		console.log(countryId);

		easydqConfig.person_name_id = [
			getFullId("FIELD-FirstName"),
			getFullId("FIELD-LastName")
		].join(',');
		easydqConfig.person_name_auto_select = "true";
		easydqConfig.title_id = getFullId("FIELD-Title");
		easydqConfig.given_name_id = getFullId("FIELD-FirstName");
		easydqConfig.family_name_id = getFullId("FIELD-LastName");
		easydqConfig.salutation_id = getFullId("FIELD-Salutation");
		easydqConfig.company_name_id = getFullId("FIELD-Company");
		easydqConfig.phone_number_id = [
			getFullId("FIELD-Phone"),
			getFullId("FIELD-MobilePhone"),
			getFullId("FIELD-Fax")
		].join(';');

		easydqConfig.email_address_id = getFullId("FIELD-Email");



		easydqConfig.street_name_id = getFullId("FIELD-Street");
		easydqConfig.city_id = getFullId("FIELD-City");
		easydqConfig.province_id = getFullId("FIELD-State")
		if(getFullId("picklist-HIDDEN-StateCode") == null){
			easydqConfig.province_id = getFullId("FIELD-State");
		} else {
			easydqConfig.province_id = getFullId("picklist-HIDDEN-StateCode");
		}
		easydqConfig.postal_code_id = getFullId("FIELD-PostalCode");
		easydqConfig.country_id = countryId;
		easydqConfig.countryForPhone_id = [countryId,countryId,countryId].join(';');
		easydqConfig.countryForAddress_id = easydqConfig.country_id;

		easydqConfig.address_ids = [
			[easydqConfig.street_name_id, easydqConfig.postal_code_id, easydqConfig.city_id, easydqConfig.province_id].join(',')
		].join(';');
	}
}

function sanitizeString(str){
	if(str != null){
		str = String(str);
		str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}
	return str;
}

function onLoad_overrideEasydqConfig(){
	if(typeof(ftrSettingsOverride) == 'undefined'){
		return;
	}
	if(typeof(ftrSettingsOverride.init) != 'undefined'){
		ftrSettingsOverride.init(easydqConfig);
	}
}

function onLoad_initDefaultValues(){
	//set default country
	if(meta.obj == 'Contact'){
		if(meta.entity.MailingCountry == ''){
			$("input[id*='FIELD-MailingCountry']").val(defaultCountry);
		}
		if(meta.entity.OtherCountry == ''){
			$("input[id*='FIELD-OtherCountry']").val(defaultCountry);
		}
	}
	else if(meta.obj == 'Account'){
		if(meta.entity.BillingCountry == ''){
			$("input[id*='FIELD-BillingCountry']").val(defaultCountry);
		}
		if(meta.entity.ShippingCountry == ''){
			$("input[id*='FIELD-ShippingCountry']").val(defaultCountry);
		}
	}
	else if(meta.obj == 'Lead'){
		if(meta.entity.Country == ''){
			$("input[id*='FIELD-Country']").val(defaultCountry);
		}
	}

	var countries = [];
	if(easydqConfig.country_id != null && easydqConfig.country_id != ''){
		countries = easydqConfig.country_id.split(';');
	}

	for(var i = 0; i < countries.length; i++){
		var $countryInput = $(document.getElementById(countries[i]));
		if($countryInput.length > 0 && $countryInput.val() == ''){
			$countryInput.val(defaultCountry);
		}
	}
	easydqConfig.api_key = api_key;
}

function onLoad_startEasydq(){
	if(!meta.FTR.enableNameValidation){
		easydqConfig.person_name_id = '';
		easydqConfig.person_name_auto_select = "";
		easydqConfig.title_id = '';
		easydqConfig.given_name_id = '';
		easydqConfig.family_name_id = '';
		easydqConfig.salutation_id = '';
	}
	if(!meta.FTR.enablePhoneValidation){
		easydqConfig.phone_number_id = '';
		easydqConfig.countryForPhone_id = '';
	}
	if(!meta.FTR.enableEmailValidation){
		easydqConfig.email_address_id = '';
	}
	if(!meta.FTR.enableAddressValidation){
		easydqConfig.address_ids = '';
		easydqConfig.street_name_id = '';
		easydqConfig.city_id = '';
		easydqConfig.province_id = '';
		easydqConfig.postal_code_id = '';
		easydqConfig.countryForAddress_id = '';
	}
	$.cachedScript(easydqSource);
}



jQuery.cachedScript = function( url, options ) {
	options = $.extend( options || {}, {
		dataType: "script",
		cache: true,
		url: url
	});
	return jQuery.ajax( options );
};

//UE_Plugin_FTR - end