function mozapps_utils_init(manifest_url){

	var request = navigator.mozApps.getSelf();

	request.onsuccess = function(){

		/* https://bugzilla.mozilla.org/show_bug.cgi?id=806597 */

		if (request.result) {
			$("#install_button").text("INSTALLED!").show();
			return 1;
		}

		$("#install_button").show();

		$("#install_button").click(function(){

			try {
				var req = navigator.mozApps.install(manifest_url);
			} catch (e) {
				console.log(e);
				return 0;
			}

			req.onsuccess = function() {
                		$("#install_button").text("INSTALLED!").unbind('click');
                	}

			req.onerror = function(e) {
				alert("Couldn't install (" + e.code + ") " + e.message);
                	}
		});
	  	
	};

	request.onerror = function() {
		alert('Error checking installation status: ' + this.error.message);
	}

}
