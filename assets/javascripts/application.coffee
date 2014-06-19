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
  
  Dashing.numColumns ||= 4
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





# Dashing is a Sinatra based framework that lets you build beautiful dashboards.

# Check out a demo over here. Here's another one, optimized for 1080p screens.

# Key features:

# Use premade widgets, or fully create your own with scss, html, and coffeescript.
# Widgets harness the power of data bindings to keep things DRY and simple. Powered by batman.js.
# Use the API to push data to your dashboards, or make use of a simple ruby DSL for fetching data.
# Drag & Drop interface for re-arranging your widgets.
# Host your dashboards on Heroku in less than 30 seconds.