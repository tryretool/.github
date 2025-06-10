var ftrSettingsOverride = {
	init: function(settings) {
		settings.address_config =  "SpFm.field=Thoroughfare;SpFm.LeaveOut=PostTown,PostalCode,AdministrativeArea,Organization";
		settings.api_key = "test overriding api key";
		//settings.country_id = "test overriding country id";
	}
}; 