var baseURL = window.location.toString().split("?")[0];

if(baseURL.indexOf("UniqueAccount")>-1){
// //GoogleAddress
alert("Hello");
function mailLink(){

			

			var $billStr = $("select[id$='FIELD-UniqueEntry__Countrypicklist__c']");
			//var $shipSt = $("textarea[id$='FIELD-ShippingStreet']");

			
			

				var $billSection = $billStr.parent().parent();
				alert($billSection.attr("id"));
				
				//var $shipSection = $shipSt.parent().parent().parent().parent().parent().parent();
				



				
$billSection.find('div').first().append('<div  id="locationField"><input class="col-lg-8  input-lg" id="autocomplete" placeholder="Enter your lookup address" onFocus="geolocate()" type="text"></input></div>'
							+
							'<input type="hidden" class="field" id="street_number" placeholder="street_address"></input>'+
     
'<input  type="hidden" class="field" placeholder="route" id="route"></input>'+'<input class="field" type="hidden" placeholder="locality" id="locality"></input>'+'<input type="hidden" class="field" id="administrative_area_level_1"></input>'+'<input class="field" type="hidden" id="postal_code"></input>'
+' <input class="field" type="hidden" id="country"></input><button>Clear Address</button>'


							);



			
		}
$(function(){mailLink()});

		

google.maps.event.addDomListener(window, 'load', initAutocomplete);  
        

function initAutocomplete() {
  
var eSelect = document.getElementById('FIELD-UniqueEntry__Countrypicklist__c');


eSelect.onchange = function(){

if (eSelect.value=="Canada"){
var country="CA";

}
if (eSelect.value=="Albania"){
var country="AL";

}
if (eSelect.value=="Afghanistan"){
var country="AF";

}
if (eSelect.value=="Aland Islands"){
var country="AX";

}if (eSelect.value=="Algeria"){
var country="DZ";

}if (eSelect.value=="American Samoa"){
var country="AS";

}if (eSelect.value=="Andorra"){
var country="AD";

}if (eSelect.value=="Angola"){
var country="AO";

}if (eSelect.value=="Anguilla"){
var country="AI";

}if (eSelect.value=="Antarctica"){
var country="AQ";

}if (eSelect.value=="Antigua and Barbuda"){
var country="AG";

}if (eSelect.value=="Argentina"){
var country="AR";

}
if (eSelect.value=="Armenia"){
var country="AM";

}if (eSelect.value=="Aruba"){
var country="AW";

}if (eSelect.value=="Australia"){
var country="AU";

}if (eSelect.value=="Austria"){
var country="AT";

}
if (eSelect.value=="Azerbaijan"){
var country="AZ";

}if (eSelect.value=="Bahamas"){
var country="BS";

}if (eSelect.value=="Bahrain"){
var country="BH";

}if (eSelect.value=="Bangladesh"){
var country="BD";

}
if (eSelect.value=="Barbados"){
var country="BB";

}if (eSelect.value=="Belarus"){
var country="BY";

}if (eSelect.value=="Belgium"){
var country="BE";

}if (eSelect.value=="Belize"){
var country="BZ";

}
if (eSelect.value=="Benin"){
var country="BJ";

}if (eSelect.value=="Bermuda"){
var country="BM";

}if (eSelect.value=="Bhutan"){
var country="BT";

}if (eSelect.value=="Bolivia"){
var country="BO";

}
if (eSelect.value=="Bosnia and Herzegovina"){
var country="BA";

}if (eSelect.value=="Botswana"){
var country="BW";

}if (eSelect.value=="Bouvet Island"){
var country="BV";

}if (eSelect.value=="Brazil"){
var country="BR";

}
if (eSelect.value=="British Virgin Islands"){
var country="VG";

}if (eSelect.value=="British Indian Ocean Territory"){
var country="IO";

}if (eSelect.value=="Brunei Darussalam"){
var country="BN";

}if (eSelect.value=="Bulgaria"){
var country="BG";

}
if (eSelect.value=="Burkina Faso"){
var country="BF";

}if (eSelect.value=="Burundi"){
var country="BI";

}if (eSelect.value=="Cambodia"){
var country="KH";

}if (eSelect.value=="Canada"){
var country="CA";

}
if (eSelect.value=="Cameroon"){
var country="CM";

}if (eSelect.value=="Canada"){
var country="CA";

}if (eSelect.value=="Cape Verde"){
var country="CV";	

}if (eSelect.value=="Cayman Islands"){
var country="KY";

}
if (eSelect.value=="Central African Republic"){
var country="CF";

}if (eSelect.value=="Chad"){
var country="TD";

}if (eSelect.value=="Chile"){
var country="CL";

}if (eSelect.value=="China"){
var country="CN";

}
if (eSelect.value=="Hong Kong"){
var country="HK";

}if (eSelect.value=="Macao"){
var country="mo";

}if (eSelect.value=="Christmas Island"){
var country="CX";

}if (eSelect.value=="Cocos"){
var country="CC";

}
if (eSelect.value=="Colombia"){
var country="CO";

}if (eSelect.value=="Comoros"){
var country="KM";

}if (eSelect.value=="Congo"){
var country="CG";

}if (eSelect.value=="Congo {Democratic Rep}"){
var country="CD";

}
if (eSelect.value=="Costa Rica"){
var country="CR";

}if (eSelect.value=="Croatia"){
var country="HR";

}if (eSelect.value=="Cuba"){
var country="CY";

}if (eSelect.value=="Cyprus"){
var country="CY";

}
if (eSelect.value=="Czech Republic"){
var country="CZ";

}if (eSelect.value=="Denmark"){
var country="DK";

}if (eSelect.value=="Djibouti"){
var country="DJ";

}if (eSelect.value=="Dominica"){
var country="DM";

}if (eSelect.value=="Dominican Republic"){
var country="DO";

}if (eSelect.value=="East Timor"){
var country="TL";

}if (eSelect.value=="Ecuador"){
var country="EC";

}if (eSelect.value=="Egypt"){
var country="EG";

}
if (eSelect.value=="El Salvador"){
var country="SV";

}if (eSelect.value=="Equatorial Guinea"){
var country="GQ";

}if (eSelect.value=="Eritrea"){
var country="ER";

}if (eSelect.value=="Estonia"){
var country="EE";

}
if (eSelect.value=="Ethiopia"){
var country="ET";

}if (eSelect.value=="Fiji"){
var country="FJ";

}if (eSelect.value=="Finland"){
var country="FI";

}if (eSelect.value=="France"){
var country="FR";

}
if (eSelect.value=="Gabon"){
var country="GA";

}if (eSelect.value=="Gambia"){
var country="GM";

}if (eSelect.value=="Georgia"){
var country="GE";

}if (eSelect.value=="Germany"){
var country="DE";

}
if (eSelect.value=="Ghana"){
var country="GH";

}if (eSelect.value=="Greece"){
var country="GR";

}if (eSelect.value=="Grenada"){
var country="GD";

}if (eSelect.value=="Guatemala"){
var country="GT";

}
if (eSelect.value=="Guinea"){
var country="GN";

}if (eSelect.value=="Guinea-Bissau"){
var country="GW";

}if (eSelect.value=="Guyana"){
var country="GY";

}if (eSelect.value=="Haiti"){
var country="HT";

}
if (eSelect.value=="Honduras"){
var country="HN";

}if (eSelect.value=="Hungary"){
var country="hu";

}if (eSelect.value=="Iceland"){
var country="IS";

}if (eSelect.value=="India"){
var country="IN";

}
if (eSelect.value=="Indonesia"){
var country="ID";

}if (eSelect.value=="Iran"){
var country="IR";

}if (eSelect.value=="Iraq"){
var country="IQ";

}if (eSelect.value=="Ireland {Republic}"){
var country="IE";

}
if (eSelect.value=="Israel"){
var country="IL";

}if (eSelect.value=="Italy"){
var country="IT";

}if (eSelect.value=="Ivory Coast"){
var country="CI";

}if (eSelect.value=="Jamaica"){
var country="JM";

}
if (eSelect.value=="Japan"){
var country="JP";

}if (eSelect.value=="Jordan"){
var country="JO";

}if (eSelect.value=="Kazakhstan"){
var country="KZ";

}if (eSelect.value=="Kenya"){
var country="KE";

}
if (eSelect.value=="Kiribati"){
var country="CA";

}if (eSelect.value=="Korea North"){
var country="KP";

}if (eSelect.value=="Korea South"){
var country="KR";

}if (eSelect.value=="Kosovo"){
var country="XK";

}
if (eSelect.value=="Kuwait"){
var country="KW";

}if (eSelect.value=="Kyrgyzstan"){
var country="KG";

}if (eSelect.value=="Laos"){
var country="LA";

}if (eSelect.value=="Latvia"){
var country="LV";

}
if (eSelect.value=="Lebanon"){
var country="LB";

}if (eSelect.value=="Lesotho"){
var country="LS";

}if (eSelect.value=="Liberia"){
var country="LR";

}if (eSelect.value=="Libya"){
var country="LY";

}
if (eSelect.value=="Liechtenstein"){
var country="LI";

}if (eSelect.value=="Lithuania"){
var country="LT";

}if (eSelect.value=="Luxembourg"){
var country="LU";

}if (eSelect.value=="Macedonia"){
var country="MK";

}
if (eSelect.value=="Madagascar"){
var country="MG";

}if (eSelect.value=="Malawi"){
var country="MW";

}if (eSelect.value=="Malaysia"){
var country="MY";

}if (eSelect.value=="Maldives"){
var country="MV";

}
if (eSelect.value=="Mali"){
var country="ML";

}if (eSelect.value=="Malta"){
var country="MT";

}if (eSelect.value=="Marshall Islands"){
var country="MH";

}if (eSelect.value=="Mauritania"){
var country="MR";

}
if (eSelect.value=="Mauritius"){
var country="MU";

}if (eSelect.value=="Mexico"){
var country="MX";

}if (eSelect.value=="Micronesia"){
var country="FM";

}if (eSelect.value=="Moldova"){
var country="MD";

}
if (eSelect.value=="Monaco"){
var country="MC";

}if (eSelect.value=="Mongolia"){
var country="MN";

}if (eSelect.value=="Montenegro"){
var country="ME";

}if (eSelect.value=="Morocco"){
var country="MA";

}
if (eSelect.value=="Mozambique"){
var country="MZ";

}if (eSelect.value=="Myanmar, {Burma}"){
var country="MM";

}if (eSelect.value=="Namibia"){
var country="NA";

}if (eSelect.value=="Nauru"){
var country="NR";

}
if (eSelect.value=="Nepal"){
var country="NP";

}if (eSelect.value=="Netherlands"){
var country="NL";

}if (eSelect.value=="New Zealand"){
var country="NZ";

}if (eSelect.value=="Nicaragua"){
var country="NI";

}
if (eSelect.value=="Niger"){
var country="NE";

}if (eSelect.value=="Nigeria"){
var country="NG";

}if (eSelect.value=="Norway"){
var country="NO";

}if (eSelect.value=="Oman"){
var country="OM";

}
if (eSelect.value=="Pakistan"){
var country="PK";

}if (eSelect.value=="Palau"){
var country="PW";

}if (eSelect.value=="Panama"){
var country="PA";

}if (eSelect.value=="Papua New Guinea"){
var country="PG";

}
if (eSelect.value=="Paraguay"){
var country="PY";

}if (eSelect.value=="Peru"){
var country="PE";

}if (eSelect.value=="Philippines"){
var country="PH";

}if (eSelect.value=="Poland"){
var country="PL";

}
if (eSelect.value=="Portugal"){
var country="PT";

}if (eSelect.value=="Qatar"){
var country="QA";

}if (eSelect.value=="Romania"){
var country="RO";

}if (eSelect.value=="Russian Federation"){
var country="RU";

}
if (eSelect.value=="Rwanda"){
var country="RW";

}if (eSelect.value=="St Kitts & Nevis"){
var country="KN";

}if (eSelect.value=="St Lucia"){
var country="LC";

}if (eSelect.value=="Saint Vincent & the Grenadines"){
var country="VC";

}
if (eSelect.value=="Samoa"){
var country="WS";

}if (eSelect.value=="San Marino"){
var country="SM";

}if (eSelect.value=="Sao Tome & Principe"){
var country="ST";

}if (eSelect.value=="Saudi Arabia"){
var country="SA";

}
if (eSelect.value=="Senegal"){
var country="SN";

}if (eSelect.value=="Serbia"){
var country="RS";

}if (eSelect.value=="Seychelles"){
var country="SC";

}if (eSelect.value=="Sierra Leone"){
var country="SL";

}
if (eSelect.value=="Singapore"){
var country="SG";

}if (eSelect.value=="Slovakia"){
var country="SK";

}if (eSelect.value=="Slovenia"){
var country="SI";

}if (eSelect.value=="Solomon Islands"){
var country="SB";

}

if (eSelect.value=="Somalia"){
var country="SO";

}if (eSelect.value=="South Africa"){
var country="ZA";

}if (eSelect.value=="South Sudan"){
var country="SS";

}if (eSelect.value=="Spain"){
var country="ES";

}
if (eSelect.value=="Sri Lanka"){
var country="LK";

}if (eSelect.value=="Sudan"){
var country="SD";

}if (eSelect.value=="Suriname"){
var country="Sri";

}if (eSelect.value=="Swaziland"){
var country="SZ";

}
if (eSelect.value=="Sweden"){
var country="SE";

}if (eSelect.value=="Switzerland"){
var country="CH";

}if (eSelect.value=="Syria"){
var country="sy";

}if (eSelect.value=="Taiwan"){
var country="TW";

}
if (eSelect.value=="Tajikistan"){
var country="TJ";

}if (eSelect.value=="Tanzania"){
var country="TZ";

}if (eSelect.value=="Thailand"){
var country="TH";

}if (eSelect.value=="Togo"){
var country="TG";

}
if (eSelect.value=="Tonga"){
var country="TO";

}if (eSelect.value=="Trinidad & Tobago"){
var country="TT";

}if (eSelect.value=="Tunisia"){
var country="TN";

}if (eSelect.value=="Turkey"){
var country="TR";

}
if (eSelect.value=="Turkmenistan"){
var country="TM";

}if (eSelect.value=="Tuvalu"){
var country="TV";

}if (eSelect.value=="Uganda"){
var country="UG";

}if (eSelect.value=="Ukraine"){
var country="UA";

}
if (eSelect.value=="United Arab Emirates"){
var country="AE";

}if (eSelect.value=="United Kingdom"){
var country="UK";

}if (eSelect.value=="United States"){
var country="USA";

}if (eSelect.value=="Uruguay"){
var country="UY";

}
if (eSelect.value=="Uzbekistan"){
var country="UZ";

}if (eSelect.value=="Vanuatu"){
var country="VU";

}if (eSelect.value=="Vatican City"){
var country="VA";

}if (eSelect.value=="Venezuela"){
var country="VE";

}
if (eSelect.value=="Vietnam"){
var country="VN";

}if (eSelect.value=="Yemen"){
var country="YE";

}if (eSelect.value=="Zambia"){
var country="ZM";

}if (eSelect.value=="Zimbabwe"){
var country="ZW";

}

//For Country Restrictions 
	var options={
  		componentRestrictions: { country :country}
  };

  
	autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('autocomplete')),options);

	// autocomplete2 = new google.maps.places.Autocomplete(
 //      (document.getElementById('autocomplete2')), {
 //        types: ['geocode']
 //    });
  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddressBilling);
  //autocomplete2.addListener('place_changed', fillInAddressShipping);
}}

        function fillInAddressBilling() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();

        for (var component in componentForm) {
          document.getElementById(component).value = '';
          document.getElementById(component).disabled = false;
     
        }
       
        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          
          if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            // alert(val);
            document.getElementById(addressType).value = val;
          }
        }
        addressFillBilling();
      }


		// function fillInAddressShipping() {
  //       // Get the place details from the autocomplete object.
  //       var place = autocomplete2.getPlace();

  //       for (var component in componentForm) {
  //         document.getElementById(component).value = '';
  //         document.getElementById(component).disabled = false;
     
  //       }
  //       // Get each component of the address from the place details
  //       // and fill the corresponding field on the form.
  //       for (var i = 0; i < place.address_components.length; i++) {
  //         var addressType = place.address_components[i].types[0];
          
  //         if (componentForm[addressType]) {
  //           var val = place.address_components[i][componentForm[addressType]];
  //           // alert(val);
  //           document.getElementById(addressType).value = val;
  //         }
  //       }
  //       addressFillShipping();

  //     }

function addressFillBilling(){

      	var eState = document.getElementById('administrative_area_level_1');

      	x=$("#street_number").val()+ " " +$("#route").val();
      	$("input[id$='FIELD-UniqueEntry__Custom_Street__c']").val(x);
      	$("input[id$='FIELD-UniqueEntry__Custom_City__c']").val($("#locality").val());
      	$("input[id$='FIELD-UniqueEntry__Custom_Postal_Code__c']").val($("#postal_code").val());
      	$("#FIELD-BillingStateCode").val($("#administrative_area_level_1").val());
      	$("#FIELD-BillingCountryCode").val($("#country").val());
      	eState=$("#administrative_area_level_1").val();
      	alert(eState);

//States for America
      	if(eState=="NY" || eState=="New York"){
      		
      		eState="New York";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="NJ" || eState=="New Jersey"){
      		
      		eState="New Jersey";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="WY" || eState=="Wyoming"){
      		
      		eState="Wyoming";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="WI" || eState=="Wisconsin"){
      		
      		eState="Wisconsin";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="WV" || eState=="West Virginia"){
      		
      		eState="West Virginia";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="WA" || eState=="Washington"){
      		
      		eState="Washington";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="VT" || eState=="Vermont"){
      		
      		eState="Vermont";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="VI" || eState=="Virgin Islands"){
      		
      		eState="Virgin Islands";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="VA" || eState=="Virginia"){
      		
      		eState="Virginia";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="UT" || eState=="Utah"){
      		
      		eState="Utah";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="TX" || eState=="Texas"){
      		
      		eState="Texas";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="TN" || eState=="Tennessee"){
      		
      		eState="Tennessee";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="SD" || eState=="South Dakota"){
      		
      		eState="South Dakota";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="SC" || eState=="South Carolina"){
      		
      		eState="South Carolina";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="RI" || eState=="Rhode Island"){
      		
      		eState="Rhode Island";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="PW" || eState=="Palau"){
      		
      		eState="Palau";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="PR" || eState=="Puerto Rico"){
      		
      		eState="Puerto Rico";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="PA" || eState=="Pennsylvania"){
      		
      		eState="Pennsylvania";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="OR" || eState=="Oregon"){
      		
      		eState="OR";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="OH" || eState=="Ohio"){
      		
      		eState="Ohio";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="OK" || eState=="Oklahoma"){
      		
      		eState="Oklahoma";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="NV" || eState=="Nevada"){
      		
      		eState="Nevada";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="NM" || eState=="New Mexico"){
      		
      		eState="New Mexico";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="NH" || eState=="New Hamshire"){
      		
      		eState="New Hamshire";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="NE" || eState=="Nebraska"){
      		
      		eState="Nebraska";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="ND" || eState=="North Dakota"){
      		
      		eState="North Dakota";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="NC" || eState=="North Carolina"){
      		
      		eState="North Carolina";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="MT" || eState=="Montana"){
      		
      		eState="Montana";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="MS" || eState=="Mississippi"){
      		
      		eState="Mississippi";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="MP" || eState=="Northern Mariana Islands"){
      		
      		eState="Northern Mariana Islands";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="MO" || eState=="Missouri"){
      		
      		eState="Missouri";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	//
      	else
      	if(eState=="MN" || eState=="Minnesota"){
      		
      		eState="Minnesota";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="MI" || eState=="Michigan"){
      		
      		eState="Michigan";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="MH" || eState=="Marshall Islands"){
      		
      		eState="Marshall Islands";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="ME" || eState=="Maine"){
      		
      		eState="Maine";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="MD" || eState=="Maryland"){
      		
      		eState="Maryland";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="MS" || eState=="Massachusetts"){
      		
      		eState="Massachusetts";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="LA" || eState=="Louisiana"){
      		
      		eState="Louisiana";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="KY" || eState=="Kentucky"){
      		
      		eState="Kentucky";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="KS" || eState=="Kansas"){
      		
      		eState="Kansas";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="IN" || eState=="Indiana"){
      		
      		eState="Indiana";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="IL" || eState=="Illinois"){
      		
      		eState="Illinois";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="ID" || eState=="Idaho"){
      		
      		eState="Idaho";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="IA" || eState=="Iowa"){
      		
      		eState="Iowa";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="HI" || eState=="Hawaii"){
      		
      		eState="Hawaii";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="GU" || eState=="Guam"){
      		
      		eState="Guam";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="GA" || eState=="Georgia"){
      		
      		eState="Georgia";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="FM" || eState=="Federated States of Micronesia"){
      		
      		eState="Federated States of Micronesia";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

      	else
      	if(eState=="FL" || eState=="Florida"){
      		
      		eState="Florida";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="DE" || eState=="Delaware"){
      		
      		eState="Delaware";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="DC" || eState=="District of Columbia"){
      		
      		eState="District of Columbia";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="CT" || eState=="Connecticut"){
      		
      		eState="Connecticut";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="CO" || eState=="Colorado"){
      		
      		eState="Colorado";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="CA" || eState=="California"){
      		
      		eState="California";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="AZ" || eState=="Arizona"){
      		
      		eState="Arizona";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="AS" || eState=="American Samoa"){
      		
      		eState="American Samoa";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="AR" || eState=="Arkansas"){
      		
      		eState="Arkansas";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}

		else
      	if(eState=="AL" || eState=="Alabama"){
      		
      		eState="Alabama";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="AK" || eState=="Alaska"){
      		
      		eState="Alaska";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}



      	//States USA Ends


      	//  States for Canada
      	else
      	if(eState=="YU" || eState=="Yukon"){
      		
      		eState="Yukon";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="QC" || eState=="Québec"){
      		
      		eState="Quebec";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="ON" ){
      		
      		eState="Ontario";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="NU" || eState=="New York"){
      		
      		eState="Nunavut";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="Newfoundland" || eState=="NF"){
      		
      		eState="Newfoundland";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="MB"){
      		
      		eState="Manitoba";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="BC" ){
      		
      		eState="British Columbia";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="SK" ){
      		
      		eState="Saskatchewen";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="PE" ){
      		
      		eState="Prince Edward Is.";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="NW"){
      		
      		eState="North West Terr.";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="NS"){
      		
      		eState="Nova Scotia";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="NB"){
      		
      		eState="New Brunswick";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="LB" ){
      		
      		eState="Labrador";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else
      	if(eState=="AB" || eState=="New Jersey"){
      		
      		eState="Alberta";
      		
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      	else{
      		$("select[id$='FIELD-UniqueEntry__Custom_State_Picklist__c']").val(eState).change();
      	}
      
      	
      	//Its shows differently for diffrent users hence these below lines are added
      	
      	$("#FIELD-UniqueEntry__CustomStateCodeField__c").val(eState.value).change();
      	
      	
      	// $("select[id$='FIELD-UniqueEntry__Countrypicklist__c']").val($("#country").val());
}

      // function addressFillShipping(){

      // 	x=$("#street_number").val()+ " " +$("#route").val();
      // 	$("textarea[id$='FIELD-ShippingStreet']").val(x);
      // 	$("input[id$='FIELD-ShippingCity']").val($("#locality").val());
      // 	$("input[id$='FIELD-ShippingPostalCode']").val($("#postal_code").val());
      // 	$("#FIELD-ShippingStateCode").val($("#administrative_area_level_1").val());
      // 	//$("#FIELD-ShippingCountryCode").val($("#country").val());
      // 	//Its shows differently for diffrent users hence these below lines are added
      // 	$("select[id$='FIELD-ShippingStateCode']").val($("#administrative_area_level_1").val());
      // 	$("input[id$='FIELD-ShippingCountryCode']").val($("#country").val());
      // }

//Describle billing/shipping addresss components
var componentForm = {

  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

//Get the location on type

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
//




}



