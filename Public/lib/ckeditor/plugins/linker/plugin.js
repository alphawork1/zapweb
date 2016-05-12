CKEDITOR.plugins.add('linker', {
	
	init: function(editor){
	    
		yum.load([PI.Url.create('Linker', '/linker.js')], function(){			
	    	var linker = new Linker({
	    		editor: editor
	    	});

	    	var handler = setInterval(function(){

	    		if(editor.container != undefined){
	    			linker.render( $( editor.container.$ ) );

	    			clearInterval( handler );
	    		}

	    	}, 100);
	    });

	},


});