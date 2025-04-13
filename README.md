# Javascript color mixing
## Single page application that lets you mix colors
Pure JS, CSS, HTML.

## How it works

### Objects
Almost everything is drag and drop.
Colors can be made using the form.
Pots can contain colors with the same mixing speed
Mixers can contain pots and mix the contents if theres at least 2 colors.
The trashbin will take anything to throw away but will only be emptied when the Empty button is clicked.

### Color selection
The color form has inputs for both RGB and HSL.
Mixing time decides how long the mixer needs to mix for (at minimum).
Mixing speed decides how fast the mixers whisk turns.

### Textures
Colors have a distinct look depending on their texture.
Texture dictates what color space is used for the mixing process

- Smooth colors will mix using CIE XYZ for light accurate mixes.
- Slimy colors use Oklab for perceptually even mixes.
- Grainy uses linear RGB for gamma accurate mixes.
- Coarse uses RGB for dirty mixes.

### Mixing halls
There is 2 mixer halls available that can hold mixers.
Mixers will continue to work in the background.

### Test grid
The test grid size can be changed.
Colors can be placed in the test grid to compare more easily.

### Triadic color scheme
Clicking on a color will generate the triadic color scheme for that color.
The generated colors can be dragged and placed like any other.

### Weather
Using the city input, you can add current weather information to the application.
Weather has impact on the mixers.
- When its 15C or lower, mixers work 15% slower (longer mixing time).
- When its raining or snowing, mixers work 10% slower (longer mixing time).
- When its 30C or higher, only 1 mixer can work at the same time.