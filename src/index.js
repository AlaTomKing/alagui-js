// DebugGui

export const DebugGui = {};

// for vector2, you can eiter use the built-in class or use any classes or objects that contain "x" and "y"
export const DebugVec2 = class {
    x = 0; y = 0;

    constructor(x = 0, y = 0) {
        this.x = x, this.y = y;
    }
}

export const DebugRgba = class {
    r = 0; g = 0; b = 0; a = 0;

    constructor(r = 0, g = 0, b = 0, a = 0) {
        this.r = r, this.g = g, this.b = b, this.a = a;
    }
}
const DebugRgbaVec4 = (x, y, z, w) => new DebugRgba(Math.floor(x * 255), Math.floor(y * 255), Math.floor(z * 255), Math.floor(w * 255))

const rgbaString = (rgba) => `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a / 255})`;
const rgbString = (rgb, a) => `rgba(${rgb.r},${rgb.g},${rgb.b},${a})`;
const px = (x) => x + "px";
const rate = (x) => (x * 100) + "%";
const configStyle = (el, obj) => {
    for (const [name, val] of Object.entries(obj)) {
        el[name] = val;
    }
}

class textLabel {
    constructor(value, parent) {
        this.element = document.createElement("div");
        this.textElement = document.createElement("span");

        this.element.className = "debugGuiWindow textLabel";
        this.textElement.innerText = value;

        this.textElement.style.whiteSpace = "nowrap";
        this.textElement.style.position = "absolute";
        this.textElement.style.textOverflow = "ellipsis";

        this.element.appendChild(this.textElement);
        if (parent) parent.appendChild(this.element);
    }

    setHeight(h) {
        this.textElement.style.height = px(h);
        this.textElement.style.lineHeight = px(h);
    }

    alignText(x, y) {
        this.textElement.style.left = rate(x);
        this.textElement.style.top = rate(y);
        this.textElement.style.transform = `translate(-${rate(x)},-${rate(y)})`;
    }
}

// create element that assigns to its parent
const createElement = (type, parent) => {
    const newElement = document.createElement(type);
    if (parent) parent.appendChild(newElement);
    return newElement;
}

// same thing but has a namespace uri thingy for svgs and stuff
const createElementNS = (uri, type, parent) => {
    const newElement = document.createElementNS(uri, type);
    if (parent) parent.appendChild(newElement);
    return newElement;
}

// for button maker; checks and configures style
const checkStyle = (style) => {
    if (style) {
        style.forEach((obj) => {
            if (obj.condition === undefined || obj.condition())
                configStyle(obj.element.style, obj.style());
        });
    }
}

// make buttons
const buttonMaker = (el, styleTable, callback, holdActive = false, deactivateOnMove = false) => {
    // styletable contains
    // - idle: default look for element
    // - hover: hovered version of element
    // - active: element when pressing down or something
    // and this should work for multiple elements

    // callback table contains: mousedown, mouseup and click

    // holdActive means the button looks active as long as the mouse is down 
    // even if it leaves the button

    // deactivateOnMove makes the button look idle if the button is pressed but the cursor moves
    // this is only for buttons in title bars lol

    checkStyle(styleTable.idle);

    let hovered = false, pressed = false, pressGlobal = false, moved = false;
    let startMouseX, startMouseY // for deactivateOnMove so it does its thing when cursor moves at a certain distance
    el.addEventListener("mouseenter", (e) => {
        hovered = true;
        if ((!pressGlobal || pressed) && !moved) if (pressed) checkStyle(styleTable.active); else checkStyle(styleTable.hover);
    });
    el.addEventListener("mouseleave", (e) => {
        hovered = false;
        if (!(holdActive && pressed)) checkStyle(styleTable.idle);
    });
    el.addEventListener("click", (e) => {
        if (e.button === 0 && callback?.click && !moved)
            callback.click(e);
        moved = false;
    });
    el.addEventListener("mousedown", (e) => {
        if (e.button === 0) {
            pressed = true;
            startMouseX = e.clientX; startMouseY = e.clientY;
            checkStyle(styleTable.active)
            if (callback?.mousedown) callback.mousedown(e);
        }
    });
    el.addEventListener("mousemove", (e) => {
        const deltaX = e.clientX - startMouseX;
        const deltaY = e.clientY - startMouseY;

        if (pressed && deactivateOnMove && (!(deltaX > -6 && deltaX < 6) || !(deltaY > -6 && deltaY < 6))) {
            moved = true;
            checkStyle(styleTable.idle);
        }
    })
    window.addEventListener("mousedown", (e) => {
        if (e.button === 0) {
            pressGlobal = true;
        }
    });
    window.addEventListener("mouseup", (e) => {
        if (e.button === 0) {
            pressGlobal = false;
            if (pressed) {
                pressed = false;
                if (hovered) {
                    checkStyle(styleTable.hover);
                    if (callback?.mouseup && !moved) callback.mouseup(e);
                } else checkStyle(styleTable.idle);
            }
        }
    });

    return {
        element: el,
        updateIdle: () => {
            checkStyle(styleTable.idle);
        }
    }
}

let clickCount = 0, clickTarget, singleClickTimer;
const doubleClickEvent = (el, callback) => {
    el.addEventListener("mousedown", (e) => {
        if (e.button === 0) {
            if (clickTarget !== e.target) { clearTimeout(singleClickTimer); clickCount = 0 };
            clickTarget = e.target;

            if (e.target === el) clickCount++;
            if (clickCount === 1) {
                singleClickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 400);
            } else if (clickCount === 2) {
                clearTimeout(singleClickTimer);
                clickCount = 0;
                callback();
            }
        }
    })
}

const configPreset = {
    colors: {
        dark: {
            Text: new DebugRgba(255, 255, 255, 255),
            TextDisabled: new DebugRgba(128, 128, 128, 255),
            WindowBg: new DebugRgba(15, 15, 15, 240),
            ChildBg: new DebugRgba(0, 0, 0, 0),
            PopupBg: new DebugRgba(20, 20, 20, 240),
            Border: new DebugRgba(110, 110, 128, 128),
            BorderShadow: new DebugRgba(0, 0, 0, 0),
            FrameBg: new DebugRgba(41, 74, 122, 138),
            FrameBgHovered: new DebugRgba(66, 150, 250, 102),
            FrameBgActive: new DebugRgba(66, 150, 250, 171),
            TitleBg: new DebugRgba(10, 10, 10, 255),
            TitleBgActive: new DebugRgba(41, 74, 122, 255),
            TitleBgCollapsed: new DebugRgba(0, 0, 0, 130),
            MenuBarBg: new DebugRgba(36, 36, 36, 255),
            ScrollbarBg: new DebugRgba(5, 5, 5, 135),
            ScrollbarGrab: new DebugRgba(79, 79, 79, 255),
            ScrollbarGrabHovered: new DebugRgba(105, 105, 105, 255),
            ScrollbarGrabActive: new DebugRgba(130, 130, 130, 255),
            CheckMark: new DebugRgba(66, 150, 250, 255),
            SliderGrab: new DebugRgba(61, 133, 224, 255),
            SliderGrabActive: new DebugRgba(66, 150, 250, 255),
            Button: new DebugRgba(66, 150, 250, 102),
            ButtonHovered: new DebugRgba(66, 150, 250, 255),
            ButtonActive: new DebugRgba(15, 135, 250, 255),
            Header: new DebugRgba(66, 150, 250, 79),
            HeaderHovered: new DebugRgba(66, 150, 250, 204),
            HeaderActive: new DebugRgba(66, 150, 250, 255),
            Separator: new DebugRgba(110, 110, 128, 128),
            SeparatorHovered: new DebugRgba(26, 102, 191, 199),
            SeparatorActive: new DebugRgba(26, 102, 191, 255),
            ResizeGrip: new DebugRgba(66, 150, 250, 51),
            ResizeGripHovered: new DebugRgba(66, 150, 250, 171),
            ResizeGripActive: new DebugRgba(66, 150, 250, 242),
            Tab: new DebugRgba(46, 89, 148, 220),
            TabHovered: new DebugRgba(66, 150, 250, 204),
            TabActive: new DebugRgba(51, 105, 173, 255),
            TabUnfocused: new DebugRgba(17, 26, 38, 248),
            TabUnfocusedActive: new DebugRgba(35, 67, 108, 255),
            PlotLines: new DebugRgba(156, 156, 156, 255),
            PlotLinesHovered: new DebugRgba(255, 110, 89, 255),
            PlotHistogram: new DebugRgba(230, 179, 0, 255),
            PlotHistogramHovered: new DebugRgba(255, 153, 0, 255),
            TableHeaderBg: new DebugRgba(48, 48, 51, 255),
            TableBorderStrong: new DebugRgba(79, 79, 89, 255),
            TableBorderLight: new DebugRgba(59, 59, 64, 255),
            TableRowBg: new DebugRgba(0, 0, 0, 0),
            TableRowBgAlt: new DebugRgba(255, 255, 255, 15),
            TextSelectedBg: new DebugRgba(66, 150, 250, 89),
            DragDropTarget: new DebugRgba(255, 255, 255, 15),
            NavHighlight: new DebugRgba(66, 160, 250, 89),
            NavWindowingHighlight: new DebugRgba(255, 255, 0, 230),
            NavWindowingDimBg: new DebugRgba(204, 204, 204, 51),
            ModalWindowDimB: new DebugRgba(204, 204, 204, 89),
        },
        light: {
            Text: new DebugRgba(0, 0, 0, 255),
            TextDisabled: new DebugRgba(153, 153, 153, 255),
            WindowBg: new DebugRgba(240, 240, 240, 255),
            ChildBg: new DebugRgba(0, 0, 0, 0),
            PopupBg: new DebugRgba(255, 255, 255, 250),
            Border: new DebugRgba(0, 0, 0, 77),
            BorderShadow: new DebugRgba(0, 0, 0, 0),
            FrameBg: new DebugRgba(255, 255, 255, 255),
            FrameBgHovered: new DebugRgba(66, 150, 250, 102),
            FrameBgActive: new DebugRgba(66, 150, 250, 171),
            TitleBg: new DebugRgba(245, 245, 245, 255),
            TitleBgActive: new DebugRgba(209, 209, 209, 255),
            TitleBgCollapsed: new DebugRgba(255, 255, 255, 130),
            MenuBarBg: new DebugRgba(219, 219, 219, 255),
            ScrollbarBg: new DebugRgba(250, 250, 250, 135),
            ScrollbarGrab: new DebugRgba(176, 176, 176, 204),
            ScrollbarGrabHovered: new DebugRgba(125, 125, 125, 204),
            ScrollbarGrabActive: new DebugRgba(125, 125, 125, 255),
            CheckMark: new DebugRgba(66, 150, 250, 255),
            SliderGrab: new DebugRgba(66, 150, 250, 199),
            SliderGrabActive: new DebugRgba(117, 138, 204, 153),
            Button: new DebugRgba(66, 150, 250, 102),
            ButtonHovered: new DebugRgba(66, 150, 250, 255),
            ButtonActive: new DebugRgba(15, 135, 250, 255),
            Header: new DebugRgba(66, 150, 250, 79),
            HeaderHovered: new DebugRgba(66, 150, 250, 204),
            HeaderActive: new DebugRgba(66, 150, 250, 255),
            Separator: new DebugRgba(99, 99, 99, 158),
            SeparatorHovered: new DebugRgba(36, 112, 204, 199),
            SeparatorActive: new DebugRgba(36, 112, 204, 255),
            ResizeGrip: new DebugRgba(89, 89, 89, 43),
            ResizeGripHovered: new DebugRgba(66, 150, 250, 171),
            ResizeGripActive: new DebugRgba(66, 150, 250, 242),
            Tab: new DebugRgba(195, 203, 213, 237),
            TabHovered: new DebugRgba(66, 150, 250, 204),
            TabActive: new DebugRgba(152, 186, 225, 255),
            TabUnfocused: new DebugRgba(235, 236, 238, 251),
            TabUnfocusedActive: new DebugRgba(189, 209, 233, 255),
            PlotLines: new DebugRgba(99, 99, 99, 255),
            PlotLinesHovered: new DebugRgba(255, 110, 89, 255),
            PlotHistogram: new DebugRgba(230, 179, 0, 255),
            PlotHistogramHovered: new DebugRgba(255, 153, 0, 255),
            TableHeaderBg: new DebugRgba(199, 222, 250, 255),
            TableBorderStrong: new DebugRgba(145, 145, 163, 255),
            TableBorderLight: new DebugRgba(173, 173, 189, 255),
            TableRowBg: new DebugRgba(0, 0, 0, 0),
            TableRowBgAlt: new DebugRgba(77, 77, 77, 23),
            TextSelectedBg: new DebugRgba(66, 150, 250, 89),
            DragDropTarget: new DebugRgba(66, 150, 250, 242),
            NavHighlight: new DebugRgba(66, 150, 250, 204),
            NavWindowingHighlight: new DebugRgba(179, 179, 179, 179),
            NavWindowingDimBg: new DebugRgba(51, 51, 51, 51),
            ModalWindowDimB: new DebugRgba(51, 51, 51, 89),
        },
        classic: {
            Text: new DebugRgba(230, 230, 230, 255),
            TextDisabled: new DebugRgba(153, 153, 153, 255),
            WindowBg: new DebugRgba(0, 0, 0, 217),
            ChildBg: new DebugRgba(0, 0, 0, 0),
            PopupBg: new DebugRgba(28, 28, 36, 235),
            Border: new DebugRgba(128, 128, 128, 128),
            BorderShadow: new DebugRgba(0, 0, 0, 0),
            FrameBg: new DebugRgba(110, 110, 110, 99),
            FrameBgHovered: new DebugRgba(120, 120, 176, 102),
            FrameBgActive: new DebugRgba(107, 105, 163, 176),
            TitleBg: new DebugRgba(69, 69, 138, 212),
            TitleBgActive: new DebugRgba(82, 82, 161, 222),
            TitleBgCollapsed: new DebugRgba(102, 102, 204, 51),
            MenuBarBg: new DebugRgba(102, 102, 140, 204),
            ScrollbarBg: new DebugRgba(51, 64, 77, 153),
            ScrollbarGrab: new DebugRgba(102, 102, 204, 77),
            ScrollbarGrabHovered: new DebugRgba(102, 102, 204, 102),
            ScrollbarGrabActive: new DebugRgba(105, 99, 204, 153),
            CheckMark: new DebugRgba(230, 230, 230, 128),
            SliderGrab: new DebugRgba(255, 255, 255, 77),
            SliderGrabActive: new DebugRgba(105, 99, 204, 153),
            Button: new DebugRgba(89, 102, 156, 158),
            ButtonHovered: new DebugRgba(102, 122, 181, 201),
            ButtonActive: new DebugRgba(117, 138, 204, 255),
            Header: new DebugRgba(102, 102, 230, 115),
            HeaderHovered: new DebugRgba(115, 115, 230, 204),
            HeaderActive: new DebugRgba(135, 135, 222, 204),
            Separator: new DebugRgba(128, 128, 128, 153),
            SeparatorHovered: new DebugRgba(153, 153, 179, 255),
            SeparatorActive: new DebugRgba(179, 179, 230, 255),
            ResizeGrip: new DebugRgba(255, 255, 255, 26),
            ResizeGripHovered: new DebugRgba(199, 209, 255, 153),
            ResizeGripActive: new DebugRgba(199, 209, 255, 230),
            Tab: new DebugRgba(86, 86, 174, 200),
            TabHovered: new DebugRgba(115, 115, 230, 204),
            TabActive: new DebugRgba(103, 103, 185, 215),
            TabUnfocused: new DebugRgba(72, 72, 145, 209),
            TabUnfocusedActive: new DebugRgba(89, 89, 166, 213),
            PlotLines: new DebugRgba(255, 255, 255, 255),
            PlotLinesHovered: new DebugRgba(230, 179, 0, 255),
            PlotHistogram: new DebugRgba(230, 179, 0, 255),
            PlotHistogramHovered: new DebugRgba(255, 153, 0, 255),
            TableHeaderBg: new DebugRgba(69, 69, 97, 255),
            TableBorderStrong: new DebugRgba(79, 79, 115, 255),
            TableBorderLight: new DebugRgba(66, 66, 71, 255),
            TableRowBg: new DebugRgba(0, 0, 0, 0),
            TableRowBgAlt: new DebugRgba(255, 255, 255, 18),
            TextSelectedBg: new DebugRgba(0, 0, 255, 89),
            DragDropTarget: new DebugRgba(255, 255, 0, 230),
            NavHighlight: new DebugRgba(115, 115, 230, 204),
            NavWindowingHighlight: new DebugRgba(255, 255, 255, 179),
            NavWindowingDimBg: new DebugRgba(204, 204, 204, 51),
            ModalWindowDimB: new DebugRgba(51, 51, 51, 89),
        },
    },

    size: {
        // Main
        WindowPadding: new DebugVec2(8, 8),
        FramePadding: new DebugVec2(4, 3),
        ItemSpacing: new DebugVec2(8, 4),
        ItemInnerSpacing: new DebugVec2(4, 4),
        TouchExtraPadding: new DebugVec2(0, 0),
        IdentSpacing: 21,
        ScrollbarSize: 14,
        GrabMinSize: 12,

        // Borders
        WindowBorderSize: 1,
        ChildBorderSize: 1,
        PopupBorderSize: 1,
        FrameBorderSize: 0,

        // Rounding
        WindowRounding: 0,
        ChildRounding: 0,
        FrameRounding: 0,
        PopupRounding: 0,
        ScrollbarRounding: 9,
        GrabRounding: 0,

        // Tabs
        TabBorderSize: 0,
        TabBarBorderSize: 1,
        TabBarOverlineSize: 1,
        TabCloseButtonMinWidthSelected: -1,
        TabCloseButtonMinWidthUnselected: 0,
        TabRounding: 5,

        // Tables
        CellPadding: new DebugVec2(4, 2),
        TableAngledHeadersAngle: 35,
        TableAngledHeadersTextAlign: new DebugVec2(0.5, 0),

        // Trees
        TreeLinesFlags: "DrawLinesNone",
        TreeLinesSize: 1,
        TreeLinesRounding: 0,

        // Windows
        WindowTitleAlign: new DebugVec2(0, 0.5),
        WindowBorderHoverPadding: 4,
        WindowMenuButtonPosition: "Left",

        // Widgets
        ColorButtonPosition: "Right",
        ButtonTextAlign: new DebugVec2(0.5, 0.5),
        SelectableTextAlign: new DebugVec2(0, 0),
        SeparatorTextBorderSize: 3,
        SeparatorTextAlign: new DebugVec2(0, 0.5),
        SeparatorTextPadding: new DebugVec2(20, 3),
        LogSliderDeadzone: 4,
        ImageBorderSize: 0,

        // Misc
        DisplayWindowPadding: new DebugVec2(19, 19),
        DisplaySafeAreaPadding: new DebugVec2(3, 3),
    },

    textSize: 13
}

const defaultConfig = {
    color: configPreset.colors.dark,
    size: configPreset.size,
    textSize: configPreset.textSize
}

/*{ // shoutout codz01: https://github.com/ocornut/imgui/issues/707#issuecomment-252413954
    defaultConfig.color.Text = DebugRgbaVec4(0.90, 0.90, 0.90, 0.90);
    defaultConfig.color.TextDisabled = DebugRgbaVec4(0.60, 0.60, 0.60, 1.00);
    defaultConfig.color.WindowBg = DebugRgbaVec4(0.09, 0.09, 0.15, 1.00);
    defaultConfig.color.ChildWindowBg = DebugRgbaVec4(0.00, 0.00, 0.00, 0.00);
    defaultConfig.color.PopupBg = DebugRgbaVec4(0.05, 0.05, 0.10, 0.85);
    defaultConfig.color.Border = DebugRgbaVec4(0.70, 0.70, 0.70, 0.65);
    defaultConfig.color.BorderShadow = DebugRgbaVec4(0.00, 0.00, 0.00, 0.00);
    defaultConfig.color.FrameBg = DebugRgbaVec4(0.00, 0.00, 0.01, 1.00);
    defaultConfig.color.FrameBgHovered = DebugRgbaVec4(0.90, 0.80, 0.80, 0.40);
    defaultConfig.color.FrameBgActive = DebugRgbaVec4(0.90, 0.65, 0.65, 0.45);
    defaultConfig.color.TitleBg = DebugRgbaVec4(0.00, 0.00, 0.00, 0.83);
    defaultConfig.color.TitleBgCollapsed = DebugRgbaVec4(0.40, 0.40, 0.80, 0.20);
    defaultConfig.color.TitleBgActive = DebugRgbaVec4(0.00, 0.00, 0.00, 0.87);
    defaultConfig.color.MenuBarBg = DebugRgbaVec4(0.01, 0.01, 0.02, 0.80);
    defaultConfig.color.ScrollbarBg = DebugRgbaVec4(0.20, 0.25, 0.30, 0.60);
    defaultConfig.color.ScrollbarGrab = DebugRgbaVec4(0.55, 0.53, 0.55, 0.51);
    defaultConfig.color.ScrollbarGrabHovered = DebugRgbaVec4(0.56, 0.56, 0.56, 1.00);
    defaultConfig.color.ScrollbarGrabActive = DebugRgbaVec4(0.56, 0.56, 0.56, 0.91);
    defaultConfig.color.ComboBg = DebugRgbaVec4(0.1, 0.1, 0.1, 0.99);
    defaultConfig.color.CheckMark = DebugRgbaVec4(0.90, 0.90, 0.90, 0.83);
    defaultConfig.color.SliderGrab = DebugRgbaVec4(0.70, 0.70, 0.70, 0.62);
    defaultConfig.color.SliderGrabActive = DebugRgbaVec4(0.30, 0.30, 0.30, 0.84);
    defaultConfig.color.Button = DebugRgbaVec4(0.48, 0.72, 0.89, 0.49);
    defaultConfig.color.ButtonHovered = DebugRgbaVec4(0.50, 0.69, 0.99, 0.68);
    defaultConfig.color.ButtonActive = DebugRgbaVec4(0.80, 0.50, 0.50, 1.00);
    defaultConfig.color.Header = DebugRgbaVec4(0.30, 0.69, 1.00, 0.53);
    defaultConfig.color.HeaderHovered = DebugRgbaVec4(0.44, 0.61, 0.86, 1.00);
    defaultConfig.color.HeaderActive = DebugRgbaVec4(0.38, 0.62, 0.83, 1.00);
    defaultConfig.color.Column = DebugRgbaVec4(0.50, 0.50, 0.50, 1.00);
    defaultConfig.color.ColumnHovered = DebugRgbaVec4(0.70, 0.60, 0.60, 1.00);
    defaultConfig.color.ColumnActive = DebugRgbaVec4(0.90, 0.70, 0.70, 1.00);
    defaultConfig.color.ResizeGrip = DebugRgbaVec4(1.00, 1.00, 1.00, 0.85);
    defaultConfig.color.ResizeGripHovered = DebugRgbaVec4(1.00, 1.00, 1.00, 0.60);
    defaultConfig.color.ResizeGripActive = DebugRgbaVec4(1.00, 1.00, 1.00, 0.90);
    defaultConfig.color.CloseButton = DebugRgbaVec4(0.50, 0.50, 0.90, 0.50);
    defaultConfig.color.CloseButtonHovered = DebugRgbaVec4(0.70, 0.70, 0.90, 0.60);
    defaultConfig.color.CloseButtonActive = DebugRgbaVec4(0.70, 0.70, 0.70, 1.00);
    defaultConfig.color.PlotLines = DebugRgbaVec4(1.00, 1.00, 1.00, 1.00);
    defaultConfig.color.PlotLinesHovered = DebugRgbaVec4(0.90, 0.70, 0.00, 1.00);
    defaultConfig.color.PlotHistogram = DebugRgbaVec4(0.90, 0.70, 0.00, 1.00);
    defaultConfig.color.PlotHistogramHovered = DebugRgbaVec4(1.00, 0.60, 0.00, 1.00);
    defaultConfig.color.TextSelectedBg = DebugRgbaVec4(0.00, 0.00, 1.00, 0.35);
    defaultConfig.color.ModalWindowDarkening = DebugRgbaVec4(0.20, 0.20, 0.20, 0.35)
defaultConfig.size.WindowRounding = 5.3;
defaultConfig.size.FrameRounding = 2.3;
defaultConfig.size.ScrollbarRounding = 0;
}*/

const windowOptions = {
    "no_titlebar": false,
    "no_scrollbar": false,
    "no_menu": false,
    "no_move": false,
    "no_resize": false,
    "no_collapse": false,
    "no_close": false,
    "no_nav": false,
    "no_background": false,
    "no_bring_to_front": false,
    "unsaved_document": false,
}

let windowCount = 0;
const windowObjects = [];

// create frame
const DebugGuiFrame = document.createElement("div");
DebugGuiFrame.id = "debugGuiFrame";

// holdMove: don't move until cursor moves at enough distance
let moveTarget = null, holdMove = false;
let resizeTarget = null, resizeFlag;
let frameStartPosX, frameStartPosY;
let mouseStartPosX, mouseStartPosY;
let frameStartSizeX, frameStartSizeY;

DebugGuiFrame.addEventListener("wheel", (e) => {
    //e.preventDefault();
})

DebugGuiFrame.addEventListener("contextmenu", (e) => {
    e.preventDefault();
})

DebugGuiFrame.addEventListener("mousemove", (e) => {
    const deltaX = e.clientX - mouseStartPosX;
    const deltaY = e.clientY - mouseStartPosY;

    if (moveTarget
        && e.clientX >= 0 && e.clientX < window.innerWidth &&
        e.clientY >= 0 && e.clientY < window.innerHeight &&
        (holdMove && !(deltaX > -6 && deltaX < 6) || !(deltaY > -6 && deltaY < 6) || !holdMove)) {
        holdMove = false;

        moveTarget.position.x = frameStartPosX + deltaX;
        moveTarget.position.y = frameStartPosY + deltaY;

        moveTarget.SetPosition(moveTarget.position);
    } else if (resizeTarget
        && e.clientX >= 0 && e.clientX < window.innerWidth &&
        e.clientY >= 0 && e.clientY < window.innerHeight) {

        switch (resizeFlag) {
            case 0: // resize bottom right
                resizeTarget.size.x = Math.max(frameStartSizeX + deltaX, 32);
                resizeTarget.size.y = Math.max(frameStartSizeY + deltaY, 32);
                document.body.style.cursor = (resizeTarget.size.x === 32 && resizeTarget.size.y === 32) ? "se-resize" : "nwse-resize";
                break;
            case 1: // resize bottom left
                resizeTarget.size.x = Math.max(frameStartSizeX - deltaX, 32);
                resizeTarget.size.y = Math.max(frameStartSizeY + deltaY, 32);
                resizeTarget.position.x = Math.min(frameStartPosX + deltaX, frameStartPosX + frameStartSizeX - 32);
                document.body.style.cursor = (resizeTarget.size.x === 32 && resizeTarget.size.y === 32) ? "sw-resize" : "nesw-resize";
                break;
            case 2: // resize top
                resizeTarget.size.y = Math.max(frameStartSizeY - deltaY, 32);
                resizeTarget.position.y = Math.min(frameStartPosY + deltaY, frameStartPosY + frameStartSizeY - 32);
                document.body.style.cursor = (resizeTarget.size.y === 32) ? "n-resize" : "ns-resize";
                break;
            case 3: // resize bottom
                resizeTarget.size.y = Math.max(frameStartSizeY + deltaY, 32);
                document.body.style.cursor = (resizeTarget.size.y === 32) ? "s-resize" : "ns-resize";
                break;
            case 4: // resize left
                resizeTarget.size.x = Math.max(frameStartSizeX - deltaX, 32);
                resizeTarget.position.x = Math.min(frameStartPosX + deltaX, frameStartPosX + frameStartSizeX - 32);
                document.body.style.cursor = (resizeTarget.size.x === 32) ? "w-resize" : "ew-resize";
                break;
            case 5: // resize right
                resizeTarget.size.x = Math.max(frameStartSizeX + deltaX, 32);
                document.body.style.cursor = (resizeTarget.size.x === 32) ? "e-resize" : "ew-resize";
                break;
        }

        resizeTarget.SetPosition(resizeTarget.position);
        resizeTarget.SetSize(resizeTarget.size);
    }
});

DebugGuiFrame.addEventListener("mousedown", (e) => {
    if (e.button === 0 && e.target === DebugGuiFrame) {
        windowObjects.forEach((w) => {
            w.MakeInactive();
        });
    }
});

window.addEventListener("mouseup", (e) => {
    if (e.button === 0) {
        moveTarget = null; resizeTarget = null; holdMove = false;
    }
});

document.body.appendChild(DebugGuiFrame);

DebugGui.__WidgetManager = class {
    __widgets = [];

    constructor() {

    }

    Text() {
        console.log(2)
        this.__widgets.push("text")
    }
}

DebugGui.Window = class extends DebugGui.__WidgetManager {
    position = new DebugVec2(60, 60);
    size = new DebugVec2(200, 150);

    stColor = defaultConfig.color;
    stSize = defaultConfig.size;
    stTextSize = defaultConfig.textSize;

    options = windowOptions;

    active = false;
    collapse = false;

    constructor(title = "") {
        super();

        this.title = title;
    }

    SetPosition(x, y) {
        if (x instanceof Object) {
            this.position = x;
        } else {
            this.position = new DebugVec2(x, y);
        }

        if (this.gui) {
            configStyle(this.gui.style, {
                left: px(this.position.x),
                top: px(this.position.y),
            });
        }
    }

    SetSize(x) {
        if (x instanceof Object) {
            this.size = x;
        } else {
            this.size = new DebugVec2(x, y);
        }

        if (this.gui) {
            configStyle(this.gui.style, {
                width: px(this.size.x),
                height: px(this.size.y),
            });
        }
    }

    MakeActive() {
        if (this.gui && !this.active) {
            if (!this.collapse) {
                this.gui_titlebar.style.backgroundColor = rgbaString(this.stColor.TitleBgActive);
            }
            this.active = true;

            const initialOrder = Number(this.gui.style.zIndex);

            windowObjects.forEach((w) => {
                if (w !== this) w.MakeInactive();

                if (Number(w.gui.style.zIndex) > initialOrder) {
                    w.gui.style.zIndex = w.gui.style.zIndex - 1;
                }
            })

            this.gui.style.zIndex = windowCount - 1;
        }
    }

    MakeInactive() {
        if (this.gui && this.active) {
            if (!this.collapse) {
                this.gui_titlebar.style.backgroundColor = rgbaString(this.stColor.TitleBg);
            }
            this.active = false;
        }
    }

    ToggleCollapse() {
        this.collapse = !this.collapse;

        this.gui_titlebar.style.backgroundColor = this.collapse ? rgbaString(this.stColor.TitleBgCollapsed) : rgbaString(this.stColor.TitleBgActive);
        this.gui.style.height = this.collapse ? this.gui_titlebar.style.height : px(this.size.y);

        this.gui_resizeBottomRightBtn.updateIdle();
        this.gui_collapseTriangle.style.transform = this.collapse ? "translate(-50%,-50%) rotate(-90deg)" : "translate(-50%,-50%)";
    }

    // closes window but doesn't delete the object
    Close() {
        if (this.gui) {
            let foundIndex, foundDisplayOrder;
            windowObjects.forEach((w, idx) => {
                if (w === this) {
                    foundIndex = idx;
                    foundDisplayOrder = w.gui.style.zIndex;
                }
                if (foundIndex && w.gui.style.zIndex > foundDisplayOrder) {
                    w.gui.style.zIndex = w.gui.style.zIndex - 1;
                }
            })

            windowObjects.splice(foundIndex, 1);
            this.gui.remove();
            this.gui = null;
            windowCount--;
        }
    }

    // show the window onto clients screen
    Show() {
        const base = document.createElement("div");
        base.className = "debugGuiWindow";

        //base.style.backgroundColor = rgbaString(this.__stColor.FrameBg);

        configStyle(base.style, {
            left: px(this.position.x),
            top: px(this.position.y),
            width: px(this.size.x),
            height: px(this.size.y),
            fontSize: px(this.stTextSize),
        })

        const content = document.createElement("div");
        content.className = "debugGuiWindow content";
        content.style.borderRadius = px(this.stSize.WindowRounding);

        const titleBar = document.createElement("div");
        titleBar.className = "debugGuiWindow titleBar";

        titleBar.style.height = px(this.stTextSize + this.stSize.FramePadding.y * 2);
        titleBar.style.backgroundColor = rgbaString(this.stColor.TitleBgActive);

        const innerFrame = document.createElement("div");
        innerFrame.className = "debugGuiWindow innerFrame";

        innerFrame.style.top = px(this.stTextSize + this.stSize.FramePadding.y * 2);
        innerFrame.style.backgroundColor = rgbaString(this.stColor.WindowBg);

        const borderFrame = document.createElement("div");
        borderFrame.className = "debugGuiWindow borderFrame";

        borderFrame.style.borderColor = rgbaString(this.stColor.Border);
        borderFrame.style.borderWidth = px(this.stSize.WindowBorderSize);
        borderFrame.style.borderRadius = px(this.stSize.WindowRounding);

        // collapse button
        const collapseBtnEl = createElement("div", titleBar);
        collapseBtnEl.className = "debugGuiWindow titleBar barButton";

        const collapseTriangle = createElementNS('http://www.w3.org/2000/svg', 'svg', collapseBtnEl);
        collapseTriangle.setAttribute("viewBox", "0 0 1 1");

        collapseTriangle.style.position = "absolute";
        collapseTriangle.style.width = "80%";
        collapseTriangle.style.height = "80%";
        collapseTriangle.style.top = "50%";
        collapseTriangle.style.left = "50%";
        collapseTriangle.style.transform = "translate(-50%, -50%)";

        const collapseTrianglePath = createElementNS('http://www.w3.org/2000/svg', 'polygon', collapseTriangle);
        collapseTrianglePath.setAttribute("points", "0.0670139,0.125 0.933014,0.125 0.5,0.875");

        buttonMaker(collapseBtnEl, {
            idle: [{
                element: collapseBtnEl,
                style: () => ({
                    width: px(this.stTextSize),
                    height: px(this.stTextSize),
                    left: px(this.stSize.FramePadding.x + this.stSize.WindowBorderSize),
                    backgroundColor: "#0000",
                    fill: rgbaString(this.stColor.Text),
                })
            }],
            hover: [{
                element: collapseBtnEl,
                style: () => ({ backgroundColor: rgbaString(this.stColor.ButtonHovered) })
            }],
            active: [{
                element: collapseBtnEl,
                style: () => ({ backgroundColor: rgbaString(this.stColor.ButtonActive) })
            }]
        }, {
            click: () => { this.ToggleCollapse(); }
        }, false, true)

        // close button
        const closeBtnEl = createElement("div", titleBar);
        closeBtnEl.className = "debugGuiWindow titleBar barButton";

        const closeCross = createElementNS('http://www.w3.org/2000/svg', 'svg', closeBtnEl);
        closeCross.setAttribute("viewBox", "0 0 1 1");
        closeCross.setAttribute("stroke-width", "1px");
        closeCross.setAttribute("preserveAspectRatio", "none");

        const closeCrossLine0 = createElementNS('http://www.w3.org/2000/svg', 'line', closeCross);
        closeCrossLine0.setAttribute("x1", 0.5 - (0.5 * 0.7071));
        closeCrossLine0.setAttribute("y1", 0.5 - (0.5 * 0.7071));
        closeCrossLine0.setAttribute("x2", 0.5 + (0.5 * 0.7071));
        closeCrossLine0.setAttribute("y2", 0.5 + (0.5 * 0.7071));
        closeCrossLine0.setAttribute("vector-effect", "non-scaling-stroke");

        const closeCrossLine1 = createElementNS('http://www.w3.org/2000/svg', 'line', closeCross);
        closeCrossLine1.setAttribute("x1", 0.5 - (0.5 * 0.7071));
        closeCrossLine1.setAttribute("y1", 0.5 + (0.5 * 0.7071));
        closeCrossLine1.setAttribute("x2", 0.5 + (0.5 * 0.7071));
        closeCrossLine1.setAttribute("y2", 0.5 - (0.5 * 0.7071));
        closeCrossLine1.setAttribute("vector-effect", "non-scaling-stroke");

        buttonMaker(closeBtnEl, {
            idle: [{
                element: closeBtnEl,
                style: () => ({
                    width: px(this.stTextSize),
                    height: px(this.stTextSize),
                    right: px(this.stSize.FramePadding.x + this.stSize.WindowBorderSize),
                    stroke: rgbaString(this.stColor.Text),
                    backgroundColor: "#0000",
                })
            }],
            hover: [{
                element: closeBtnEl,
                style: () => ({ backgroundColor: rgbaString(this.stColor.ButtonHovered) })
            }],
            active: [{
                element: closeBtnEl,
                style: () => ({ backgroundColor: rgbaString(this.stColor.ButtonActive) })
            }]
        }, {
            click: () => { this.Close(); }
        }, false)

        // title text
        const titleBarLabel = new textLabel(this.title, titleBar);
        titleBarLabel.element.style.left = px(this.stTextSize + this.stSize.FramePadding.y + this.stSize.WindowBorderSize + this.stSize.ItemInnerSpacing.x * 2);
        titleBarLabel.element.style.right = px(this.stTextSize + this.stSize.FramePadding.y + this.stSize.WindowBorderSize + this.stSize.ItemInnerSpacing.x * 2);
        titleBarLabel.alignText(0, 0.5);
        titleBarLabel.setHeight(this.stTextSize);

        // double click to toggle collapse
        doubleClickEvent(titleBar, () => { this.ToggleCollapse() });

        const startResizin = (e, flag) => {
            this.MakeActive();
            resizeTarget = this;
            resizeFlag = flag;
            mouseStartPosX = e.clientX;
            mouseStartPosY = e.clientY;
            frameStartPosX = this.position.x;
            frameStartPosY = this.position.y;
            frameStartSizeX = this.size.x;
            frameStartSizeY = this.size.y;
        }

        const startMovin = (e, isHoldingBtn = false) => {
            this.MakeActive();
            moveTarget = this;
            holdMove = isHoldingBtn;
            mouseStartPosX = e.clientX;
            mouseStartPosY = e.clientY;
            frameStartPosX = this.position.x;
            frameStartPosY = this.position.y;
        }

        // #region resize thingys

        // bottom right
        const resizeBottomRight = createElement("div", base);
        resizeBottomRight.className = "debugGuiWindow resizeBtn";

        const resizeTriangleRightFrame = createElement("div", resizeBottomRight);
        resizeTriangleRightFrame.className = "debugGuiWindow resizeBtn triangle";

        const resizeTriangleRight = createElementNS('http://www.w3.org/2000/svg', 'svg', resizeTriangleRightFrame);
        resizeTriangleRight.setAttribute("viewBox", "0 0 1 1");

        const rightTrianglePath = createElementNS('http://www.w3.org/2000/svg', 'polygon', resizeTriangleRight);
        rightTrianglePath.setAttribute("points", "0,1 1,1 1,0");

        const resizeBottomRightBtn = buttonMaker(resizeBottomRight, {
            idle: [{
                element: resizeBottomRight,
                style: () => ({
                    height: px(this.stTextSize + 4),
                    right: px(-5),
                    bottom: px(-5),
                })
            }, {
                element: resizeTriangleRightFrame,
                style: () => ({
                    top: px(-2 - this.stSize.WindowBorderSize),
                    left: px(-2 - this.stSize.WindowBorderSize),
                    fill: !this.collapse ? rgbaString(this.stColor.ResizeGrip) : "#0000",
                    borderBottomRightRadius: px(this.stSize.WindowRounding - this.stSize.WindowBorderSize),
                })
            }, {
                element: document.body,
                style: () => ({
                    cursor: "auto",
                })
            }],
            hover: [{
                element: resizeTriangleRightFrame, condition: () => (!this.collapse),
                style: () => ({
                    fill: rgbaString(this.stColor.ResizeGripHovered),
                })
            }, {
                element: document.body, condition: () => (!this.collapse),
                style: () => ({
                    cursor: (this.size.x === 32 && this.size.y === 32) ? "se-resize" : "nwse-resize",
                })
            }],
            active: [{
                element: resizeTriangleRightFrame, condition: () => (!this.collapse),
                style: () => ({
                    fill: rgbaString(this.stColor.ResizeGripActive),
                })
            }]
        }, {
            mousedown: (e) => {
                if (this.collapse) startMovin(e); else startResizin(e, 0);
            },
        }, true);

        // bottom left
        const resizeBottomLeft = createElement("div", base);
        resizeBottomLeft.className = "debugGuiWindow resizeBtn";

        const resizeTriangleLeftFrame = createElement("div", resizeBottomLeft);
        resizeTriangleLeftFrame.className = "debugGuiWindow resizeBtn triangle";

        const resizeTriangleLeft = createElementNS('http://www.w3.org/2000/svg', 'svg', resizeTriangleLeftFrame);
        resizeTriangleLeft.setAttribute("viewBox", "0 0 1 1");

        const leftTrianglePath = createElementNS('http://www.w3.org/2000/svg', 'polygon', resizeTriangleLeft);
        leftTrianglePath.setAttribute("points", "0,1 1,1 0,0");

        buttonMaker(resizeBottomLeft, {
            idle: [{
                element: resizeBottomLeft,
                style: () => ({
                    height: px(this.stTextSize + 4),
                    left: px(-5),
                    bottom: px(-5),
                })
            }, {
                element: resizeTriangleLeftFrame,
                style: () => ({
                    top: px(-2 - this.stSize.WindowBorderSize),
                    right: px(-2 - this.stSize.WindowBorderSize),
                    fill: "#0000",
                    borderBottomLeftRadius: px(this.stSize.WindowRounding - this.stSize.WindowBorderSize),
                })
            }, { element: document.body, style: () => ({ cursor: "auto", }) }],
            hover: [{
                element: resizeTriangleLeftFrame, condition: () => (!this.collapse),
                style: () => ({
                    fill: rgbaString(this.stColor.ResizeGripHovered),
                })
            }, { element: document.body, condition: () => (!this.collapse), style: () => ({ cursor: (this.size.x === 32 && this.size.y === 32) ? "sw-resize" : "nesw-resize", }) }],
            active: [{ element: resizeTriangleLeftFrame, condition: () => (!this.collapse), style: () => ({ fill: rgbaString(this.stColor.ResizeGripActive), }) }]
        }, {
            mousedown: (e) => {
                if (this.collapse) startMovin(e); else startResizin(e, 1);
            },
        }, true);

        // top
        const resizeTop = createElement("div", base);
        resizeTop.className = "resizeLine";

        const resizeTopHitbox = createElement("div", resizeTop);
        resizeTopHitbox.className = "resizeLineHitbox";

        buttonMaker(resizeTopHitbox, {
            idle: [{
                element: resizeTop,
                style: () => ({
                    left: px(0),
                    right: px(1),
                    top: px(-1),
                    height: px(1),
                    borderBlock: "solid 1px #0000",
                    backgroundColor: "#0000"
                })
            }, {
                element: resizeTopHitbox,
                style: () => ({
                    top: px(-5),
                    left: px(this.stTextSize - 1),
                    right: px(this.stTextSize - 2),
                    height: px(8)
                })
            }, { element: document.body, style: () => ({ cursor: "auto", }) }],
            hover: [{
                element: resizeTop, condition: () => (!this.collapse),
                style: () => ({
                    backgroundColor: rgbaString(this.stColor.SeparatorHovered),
                    borderColor: rgbString(this.stColor.SeparatorHovered, (this.stColor.SeparatorHovered.a / 255) * 0.5)
                })
            }, { element: document.body, condition: () => (!this.collapse), style: () => ({ cursor: (this.size.y === 32) ? "n-resize" : "ns-resize" }) }],
            active: [{
                element: resizeTop, condition: () => (!this.collapse),
                style: () => ({
                    backgroundColor: rgbaString(this.stColor.SeparatorActive),
                    borderColor: rgbString(this.stColor.SeparatorActive, (this.stColor.SeparatorActive.a / 255) * 0.5),
                })
            }]
        }, {
            mousedown: (e) => {
                if (this.collapse) startMovin(e); else startResizin(e, 2);
            }
        }, true)

        // bottom
        const resizeBottom = createElement("div", base);
        resizeBottom.className = "resizeLine";

        const resizeBottomHitbox = createElement("div", resizeBottom);
        resizeBottomHitbox.className = "resizeLineHitbox";

        buttonMaker(resizeBottomHitbox, {
            idle: [{
                element: resizeBottom,
                style: () => ({
                    left: px(0),
                    right: px(1),
                    bottom: px(-1),
                    height: px(1),
                    borderBlock: "solid 1px #0000",
                    backgroundColor: "#0000"
                })
            }, {
                element: resizeBottomHitbox,
                style: () => ({
                    bottom: px(-5),
                    left: px(this.stTextSize - 1),
                    right: px(this.stTextSize - 2),
                    height: px(8)
                })
            }, { element: document.body, style: () => ({ cursor: "auto", }) }],
            hover: [{
                element: resizeBottom, condition: () => (!this.collapse),
                style: () => ({
                    backgroundColor: rgbaString(this.stColor.SeparatorHovered),
                    borderColor: rgbString(this.stColor.SeparatorHovered, (this.stColor.SeparatorHovered.a / 255) * 0.5)
                })
            }, { element: document.body, condition: () => (!this.collapse), style: () => ({ cursor: (this.size.y === 32) ? "s-resize" : "ns-resize" }) }],
            active: [{
                element: resizeBottom, condition: () => (!this.collapse),
                style: () => ({
                    backgroundColor: rgbaString(this.stColor.SeparatorActive),
                    borderColor: rgbString(this.stColor.SeparatorActive, (this.stColor.SeparatorActive.a / 255) * 0.5),
                })
            }]
        }, {
            mousedown: (e) => {
                if (this.collapse) startMovin(e); else startResizin(e, 3);
            }
        }, true)

        // left
        const resizeLeft = createElement("div", base);
        resizeLeft.className = "resizeLine";

        const resizeLeftHitbox = createElement("div", resizeLeft);
        resizeLeftHitbox.className = "resizeLineHitbox";

        buttonMaker(resizeLeftHitbox, {
            idle: [{
                element: resizeLeft,
                style: () => ({
                    left: px(-1),
                    top: px(1),
                    bottom: px(0),
                    width: px(1),
                    borderInline: "solid 1px #0000",
                    backgroundColor: "#0000"
                })
            }, {
                element: resizeLeftHitbox,
                style: () => ({
                    left: px(-5),
                    top: px(this.stTextSize - 1),
                    bottom: px(this.stTextSize - 2),
                    width: px(8)
                })
            }, { element: document.body, style: () => ({ cursor: "auto", }) }],
            hover: [{
                element: resizeLeft, condition: () => (!this.collapse),
                style: () => ({
                    backgroundColor: rgbaString(this.stColor.SeparatorHovered),
                    borderColor: rgbString(this.stColor.SeparatorHovered, (this.stColor.SeparatorHovered.a / 255) * 0.5)
                })
            }, { element: document.body, condition: () => (!this.collapse), style: () => ({ cursor: (this.size.x === 32) ? "w-resize" : "ew-resize" }) }],
            active: [{
                element: resizeLeft, condition: () => (!this.collapse),
                style: () => ({
                    backgroundColor: rgbaString(this.stColor.SeparatorActive),
                    borderColor: rgbString(this.stColor.SeparatorActive, (this.stColor.SeparatorActive.a / 255) * 0.5),
                })
            }]
        }, {
            mousedown: (e) => {
                if (this.collapse) startMovin(e); else startResizin(e, 4);
            }
        }, true)

        // right
        const resizeRight = createElement("div", base);
        resizeRight.className = "resizeLine";

        const resizeRightHitbox = createElement("div", resizeRight);
        resizeRightHitbox.className = "resizeLineHitbox";

        buttonMaker(resizeRightHitbox, {
            idle: [{
                element: resizeRight,
                style: () => ({
                    right: px(-1),
                    top: px(1),
                    bottom: px(0),
                    width: px(1),
                    borderInline: "solid 1px #0000",
                    backgroundColor: "#0000"
                })
            }, {
                element: resizeRightHitbox,
                style: () => ({
                    right: px(-5),
                    top: px(this.stTextSize - 1),
                    bottom: px(this.stTextSize - 2),
                    width: px(8)
                })
            }, { element: document.body, style: () => ({ cursor: "auto", }) }],
            hover: [{
                element: resizeRight, condition: () => (!this.collapse),
                style: () => ({
                    backgroundColor: rgbaString(this.stColor.SeparatorHovered),
                    borderColor: rgbString(this.stColor.SeparatorHovered, (this.stColor.SeparatorHovered.a / 255) * 0.5)
                })
            }, { element: document.body, condition: () => (!this.collapse), style: () => ({ cursor: (this.size.x === 32) ? "e-resize" : "ew-resize" }) }],
            active: [{
                element: resizeRight, condition: () => (!this.collapse),
                style: () => ({
                    backgroundColor: rgbaString(this.stColor.SeparatorActive),
                    borderColor: rgbString(this.stColor.SeparatorActive, (this.stColor.SeparatorActive.a / 255) * 0.5),
                })
            }]
        }, {
            mousedown: (e) => {
                if (this.collapse) startMovin(e); else startResizin(e, 5);
            }
        }, true)
        // #endregion

        // extra hitboxes to move the windows
        const leftMoveHitbox = createElement("div", base);
        leftMoveHitbox.className = "debugGuiWindow moveHitbox";

        leftMoveHitbox.style.height = px(this.stTextSize + 4);
        leftMoveHitbox.style.left = px(-5);
        leftMoveHitbox.style.top = px(-5);

        const rightMoveHitbox = createElement("div", base);
        rightMoveHitbox.className = "debugGuiWindow moveHitbox";

        rightMoveHitbox.style.height = px(this.stTextSize + 4);
        rightMoveHitbox.style.right = px(-5);
        rightMoveHitbox.style.top = px(-5);

        leftMoveHitbox.addEventListener("mousedown", (e) => {
            if (e.button === 0 && !moveTarget && e.target !== resizeBottomRight && e.target !== resizeBottomLeft
                && e.target !== resizeTopHitbox && e.target !== resizeBottomHitbox && e.target !== resizeLeftHitbox && e.target !== resizeRightHitbox
                && e.target !== closeBtnEl)
                startMovin(e);
        });

        rightMoveHitbox.addEventListener("mousedown", (e) => {
            if (e.button === 0 && !moveTarget && e.target !== resizeBottomRight && e.target !== resizeBottomLeft
                && e.target !== resizeTopHitbox && e.target !== resizeBottomHitbox && e.target !== resizeLeftHitbox && e.target !== resizeRightHitbox
                && e.target !== closeBtnEl)
                startMovin(e);
        });

        base.addEventListener("mousedown", (e) => {
            if (e.button === 0 && !moveTarget)
                if (e.target === collapseBtnEl)
                    startMovin(e, true);
                else if (e.target !== resizeBottomRight && e.target !== resizeBottomLeft
                    && e.target !== resizeTopHitbox && e.target !== resizeBottomHitbox && e.target !== resizeLeftHitbox && e.target !== resizeRightHitbox
                    && e.target !== closeBtnEl)
                    startMovin(e);
        });

        content.appendChild(titleBar);
        content.appendChild(innerFrame);
        base.appendChild(borderFrame);
        base.appendChild(content);
        DebugGuiFrame.appendChild(base);

        base.style.zIndex = windowCount;

        this.gui = base;
        this.gui_titlebar = titleBar;

        this.gui_resizeBottomRightBtn = resizeBottomRightBtn;
        this.gui_collapseTriangle = collapseTriangle;

        this.active = true;

        windowObjects.forEach((w) => {
            w.MakeInactive();
        });

        windowCount++;
        windowObjects.push(this);
    }
}

export default { DebugGui, DebugVec2 };