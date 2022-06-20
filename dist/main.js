var $cw6c3$swchelperslib_object_spreadjs = require("@swc/helpers/lib/_object_spread.js");
var $cw6c3$swchelperslib_object_spread_propsjs = require("@swc/helpers/lib/_object_spread_props.js");
var $cw6c3$reactjsxruntime = require("react/jsx-runtime");
var $cw6c3$react = require("react");
var $cw6c3$swchelperslib_sliced_to_arrayjs = require("@swc/helpers/lib/_sliced_to_array.js");
var $cw6c3$swchelperslib_object_without_propertiesjs = require("@swc/helpers/lib/_object_without_properties.js");
var $cw6c3$luxon = require("luxon");
var $cw6c3$swchelperslib_define_propertyjs = require("@swc/helpers/lib/_define_property.js");
var $cw6c3$swchelperslib_to_consumable_arrayjs = require("@swc/helpers/lib/_to_consumable_array.js");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", function () { return $3f7b2fe5d2c34f8f$export$2e2bcd8739ae039; });













// eslint-disable-next-line @typescript-eslint/no-empty-function
var $3886b97a1526edd3$var$emptyFunction = function() {};
var $3886b97a1526edd3$export$96e2a2f386b0b376 = function(props) {
    return {
        onEventDragFinish: props.onEventDragFinish || undefined,
        onEventClick: props.onEventClick || $3886b97a1526edd3$var$emptyFunction,
        onNewEventClick: props.onNewEventClick || $3886b97a1526edd3$var$emptyFunction,
        onDeleteClick: props.onDeleteEvent || $3886b97a1526edd3$var$emptyFunction
    };
};
var $3886b97a1526edd3$var$ConfigLayer = function(props) {
    var ref = (0, ($parcel$interopDefault($cw6c3$swchelperslib_sliced_to_arrayjs)))((0, $cw6c3$react.useContext)((0, $65553fbba1d6d65b$export$841858b892ce1f4c)), 2), store = ref[0], dispatch = ref[1];
    var setContext = function(type, payload) {
        dispatch({
            type: type,
            payload: payload
        });
    };
    var initFromProps = function() {
        var callbacks = $3886b97a1526edd3$export$96e2a2f386b0b376(props);
        setContext("callbacks", callbacks);
        setContext("isAsc", props.sortDirection === "ASC" ? true : false);
    };
    (0, $cw6c3$react.useEffect)(function() {
        initFromProps();
    }, []);
    (0, $cw6c3$react.useEffect)(function() {
        initFromProps();
    }, []);
    return props.children;
};
var $3886b97a1526edd3$export$2e2bcd8739ae039 = $3886b97a1526edd3$var$ConfigLayer;






var $bf7b38bce41ca3dd$export$190d6a2573aa8371 = function(start, finish) {
    var scaleCoeff = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    var monthResult = [];
    var offset = 0;
    for(var i = start; i <= finish; i++){
        var resultDate = (0, $cw6c3$luxon.DateTime).local().plus({
            months: i
        });
        var monthHeight = resultDate.daysInMonth * scaleCoeff;
        monthResult.push({
            label: "".concat(resultDate.year, " ").concat(resultDate.monthShort),
            offset: offset,
            monthHeight: monthHeight
        });
        offset += monthHeight;
    }
    return monthResult;
};


var $e7acfb653c6fbfca$export$c08559766941f856 = function(start, finish, scaleCoeff) {
    var verticalMonths = (0, $bf7b38bce41ca3dd$export$190d6a2573aa8371)(start, finish, scaleCoeff);
    if (!verticalMonths.length) return 0;
    return verticalMonths[verticalMonths.length - 1].offset + verticalMonths[verticalMonths.length - 1].monthHeight;
};
var $e7acfb653c6fbfca$var$Reducer = function(state, action) {
    switch(action.type){
        case "finishStep":
            var nextFinishStep = state.finishStep + action.payload;
            return (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, state), {
                finishStep: nextFinishStep,
                height: $e7acfb653c6fbfca$export$c08559766941f856(state.startStep, nextFinishStep, state.scaleCoeff)
            });
        case "startStep":
            var nextStartStep = state.startStep + action.payload;
            return (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, state), {
                startStep: nextStartStep,
                height: $e7acfb653c6fbfca$export$c08559766941f856(nextStartStep, state.finishStep, state.scaleCoeff)
            });
        case "scaleCoeff":
            //const oldCoeff = state.scaleCoeff;
            var scaleCoeff = action.payload > 0 ? state.scaleCoeff / 2 : state.scaleCoeff * 2;
            //const coeffChange = oldCoeff / scaleCoeff;
            //const startStep = Math.ceil(state.startStep * coeffChange);
            //const finishStep = Math.ceil(state.finishStep * coeffChange);
            return (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, state), {
                scaleCoeff: scaleCoeff,
                height: $e7acfb653c6fbfca$export$c08559766941f856(state.startStep, state.finishStep, scaleCoeff)
            });
        case "style":
            return (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, state), {
                style: action.payload
            });
        case "events":
            return (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, state), {
                events: action.payload
            });
        case "width":
            return (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, state), {
                width: action.payload
            });
        case "height":
            return (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, state), {
                height: action.payload
            });
        case "callbacks":
            return (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, state), {
                callbacks: action.payload
            });
        case "isAsc":
            return (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, state), {
                isAsc: action.payload != null ? action.payload : !state.isAsc
            });
        default:
            return state;
    }
};
var $e7acfb653c6fbfca$export$2e2bcd8739ae039 = $e7acfb653c6fbfca$var$Reducer;




var $65553fbba1d6d65b$export$841858b892ce1f4c = /*#__PURE__*/ (0, $cw6c3$react.createContext)({});
var $65553fbba1d6d65b$var$START_MONTH = -24;
var $65553fbba1d6d65b$var$END_MONTH = 0;
var $65553fbba1d6d65b$var$SCALE_COEFF = 1;
var $65553fbba1d6d65b$var$StoreProvider = function(_param) {
    var children = _param.children, props = (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_without_propertiesjs)))(_param, [
        "children"
    ]);
    var initialContext = {
        startStep: $65553fbba1d6d65b$var$START_MONTH,
        finishStep: $65553fbba1d6d65b$var$END_MONTH,
        scaleCoeff: $65553fbba1d6d65b$var$SCALE_COEFF,
        width: 0,
        height: (0, $e7acfb653c6fbfca$export$c08559766941f856)($65553fbba1d6d65b$var$START_MONTH, $65553fbba1d6d65b$var$END_MONTH, $65553fbba1d6d65b$var$SCALE_COEFF),
        callbacks: (0, $3886b97a1526edd3$export$96e2a2f386b0b376)({}),
        isAsc: true,
        style: {
            primaryColor: "#ec407a",
            baseColor: "#424242FF",
            inverseBaseColor: "#E5E5E5FF"
        }
    };
    var ref = (0, ($parcel$interopDefault($cw6c3$swchelperslib_sliced_to_arrayjs)))((0, $cw6c3$react.useReducer)((0, $e7acfb653c6fbfca$export$2e2bcd8739ae039), initialContext), 2), store = ref[0], dispatch = ref[1];
    return /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)($65553fbba1d6d65b$export$841858b892ce1f4c.Provider, {
        value: [
            store,
            dispatch
        ],
        children: children
    });
};
var $65553fbba1d6d65b$export$2e2bcd8739ae039 = $65553fbba1d6d65b$var$StoreProvider;



var $88a08af890f49243$export$eae15a231de23f4a = 25;
var $88a08af890f49243$export$447c5938f45c45a5 = 90;












var $49057570f1744f71$var$renderHours = function(width, startStep, finishStep, scaleCoeff, isAsc) {
    var verticalHours = (0, $bf7b38bce41ca3dd$export$190d6a2573aa8371)(startStep, finishStep, scaleCoeff);
    var yearOffsets = verticalHours.reduce(function(res, item) {
        var ref = (0, ($parcel$interopDefault($cw6c3$swchelperslib_sliced_to_arrayjs)))(item.label.split(" "), 1), key = ref[0];
        return (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, res), (0, ($parcel$interopDefault($cw6c3$swchelperslib_define_propertyjs)))({}, key, item.offset));
    }, {});
    var yearOffsetsEntries = Object.entries(yearOffsets);
    var yearHeights = yearOffsetsEntries.reduce(function(res, param, index) {
        var _param = (0, ($parcel$interopDefault($cw6c3$swchelperslib_sliced_to_arrayjs)))(param, 2), year = _param[0], offset = _param[1];
        var _obj;
        var style = (_obj = {}, (0, ($parcel$interopDefault($cw6c3$swchelperslib_define_propertyjs)))(_obj, isAsc ? "top" : "bottom", index === 0 ? isAsc ? 0 : offset : yearOffsetsEntries[index - 1][1]), (0, ($parcel$interopDefault($cw6c3$swchelperslib_define_propertyjs)))(_obj, "height", index === 0 ? offset : offset - yearOffsetsEntries[index - 1][1]), (0, ($parcel$interopDefault($cw6c3$swchelperslib_define_propertyjs)))(_obj, "left", 0), (0, ($parcel$interopDefault($cw6c3$swchelperslib_define_propertyjs)))(_obj, "display", "flex"), (0, ($parcel$interopDefault($cw6c3$swchelperslib_define_propertyjs)))(_obj, "alignItems", "center"), _obj);
        return (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, res), (0, ($parcel$interopDefault($cw6c3$swchelperslib_define_propertyjs)))({}, year, {
            style: style
        }));
    }, {});
    var years = Object.entries(yearHeights).map(function(param, index) {
        var _param = (0, ($parcel$interopDefault($cw6c3$swchelperslib_sliced_to_arrayjs)))(param, 2), year = _param[0], item = _param[1];
        return /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("div", {
            style: item.style,
            className: "Kalend__text Kalend__calendarBodyMonths__text",
            children: year
        });
    });
    var months = verticalHours.map(function(param) {
        var label = param.label, offset = param.offset, monthHeight = param.monthHeight;
        var _obj, _obj1, _obj2;
        return /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsxs)("div", {
            className: "Kalend__calendarBodyMonths__container",
            style: (_obj = {
                minHeight: monthHeight
            }, (0, ($parcel$interopDefault($cw6c3$swchelperslib_define_propertyjs)))(_obj, isAsc ? "top" : "bottom", offset), (0, ($parcel$interopDefault($cw6c3$swchelperslib_define_propertyjs)))(_obj, "position", "absolute"), _obj),
            children: [
                /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("p", {
                    className: "Kalend__text Kalend__calendarBodyMonths__text",
                    style: (_obj1 = {}, (0, ($parcel$interopDefault($cw6c3$swchelperslib_define_propertyjs)))(_obj1, isAsc ? "top" : "bottom", -4), (0, ($parcel$interopDefault($cw6c3$swchelperslib_define_propertyjs)))(_obj1, "left", 30), _obj1),
                    children: scaleCoeff >= 0.25 && label.split(" ")[1]
                }),
                /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("div", {
                    className: "Kalend__text Kalend__calendarBodyMonths__line",
                    style: (_obj2 = {}, (0, ($parcel$interopDefault($cw6c3$swchelperslib_define_propertyjs)))(_obj2, isAsc ? "top" : "bottom", 0), (0, ($parcel$interopDefault($cw6c3$swchelperslib_define_propertyjs)))(_obj2, "width", width - (0, $88a08af890f49243$export$447c5938f45c45a5)), _obj2)
                })
            ]
        }, label);
    });
    return /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsxs)((0, $cw6c3$reactjsxruntime.Fragment), {
        children: [
            years,
            months
        ]
    });
};
var $49057570f1744f71$var$CalendarBodyMonths = function() {
    var ref = (0, ($parcel$interopDefault($cw6c3$swchelperslib_sliced_to_arrayjs)))((0, $cw6c3$react.useContext)((0, $65553fbba1d6d65b$export$841858b892ce1f4c)), 1), store = ref[0];
    var width = store.width, startStep = store.startStep, finishStep = store.finishStep, height = store.height, scaleCoeff = store.scaleCoeff, isAsc = store.isAsc;
    var hours = $49057570f1744f71$var$renderHours(width, startStep, finishStep, scaleCoeff, isAsc);
    return /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("div", {
        className: "Kalend__calendarBodyMonths__wrapper",
        style: {
            height: height,
            width: 90
        },
        children: hours
    });
};
var $49057570f1744f71$export$2e2bcd8739ae039 = $49057570f1744f71$var$CalendarBodyMonths;






var $79dca703cc699b4f$export$2b35b885b699e674 = {
    dragging: false,
    initialTop: 0,
    initialLeft: 0,
    offsetTop: null,
    offsetLeft: null,
    eventHasChanged: false,
    width: null,
    height: null,
    zIndex: 2,
    border: "",
    isDragging: false,
    endAt: undefined
};
var $79dca703cc699b4f$export$6da1c85d7de31b61 = function(e) {
    var ref, ref1;
    var touches = (ref = e.nativeEvent) === null || ref === void 0 ? void 0 : (ref1 = ref.touches) === null || ref1 === void 0 ? void 0 : ref1[0];
    return !!touches;
};











var $eaa81b90f81362ff$export$8c6a352b48fd8d92 = function(e, draggingRef, eventWasChangedRef, offsetTopRef, setState) {
    var ref, ref1;
    if (!draggingRef.current) return;
    // Get column element for day, where event is placed
    var drawPanelElement = document.getElementById("Kalend__draw-panel");
    if (!drawPanelElement) return;
    var drawPanelElementRect = drawPanelElement.getBoundingClientRect();
    var touches = (ref = e.nativeEvent) === null || ref === void 0 ? void 0 : (ref1 = ref.touches) === null || ref1 === void 0 ? void 0 : ref1[0];
    // set basic coordinates from movement
    var y;
    // handle touch movement
    if (touches) y = touches.clientY - drawPanelElementRect.top;
    else // handle mouse movement
    // calculate x and y coordinates while following mouse move
    y = e.clientY - drawPanelElementRect.top;
    // restrict draggable space for timetable
    if (y < 0) return;
    eventWasChangedRef.current = true;
    setState("offsetTop", y);
    offsetTopRef.current = y;
};
var $eaa81b90f81362ff$export$a8520376571bd6a0 = function(e, endAtRef, offsetTop, startStep, setState) {
    var ref, ref2;
    // Get column element for day, where event is placed
    var drawPanelElement = document.getElementById("Kalend__draw-panel");
    if (!drawPanelElement) return;
    var drawPanelElementRect = drawPanelElement.getBoundingClientRect();
    var touches = (ref = e.nativeEvent) === null || ref === void 0 ? void 0 : (ref2 = ref.touches) === null || ref2 === void 0 ? void 0 : ref2[0];
    // set basic coordinates from movement
    var y;
    // handle touch movement
    if (touches) y = touches.clientY - drawPanelElementRect.top;
    else // handle mouse movement
    y = e.clientY - drawPanelElementRect.top;
    // restrict draggable space for timetable
    if (y <= 0) return;
    setState("height", Math.round(y - offsetTop));
    endAtRef.current = y;
};






var $f7dc25aaa4235907$var$ButtonBase = function(props) {
    var id = props.id, onClick = props.onClick, className = props.className, style = props.style, children = props.children, onMouseDown = props.onMouseDown, onMouseUp = props.onMouseUp;
    var buttonRef = (0, $cw6c3$react.useRef)(null);
    var onButtonClick = function(e) {
        if (onClick) onClick(e);
    };
    var buttonClassName = "Kalend__button ".concat(className, " Kalend__ButtonBase");
    return /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("button", {
        id: id,
        ref: buttonRef,
        onClick: onButtonClick,
        onMouseDown: onMouseDown,
        onMouseUp: onMouseUp,
        className: buttonClassName,
        style: style,
        children: children
    });
};
var $f7dc25aaa4235907$export$2e2bcd8739ae039 = $f7dc25aaa4235907$var$ButtonBase;




var $8304c40ecd0ca62c$var$EventSummary = function(props) {
    var summary = props.summary;
    return /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("p", {
        className: "Kalend__text Kalend__Event__summary Kalend__text-light",
        dangerouslySetInnerHTML: {
            __html: summary || ""
        }
    });
};
var $8304c40ecd0ca62c$export$2e2bcd8739ae039 = $8304c40ecd0ca62c$var$EventSummary;



var $05400c9842705755$var$EventNormal = function(props) {
    var event = props.event;
    return /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            maxWidth: "-webkit-fill-available"
        },
        children: /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)((0, $8304c40ecd0ca62c$export$2e2bcd8739ae039), {
            summary: event.summary
        })
    });
};
var $05400c9842705755$export$2e2bcd8739ae039 = $05400c9842705755$var$EventNormal;





var $66c3795c5fc7507d$var$StateReducer = function(state, action) {
    // Replace whole state
    if (!action.payload) return (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, state, action);
    var _payload = action.payload, stateName = _payload.stateName, type = _payload.type, data = _payload.data;
    type;
    return (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, state), (0, ($parcel$interopDefault($cw6c3$swchelperslib_define_propertyjs)))({}, stateName, data));
};
var $66c3795c5fc7507d$export$2e2bcd8739ae039 = $66c3795c5fc7507d$var$StateReducer;






var $f35790b60c4d4b59$var$findIntersectedTop = function(sizes, offsetTop, i) {
    return sizes.filter(function(size, index) {
        return index < i && size.offsetTop <= offsetTop && size.offsetTop + size.height > offsetTop;
    }).sort(function(a, b) {
        return a.offsetTop - b.offsetTop;
    });
};
var $f35790b60c4d4b59$var$findNonIntersectedOnPreviousLine = function(sizes, offsetTop, previous) {
    var onPrevousLine = sizes.filter(function(size) {
        return size.offsetTop + size.height <= offsetTop;
    }).sort(function(a, b) {
        return parseInt(a.offsetLeft) - parseInt(b.offsetLeft);
    });
    return previous.offsetTop + previous.height < offsetTop ? (0, ($parcel$interopDefault($cw6c3$swchelperslib_to_consumable_arrayjs)))(onPrevousLine).concat([
        previous
    ]) : onPrevousLine;
};
var $f35790b60c4d4b59$var$getLeftAndHeight = function(sizesWithTop) {
    var sizes = (0, ($parcel$interopDefault($cw6c3$swchelperslib_to_consumable_arrayjs)))(sizesWithTop).sort(function(a, b) {
        return a.offsetTop - b.offsetTop;
    });
    sizes.forEach(function(size1, i1) {
        var intersectedWithYou = $f35790b60c4d4b59$var$findIntersectedTop(sizes, size1.offsetTop, i1);
        if (!i1 || !intersectedWithYou.length) return;
        else {
            if (intersectedWithYou && intersectedWithYou[intersectedWithYou.length - 1].width === "100%") {
                var newLength = 100 / (intersectedWithYou.length + 1);
                var sizesToReplace = intersectedWithYou.map(function(item, i) {
                    return (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, item), {
                        width: "".concat(newLength, "%"),
                        offsetLeft: "".concat(i * newLength, "%")
                    });
                });
                sizesToReplace = (0, ($parcel$interopDefault($cw6c3$swchelperslib_to_consumable_arrayjs)))(sizesToReplace).concat([
                    (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, size1), {
                        offsetLeft: "".concat(intersectedWithYou.length * newLength, "%"),
                        width: "".concat(newLength, "%")
                    })
                ]);
                sizes = sizes.map(function(size) {
                    var replacedSize = sizesToReplace.find(function(sizeToReplace) {
                        return sizeToReplace.id === size.id;
                    });
                    return replacedSize || size;
                });
            } else if (intersectedWithYou && intersectedWithYou[intersectedWithYou.length - 1].width !== "100%") {
                var intersectedWithPrevious = $f35790b60c4d4b59$var$findIntersectedTop(sizes, sizes[i1 - 1].offsetTop, i1);
                var nonIntersectedOnPreviousLine = $f35790b60c4d4b59$var$findNonIntersectedOnPreviousLine(intersectedWithPrevious, size1.offsetTop, sizes[i1 - 1]);
                if (nonIntersectedOnPreviousLine === null || nonIntersectedOnPreviousLine === void 0 ? void 0 : nonIntersectedOnPreviousLine.length) sizes[i1] = (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, sizes[i1]), {
                    offsetLeft: nonIntersectedOnPreviousLine[0].offsetLeft,
                    width: nonIntersectedOnPreviousLine[0].width
                });
                else {
                    var fullIntersected = (0, ($parcel$interopDefault($cw6c3$swchelperslib_to_consumable_arrayjs)))(intersectedWithYou);
                    var intersected = (0, ($parcel$interopDefault($cw6c3$swchelperslib_to_consumable_arrayjs)))(intersectedWithYou);
                    while(intersected && intersected.length){
                        var inter = intersected.map(function(param) {
                            var offsetTop = param.offsetTop, id = param.id;
                            return $f35790b60c4d4b59$var$findIntersectedTop(sizes, offsetTop, i1);
                        }).flat();
                        var exIds = fullIntersected.map(function(param) {
                            var id = param.id;
                            return id;
                        });
                        intersected = inter.filter(function(param) {
                            var id = param.id;
                            return !exIds.includes(id);
                        });
                        fullIntersected = fullIntersected.concat(intersected);
                    }
                    var newSizes = fullIntersected.map(function(item) {
                        var oldWidth = item.width;
                        var newWidth = Math.floor(100 / (Math.floor(100 / parseInt(oldWidth)) + 1));
                        var oldPos = parseInt(item.offsetLeft) / parseInt(oldWidth);
                        var newLeft = oldPos * newWidth;
                        return (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, item), {
                            offsetLeft: "".concat(newLeft, "%"),
                            width: "".concat(newWidth, "%")
                        });
                    });
                    var stylesForMe = newSizes.reduce(function(res, curr) {
                        if (parseInt(curr.offsetLeft) >= ((res === null || res === void 0 ? void 0 : res.offsetLeft) ? parseInt(res.offsetLeft) : 0)) res = {
                            offsetLeft: "".concat(parseInt(curr.offsetLeft) + parseInt(curr.width), "%"),
                            width: curr.width
                        };
                        return res;
                    }, {});
                    newSizes = (0, ($parcel$interopDefault($cw6c3$swchelperslib_to_consumable_arrayjs)))(newSizes).concat([
                        (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, size1, stylesForMe)
                    ]);
                    sizes = sizes.map(function(size) {
                        var replacedSize = newSizes.find(function(item) {
                            return item.id === size.id;
                        });
                        return replacedSize || size;
                    });
                }
            }
        }
    });
    return sizes;
};
var $f35790b60c4d4b59$export$5ea939eddc3fd41c = function(components, start) {
    var scaleCoeff = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, isAsc = arguments.length > 3 ? arguments[3] : void 0, height = arguments.length > 4 ? arguments[4] : void 0;
    var sizesWithTop = components.map(function(param) {
        var startDate = param.startAt, endDate = param.endAt, summary = param.summary, id = param.id;
        var dayZeros = {
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        };
        var calendarStart = (0, $cw6c3$luxon.DateTime).local().plus({
            month: start
        }).startOf("month").set(dayZeros);
        var startAt = startDate ? (0, $cw6c3$luxon.DateTime).fromISO(startDate).startOf("month").set(dayZeros) : calendarStart;
        var endAt = endDate ? (0, $cw6c3$luxon.DateTime).fromISO(endDate).endOf("month").set(dayZeros) : calendarStart.endOf("month").set(dayZeros);
        var offset = Math.round(startAt.diff(calendarStart, "day").days * scaleCoeff);
        var eventHeight = Math.round(endAt.diff(startAt, "day").days * scaleCoeff);
        return {
            offsetTop: isAsc ? offset + 1 : height - offset - eventHeight - 1,
            height: eventHeight,
            offsetLeft: "0",
            width: "100%",
            endAt: endAt,
            startAt: startAt,
            summary: "".concat(startAt.year, ": ").concat(startAt.monthShort, " - ").concat(endAt.year, ": ").concat(endAt.monthShort, "  ").concat(summary),
            id: id
        };
    });
    return $f35790b60c4d4b59$var$getLeftAndHeight(sizesWithTop);
};
var $f35790b60c4d4b59$export$4f0cc7427b5c4255 = function(value, store) {
    var day = (0, $cw6c3$luxon.DateTime).local().plus({
        month: store.startStep
    }).startOf("month");
    var delta = store.isAsc ? value : store.height / store.scaleCoeff - value;
    console.log(day.toISO(), delta, day.plus({
        day: delta
    }).toISO());
    return day.plus({
        day: delta
    }).set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    });
};


// ref to cancel timout
var $b852c5f3008abacb$var$timeoutRef;
var $b852c5f3008abacb$var$EventButton = function(props) {
    var item = props.item;
    //const event = item;
    var ref = (0, ($parcel$interopDefault($cw6c3$swchelperslib_sliced_to_arrayjs)))((0, $cw6c3$react.useReducer)((0, $66c3795c5fc7507d$export$2e2bcd8739ae039), (0, $79dca703cc699b4f$export$2b35b885b699e674)), 2), state = ref[0], dispatchState = ref[1];
    var setState = function(stateName, data) {
        var payload = {
            stateName: stateName,
            data: data
        };
        dispatchState({
            state: state,
            payload: payload
        });
    };
    // store values as refs to access them in event listener
    var offsetTopRef = (0, $cw6c3$react.useRef)(state.offsetTop);
    var draggingRef = (0, $cw6c3$react.useRef)(false);
    var isResizing = (0, $cw6c3$react.useRef)(false);
    var eventWasChangedRef = (0, $cw6c3$react.useRef)(false);
    var endAtRef = (0, $cw6c3$react.useRef)(null);
    var ref1 = (0, ($parcel$interopDefault($cw6c3$swchelperslib_sliced_to_arrayjs)))((0, $cw6c3$react.useContext)((0, $65553fbba1d6d65b$export$841858b892ce1f4c)), 1), store = ref1[0];
    var width = store.width, callbacks = store.callbacks;
    var onEventClick = callbacks.onEventClick, onEventDragFinish = callbacks.onEventDragFinish, onDeleteClick = callbacks.onDeleteClick;
    var columnWidth = width;
    var style = {
        position: "absolute",
        height: state.height !== null ? state.height : item.height,
        width: state.width !== null ? state.width : item.width || "100%",
        top: state.offsetTop !== null ? state.offsetTop : item.offsetTop,
        left: state.offsetLeft !== null ? state.offsetLeft : item.offsetLeft,
        zIndex: state.zIndex || item.zIndex,
        border: "solid 1px #1d1f26",
        // border: state.zIndex > 2 ? `solid 1px white` : `solid 1px ${eventColor}`,
        backgroundColor: "indigo",
        visibility: "visible",
        color: "white"
    };
    var handleEventClick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        if (draggingRef.current) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            draggingRef.current = false;
            return;
        }
        if (onEventClick) onEventClick(item, e);
    };
    var setLayout = function(layout) {
        setState("initialTop", layout.offsetTop);
        setState("initialLeft", layout.offsetLeft);
        setState("offsetTop", layout.offsetTop);
        setState("offsetLeft", layout.offsetLeft);
        setState("startAt", layout.startAt);
        setState("width", layout.width);
        setState("height", layout.height);
    };
    (0, $cw6c3$react.useEffect)(function() {
        setLayout(item);
    }, [
        item
    ]);
    var initMove = function() {
        if (!draggingRef.current) draggingRef.current = true;
        setState("width", "100%");
        setState("offsetLeft", 0);
    };
    var onResize = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if ((0, $79dca703cc699b4f$export$6da1c85d7de31b61)(e)) return;
        isResizing.current = true;
        (0, $eaa81b90f81362ff$export$a8520376571bd6a0)(e, endAtRef, state.offsetTop, store.startStep, setState);
    };
    var onMove = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if ((0, $79dca703cc699b4f$export$6da1c85d7de31b61)(e)) return;
        (0, $eaa81b90f81362ff$export$8c6a352b48fd8d92)(e, draggingRef, eventWasChangedRef, offsetTopRef, setState);
    };
    var onMouseUpResize = function(e) {
        // clean listeners
        document.removeEventListener("mouseup", onMouseUpResize, true);
        document.removeEventListener("mousemove", onResize, true);
        // add data to callback
        if (onEventDragFinish) {
            var nextEndAt = endAtRef.current ? (0, $f35790b60c4d4b59$export$4f0cc7427b5c4255)(endAtRef.current / store.scaleCoeff, store) : null;
            var changes = store.isAsc ? {
                startAt: item.startAt.startOf("month").toISO(),
                endAt: nextEndAt.endOf("month").toISO() || item.endAt.endOf("month").toISO()
            } : {
                startAt: nextEndAt.startOf("month").toISO() || item.startAt().startOf("month").toISO(),
                endAt: item.endAt.startOf("month").toISO()
            };
            var updatedEvent = (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, item, changes);
            onEventDragFinish(updatedEvent);
        }
        endAtRef.current = null;
        isResizing.current = false;
        e.preventDefault();
        e.stopPropagation();
    };
    /**
   * Cancel dragging event
   * remove listeners clean long click timeout and reset state
   * @param e
   */ var onMouseUp = function(e) {
        // clean listeners
        document.removeEventListener("mouseup", onMouseUp, true);
        document.removeEventListener("mousemove", onMove, true);
        // clear timeout
        clearTimeout($b852c5f3008abacb$var$timeoutRef);
        if (!eventWasChangedRef.current) {
            setState("offsetLeft", state.offsetLeft);
            setState("width", state.width);
            setState("isDragging", false);
            draggingRef.current = false;
            return;
        }
        eventWasChangedRef.current = false;
        if (!draggingRef.current) return;
        setTimeout(function() {
            draggingRef.current = false;
            setState("isDragging", false);
        }, 100);
        // add data to callback
        if (onEventDragFinish) {
            var newEvent = null;
            var offsetY = store.isAsc ? offsetTopRef.current : store.height - offsetTopRef.current;
            var elOffset = store.isAsc ? item.offsetTop : store.height - item.offsetTop;
            var dayDelta = (offsetY - elOffset) / store.scaleCoeff;
            console.log(dayDelta, offsetY, item.offsetTop);
            var newStartAt = item.startAt.plus({
                day: dayDelta
            }).startOf("month");
            var monthDelta = newStartAt.diff(item.startAt, [
                "month"
            ]).months;
            var newEndAt = item.endAt.plus({
                month: monthDelta
            }).endOf("month");
            newEvent = (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, item), {
                startAt: newStartAt.toISO(),
                endAt: newEndAt.toISO()
            });
            if (newEvent) onEventDragFinish(newEvent);
        }
        e.preventDefault();
        e.stopPropagation();
    };
    var onMouseDownResize = function(e) {
        if ((0, $79dca703cc699b4f$export$6da1c85d7de31b61)(e) || !onEventDragFinish) return;
        e.preventDefault();
        e.stopPropagation();
        isResizing.current = true;
        if (e.button !== 0) return;
        document.addEventListener("mousemove", onResize, true);
        document.addEventListener("mouseup", onMouseUpResize, true);
    };
    var onMouseDownLong = function(e) {
        if ((0, $79dca703cc699b4f$export$6da1c85d7de31b61)(e)) return;
        setState("isDragging", true);
        draggingRef.current = true;
        e.preventDefault();
        e.stopPropagation();
        if (e.button !== 0) return;
        document.addEventListener("mousemove", onMove, true);
        document.addEventListener("mouseup", onMouseUp, true);
        // set temp state while dragging
        initMove();
    };
    /**
   * Initial long press click/touch on event
   * @param e
   */ var onMouseDown = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isResizing.current) return;
        // add timeout to differentiate from normal clicks
        $b852c5f3008abacb$var$timeoutRef = setTimeout(function() {
            onMouseDownLong(e);
        }, 120);
    };
    return /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsxs)((0, $f7dc25aaa4235907$export$2e2bcd8739ae039), {
        id: item.id,
        style: style,
        className: "Kalend__Event-normal ".concat(state.isDragging ? "Kalend__EventButton__elevation" : ""),
        onClick: handleEventClick,
        onMouseDown: onMouseDown,
        onMouseUp: onMouseUp,
        children: [
            /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("button", {
                onClick: function(e) {
                    e.stopPropagation();
                    if (onDeleteClick) onDeleteClick(item.id);
                },
                children: "\xd7"
            }),
            /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)((0, $05400c9842705755$export$2e2bcd8739ae039), {
                event: item
            }),
            isResizing.current ? /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("div", {
                className: "Kalend__EventButton__resizing_wrapper",
                onClick: function() {
                    isResizing.current = false;
                }
            }) : null,
            /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("div", {
                style: {
                    position: "absolute",
                    bottom: 0,
                    height: 5,
                    width: "100%",
                    background: "transparent",
                    zIndex: isResizing.current ? 999 : 9,
                    cursor: "n-resize"
                },
                onClick: function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    isResizing.current = true;
                },
                onMouseDown: onMouseDownResize,
                onMouseUp: onMouseUpResize
            })
        ]
    });
};
var $b852c5f3008abacb$export$2e2bcd8739ae039 = $b852c5f3008abacb$var$EventButton;




var $a4892b14d3d768fe$var$renderEvents = function(dataset) {
    return dataset.map(function(eventRaw) {
        var item = eventRaw;
        return /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)((0, $b852c5f3008abacb$export$2e2bcd8739ae039), {
            item: eventRaw
        }, item.id);
    });
};
var $a4892b14d3d768fe$export$5c851bc642d7e5b8 = 4;
var $a4892b14d3d768fe$var$EventsPanel = function(props) {
    var data = props.data;
    var ref6 = (0, ($parcel$interopDefault($cw6c3$swchelperslib_sliced_to_arrayjs)))((0, $cw6c3$react.useContext)((0, $65553fbba1d6d65b$export$841858b892ce1f4c)), 1), store = ref6[0];
    var width = store.width, callbacks = store.callbacks, isAsc = store.isAsc;
    var onNewEventClick = callbacks.onNewEventClick;
    var ref1 = (0, ($parcel$interopDefault($cw6c3$swchelperslib_sliced_to_arrayjs)))((0, $cw6c3$react.useState)(null), 2), offsetTop = ref1[0], setOffsetTop = ref1[1];
    var ref2 = (0, ($parcel$interopDefault($cw6c3$swchelperslib_sliced_to_arrayjs)))((0, $cw6c3$react.useState)(null), 2), offsetTopEnd = ref2[0], setOffsetTopEnd = ref2[1];
    var startAt = (0, $cw6c3$react.useRef)(null);
    var endAt = (0, $cw6c3$react.useRef)(null);
    var ref3 = (0, ($parcel$interopDefault($cw6c3$swchelperslib_sliced_to_arrayjs)))((0, $cw6c3$react.useState)(null), 2), startAtState = ref3[0], setStartAt = ref3[1];
    var ref4 = (0, ($parcel$interopDefault($cw6c3$swchelperslib_sliced_to_arrayjs)))((0, $cw6c3$react.useState)(null), 2), endAtState = ref4[0], setEndAt = ref4[1];
    // const [isDraggingNewEvent, setIsDraggingNewEvent] = useState(false);
    var newEventStartOffset = (0, $cw6c3$react.useRef)(null);
    var newEventEndOffset = (0, $cw6c3$react.useRef)(null);
    var startAtRef = (0, $cw6c3$react.useRef)(null);
    var isDraggingRef = (0, $cw6c3$react.useRef)(false);
    var isUpdating = (0, $cw6c3$react.useRef)(false);
    var style = {
        position: "absolute",
        top: offsetTop,
        height: offsetTopEnd - offsetTop,
        background: store.style.primaryColor,
        width: "100%",
        zIndex: 9,
        borderRadius: 8,
        opacity: 0.8
    };
    var onMove = function(e) {
        var ref, ref5;
        isDraggingRef.current = true;
        // setIsDraggingNewEvent(true);
        e.preventDefault();
        e.stopPropagation();
        if ((0, $79dca703cc699b4f$export$6da1c85d7de31b61)(e)) return;
        // Get column element for day, where event is placed
        var drawPanelElement = document.getElementById("Kalend__draw-panel");
        if (!drawPanelElement) return;
        var touches = (ref = e.nativeEvent) === null || ref === void 0 ? void 0 : (ref5 = ref.touches) === null || ref5 === void 0 ? void 0 : ref5[0];
        var drawPanelElementRect = drawPanelElement.getBoundingClientRect();
        var y;
        // handle touch movement
        if (touches) y = touches.clientY - drawPanelElementRect.top;
        else // handle mouse movement
        y = e.clientY - drawPanelElementRect.top;
        // initial dragging
        if (newEventStartOffset.current === null) {
            setOffsetTop(y);
            var startAtValue = (0, $f35790b60c4d4b59$export$4f0cc7427b5c4255)(y / store.scaleCoeff, store);
            startAtRef.current = startAtValue;
            startAt.current = startAtValue;
            setStartAt(startAtValue);
            setOffsetTop(y);
            setOffsetTopEnd(y);
            newEventStartOffset.current = y;
            newEventEndOffset.current = y;
            startAtRef.current = startAtValue;
            endAt.current = startAtValue;
            setEndAt(startAtValue);
            return;
        }
        // handle dragging up
        if (newEventStartOffset.current && y < newEventStartOffset.current) {
            setOffsetTop(y);
            var startAtValue1 = (0, $f35790b60c4d4b59$export$4f0cc7427b5c4255)(y / store.scaleCoeff, store);
            startAtRef.current = startAtValue1;
            startAt.current = startAtValue1;
            setStartAt(startAtValue1);
            return;
        }
        // handle dragging down
        setOffsetTopEnd(y);
        var endAtValue = (0, $f35790b60c4d4b59$export$4f0cc7427b5c4255)(y / store.scaleCoeff, store);
        endAt.current = endAtValue;
        setEndAt(endAtValue);
    };
    /**
   * Cancel dragging event
   * remove listeners clean long click timeout and reset state
   * @param event
   */ var onMouseUp = function(event) {
        event.stopPropagation();
        event.preventDefault();
        // clean listeners
        document.removeEventListener("mouseup", onMouseUp, true);
        document.removeEventListener("mousemove", onMove, true);
        var targetClass = event.target.className;
        // prevent propagating when clicking on event due to listeners
        if (targetClass.indexOf("Kalend__Event") !== -1) return;
        if (!isDraggingRef.current) // handleEventClickInternal(event);
        return;
        if (isUpdating.current) return;
        if (onNewEventClick && isDraggingRef.current) {
            var ref, ref7, ref8, ref9, ref10, ref11;
            isUpdating.current = true;
            if (!((ref7 = startAt === null || startAt === void 0 ? void 0 : (ref = startAt.current) === null || ref === void 0 ? void 0 : ref.toUTC()) === null || ref7 === void 0 ? void 0 : ref7.toString())) {
                isDraggingRef.current = false;
                isUpdating.current = false;
                return;
            }
            isDraggingRef.current = false;
            newEventStartOffset.current = null;
            var chages = store.isAsc ? {
                startAt: (ref8 = startAt.current) === null || ref8 === void 0 ? void 0 : ref8.startOf("month").toISO(),
                endAt: (ref9 = endAt.current) === null || ref9 === void 0 ? void 0 : ref9.startOf("month").toISO()
            } : {
                endAt: (ref10 = startAt.current) === null || ref10 === void 0 ? void 0 : ref10.startOf("month").toISO(),
                startAt: (ref11 = endAt.current) === null || ref11 === void 0 ? void 0 : ref11.startOf("month").toISO()
            };
            onNewEventClick((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({
                event: event
            }, chages), event);
        }
        isDraggingRef.current = false;
        isUpdating.current = false;
    };
    /**
   * Start event dragging on long press/touch
   * Set listeners
   * @param e
   */ var onMouseDownLong = function(e) {
        if ((0, $79dca703cc699b4f$export$6da1c85d7de31b61)(e)) return;
        e.preventDefault();
        e.stopPropagation();
        if (e.button !== 0) return;
        document.addEventListener("mousemove", onMove, true);
        document.addEventListener("mouseup", onMouseUp, true);
    };
    /**
   * Initial long press click/touch on event
   * @param e
   */ var onMouseDown = function(e) {
        e.preventDefault();
        e.stopPropagation();
        // if (isDraggingRef.current) {
        //   onMouseUp(e);
        //   return;
        // }
        onMouseDownLong(e);
    };
    var verticalMonths = (0, $bf7b38bce41ca3dd$export$190d6a2573aa8371)(store.startStep, store.finishStep, store.scaleCoeff);
    var panelStyle = {
        width: width,
        height: verticalMonths.length ? verticalMonths[verticalMonths.length - 1].offset + verticalMonths[verticalMonths.length - 1].monthHeight : 0,
        overflow: "hidden"
    };
    var dataForDrawPanel = data;
    /*const nowPosition: number =
    dateNow.diff(DateTime.local().set({ hour: 0, minute: 0, second: 0 }), 'minutes').toObject().minutes / (60 / hourHeight);*/ var handleCloseNewEventDrag = function(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setOffsetTopEnd(null);
        setOffsetTop(null);
        // setIsDraggingNewEvent(false);
        isDraggingRef.current = false;
        newEventStartOffset.current = null;
        newEventEndOffset.current = null;
        startAt.current = null;
        endAt.current = null;
        setStartAt(null);
        setEndAt(null);
        isUpdating.current = false;
    };
    return /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsxs)("div", {
        id: "Kalend__draw-panel",
        style: panelStyle,
        onMouseDown: onMouseDown,
        onMouseUp: onMouseUp,
        className: "Kalend__draw-panel",
        children: [
            dataForDrawPanel && dataForDrawPanel.length > 0 ? $a4892b14d3d768fe$var$renderEvents(dataForDrawPanel) : null,
            isDraggingRef.current ? /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("div", {
                style: {
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 8
                },
                onClick: handleCloseNewEventDrag
            }) : null,
            isDraggingRef.current ? /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("div", {
                style: style,
                children: /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsxs)("div", {
                    style: {
                        paddingTop: 4,
                        paddingLeft: 4,
                        fontSize: 12
                    },
                    children: [
                        /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("p", {
                            style: {
                                color: "white"
                            },
                            children: "Project"
                        }),
                        /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsxs)("p", {
                            style: {
                                color: "white"
                            },
                            children: [
                                startAtState ? startAtState.year + ":" + startAtState.monthShort : "",
                                " -",
                                " ",
                                endAtState ? endAtState.year + ":" + endAtState.monthShort : ""
                            ]
                        })
                    ]
                })
            }) : null
        ]
    });
};
var $a4892b14d3d768fe$export$2e2bcd8739ae039 = $a4892b14d3d768fe$var$EventsPanel;



var $d9d05341da0a468a$var$TimeTable = function(props) {
    var style = {
        paddingLeft: (0, $88a08af890f49243$export$447c5938f45c45a5),
        height: "100%"
    };
    return /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsxs)("div", {
        style: style,
        className: "Kalend__Calendar__table Kalend__CalendarBody",
        id: "Kalend__timetable",
        children: [
            /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)((0, $49057570f1744f71$export$2e2bcd8739ae039), {}),
            /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)((0, $a4892b14d3d768fe$export$2e2bcd8739ae039), {
                data: props.events
            })
        ]
    });
};
var $d9d05341da0a468a$export$2e2bcd8739ae039 = $d9d05341da0a468a$var$TimeTable;



var $2c06f9532bb9aaf9$var$Calendar = function(props) {
    var ref = (0, ($parcel$interopDefault($cw6c3$swchelperslib_sliced_to_arrayjs)))((0, $cw6c3$react.useContext)((0, $65553fbba1d6d65b$export$841858b892ce1f4c)), 2), store = ref[0], dispatch = ref[1];
    var changeMonth = (0, $cw6c3$react.useCallback)(function(type, payload) {
        dispatch({
            type: store.isAsc ? type : type === "finishStep" ? "startStep" : "finishStep",
            payload: store.isAsc ? payload : -1 * payload
        });
    }, [
        store.isAsc
    ]);
    return /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsxs)("div", {
        style: {
            height: "100%",
            position: "relative"
        },
        children: [
            /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsxs)("div", {
                style: {
                    display: "flex",
                    paddingBottom: 5,
                    paddingLeft: 30
                },
                children: [
                    /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("div", {
                        style: {
                            display: "flex"
                        },
                        children: /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("button", {
                            onClick: function() {
                                return dispatch({
                                    type: "isAsc"
                                });
                            },
                            children: store.isAsc ? /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("span", {
                                children: "\u2193"
                            }) : /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("span", {
                                children: "\u2191"
                            })
                        })
                    }),
                    /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsxs)("div", {
                        style: {
                            display: "flex"
                        },
                        children: [
                            /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("button", {
                                onClick: function() {
                                    return changeMonth("startStep", -6);
                                },
                                children: "+"
                            }),
                            /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("button", {
                                onClick: function() {
                                    return changeMonth("startStep", 6);
                                },
                                children: "-"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsxs)("div", {
                        style: {
                            display: "flex",
                            paddingLeft: "30px"
                        },
                        children: [
                            /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("button", {
                                onClick: function() {
                                    return dispatch({
                                        type: "scaleCoeff",
                                        payload: -1
                                    });
                                },
                                children: "+"
                            }),
                            /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("button", {
                                onClick: function() {
                                    return dispatch({
                                        type: "scaleCoeff",
                                        payload: 1
                                    });
                                },
                                children: "-"
                            }),
                            store.scaleCoeff
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("div", {
                style: {
                    position: "relative",
                    height: store.height
                },
                children: /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)((0, $d9d05341da0a468a$export$2e2bcd8739ae039), {
                    events: props.items ? (0, $f35790b60c4d4b59$export$5ea939eddc3fd41c)(props.items, store.startStep, store.scaleCoeff, store.isAsc, store.height) : []
                })
            }),
            /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsxs)("div", {
                style: {
                    display: "flex",
                    paddingTop: 5,
                    paddingLeft: 30
                },
                children: [
                    /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("button", {
                        onClick: function() {
                            return changeMonth("finishStep", 6);
                        },
                        children: "+"
                    }),
                    /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("button", {
                        onClick: function() {
                            return changeMonth("finishStep", -6);
                        },
                        children: "-"
                    })
                ]
            })
        ]
    });
};
var $2c06f9532bb9aaf9$export$2e2bcd8739ae039 = $2c06f9532bb9aaf9$var$Calendar;








var $f101c73fee185a96$var$DimensionsLayoutLayer = function(props) {
    var ref = (0, ($parcel$interopDefault($cw6c3$swchelperslib_sliced_to_arrayjs)))((0, $cw6c3$react.useContext)((0, $65553fbba1d6d65b$export$841858b892ce1f4c)), 2), store = ref[0], dispatch = ref[1];
    var setContext = function(type, payload) {
        dispatch({
            type: type,
            payload: payload
        });
    };
    (0, $cw6c3$react.useEffect)(function() {
        var el = document === null || document === void 0 ? void 0 : document.querySelector(".Kalend__Calendar__root");
        if (!el) return;
        var resizeObserver = new ResizeObserver(function(entries) {
            var entryRect = entries[0].contentRect;
            setContext("width", entryRect.width - (0, $88a08af890f49243$export$447c5938f45c45a5));
        });
        resizeObserver.observe(el);
    }, [
        document === null || document === void 0 ? void 0 : document.querySelector(".Kalend__Calendar__root")
    ]);
    (0, $cw6c3$react.useEffect)(function() {
        var el = document === null || document === void 0 ? void 0 : document.querySelector(".Kalend__Calendar__root");
        if (!el) return;
        var resizeObserver = new ResizeObserver(function(entries) {
            var entryRect = entries[0].contentRect;
            var width = entryRect.width;
            setContext("width", entryRect.width - (0, $88a08af890f49243$export$447c5938f45c45a5));
        });
        resizeObserver.observe(el);
    }, []);
    return props.children;
};
var $f101c73fee185a96$export$2e2bcd8739ae039 = $f101c73fee185a96$var$DimensionsLayoutLayer;




// use any as JSX was causing errors for some cases
var $3f7b2fe5d2c34f8f$var$Timeline = function(props) {
    // basic validation
    return /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)("div", {
        className: "Kalend__Calendar__root Kalend__main",
        children: /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)((0, $65553fbba1d6d65b$export$2e2bcd8739ae039), (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, props), {
            children: /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)((0, $3886b97a1526edd3$export$2e2bcd8739ae039), (0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($cw6c3$swchelperslib_object_spreadjs)))({}, props), {
                children: /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)((0, $f101c73fee185a96$export$2e2bcd8739ae039), {
                    children: /*#__PURE__*/ (0, $cw6c3$reactjsxruntime.jsx)((0, $2c06f9532bb9aaf9$export$2e2bcd8739ae039), {
                        items: props.items
                    })
                })
            }))
        }))
    });
};
var $3f7b2fe5d2c34f8f$export$2e2bcd8739ae039 = $3f7b2fe5d2c34f8f$var$Timeline;


//# sourceMappingURL=main.js.map
