# dashing.js is located in the dashing framework
# It includes jquery & batman for you.
#= require dashing.js

#= require_directory .
#= require_tree ../../widgets

Dashing.on 'ready', ->
  Dashing.widget_margins ||= [5, 5]
  #[Vertical Margin, Horizontal Margin]
  Dashing.widget_base_dimensions ||= [300, 360]
  #sets base dimensions; is not web responsive at this point
  #note: if you are going to reduce the size of the widget base dimensions you will need to reduce the data size dimensions as well
  width = $(window).width()
  console.log width
  if width >= 1200
    window.columns = 4
  else if width >= 992 && width < 1200
    window.columns = 3
  else
    window.columns = 2

  console.log window.columns
  Dashing.numColumns ||= window.columns
  #widgets need to be resized if this changes

  Dashing.debugMode = false
  #logs incoming data to the console

  contentWidth = (Dashing.widget_base_dimensions[0] + Dashing.widget_margins[0] * 2) * Dashing.numColumns

  Batman.setImmediate ->
    $('.gridster').width(contentWidth)
    $('.gridster ul:first').gridster
      widget_margins: Dashing.widget_margins
      widget_base_dimensions: Dashing.widget_base_dimensions
      avoid_overlapped_widgets: !Dashing.customGridsterLayout
      draggable:
        stop: Dashing.showGridsterInstructions
        start: -> Dashing.currentWidgetPositions = Dashing.getWidgetPositions()
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) )
      $(".gridster ul:first").gridster().data('gridster').draggable().disable();
