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
const rgbString = (rgb,a) => `rgba(${rgb.r},${rgb.g},${rgb.b},${a})`;
const px = (x) => x + "px";
const configStyle = (style, obj) => {
    for (const [name, val] of Object.entries(obj)) {
        style[name] = val;
    }
}

let clickCount = 0, clickTarget, singleClickTimer;
const doubleClickEvent = (e,callback) => {
    e.addEventListener("click", (e) => {
        console.log("doubleClick")
        if (e.button === 0) {
            if (clickTarget !== e.target) { clearTimeout(singleClickTimer); clickCount = 0};
            clickTarget = e.target;

            clickCount++;
            if (clickCount === 1) {
                singleClickTimer = setTimeout(() => {
                    clickCount = 0;
                    console.log(clickCount)
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
let resizeTarget = null, resizeFlag;
let frameStartPosX, frameStartPosY;
let mouseStartPosX, mouseStartPosY;
let frameStartSizeX, frameStartSizeY;

DebugGuiFrame.addEventListener("mousemove", (e) => {
    if (moveTarget 
        && e.clientX >= 0 && e.clientX < window.innerWidth &&
            e.clientY >= 0 && e.clientY < window.innerHeight) {
        const deltaX = e.clientX - mouseStartPosX;
        const deltaY = e.clientY - mouseStartPosY;

        moveTarget.position.x = frameStartPosX + deltaX;
        moveTarget.position.y = frameStartPosY + deltaY;

        moveTarget.SetPosition(moveTarget.position);
    } else if (resizeTarget
        && e.clientX >= 0 && e.clientX < window.innerWidth &&
        e.clientY >= 0 && e.clientY < window.innerHeight) {
        const deltaX = e.clientX - mouseStartPosX;
        const deltaY = e.clientY - mouseStartPosY;

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

DebugGuiFrame.addEventListener("mouseup", (e) => {
    if (e.button === 0) {
        moveTarget = null; resizeTarget = null;
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

    constructor(name) {
        super();
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

            this.gui.style.zIndex = windowCount;
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
        console.log(this.collapse)
        this.collapse = !this.collapse;

        if (this.collapse) {
            this.gui_titlebar.style.backgroundColor = rgbaString(this.stColor.TitleBgCollapsed);
            this.gui.style.height = this.gui_titlebar.style.height;
        } else {
            this.gui_titlebar.style.backgroundColor = rgbaString(this.stColor.TitleBgActive);
            this.gui.style.height = px(this.size.y);
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

        borderFrame.style.borderColor = rgbaString(this.stColor.Border),
        borderFrame.style.borderWidth = px(this.stSize.WindowBorderSize),
        borderFrame.style.borderRadius = px(this.stSize.WindowRounding),

        // double click to toggle collapse
        console.log(this.ToggleCollapse)
        doubleClickEvent(titleBar, () => { this.ToggleCollapse() });

        base.addEventListener("mousedown", (e) => {
            if (e.button === 0 && !moveTarget && e.target !== resizeBottomRight && e.target !== resizeBottomLeft 
                && e.target !== resizeTopHitbox && e.target !== resizeBottomHitbox && e.target !== resizeLeftHitbox && e.target !== resizeRightHitbox) {
                console.log("mouseDown")
                this.MakeActive();
                moveTarget = this;
                mouseStartPosX = e.clientX;
                mouseStartPosY = e.clientY;
                frameStartPosX = this.position.x;
                frameStartPosY = this.position.y;
            };
        });

        // #region resize thingys

        // bottom right
        const resizeBottomRight = document.createElement("div");
        resizeBottomRight.className = "debugGuiWindow resizeBtn";
        resizeBottomRight.style.height = px(this.stTextSize + 4);
        resizeBottomRight.style.right = px(-5);
        resizeBottomRight.style.bottom = px(-5);
        //resizeBottomRight.style.cursor = "nwse-resize";

        const resizeTriangleRightFrame = document.createElement("div");
        resizeTriangleRightFrame.className = "debugGuiWindow resizeBtn triangle";
        resizeTriangleRightFrame.style.top = px(-2 - this.stSize.WindowBorderSize);
        resizeTriangleRightFrame.style.left = px(-2 - this.stSize.WindowBorderSize);
        resizeTriangleRightFrame.style.fill = rgbaString(this.stColor.ResizeGrip);

        const resizeTriangleRight = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        resizeTriangleRight.setAttribute("viewBox", "0 0 1 1");
        
        const rightTrianglePath = document.createElementNS('http://www.w3.org/2000/svg','polygon');
        rightTrianglePath.setAttribute("points", "0,1 1,1 1,0");

        resizeTriangleRight.appendChild(rightTrianglePath);
        resizeTriangleRightFrame.appendChild(resizeTriangleRight);
        resizeBottomRight.appendChild(resizeTriangleRightFrame);

        // bottom left
        const resizeBottomLeft = document.createElement("div");
        resizeBottomLeft.className = "debugGuiWindow resizeBtn";
        resizeBottomLeft.style.height = px(this.stTextSize + 4);
        resizeBottomLeft.style.left = px(-5);
        resizeBottomLeft.style.bottom = px(-5);
        //resizeBottomLeft.style.cursor = "nesw-resize";

        const resizeTriangleLeftFrame = document.createElement("div");
        resizeTriangleLeftFrame.className = "debugGuiWindow resizeBtn triangle";
        resizeTriangleLeftFrame.style.top = px(-2 - this.stSize.WindowBorderSize);
        resizeTriangleLeftFrame.style.right = px(-2 - this.stSize.WindowBorderSize);
        resizeTriangleLeftFrame.style.fill = "#0000";

        const resizeTriangleLeft = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        resizeTriangleLeft.setAttribute("viewBox", "0 0 1 1");

        const leftTrianglePath = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        leftTrianglePath.setAttribute("points", "0,1 1,1 0,0");

        resizeTriangleLeft.appendChild(leftTrianglePath);
        resizeTriangleLeftFrame.appendChild(resizeTriangleLeft);
        resizeBottomLeft.appendChild(resizeTriangleLeftFrame);

        // top
        const resizeTop = document.createElement("div");
        resizeTop.className = "resizeLine";
        resizeTop.style.left = px(0);
        resizeTop.style.right = px(1);
        resizeTop.style.top = px(-1);
        resizeTop.style.height = px(1);
        resizeTop.style.borderBlock = "solid 1px #0000"

        const resizeTopHitbox = document.createElement("div");
        resizeTopHitbox.className = "resizeLineHitbox";
        resizeTopHitbox.style.top = px(-5);
        resizeTopHitbox.style.left = px(this.stTextSize - 1);
        resizeTopHitbox.style.right = px(this.stTextSize - 2);
        resizeTopHitbox.style.height = px(8);
        //resizeTopHitbox.style.cursor = "ns-resize";

        resizeTop.appendChild(resizeTopHitbox);

        // bottom
        const resizeBottom = document.createElement("div");
        resizeBottom.className = "resizeLine";
        resizeBottom.style.left = px(0);
        resizeBottom.style.right = px(1);
        resizeBottom.style.bottom = px(-1);
        resizeBottom.style.height = px(1);
        resizeBottom.style.borderBlock = "solid 1px #0000"

        const resizeBottomHitbox = document.createElement("div");
        resizeBottomHitbox.className = "resizeLineHitbox";
        resizeBottomHitbox.style.bottom = px(-5);
        resizeBottomHitbox.style.left = px(this.stTextSize - 1);
        resizeBottomHitbox.style.right = px(this.stTextSize - 2);
        resizeBottomHitbox.style.height = px(8);
        //resizeBottomHitbox.style.cursor = "ns-resize";

        resizeBottom.appendChild(resizeBottomHitbox);

        // left
        const resizeLeft = document.createElement("div");
        resizeLeft.className = "resizeLine";
        resizeLeft.style.left = px(-1);
        resizeLeft.style.top = px(1);
        resizeLeft.style.bottom = px(0);
        resizeLeft.style.width = px(1);
        resizeLeft.style.borderInline = "solid 1px #0000"

        const resizeLeftHitbox = document.createElement("div");
        resizeLeftHitbox.className = "resizeLineHitbox";
        resizeLeftHitbox.style.left = px(-5);
        resizeLeftHitbox.style.top = px(this.stTextSize - 2);
        resizeLeftHitbox.style.bottom = px(this.stTextSize - 1);
        resizeLeftHitbox.style.width = px(8);
        //resizeLeftHitbox.style.cursor = "ew-resize";

        resizeLeft.appendChild(resizeLeftHitbox);

        // right
        const resizeRight = document.createElement("div");
        resizeRight.className = "resizeLine";
        resizeRight.style.right = px(-1);
        resizeRight.style.top = px(1);
        resizeRight.style.bottom = px(0);
        resizeRight.style.width = px(1);
        resizeRight.style.borderInline = "solid 1px #0000";

        const resizeRightHitbox = document.createElement("div");
        resizeRightHitbox.className = "resizeLineHitbox";
        resizeRightHitbox.style.right = px(-5);
        resizeRightHitbox.style.top = px(this.stTextSize - 2);
        resizeRightHitbox.style.bottom = px(this.stTextSize - 1);
        resizeRightHitbox.style.width = px(8);
        //resizeRightHitbox.style.cursor = "ew-resize";

        resizeRight.appendChild(resizeRightHitbox);

        // some functions

        const toggleResizeButtons = (state) => {
            if (state) {
                resizeRightHitbox.display = "none";
            }
        }

        // mouse events

        // bottom right
        resizeBottomRight.addEventListener("mouseenter", () => {
            if (!resizeTarget) {
                resizeTriangleRightFrame.style.fill = rgbaString(this.stColor.ResizeGripHovered);
                document.body.style.cursor = (this.size.x === 32 && this.size.y === 32) ? "se-resize" : "nwse-resize";
            }
        })
        resizeBottomRight.addEventListener("mouseleave", () => {
            if (!resizeTarget) {
                resizeTriangleRightFrame.style.fill = rgbaString(this.stColor.ResizeGrip);
                document.body.style.cursor = "auto";
            }
        })
        resizeBottomRight.addEventListener("mousedown", (e) => {
            if (e.button === 0 && !resizeTarget) {
                //resizeBottomRight.setAttribute("active", "1");
                resizeTriangleRightFrame.style.fill = rgbaString(this.stColor.ResizeGripActive);
                this.MakeActive();
                resizeTarget = this;
                resizeFlag = 0;
                mouseStartPosX = e.clientX;
                mouseStartPosY = e.clientY;
                frameStartPosX = this.position.x;
                frameStartPosY = this.position.y;
                frameStartSizeX = this.size.x;
                frameStartSizeY = this.size.y;
            };
        });

        // bottom left
        resizeBottomLeft.addEventListener("mouseenter", () => {
            if (!resizeTarget) {
                resizeTriangleLeftFrame.style.fill = rgbaString(this.stColor.ResizeGripHovered);
                document.body.style.cursor = (this.size.x === 32 && this.size.y === 32) ? "sw-resize" : "nesw-resize";
            }
        })
        resizeBottomLeft.addEventListener("mouseleave", () => {
            if (!resizeTarget) {
                resizeTriangleLeftFrame.style.fill = "#0000";
                document.body.style.cursor = "auto";
            }
        })
        resizeBottomLeft.addEventListener("mousedown", (e) => {
            if (e.button === 0 && !resizeTarget) {
                //resizeBottomLeft.setAttribute("active", "1");
                resizeTriangleLeftFrame.style.fill = rgbaString(this.stColor.ResizeGripActive);
                this.MakeActive();
                resizeTarget = this;
                resizeFlag = 1;
                mouseStartPosX = e.clientX;
                mouseStartPosY = e.clientY;
                frameStartPosX = this.position.x;
                frameStartPosY = this.position.y;
                frameStartSizeX = this.size.x;
                frameStartSizeY = this.size.y;
            };
        });

        // top
        resizeTopHitbox.addEventListener("mouseenter", () => {
            if (!resizeTarget) {
                resizeTop.style.backgroundColor = rgbaString(this.stColor.SeparatorHovered);
                resizeTop.style.borderColor = rgbString(this.stColor.SeparatorHovered, (this.stColor.SeparatorHovered.a / 255) * 0.5);
                document.body.style.cursor = (this.size.y === 32) ? "n-resize" : "ns-resize";
            }
        })
        resizeTopHitbox.addEventListener("mouseleave", () => {
            if (!resizeTarget) {
                resizeTop.style.backgroundColor = "#0000";
                resizeTop.style.borderColor = "#0000";
                document.body.style.cursor = "auto";
            }
        })
        resizeTopHitbox.addEventListener("mousedown", (e) => {
            if (e.button === 0 && !resizeTarget) {
                resizeTop.style.backgroundColor = rgbaString(this.stColor.SeparatorActive);
                resizeTop.style.borderColor = rgbString(this.stColor.SeparatorActive, (this.stColor.SeparatorActive.a / 255) * 0.5);
                this.MakeActive();
                resizeTarget = this;
                resizeFlag = 2;
                mouseStartPosX = e.clientX;
                mouseStartPosY = e.clientY;
                frameStartPosX = this.position.x;
                frameStartPosY = this.position.y;
                frameStartSizeX = this.size.x;
                frameStartSizeY = this.size.y;
            }
        })

        // bottom
        resizeBottomHitbox.addEventListener("mouseenter", () => {
            if (!resizeTarget) {
                resizeBottom.style.backgroundColor = rgbaString(this.stColor.SeparatorHovered);
                resizeBottom.style.borderColor = rgbString(this.stColor.SeparatorHovered, (this.stColor.SeparatorHovered.a / 255) * 0.5);
                document.body.style.cursor = (this.size.y === 32) ? "s-resize" : "ns-resize";
            }
        })
        resizeBottomHitbox.addEventListener("mouseleave", () => {
            if (!resizeTarget) {
                resizeBottom.style.backgroundColor = "#0000";
                resizeBottom.style.borderColor = "#0000";
                document.body.style.cursor = "auto";
            }
        })
        resizeBottomHitbox.addEventListener("mousedown", (e) => {
            if (e.button === 0 && !resizeTarget) {
                resizeBottom.style.backgroundColor = rgbaString(this.stColor.SeparatorActive);
                resizeBottom.style.borderColor = rgbString(this.stColor.SeparatorActive, (this.stColor.SeparatorActive.a / 255) * 0.5);
                this.MakeActive();
                resizeTarget = this;
                resizeFlag = 3;
                mouseStartPosX = e.clientX;
                mouseStartPosY = e.clientY;
                frameStartPosX = this.position.x;
                frameStartPosY = this.position.y;
                frameStartSizeX = this.size.x;
                frameStartSizeY = this.size.y;
            }
        })

        // left
        resizeLeftHitbox.addEventListener("mouseenter", () => {
            if (!resizeTarget) {
                resizeLeft.style.backgroundColor = rgbaString(this.stColor.SeparatorHovered);
                resizeLeft.style.borderColor = rgbString(this.stColor.SeparatorHovered, (this.stColor.SeparatorHovered.a / 255) * 0.5);
                document.body.style.cursor = (this.size.x === 32) ? "w-resize" : "ew-resize";
            }
        })
        resizeLeftHitbox.addEventListener("mouseleave", () => {
            if (!resizeTarget) {
                resizeLeft.style.backgroundColor = "#0000";
                resizeLeft.style.borderColor = "#0000";
                document.body.style.cursor = "auto";
            }
        })
        resizeLeftHitbox.addEventListener("mousedown", (e) => {
            if (e.button === 0 && !resizeTarget) {
                resizeLeft.style.backgroundColor = rgbaString(this.stColor.SeparatorActive);
                resizeLeft.style.borderColor = rgbString(this.stColor.SeparatorActive, (this.stColor.SeparatorActive.a / 255) * 0.5);
                this.MakeActive();
                resizeTarget = this;
                resizeFlag = 4;
                mouseStartPosX = e.clientX;
                mouseStartPosY = e.clientY;
                frameStartPosX = this.position.x;
                frameStartPosY = this.position.y;
                frameStartSizeX = this.size.x;
                frameStartSizeY = this.size.y;
            }
        })

        // right
        resizeRightHitbox.addEventListener("mouseenter", () => {
            if (!resizeTarget) {
                resizeRight.style.backgroundColor = rgbaString(this.stColor.SeparatorHovered);
                resizeRight.style.borderColor = rgbString(this.stColor.SeparatorHovered, (this.stColor.SeparatorHovered.a / 255) * 0.5);
                document.body.style.cursor = (this.size.x === 32) ? "e-resize" : "ew-resize";
            }
        })
        resizeRightHitbox.addEventListener("mouseleave", () => {
            if (!resizeTarget) {
                resizeRight.style.backgroundColor = "#0000";
                resizeRight.style.borderColor = "#0000";
                document.body.style.cursor = "auto";
            }
        })
        resizeRightHitbox.addEventListener("mousedown", (e) => {
            if (e.button === 0 && !resizeTarget) {
                resizeRight.style.backgroundColor = rgbaString(this.stColor.SeparatorActive);
                resizeRight.style.borderColor = rgbString(this.stColor.SeparatorActive, (this.stColor.SeparatorActive.a / 255) * 0.5);
                this.MakeActive();
                resizeTarget = this;
                resizeFlag = 5;
                mouseStartPosX = e.clientX;
                mouseStartPosY = e.clientY;
                frameStartPosX = this.position.x;
                frameStartPosY = this.position.y;
                frameStartSizeX = this.size.x;
                frameStartSizeY = this.size.y;
            }
        })

        // mouse exit
        DebugGuiFrame.addEventListener("mouseup", (e) => {
            /*resizeBottomRight.removeAttribute("active");
            resizeBottomLeft.removeAttribute("active");*/
            document.body.style.cursor = "auto";

            if (e.target === resizeBottomRight) {
                resizeTriangleRightFrame.style.fill = rgbaString(this.stColor.ResizeGripHovered);
            } else {
                resizeTriangleRightFrame.style.fill = rgbaString(this.stColor.ResizeGrip);
            }

            if (e.target === resizeBottomLeft) {
                resizeTriangleLeftFrame.style.fill = rgbaString(this.stColor.ResizeGripHovered);
            } else {
                resizeTriangleLeftFrame.style.fill = "#0000";
            }

            if (e.target === resizeTopHitbox) {
                resizeTop.style.backgroundColor = rgbaString(this.stColor.SeparatorHovered);
                resizeTop.style.borderColor = rgbString(this.stColor.SeparatorHovered, (this.stColor.SeparatorHovered.a / 255) * 0.5);
            } else {
                resizeTop.style.backgroundColor = "#0000";
                resizeTop.style.borderColor = "#0000";
            }

            if (e.target === resizeBottomHitbox) {
                resizeBottom.style.backgroundColor = rgbaString(this.stColor.SeparatorHovered);
                resizeBottom.style.borderColor = rgbString(this.stColor.SeparatorHovered, (this.stColor.SeparatorHovered.a / 255) * 0.5);
            } else {
                resizeBottom.style.backgroundColor = "#0000";
                resizeBottom.style.borderColor = "#0000";
            }

            if (e.target === resizeLeftHitbox) {
                resizeLeft.style.backgroundColor = rgbaString(this.stColor.SeparatorHovered);
                resizeLeft.style.borderColor = rgbString(this.stColor.SeparatorHovered, (this.stColor.SeparatorHovered.a / 255) * 0.5);
            } else {
                resizeLeft.style.backgroundColor = "#0000";
                resizeLeft.style.borderColor = "#0000";
            }

            if (e.target === resizeRightHitbox) {
                resizeRight.style.backgroundColor = rgbaString(this.stColor.SeparatorHovered);
                resizeRight.style.borderColor = rgbString(this.stColor.SeparatorHovered, (this.stColor.SeparatorHovered.a / 255) * 0.5);
            } else {
                resizeRight.style.backgroundColor = "#0000";
                resizeRight.style.borderColor = "#0000";
            }
        })

        // #endregion

        base.appendChild(resizeBottomLeft);
        base.appendChild(resizeBottomRight);
        base.appendChild(resizeTop);
        base.appendChild(resizeBottom);
        base.appendChild(resizeLeft);
        base.appendChild(resizeRight);

        content.appendChild(titleBar);
        content.appendChild(innerFrame);
        base.appendChild(borderFrame);
        base.appendChild(content);
        DebugGuiFrame.appendChild(base);

        base.style.zIndex = windowCount;
        
        this.gui = base;
        this.gui_titlebar = titleBar;
        this.gui_resize_up = resizeTopHitbox;
        this.gui_resize_down = resizeBottomHitbox;
        this.gui_resize_left = resizeLeftHitbox;
        this.gui_resize_right = resizeRightHitbox;
        this.gui_resize_down_left = resizeBottomLeft;
        this.gui_resize_down_right = resizeBottomRight;
        this.active = true;

        windowObjects.forEach((w) => {
            w.MakeInactive();
        });

        windowCount++;
        windowObjects.push(this);
    }
}

export default { DebugGui, DebugVec2 };