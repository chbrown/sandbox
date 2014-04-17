## bars.xhtml

Note that the extension alters the output of running wkhtmltopdf on this file:

    wkhtmltopdf bars.xhtml bars-xhtml.pdf


## sample-rect.svg

A simple rectangle with styling example from the SVG w3.org docs.

Conversion:

    # -f arg is required even when using filenames
    <sample-rect.svg rsvg-convert -f pdf > sample-rect.pdf
    # same as:
    rsvg-convert -f pdf sample-rect.svg -o sample-rect.pdf

Or:

    easy_install cairosvg
    cairosvg sample-rect.svg -o sample-rect.svg2pdf.pdf

The `svglib` library in PyPI is broken.
