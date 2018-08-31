
	/**
	 * 
	 * @author 熊新
	 * @date 2016-07-18
	 *
	 */
	// 滚动函数
	function big_scroll(a,t_jian,step,direction,lr_btn,pre_num) {
		var pagenation_html=$('#'+a+' .pagenation').html();
		if(!pagenation_html){
			var innerLength=$('#'+a+' .inner').length;
			var init_content=$('#'+a+' .scroll_inner').html()
			var firstInner_style=$('#'+a+' .inner').eq(0).attr('style');
			var lastInner_style=$('#'+a+' .inner').eq(innerLength-1).attr('style');
			var firstInner='<div class="inner"  style="'+firstInner_style+'">'+($('#'+a+' .inner').eq(0).html())+'</div>';
			var lastInner='<div class="inner" style="'+lastInner_style+'">'+$('#'+a+' .inner').eq(innerLength-1).html()+'</div>';
			var aHtml=lastInner+($('#'+a+' .scroll_inner').html())+firstInner;
			$('#'+a+' .scroll_inner').html(aHtml);
			// console.log(init_content+init_content)
			// body...
			var lr_btn=lr_btn;
			var now_scroll=a;
			var num=0;
			var scroll_inner_width=0,scroll_inner_height=0;
			var direction_chuan=direction;
			var inner_width=$('#'+a).width();
			var inner_height=$('#'+a).height();
			var step_chuan=step;
			var step_each=0,left_now=0;
			var time_jian=null,time_move=null,time_pagenation=null;
			// 设置左右箭头
			if(lr_btn){
				$('#'+a+' .next').show();
				$('#'+a+' .pre').show();
			}else{
				$('#'+a+' .next').hide();
				$('#'+a+' .pre').hide();
			}
			if(direction_chuan=='vertical'){
				$('#'+a+' .inner').css('width','100%')
				$('#'+a+' .inner').each(function(){
					$(this).height(inner_height)
					num+=inner_height;
				})
				scroll_inner_height=num;
				$('#'+a+' .scroll_inner').css({'height':num,'width':'100%'});
				left_now=inner_height;
				$('#'+a+' .scroll_outer').scrollTop(left_now);
				step_each=inner_height/step_chuan;
			}else{
				$('#'+a+' .inner').css('height','100%')
				$('#'+a+' .inner').each(function(){
					$(this).width(inner_width)
					num+=inner_width;
				})
				scroll_inner_width=num;
				$('#'+a+' .scroll_inner').css({'width':num,'height':'100%'});
				left_now=inner_width;
				$('#'+a+' .scroll_outer').scrollLeft(left_now);
				var step_chuan=step;
				step_each=inner_width/step_chuan;
			}
			$('#'+a).show();
			automove(now_scroll,direction_chuan);
			pagenation_init(now_scroll,direction_chuan);
			pagenation_pre_init(now_scroll,direction_chuan,pre_num)
			var pagenation_num=0;
			var to_left=true;
			function automove(a,direction){
				var direction_move=direction;
				if(time_jian==null){
					time_jian=setInterval(function(){
						clearInterval(time_move);
						clearInterval(time_pagenation);
						time_pagenation=null;
						time_move=null;
						to_left=true;
						move(now_scroll,direction_move);
					},(t_jian+step_chuan));
				}
			}
			function move(a,direction){
				var direction_go=direction;
				if(direction_go=='vertical'){
					if(time_move==null&&time_pagenation==null){
						if(to_left){
							var move_end=(Math.floor(left_now/inner_height)+1)*inner_height;
						}else{
							var move_end=(Math.ceil(left_now/inner_height)-1)*inner_height;
						}
						var now_pagenation_top=$('#'+a+' .pagenation_scroll').scrollTop();
						time_move=setInterval(function(){
							if(to_left){
								left_now+=step_each;
								if(left_now>=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if((left_now/inner_height)>(scroll_inner_height/inner_height)-2){
										if((left_now/inner_height)<(scroll_inner_height/inner_height)-1){
											left_now=0;
										}else{
											left_now=inner_height;
											move_end=inner_height;
										} 
									}
									$('#'+a+' .scroll_outer').scrollTop(left_now);
								}
							}else{
								left_now-=step_each;
								if(left_now<=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if(left_now<inner_height){
										left_now=inner_height*((scroll_inner_height/inner_height)-2);
									}
									$('#'+a+' .scroll_outer').scrollTop(left_now);
								}
							}
							$('#'+a+' .scroll_outer').scrollTop(left_now);
							pagenation_num=move_end/inner_height-1;
							if(pagenation_num>($('#'+a+' .pagenation span').length-1)){
								pagenation_num=0;
							}
							$('#'+a+' .pagenation span').removeClass('active').eq(pagenation_num).addClass('active');
						},1);
						
						if(to_left){
							pagenation_move((pagenation_num+1),now_pagenation_top,direction_go)
						}else{
							pagenation_move((pagenation_num-1),now_pagenation_top,direction_go)
						}
					}
				}else{
					if(time_move==null&&time_pagenation==null){
						if(to_left){
							var move_end=(Math.floor(left_now/inner_width)+1)*inner_width;
						}else{
							var move_end=(Math.ceil(left_now/inner_width)-1)*inner_width;
						}
						var now_pagenation_left=$('#'+a+' .pagenation_scroll').scrollLeft();
						time_move=setInterval(function(){
							if(to_left){
								left_now+=step_each;
								if(left_now>=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if((left_now/inner_width)>(scroll_inner_width/inner_width)-2){
										if((left_now/inner_width)<(scroll_inner_width/inner_width)-1){
											left_now=0;
										}else{
											left_now=inner_width;
											move_end=inner_width;
										} 
									}
									$('#'+a+' .scroll_outer').scrollLeft(left_now);
								}
							}else{
								left_now-=step_each;
								if(left_now<=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if(left_now<inner_width){
										left_now=inner_width*((scroll_inner_width/inner_width)-2);
									}
									$('#'+a+' .scroll_outer').scrollLeft(left_now);
								}
							}
							$('#'+a+' .scroll_outer').scrollLeft(left_now);
							pagenation_num=move_end/inner_width-1;
							if(pagenation_num>($('#'+a+' .pagenation span').length-1)){
								pagenation_num=0;
							}
							$('#'+a+' .pagenation span').removeClass('active').eq(pagenation_num).addClass('active');
						},1);
						if(to_left){
							pagenation_move((pagenation_num+1),now_pagenation_left,direction_go)
						}else{
							pagenation_move((pagenation_num-1),now_pagenation_left,direction_go)
						}
						
					}
				}
			}
			function move_dianji(a,direction){
				var direction_go=direction;
				var	step_each_now=step_each*3;
				if(direction_go=='vertical'){
					if(time_move==null&&time_pagenation==null){
						if(to_left){
							var move_end=(Math.floor(left_now/inner_height)+1)*inner_height;
						}else{
							var move_end=(Math.ceil(left_now/inner_height)-1)*inner_height;
						}
						var now_pagenation_top=$('#'+a+' .pagenation_scroll').scrollTop();
						time_move=setInterval(function(){
							if(to_left){
								left_now+=step_each_now;
								if(left_now>=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if((left_now/inner_height)>(scroll_inner_height/inner_height)-2){
										if((left_now/inner_height)<(scroll_inner_height/inner_height)-1){
											left_now=0;
										}else{
											left_now=inner_height;
											move_end=inner_height;
										} 
									}
									$('#'+a+' .scroll_outer').scrollTop(left_now);
								}
							}else{
								left_now-=step_each_now;
								if(left_now<=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if(left_now<inner_height){
										left_now=inner_height*((scroll_inner_height/inner_height)-2);
									}
									$('#'+a+' .scroll_outer').scrollTop(left_now);
								}
							}
							$('#'+a+' .scroll_outer').scrollTop(left_now);
							pagenation_num=move_end/inner_height-1;
							if(pagenation_num>($('#'+a+' .pagenation span').length-1)){
								pagenation_num=0;
							}
							$('#'+a+' .pagenation span').removeClass('active').eq(pagenation_num).addClass('active');
						},1);
						
						if(to_left){
							pagenation_move((pagenation_num+1),now_pagenation_top,direction_go)
						}else{
							pagenation_move((pagenation_num-1),now_pagenation_top,direction_go)
						}
					}
				}else{
					if(time_move==null&&time_pagenation==null){
						if(to_left){
							var move_end=(Math.floor(left_now/inner_width)+1)*inner_width;
						}else{
							var move_end=(Math.ceil(left_now/inner_width)-1)*inner_width;
						}
						var now_pagenation_left=$('#'+a+' .pagenation_scroll').scrollLeft();
						time_move=setInterval(function(){
							if(to_left){
								left_now+=step_each_now;
								if(left_now>=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if((left_now/inner_width)>(scroll_inner_width/inner_width)-2){
										if((left_now/inner_width)<(scroll_inner_width/inner_width)-1){
											left_now=0;
										}else{
											left_now=inner_width;
											move_end=inner_width;
										} 
									}
									$('#'+a+' .scroll_outer').scrollLeft(left_now);
								}
							}else{
								left_now-=step_each_now;
								if(left_now<=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if(left_now<inner_width){
										left_now=inner_width*((scroll_inner_width/inner_width)-2);
									}
									$('#'+a+' .scroll_outer').scrollLeft(left_now);
								}
							}
							$('#'+a+' .scroll_outer').scrollLeft(left_now);
							pagenation_num=move_end/inner_width-1;
							if(pagenation_num>($('#'+a+' .pagenation span').length-1)){
								pagenation_num=0;
							}
							$('#'+a+' .pagenation span').removeClass('active').eq(pagenation_num).addClass('active');
						},1);
						if(to_left){
							pagenation_move((pagenation_num+1),now_pagenation_left,direction_go)
						}else{
							pagenation_move((pagenation_num-1),now_pagenation_left,direction_go)
						}
						
					}
				}
			}
			function pagenation_init(a,direction){
				direction_pagenatin=direction;
				if(direction_pagenatin=='vertical'){
					$('#'+a+' .pagenation').empty();
					var page_span=$('#'+a+' .pagenation').html();
					for (var i = 0; i <(scroll_inner_height/inner_height)-2; i++) {
						page_span+='<span></span>';
					};
					$('#'+a+' .pagenation').html(page_span);
					$('#'+a+' .pagenation').css({'text-align': '','height':'','bottom': '50%','width': '20px','right': '10px','margin-bottom':span_h/2+'px'});
					var span_h=-($('#'+a+' .pagenation').height())/2;
					$('#'+a+' .pagenation').css({'margin-bottom':span_h+'px'});
					$('#'+a+' .pagenation span').removeClass('active').eq(0).addClass('active');

				}else{
					$('#'+a+' .pagenation').empty();
					var page_span=$('#'+a+' .pagenation').html();
					for (var i = 0; i <(scroll_inner_width/inner_width)-2; i++) {
						page_span+='<span></span>';
					};
					$('#'+a+' .pagenation').html(page_span);
					$('#'+a+' .pagenation').css({'text-align': 'center','height': '20px','bottom':'10px','width': '100%','right': '0','margin-bottom':'0'});
					$('#'+a+' .pagenation span').removeClass('active').eq(0).addClass('active');
				}
			}
			$('#'+a+' .next').on('click',function(){
				clearInterval(time_jian);
				clearInterval(time_move);
				clearInterval(time_pagenation);
				time_jian=null;
				time_move=null;
				time_pagenation=null;
				to_left=true;
				move_dianji(a,direction_chuan);
				setTimeout(function(){
					automove(a,direction_chuan);
				},800)
			});
			$('#'+a+' .pre').on('click',function(){
				clearInterval(time_jian);
				clearInterval(time_move);
				clearInterval(time_pagenation);
				time_jian=null;
				time_move=null;
				time_pagenation=null;
				to_left=false;
				move_dianji(a,direction_chuan);
				setTimeout(function(){
					automove(now_scroll,direction_chuan);
				},800)
			});
			$('#'+a).delegate(".pagenation span","mouseup",function(){
			    var index=$(this).index()+1;
				clearInterval(time_jian);
				clearInterval(time_move);
				clearInterval(time_pagenation);
				time_jian=null;
				time_move=null;
				time_pagenation=null;

				if(time_move==null){
					if(direction_chuan=='vertical'){
						var now_pagenation_top=$('#'+a+' .pagenation_scroll').scrollTop();
						move_end=index*inner_height;
						if(move_end>left_now){
							to_left=true;
							if(left_now<inner_height){
								to_left=false;
								left_now+=(Math.floor(scroll_inner_height/inner_height)-2)*inner_height;
							}
						}else if(move_end<left_now){
							to_left=false;
							if(left_now>(Math.floor(scroll_inner_height/inner_height)-1)*inner_height){
								left_now-=(Math.floor(scroll_inner_height/inner_height)-2)*inner_height;
								to_left=true;
							}
						}

						step=Math.abs(move_end-left_now)/step_chuan;
						time_move=setInterval(function(){
							if(to_left){
								left_now+=step;
								if(left_now>=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if((left_now/inner_height)>=(scroll_inner_height/inner_height)-2){
										if((left_now/inner_height)<(scroll_inner_height/inner_height)-1){
											left_now=0;
										}else{
											left_now=inner_height;
											move_end=inner_height;
										}
									}
									$('#'+a+' .scroll_outer').scrollTop(left_now);
								}
							}else{
								left_now-=step;
								if(left_now<=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if(left_now<=0){
										left_now=inner_width*((scroll_inner_width/inner_width)-2);
									}
									$('#'+a+' .scroll_outer').scrollTop(left_now);
								}
							}
							$('#'+a+' .scroll_outer').scrollTop(left_now);
							pagenation_num=move_end/inner_height-1;
							if(pagenation_num>($('#'+a+' .pagenation span').length-1)){
								pagenation_num=0;
							}
							$('#'+a+' .pagenation span').removeClass('active').eq(pagenation_num).addClass('active');
						},1);
						pagenation_move(($(this).index()),now_pagenation_top,direction_chuan);
					}else{
						move_end=index*inner_width;
						var now_pagenation_left=$('#'+a+' .pagenation_scroll').scrollLeft();
						if(move_end>left_now){
							to_left=true;
							if(left_now<inner_width){
								to_left=false;
								left_now+=(Math.floor(scroll_inner_width/inner_width)-2)*inner_width;
							}
						}else if(move_end<left_now){
							to_left=false;
							if(left_now>(Math.floor(scroll_inner_width/inner_width)-1)*inner_width){
								left_now-=(Math.floor(scroll_inner_width/inner_width)-2)*inner_width;
								to_left=true;
							}
						}

						step=Math.abs(move_end-left_now)/step_chuan;
						time_move=setInterval(function(){
							if(to_left){
								left_now+=step;
								if(left_now>=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if((left_now/inner_width)>=(scroll_inner_width/inner_width)-2){
										if((left_now/inner_width)<(scroll_inner_width/inner_width)-1){
											left_now=0;
										}else{
											left_now=inner_width;
											move_end=inner_width;
										}
									}
									$('#'+a+' .scroll_outer').scrollLeft(left_now);
								}
							}else{
								left_now-=step;
								if(left_now<=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if(left_now<=0){
										left_now=inner_width*((scroll_inner_width/inner_width)-2);
									}
									$('#'+a+' .scroll_outer').scrollLeft(left_now);
								}
							}
							$('#'+a+' .scroll_outer').scrollLeft(left_now);
							pagenation_num=move_end/inner_width-1;
							if(pagenation_num>($('#'+a+' .pagenation span').length-1)){
								pagenation_num=0;
							}
							$('#'+a+' .pagenation span').removeClass('active').eq(pagenation_num).addClass('active');
						},1);
						pagenation_move(($(this).index()),now_pagenation_left,direction_chuan)
					}
				}
				setTimeout(function(){
					automove(now_scroll,direction_chuan);
				},t_jian+step_chuan)
			})
			function pagenation_pre_init(a,direction,pre_num){
				$('#'+a+' .pagenation_scroll_inner').html(init_content)
				direction_pagenatin=direction;
				var pre_num=pre_num;
				if(direction_pagenatin=='vertical'){
					var each_height=Math.floor($('#'+a+' .pagenation_scroll').height()/pre_num);
					$('#'+a+' .pagenation_scroll_inner .inner').css({'height':each_height,'width':'100%'});
					$('#'+a+' .pagenation_scroll_inner').height(innerLength*(each_height));
				}else{
					var each_width=Math.floor($('#'+a+' .pagenation_scroll').width()/pre_num);
					$('#'+a+' .pagenation_scroll_inner .inner').css({'height':'100%','width':each_width});
					$('#'+a+' .pagenation_scroll_inner').width(innerLength*(each_width));
				}
				$('#'+a+' .pagenation_scroll_inner .inner').removeClass('active').eq(0).addClass('active');
			}
			function pagenation_move(pagenation_num,now_pagenation,direction){
				var pagenation_num=pagenation_num;	
				if(pagenation_num>=innerLength){
					pagenation_num=0;
				}
				$('#'+a+' .pagenation_scroll_inner .inner').removeClass('active').eq(pagenation_num).addClass('active');
				var direction_go=direction;
				if(direction_go=='vertical'){
					var end_pagenation_top=0;
					var now_pagenation_top=now_pagenation;
					if(pagenation_num<2){
						end_pagenation_top=0;
						if(pagenation_num<0){
							end_pagenation_top=(innerLength-3)*($('#'+a+' .pagenation_scroll_inner .inner').outerHeight());
						}
					}else if(pagenation_num>(innerLength-1)){
						end_pagenation_top=(innerLength-3)*($('#'+a+' .pagenation_scroll_inner .inner').outerHeight());
					}else{
						end_pagenation_top=(pagenation_num-1)*($('#'+a+' .pagenation_scroll_inner .inner').outerHeight());
					}
					var pagenation_step=(end_pagenation_top-now_pagenation_top)/step_chuan;
					if(time_pagenation==null){
						time_pagenation=setInterval(function(){
							if(pagenation_step>0){
								now_pagenation_top+=pagenation_step;
								$('#'+a+' .pagenation_scroll').scrollTop(now_pagenation_top);
								if(now_pagenation_top>=end_pagenation_top){
									clearInterval(time_pagenation);
									time_pagenation=null;
								}
							}else{
								now_pagenation_top+=pagenation_step;
								$('#'+a+' .pagenation_scroll').scrollTop(now_pagenation_top);
								if(now_pagenation_top<=end_pagenation_top){
									clearInterval(time_pagenation);
									time_pagenation=null;
								}
							}
						},1)
					}
				}else{
					var end_pagenation_left=0;
					var now_pagenation_left=now_pagenation;
					if(pagenation_num<2){
						end_pagenation_left=0;
						if(pagenation_num<0){
							end_pagenation_left=(innerLength-3)*($('#'+a+' .pagenation_scroll_inner .inner').outerWidth());
						}
					}else if(pagenation_num>(innerLength-1)){
						end_pagenation_left=(innerLength-3)*($('#'+a+' .pagenation_scroll_inner .inner').outerWidth());
					}else{
						end_pagenation_left=(pagenation_num-1)*($('#'+a+' .pagenation_scroll_inner .inner').outerWidth());
					}
					var pagenation_step=(end_pagenation_left-now_pagenation_left)/step_chuan;
					// console.log(pagenation_num)
					if(time_pagenation==null){
						time_pagenation=setInterval(function(){
							if(pagenation_step>0){
								now_pagenation_left+=pagenation_step;
								$('#'+a+' .pagenation_scroll').scrollLeft(now_pagenation_left);
								if(now_pagenation_left>=end_pagenation_left){
									clearInterval(time_pagenation);
									time_pagenation=null;
								}
							}else{
								now_pagenation_left+=pagenation_step;
								$('#'+a+' .pagenation_scroll').scrollLeft(now_pagenation_left);
								if(now_pagenation_left<=end_pagenation_left){
									clearInterval(time_pagenation);
									time_pagenation=null;
								}
							}
						},1)
					}
				}
			}

			$('#'+a).delegate(".pagenation_scroll_inner .inner","mouseup",function(){
			    var index=$(this).index()+1;
			    clearInterval(time_jian);
				clearInterval(time_move);
				clearInterval(time_pagenation);
				time_jian=null;
				time_move=null;
				time_pagenation=null;
				if(time_move==null){
					if(direction_chuan=='vertical'){
						move_end=index*inner_height;
						var now_pagenation_top=$('#'+a+' .pagenation_scroll').scrollTop();
						if(move_end>left_now){
							to_left=true;
							if(left_now<inner_height){
								to_left=false;
								left_now+=(Math.floor(scroll_inner_height/inner_height)-2)*inner_height;
							}
						}else if(move_end<left_now){
							to_left=false;
							if(left_now>(Math.floor(scroll_inner_height/inner_height)-1)*inner_height){
								left_now-=(Math.floor(scroll_inner_height/inner_height)-2)*inner_height;
								to_left=true;
							}
						}

						step=Math.abs(move_end-left_now)/step_chuan;
						time_move=setInterval(function(){
							if(to_left){
								left_now+=step;
								if(left_now>=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if((left_now/inner_height)>=(scroll_inner_height/inner_height)-2){
										if((left_now/inner_height)<(scroll_inner_height/inner_height)-1){
											left_now=0;
										}else{
											left_now=inner_height;
											move_end=inner_height;
										}
									}
									$('#'+a+' .scroll_outer').scrollTop(left_now);
								}
							}else{
								left_now-=step;
								if(left_now<=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if(left_now<=0){
										left_now=inner_width*((scroll_inner_width/inner_width)-2);
									}
									$('#'+a+' .scroll_outer').scrollTop(left_now);
								}
							}
							$('#'+a+' .scroll_outer').scrollTop(left_now);
							pagenation_num=move_end/inner_height-1;
							if(pagenation_num>($('#'+a+' .pagenation span').length-1)){
								pagenation_num=0;
							}
							$('#'+a+' .pagenation span').removeClass('active').eq(pagenation_num).addClass('active');
						},1);
						pagenation_move(($(this).index()),now_pagenation_top,direction_chuan);
					}else{
						move_end=index*inner_width;
						var now_pagenation_left=$('#'+a+' .pagenation_scroll').scrollLeft();
						if(move_end>left_now){
							to_left=true;
							if(left_now<inner_width){
								to_left=false;
								left_now+=(Math.floor(scroll_inner_width/inner_width)-2)*inner_width;
							}
						}else if(move_end<left_now){
							to_left=false;
							if(left_now>(Math.floor(scroll_inner_width/inner_width)-1)*inner_width){
								left_now-=(Math.floor(scroll_inner_width/inner_width)-2)*inner_width;
								to_left=true;
							}
						}

						step=Math.abs(move_end-left_now)/step_chuan;
						time_move=setInterval(function(){
							if(to_left){
								left_now+=step;
								if(left_now>=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if((left_now/inner_width)>=(scroll_inner_width/inner_width)-2){
										if((left_now/inner_width)<(scroll_inner_width/inner_width)-1){
											left_now=0;
										}else{
											left_now=inner_width;
											move_end=inner_width;
										}
									}
									$('#'+a+' .scroll_outer').scrollLeft(left_now);
								}
							}else{
								left_now-=step;
								if(left_now<=move_end){
									left_now=move_end;
									clearInterval(time_move);
									time_move=null;
									if(left_now<=0){
										left_now=inner_width*((scroll_inner_width/inner_width)-2);
									}
									$('#'+a+' .scroll_outer').scrollLeft(left_now);
								}
							}
							$('#'+a+' .scroll_outer').scrollLeft(left_now);
							pagenation_num=move_end/inner_width-1;
							if(pagenation_num>($('#'+a+' .pagenation span').length-1)){
								pagenation_num=0;
							}
							$('#'+a+' .pagenation span').removeClass('active').eq(pagenation_num).addClass('active');
						},1);
						pagenation_move(($(this).index()),now_pagenation_left,direction_chuan)
					}
				}
				setTimeout(function(){
					automove(now_scroll,direction_chuan);
				},t_jian+step_chuan)
			})
		}
	}