class Dashing.Graph extends Dashing.Widget

  @accessor 'current', ->
    return @get('displayedValue') if @get('displayedValue')
    points = @get('points')
    if points
      points[points.length - 1].y

  ready: ->
    container = $(@node).parent()
    # Gross hacks. Let's fix this.
    width = (Dashing.widget_base_dimensions[0] * container.data("sizex")) + Dashing.widget_margins[0] * 2 * (container.data("sizex") - 1)
    height = (Dashing.widget_base_dimensions[1] * container.data("sizey"))
    @graph = new Rickshaw.Graph(
      element: @node
      width: width
      height: height
      series: [
        {
        color: "#fff",
        data: [{x:0, y:0}]
        }
      ]
      min: 0,
      max: 0
    )

    # This takes whatever your data points are by default, which in this case
    # is {x:0, y:0}]
    @graph.series[0].data = @get('points') if @get('points')

    x_axis = new Rickshaw.Graph.Axis.Time(graph: @graph)
    y_axis = new Rickshaw.Graph.Axis.Y(graph: @graph, tickFormat: Rickshaw.Fixtures.Number.formatKMBT)
    @graph.render()

  onData: (data) ->
    if @graph
      console.log data
      @graph.series[0].data = data.points
      arr = []
      for element in data.points
        arr.push(element.y);
      @graph.max = Math.max.apply(Math, arr) + 2
      @graph.min = Math.min.apply(Math, arr) - 2
      # rescales the y axis
      # y_axis = new Rickshaw.Graph.Axis.Y(graph: @graph, tickFormat: Rickshaw.Fixtures.Number.formatKMBT)
      @graph.render()












