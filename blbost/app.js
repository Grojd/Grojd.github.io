function hexToRgb(hex) {
    const rgb = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        , (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16));
    return rgb;
}


class Color {
    constructor(rgb, a = 1) {
        this.r = rgb[0];
        this.g = rgb[1];
        this.b = rgb[2];
        this.a = a;
        this.calcHSL();
    }
    innerRGB() {
        const { r, g, b } = this;
        return `${r}, ${g}, ${b}`;
    }
    rgba() {
        const { a } = this;
        return `rgba(${this.innerRGB()}, ${a})`;
    }
    hex() {
        const { r, g, b } = this;
        return (
            '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
    }
    calcHSL() {
        let { r, g, b } = this;
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        // Calculate hue
        // No difference
        if (delta == 0)
            h = 0;
        // Red is max
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        // Green is max
        else if (cmax == g)
            h = (b - r) / delta + 2;
        // Blue is max
        else
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0)
            h += 360;

        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        this.h = h;
        this.s = s;
        this.l = l;
    }
    hsla() {
        const { h, s, l, a } = this;
        return `hsla(${h}, ${s}%, ${l}%, ${a})`;
    }
    opposite() {
        const { h, s, l, a } = this;
        const newHue = (h + 180) % 360;
        return `hsl(${newHue}, ${s}%, ${l}%, ${a})`;
    }
    fullSaturation() {
        const { h, l, a } = this;
        return `hsl(${h}, 100%, ${l}%, ${a})`;
    }
    both() {
        const { h, l, a } = this;
        const newHue = (h + 180) % 360;
        return `hsl(${newHue}, 100%, ${l}%, ${a})`;
    }
}

const opacity = document.querySelector('#range');
function opacityValue() {
    return opacity.value;
}

const opposite = document.querySelector('#opposite');
function oppositeValue() {
    return opposite.checked;
}

const saturation = document.querySelector('#saturation');
function saturationValue() {
    return saturation.checked;
}

const color = document.querySelector('#color');
function colorText() {
    const colorValue = hexToRgb(color.value);
    const fullColor = new Color(colorValue, opacityValue());

    document.querySelector('#rgba').innerText = fullColor.rgba();
    document.querySelector('#hex').innerText = fullColor.hex();
    document.querySelector('#hsla').innerText = fullColor.hsla();

    if (oppositeValue() === true) {
        return fullColor.opposite();
    } else if (saturationValue() === true) {
        return fullColor.fullSaturation();
    } else if (oppositeValue() === true && saturationValue() === true) {
        fullColor.both();
    } else return fullColor.hsla();
}

function opacityInText() {
    opacityValue();
    colorText();
}

color.addEventListener('change', colorText);
opacity.addEventListener('change', opacityInText);

const button = document.querySelector('#button');
button.addEventListener('click', function () {
    document.body.style.backgroundColor = colorText();
})
