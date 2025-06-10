//add buttons handler specifically for Lightning Experience
app.cmp.btn = new function (){
    var $c = this;

    $c.renderer = {};

    $c.init = function()
     {
        $c.renderer = new Ractive({
            el:'#cmain-nav div.text-right',
            template: '#tmpl_buttons',
            magic: true,
            data: app.vm
        });
        
        $c.renderer.on({
            'onSave': app.con.onSave,
            'onCancel' : app.con.onCancel,
            'onSaveNew': app.con.onSaveNew,
            'onShowAllDups': app.cmp.dupes.onShowTop,
        });

        

    }
    

    $c.digest = function (){
        $c.renderer.update();
    }
}