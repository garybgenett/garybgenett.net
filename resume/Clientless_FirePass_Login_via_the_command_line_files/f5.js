;(function ($, window) {
    $.fn.toolbarAction = function (options) {
        $.fn.toolbarAction.defaultOptions = {
            servicesFramework: $.ServicesFramework(1),
			userId: -1,
			groupId: -1
		};
        var opts = $.extend({}, $.fn.toolbarAction.defaultOptions, options),
			data = {};
			data.KeyId = $('toolbar-main').data('key-id');

		$(document).on("click",".toolbar .btn", function (e) {
			if($(this).is('[href]'||'.skip')){
				return;
			}
			else{
				e.preventDefault();
				data.KeyId = $('.toolbar-main').data('key-id');
			}
		});
		
		//checked for user access
		if (opts.userId == -1) {
			$(document).on("click",".toolbar .btn", function (e) {
				alert("You must be logged in to use this function.");
				return;
            });
		} else if (data.KeyId == "undefined") {
			$(document).on("click",".toolbar .btn", function (e) {
			    alert("Function missing keyId.");
				return;
			});
		}else{

		  $.get( "/Resources/Shared/components/f5toolbar/modal.html", function( data ) {
			$("body").append(data);
		  })
		  .done(function() {

			$('#flag-modal').on('click','.radio', function (e) {
			  $('#flag-modal .flag-selected').removeClass("flag-selected");
			  $(this).parent().addClass("flag-selected");
			  $('#flag-modal .btn-primary').removeAttr('disabled');
			})
			.on('click','.btn-primary', function (e) {
			  
			  var flagType = $('#flag-modal input[type=radio]:checked').val(),
			  flagContentType = $('.flag-type').filter(":first").text(),
			  flagOther = $('#flag-other-reason').val();
			  
			  if (flagType != undefined) {
				$(this).attr('disabled', 'disabled');
				
				data.Reason = flagType;
				data.ReasonOther = flagOther;
				
				toolbarServiceCall('POST', 'Report'+flagContentType, data);
				
				$('.flag-message').show();
				$('.flag-form').hide();
			  }
			})
			.on('focus', 'textarea' ,function(){
			  $(this).animate({height: "100px"}, 300);
			  //$(this).parent().addClass("flag-selected");
			});	

  		  });

		  $(document).on("click", ".btn-subscribe", function (e) {

		      if ($(this).hasClass('on')) {
		          toolbarServiceCall('POST', 'DeleteSubscription', data);
		          $(this).removeClass('on');
		      } else {
		          toolbarServiceCall('POST', 'AddSubscription', data);
		          $(this).addClass('on');
		      }

		  })
		  .on("click", ".btn-flag", function (e) {
		      $(".flag-type").html($(this).data("flag-type"));
		      $('.flag-message').hide();
		      $('.flag-form').show();
		      $('#flag-modal button.btn-primary').attr('disabled', 'disabled');
		      $('#flag-modal input[type=radio]').removeAttr('checked');
		      $('#flag-modal label.flag-selected').removeClass("flag-selected");
		      $('#flag-modal').modal('show');

		  })
		  .on("click", ".btn-vote", function (e) {

		      var $btn = $(this),
				  toolbar = $btn.parents("div.toolbar"),
				  voteAction = $btn.hasClass("on") ? "DeleteVote" : "AddVote";

		      data.KeyId = toolbar.data("key-id");
		      data.VoteType = toolbar.data("type");

		      if ($btn.is(".up:not(.on)")) { data.VoteUp = true; }
		      if ($btn.is(".down:not(.on)")) { data.VoteUp = false; }

		      if (data.KeyId != undefined) {
		          toolbarServiceCall('POST', voteAction, data, showVoteCount, $btn);
		      }
		  })
		  .on("click", ".btn-favorite", function (e) {

		      if ($(this).hasClass('on')) {
		          $(this).removeClass('on');
		          toolbarServiceCall('POST', 'DeleteFavorite', data);
		      } else {
		          $(this).addClass('on');
		          toolbarServiceCall('POST', 'AddFavorite', data);
		      }

		  });
		  //.on("click",".btn-accept", function (e) {
		  
		  //    var $btn = $(this);
		  //  	  data.replyId = $btn.parents("div.toolbar").data("key-id");

		  //    var $answer = $('#answer'+data.replyId);

		  //    $('.accepted-answer').removeClass('accepted-answer').find('.btn-accept.on').removeClass('on');

		  //    $btn.addClass('on');
		  //    $answer.addClass('accepted-answer');
			  
		  //    toolbarServiceCall('POST', 'AcceptAnswer', data);

		  //});

		}

        // utility methods
        function showVoteCount(dataReturn, trigger, id) {
            if (trigger == undefined || dataReturn.VoteCount == undefined)
                return;
			toolbar = $("[data-key-id='"+ id +"']");
            toolbar.find('.vote-score').text(dataReturn.VoteCount);

            if (trigger.hasClass('on')){
                trigger.removeClass('on')
			}
            else{
				toolbar.find(".btn-vote.on").removeClass("on");
                trigger.addClass('on');
			}
			//reset vars
			delete data;
			data = {};

        }

        // service calls
        function toolbarServiceCall(type, method, data, callback, trigger) {
            var sf = opts.servicesFramework;
/*
			console.log("Toolbar Call ***********************"+

						"\n Service Root: "+sf.getServiceRoot(opts.moduleTitle.split(".").pop())+
						"\n Module Title: "+opts.moduleTitle+
						"\n Service Folder: "+opts.service+
						"\n Method: "+method+
						"\n Type: "+type+
						"\n Callback: "+callback+
						"\n Data: "+JSON.stringify( data, null, 4)
						);

			console.dir(trigger);
*/


            $.ajax({
                type: type,
                url: sf.getServiceRoot( opts.moduleTitle.split(".").pop() ) + opts.service + '/' + method,
                beforeSend: sf.setModuleHeaders,
                data: data,
                success: function (dataReturn) {
                    if (dataReturn.Result == "failure") {
                        if (dataReturn.Reason != "undefined") {
                            alert("failure: "+dataReturn.Reason);
                        }
                    } else {
                        if (typeof (callback) != "undefined") {
                            callback(dataReturn, trigger, data.KeyId);
                        }
                    }
                },
                error: function (xhr) {
                    alert("ooops: "+xhr.responseText);
                }
            });
        };
    };

}(jQuery, window));
