# uv-size-tool

This little tool helps you estimate stretch of an UV map for a three-dimensional model.

![Screenshot][1]


## Usage

* Clone the project and open the index file
* Drag and drop a wavefront object file containing the model and UV information onto the page
* Regions where a lot of stretch appears in the UV are highlighted in red
* You can add multiple models to compare them

Known limitations:

* Object must contain triangles only! This tool does not support quad faces yet
* .obj file must contain exactly one child (see [example file][4] for details)


## Why?

![Workflow][2]

Using digital three-dimensional models is a good way to create patterns for papercrafting or plush projects. In this process, a three-dimensional model is unwrapped using standard UV-unwrapping algorithms to create a two-dimensional pattern which is then printed and assembled in the real world.

For papercraft projects, you need a mapping without any stretch. To do so, create a very low poly model and make sure that every pattern piece is a triangle-strip. Triangle strips can be developed without stretch.

For plush projects, you often want larger areas to minimize visible seams. Such areas are very often not perfectly developable. The most basic example is a sphere, which can not be unwrapped in a way to be perfectly flat. The challenge is then to find the balance between few, well chosen pattern pieces and minimizing stretch. This tool helps visualizing the stretch of a model so you can refine the pattern.

You can find more information about how to define a pattern with low stretch in [this paper][5].


## License

[GPL v2][3]


[1]: docs/screenshot.png
[2]: docs/workflow.png
[3]: LICENSE
[4]: example/sphere.obj
[5]: https://www.cs.ubc.ca/~vlady/dcharts/EG05.pdf