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

const rgbaString = (rgba) => `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a/255})`;
const px = (x) => x + "px";
const configStyle = (style, obj) => {
    for (const [name, val] of Object.entries(obj)) {
        style[name] = val;
    }
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
        }
    },

    size: {
        // Main
        WindowPadding: new DebugVec2(8, 8),
        FramePadding: new DebugVec2(4, 3),
        CellPadding: new DebugVec2(4, 2),
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
        TabBorderSize: 0,

        // Rounding
        WindowRounding: 0,
        ChildRounding: 0,
        FrameRounding: 0,
        PopupRounding: 0,
        ScrollbarRounding: 9,
        GrabRounding: 0,
        TabRounding: 4,

        // Widgets
        WindowTitleAlign: new DebugVec2(0, 0.5),
        WindowMenuButtonPosition: "Left",
        ColorButtonPosition: "Right",
        ButtonTextAlign: new DebugVec2(0.5, 0.5),
        SelectableTextAlign: new DebugVec2(0, 0),
        SeparatorTextBorderSize: 3,
        SeparatorTextAlign: new DebugVec2(0, 0.5),
        SeparatorTextPadding: new DebugVec2(20, 3),
        LogSliderDeadzone: 4,

        // Misc
        DisplaySafeAreaPadding: new DebugVec2(3, 3),
    },

    textSize: 23
}

const defaultConfig = {
    color: configPreset.colors.dark,
    size: configPreset.size,
    textSize: configPreset.textSize
}

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

let moveTarget = null;
let frameStartPosX, frameStartPosY;
let mouseStartPosX, mouseStartPosY;

DebugGuiFrame.addEventListener("mousemove", (e) => {
    if (moveTarget 
        && e.clientX >= 0 && e.clientX < window.innerWidth &&
            e.clientY >= 0 && e.clientY < window.innerHeight) {
        const deltaX = e.clientX - mouseStartPosX;
        const deltaY = e.clientY - mouseStartPosY;

        moveTarget.__position.x = frameStartPosX + deltaX;
        moveTarget.__position.y = frameStartPosY + deltaY;

        configStyle(moveTarget.gui.style, {
            left: px(moveTarget.__position.x),
            top: px(moveTarget.__position.y),
        });
    }
});

DebugGuiFrame.addEventListener("mousedown", (e) => {
    if (e.button === 0 && e.target === DebugGuiFrame) {
        windowObjects.forEach((w) => {
            w.MakeInactive();
        });
    }
})

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
    __position = new DebugVec2(60, 60);
    __size = new DebugVec2(200, 150);

    __stColor = defaultConfig.color;
    __stSize = defaultConfig.size;
    __stTextSize = defaultConfig.textSize;

    __options = windowOptions;

    active = false;
    collapse = false;

    constructor(name) {
        super();
    }

    SetPosition(vec2) {
        this.__position = vec2;
    }

    SetSize(vec2) {
        this.__size = vec2;
    }

    MakeActive() {
        if (this.gui && !this.active) {
            this.gui_titlebar.style.backgroundColor = rgbaString(this.__stColor.TitleBgActive);
            this.active = true;

            const initialOrder = Number(this.gui.style.zIndex);

            windowObjects.forEach((w) => {
                if (w !== this) w.MakeInactive();

                if (Number(w.gui.style.zIndex) > initialOrder) {
                    w.gui.style.zIndex = w.gui.style.zIndex - 1;
                }
            })

            this.gui.style.zIndex = windowCount;
        }
    }

    MakeInactive() {
        if (this.gui && this.active) {
            this.gui_titlebar.style.backgroundColor = rgbaString(this.__stColor.TitleBg);
            this.active = false;
        }
    }

    ToggleCollapse() {
        console.log(this.collapse)
        this.collapse = !this.collapse;

        if (this.collapse) {
            this.gui.style.height = this.gui_titlebar.style.height;
        } else {
            this.gui.style.height = px(this.__size.y);
        }
    }

    // show the window onto clients screen
    Show() {
        const base = document.createElement("div");
        base.className = "debugGuiWindow";

        //base.style.backgroundColor = rgbaString(this.__stColor.FrameBg);

        configStyle(base.style, {
            borderColor: rgbaString(this.__stColor.Border),
            borderWidth: px(this.__stSize.WindowBorderSize),

            left: px(this.__position.x),
            top: px(this.__position.y),
            width: px(this.__size.x),
            height: px(this.__size.y),

            borderRadius: px(this.__stSize.WindowRounding),
        })

        const titleBar = document.createElement("div");
        titleBar.className = "debugGuiWindow titleBar";

        titleBar.style.height = px(this.__stTextSize + this.__stSize.FramePadding.y);
        titleBar.style.backgroundColor = rgbaString(this.__stColor.TitleBgActive);

        const innerFrame = document.createElement("div");
        innerFrame.className = "debugGuiWindow innerFrame";

        innerFrame.style.top = px(this.__stTextSize + this.__stSize.FramePadding.y);
        innerFrame.style.backgroundColor = rgbaString(this.__stColor.WindowBg);

        base.addEventListener("mousedown", (e) => {
            if (e.button === 0 && !moveTarget) {
                this.MakeActive();
                moveTarget = this
                mouseStartPosX = e.clientX;
                mouseStartPosY = e.clientY;
                frameStartPosX = this.__position.x;
                frameStartPosY = this.__position.y;
            };
        });

        base.addEventListener("mouseup", () => {
            if (moveTarget) moveTarget = null;
        });

        titleBar.addEventListener("dblclick", (e) => {
            if (e.button === 0) {
                this.ToggleCollapse();
            }
        });
        
        base.appendChild(titleBar);
        base.appendChild(innerFrame);
        DebugGuiFrame.appendChild(base);

        base.style.zIndex = windowCount;
        
        this.gui = base;
        this.gui_titlebar = titleBar;
        this.active = true;

        windowObjects.forEach((w) => {
            w.MakeInactive();
        });

        windowCount++;
        windowObjects.push(this);
    }
}

export default { DebugGui, DebugVec2 };