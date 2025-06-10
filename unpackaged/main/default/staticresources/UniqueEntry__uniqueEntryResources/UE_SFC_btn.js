//add buttons handler specifically for Lightning Experience
app.cmp.btn = new function (){
    var $c = this;

    $c.renderer = [];

    $c.init = function() {
    	$('.pbButton, .pbButtonb').each(function () {
        	var r = new Ractive({
                el:this,
                template: '#tmpl_buttons',
	        	magic: true,
                data: app.vm
            });
            r.on('onSave', app.con.onSave);
            r.on('onCancel', action_onCancel);
            r.on('onSaveNew', app.con.onSaveNew);
            r.on('onShowAllDups', app.cmp.dupes.onShowTop);

            $c.renderer.push(r);
    	})
    }

    $c.digest = function (){
    	for(var i = 0; i < $c.renderer.length; i++){
        	$c.renderer[i].update();
        }
    }

    $c.onSave = function (ev) {
    	app.vm.uiStates.isSaving = true;
    }
}