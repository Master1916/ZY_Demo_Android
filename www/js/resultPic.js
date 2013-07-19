define(function(require, exports, module) {
     //引入依赖
     var $ = require('jquery');
     require('jquery.contextMenu');
     require('XY_Dialog');
     require('jqueryMboile');

     var Lane = require('./lane');
     var Curve = require('./curve');
     var Ruler = require('./ruler');
     var Grid = require('./grid');
     var Fill = require('./fill');
     var FillHead = require('./fillHead');
     var Deep = require('./deep');
     var DeepHead = require('./deepHead');
     var data = require('./data');
  
     
    //定义所属变量
    var deepWidth;
    var laneWidth;
    var screenWidth = window.innerWidth;
 
    // var screenHeight = window.innerHeight * 0.993;
    deepWidth=screenWidth*0.2;
    laneWidth=screenWidth*0.8-30;

    /************************开始业务逻辑*****************************************/
    //定义整个大画布DIV
    var canvasDiv = document.getElementById('canvasDiv');



    /************************绘制深度道*************************/
     var deep = new Deep();
     deep.startDepth = 2050;
     deep.endDepth = 2063;
     deep.depthScale = 1/110;
     deep.interval = 1;
     var deephead = new DeepHead();
     var lane6 = new Lane(canvasDiv, {
        name: '深度', //名称
        width: deepWidth, // 道的宽度
        depthRange: {
            start: 2050,
            end: 2063
        }, // 深度范围
        depthScale: 1 / 110, // 道的深度比例
        laneHeadHeight: 150 // 道头的高度
    }); 
     
    lane6.headControls.add(deephead.id,deephead);
    lane6.bodyControls.add(deep.id,deep);
    lane6.draw();


    /************************绘制第一个道*************************/
    //新建标尺控件ruler11
    var ruler11 = new Ruler();
    ruler11.color = "blue";
    ruler11.name = "孔隙度(POR)";
    ruler11.unit = "%";

    //新建标尺控件ruler12
    var ruler12 = new Ruler();
    ruler12.name = "自然伽马(GR)"
    ruler12.color = "red";
    ruler12.start = 100;
    ruler12.end = 1;

    //新建网格控件grid1
    var grid1 = new Grid();
    grid1.startDepth = 2050;
    grid1.endDepth = 2063;

    //根据标尺控件ruler11新建曲线控件curve1
    var curve11 = new Curve(ruler11);
    curve11.data = data.cureTestData2;

    //根据标尺控件ruler12新建曲线控件curve2
    var curve12 = new Curve(ruler12);
    curve12.data = data.cureTestData;
    curve12.isLg = true;
    //新建道容器控件
    var lane1 = new Lane(canvasDiv, {
        name: '道', //名称
        width: laneWidth, // 道的宽度
        depthRange: {
            start: 2050,
            end: 2063
        }, // 深度范围
        depthScale: 1 / 110, // 道的深度比例
        laneHeadHeight: 150 // 道头的高度
    });
    //向道的头部添加控件：如标尺控件
    lane1.headControls.add(ruler11.id,ruler11);
    lane1.headControls.add(ruler12.id,ruler12);
    //向道的body部分添加控件：如网格 曲线 填充等控件
    lane1.bodyControls.add(grid1.id,grid1);
    lane1.bodyControls.add(curve11.id,curve11);
    lane1.bodyControls.add(curve12.id,curve12);
    //绘制整个道
    lane1.draw();
    var fillhead21 = new FillHead();
    var flag=1;
    
    $( document ).on( "pageinit", "#main", function() {
                     $( document ).on( "swipeleft swiperight", "#main", function( e ) {
                            if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
                                     if ( e.type === "swipeleft"  ) {
                                               $( "#rightpanel" ).panel( "open" );
                                        } else if ( e.type === "swiperight" ) {
                                             //  $( "#leftpanel" ).panel( "open" );
                                        }
                               }
                      });
                  });

                  $("#both").click(function(){

                        //新建填充头控件
                        if(flag==1) {
                              
                        }else{
                            lane1.headControls.remove(fillhead21.id);
                            lane1.lanehead.removeChild(fillhead21.canvas);
                           
                            if (fillhead21.fill != null) {
                                lane1.bodyControls.remove(fillhead21.fill.id);
                                lane1.lanebody.removeChild(fillhead21.fill.canvas);
                            }
                        };
                        flag=2; 
                        fillhead21.name = "两边填充";
                        fillhead21.fillStyle.imgSrc = "./image/fill_img/lith2.bmp";
                        fillhead21.fillStyle.backgroundColor = "rgb(0,147,0)";
                        fillhead21.fillPostion = "both";
                        //新建填充对象
                        var fill21 = new Fill(fillhead21);
                        //是否基于直线填充
                        fill21.item1.isBaseLine = false;
                        fill21.item2.isBaseLine = false;
                        //项一、二的曲线
                        fill21.item1.curve = curve11;
                        fill21.item2.curve = curve12;
                        lane1.headControls.add(fillhead21.id,fillhead21);
                        lane1.bodyControls.add(fill21.id,fill21);
                        lane1.draw();
                        $( "#rightpanel" ).panel( "close" );
                    });

                  $("#right").click(function(){

                         //新建填充头控件
                       if(flag==1) {
                              
                        }else{
                            lane1.headControls.remove(fillhead21.id);
                            lane1.lanehead.removeChild(fillhead21.canvas);
                            
                            if (fillhead21.fill != null) {
                                lane1.bodyControls.remove(fillhead21.fill.id);
                                lane1.lanebody.removeChild(fillhead21.fill.canvas);
                            }
                        };
                        flag=2; 
                        //var fillhead21 = new FillHead();
                        fillhead21.name = "右填充";
                        fillhead21.fillStyle.imgSrc = "./image/fill_img/lith5.bmp";
                        fillhead21.fillStyle.backgroundColor = "rgb(0,147,0)";
                        fillhead21.fillPostion = "right";

                        //新建填充对象
                        var fill21 = new Fill(fillhead21);
                        //是否基于直线填充
                        fill21.item1.isBaseLine = false;
                        fill21.item2.isBaseLine = false;
                        //项一、二的曲线
                        fill21.item1.curve = curve11;
                        fill21.item2.curve = curve12; 
                        lane1.headControls.add(fillhead21.id,fillhead21);
                        lane1.bodyControls.add(fill21.id,fill21);
                        lane1.draw();
                        $( "#rightpanel" ).panel( "close" );

                  });
                 $("#straight_curve").click(function(){
                    if(flag==1) {
                              
                        }else{
                            lane1.headControls.remove(fillhead21.id);
                            lane1.lanehead.removeChild(fillhead21.canvas);
                             
                            if (fillhead21.fill != null) {
                                lane1.bodyControls.remove(fillhead21.fill.id);
                                lane1.lanebody.removeChild(fillhead21.fill.canvas);
                            }
                        };
                         flag=2; 

                        //新建填充头控件
                        //var fillhead21 = new FillHead();
                        fillhead21.name = "直线跟曲线";
                        fillhead21.fillStyle.imgSrc = "./image/fill_img/lith7.bmp";
                        // fillhead21.fillStyle.backgroundColor = "rgb(0,147,0)";
                        fillhead21.fillStyle.backgroundColor = "#ffcc00";
                        fillhead21.fillPostion = "both";
                        
                        //新建填充对象
                        var fill21 = new Fill(fillhead21);
                        //是否基于直线填充
                        fill21.item1.isBaseLine = true;
                        fill21.item2.isBaseLine = false;
                        //项一、二的曲线
                        fill21.item1.line = 50;
                        fill21.item1.rulerStart = 0;
                        fill21.item1.rulerEnd = 100;
                        fill21.item2.curve = curve12;
                        lane1.headControls.add(fillhead21.id,fillhead21);
                        lane1.bodyControls.add(fill21.id,fill21);
                        lane1.draw();
                        $( "#rightpanel" ).panel( "close" );
                  });
                  $("#two_straight").click(function(){

                        if(flag==1) {
                             
                        }else{
                            lane1.headControls.remove(fillhead21.id);
                            lane1.lanehead.removeChild(fillhead21.canvas);
                             

                            if (fillhead21.fill != null) {
                                lane1.bodyControls.remove(fillhead21.fill.id);
                                lane1.lanebody.removeChild(fillhead21.fill.canvas);
                            }
                        };
                       flag=2;    
                        //新建填充头控件
                       // var fillhead51 = new FillHead();
                        fillhead21.name = "两直线填充";
                        fillhead21.fillStyle.imgSrc = "./image/fill_img/lith15.bmp";
                        fillhead21.fillStyle.backgroundColor = "rgb(0,147,0)";
                        //设置填充位置：right、left、both 默认：both
                        fillhead21.fillPostion = "both";

                        //新建填充对象
                        var fill21 = new Fill(fillhead21);
                        //是否基于直线填充
                        fill21.item1.isBaseLine = true;
                        fill21.item2.isBaseLine = true;
                        //项一、二的直线
                        fill21.item1.line = 30;
                        fill21.item1.rulerStart = 0;
                        fill21.item1.rulerEnd = 100;

                        fill21.item2.line = 40;
                        fill21.item2.rulerStart = 100;
                        fill21.item2.rulerEnd = 0;
                        lane1.headControls.add(fillhead21.id,fillhead21);
                        lane1.bodyControls.add(fill21.id,fill21);
                        lane1.draw();
                        $( "#rightpanel" ).panel( "close" );

                     });
                  
                  

        

});