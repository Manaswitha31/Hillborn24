(function($,window){'use strict';var $J=jQuery.noConflict();var old_key='';let add_on=$('#add_on').val();if($.ui!==undefined){$.widget("custom.catcomplete",$.ui.autocomplete,{options:{clearButton:true,clearButtonPosition:{my:"right center",at:"right center"}},_create:function(){this._super();this.widget().menu("option","items","> :not(.ui-autocomplete-category)");if(this.options.clearButton){this._createClearButton();}},_renderMenu:function(ul,items){var that=this,currentCategory="";$.each(items,function(index,item){if(item.type_name!=currentCategory){if(item.type_name=='Airport'){ul.append("<li class='ui-autocomplete-category'><i class='fa fa-plane' aria-hidden='true'></i> "+item.type_name+"s</li>");}else if(item.type_name=='Cruise Port'){ul.append("<li class='ui-autocomplete-category'><i class='fa fa-ship' aria-hidden='true'></i> "+item.type_name+"s</li>");}else if(item.type_name=='Train Station'){ul.append("<li class='ui-autocomplete-category'><i class='fa fa-train' aria-hidden='true'></i> "+item.type_name+"s</li>");}else if(item.type_name=='google'){ul.append("<li class='ui-autocomplete-category powerwed-by-g'></li>");}else if(item.type_name=='Popular Locations'){ul.append("<li class='ui-autocomplete-category'><i class='fa fa-map-marker' aria-hidden='true'></i> "+item.type_name+"</li>");}else if(item.type_name=='empty_warning'){ul.append("<li class='mt-15'>"+
"<p class='alert alert-warning'>Please provide the name of the Airport or the City nearest to your accommodation.<br>"+
"Do not insert Hotel name at this stage, we'll ask you for the exact address later.</p>"+
"</li>");}else if(item.type_name=='empty_warning_pick'){ul.append("<li class='mt-15'>"+
"<p class='alert alert-warning'>No Results Found. Please Type the name of the City, Airport, Port or Station.</p>"+
"</li>");}else{ul.append("<li class='ui-autocomplete-category'>"+item.type_name+"</li>");}
currentCategory=item.type_name;}
that._renderItemData(ul,item);});},_createClearButton:function(){var self=this;self.clearElement=$("<span>").attr("tabindex","-1").addClass("clear-circle").html(self.options.clearButtonHtml).appendTo(self.element.parent());self._on(self.clearElement,{click:function(){var target=self.element;if(target.is(".selector")){self.element.val('').focus();self.element.removeClass("validation-passed");$(".error_icon").removeClass("fa fa-check");self._hideClearButton();$(".selector2").val('').removeClass("validation-passed");$(".clear-circle").hide();$(".check-to-field").removeClass("fa fa-exclamation");}else{self.element.removeClass("validation-passed");self.element.val('').focus();self._hideClearButton();}}});self.element.addClass('ui-autocomplete-input-has-clear');self._on(self.element,{input:function(){var target=self.element;var targetval=self.element.val();if(target.is(".selector")){if(targetval.length>=3){self._showClearButton();}else{self._hideClearButton();}}else{if(targetval!==""){self._showClearButton();}else{self._hideClearButton();}}}});self._on(self.menu.element,{menuselect:function(){self._showClearButton();}});var target=self.element;var targetval=self.element.val();if(target.is(".selector")){if(targetval.length>3){self._showClearButton();}else{self._hideClearButton();}}else{if(targetval!==""){self._showClearButton();}else{self._hideClearButton();}}},_showClearButton:function(){this.clearElement.css({'display':'inline-block'});},_hideClearButton:function(){this.clearElement.css({'display':'none'});}});let short_key='';let skip_local_from=0;let cache_from={};let cache_to={};let response_out={};let previous_response={};$.ui.autocomplete.filterx=function(array,term){var matcher=new RegExp("\\b"+$.ui.autocomplete.escapeRegex(term.toLowerCase()),"i");var grep_return=$.grep(array,function(value){return matcher.test(value.value);});return grep_return;};$(".selector").catcomplete({source:function(request,response){let terms=request.term;short_key=terms;if(Object.entries(cache_from).length!==0&&skip_local_from===0){response_out=$.ui.autocomplete.filterx(cache_from.server,request.term.toLowerCase());if(response_out!==null&&response_out.length>=1){response_out=response_out.concat(cache_from.google);previous_response=response_out;response(response_out);return;}}
let request_new={};request_new.term=short_key;let number=Math.floor(Math.random()*1001);$.getJSON("/?r="+number+"&search=1&from=1&add_on="+add_on,request_new,function(data,status,xhr){cache_to={};cache_from=data.all;if(data.all.server.length==0&&data.all.google.length==0){}else{previous_response=data.all;let response_ajax=$.ui.autocomplete.filterx(cache_from.server,request.term);if(Object.entries(cache_from.server).length===0){skip_local_from=1;}
response_ajax=response_ajax.concat(cache_from.google);response(response_ajax);}});},delay:300,clearButton:true,open:function(){$('.ui-autocomplete').off('menufocus hover mouseover mouseenter');},select:function(event,ui){var rkey=ui.item.id;var rtype_id=ui.item.type_id;$J('#loc1').val(rkey);if(this.value!='')displayByLocType(rtype_id,1);$(".ui-menu").hide();if($("#form2").length>0&&$(".selector2").val()!=''){}else{setTimeout(function(){$(".selector2").focus();},1);}},minLength:3,appendTo:'.ui-complete-pick'}).on('focus',function(){$(this).catcomplete("search");});$(".selector2").catcomplete({source:function(request,response){let loc1_key=$J('#loc1').val();let terms=request.term;short_key=terms;if(Object.entries(cache_to).length!==0){response_out=$.ui.autocomplete.filterx(cache_to.server,request.term);if(response_out!==null&&response_out.length>=1){response_out=response_out.concat(cache_to.google);previous_response=response_out;response(response_out);return;}}
let request_new={};request_new.term=short_key;let number=Math.floor(Math.random()*1001);$.getJSON("/?r="+number+"&search=1&from=2&loc1_id="+loc1_key+"&add_on="+add_on,request_new,function(data,status,xhr){cache_to=data.all;if(data.all.server.length==0&&data.all.google.length==0){if(terms.length==0){return '';}else{}}else{previous_response=data.all;let respon=$.ui.autocomplete.filterx(cache_to.server,request.term);respon=respon.concat(cache_to.google);response(respon);}});},open:function(event,ui){$('.ui-autocomplete').off('menufocus hover mouseover mouseenter');},select:function(event,ui){var rkey2=ui.item.id;var rtype_id2=ui.item.type_id;$J('#loc2').val(ui.item.id);displayByLocType(rtype_id2,2);setTimeout(function(){$("#select_pax1").focus();},1);},focus:function(event,ui){let loc1=$J('#loc1').val();if(loc1==''){$J(".selector").focus();}},minLength:0,appendTo:'.ui-complete-drop'}).on('focus',function(){$(this).catcomplete("search")});jQuery('#form2').on('keyup keypress',function(e){var keyCode=e.keyCode||e.which;if(keyCode===13){e.preventDefault();return false;}});}})(jQuery,window);