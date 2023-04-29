;/**
 * Skipped minification because the original files appears to be already minified.
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).St = {})
}(this, (function(t) {
    "use strict";
    class e {
        constructor(t, e) {
            this.state = {
                angle: 0,
                area: [],
                corners: null,
                position: {
                    x: 0,
                    y: 0
                },
                hardAngle: 0,
                hardDrawingAngle: 0
            },
            this.createdDensity = e,
            this.nowDrawingDensity = this.createdDensity,
            this.render = t
        }
        setDensity(t) {
            this.createdDensity = t,
            this.nowDrawingDensity = t
        }
        setDrawingDensity(t) {
            this.nowDrawingDensity = t
        }
        getDrawingDensity() {
            return this.nowDrawingDensity
        }
        getDensity() {
            return this.createdDensity
        }
        setPosition(t) {
            this.state.position = t
        }
        setAngle(t) {
            this.state.angle = t
        }
        setArea(t) {
            this.state.area = t
        }
        setCorners(t) {
            this.state.corners = t
        }
        getAngle() {
            return this.state.angle
        }
        setHardAngle(t) {
            this.state.hardAngle = t,
            this.state.hardDrawingAngle = t
        }
        setHardDrawingAngle(t) {
            this.state.hardDrawingAngle = t
        }
        getHardAngle() {
            return this.state.hardAngle
        }
        setOrientation(t) {
            this.orientation = t
        }
        getOrientation() {
            return this.orientation
        }
    }
    class i extends e {
        constructor(t, e, i) {
            super(t, i),
            this.image = null,
            this.isLoad = !1,
            this.loadingAngle = 0,
            this.image = new Image,
            this.image.src = e
        }
        draw(t) {
            const e = this.render.getContext()
              , i = this.render.convertToGlobal(this.state.position)
              , s = this.render.getRect().pageWidth
              , n = this.render.getRect().height;
            e.save(),
            e.translate(i.x, i.y),
            e.beginPath();
            for (let t of this.state.area)
                null !== t && (t = this.render.convertToGlobal(t),
                e.lineTo(t.x - i.x, t.y - i.y));
            e.rotate(this.state.angle),
            e.clip(),
            this.isLoad ? e.drawImage(this.image, 0, 0, s, n) : this.drawLoader(e, {
                x: 0,
                y: 0
            }, s, n),
            e.restore()
        }
        simpleDraw(t) {
            const e = this.render.getRect()
              , i = this.render.getContext()
              , s = e.pageWidth
              , n = e.height
              , h = 1 === t ? e.left + e.pageWidth : e.left
              , r = e.top;
            this.isLoad ? i.drawImage(this.image, h, r, s, n) : this.drawLoader(i, {
                x: h,
                y: r
            }, s, n)
        }
        drawLoader(t, e, i, s) {
            t.beginPath(),
            t.strokeStyle = "rgb(200, 200, 200)",
            t.fillStyle = "rgb(255, 255, 255)",
            t.lineWidth = 1,
            t.rect(e.x + 1, e.y + 1, i - 1, s - 1),
            t.stroke(),
            t.fill();
            const n = {
                x: e.x + i / 2,
                y: e.y + s / 2
            };
            t.beginPath(),
            t.lineWidth = 10,
            t.arc(n.x, n.y, 20, this.loadingAngle, 3 * Math.PI / 2 + this.loadingAngle),
            t.stroke(),
            t.closePath(),
            this.loadingAngle += .07,
            this.loadingAngle >= 2 * Math.PI && (this.loadingAngle = 0)
        }
        load() {
            this.isLoad || (this.image.onload = ()=>{
                this.isLoad = !0
            }
            )
        }
    }
    class s {
        constructor(t, e) {
            this.pages = [],
            this.currentPageIndex = 0,
            this.currentSpreadIndex = 0,
            this.isShowCover = !1,
            this.landscapeSpread = [],
            this.portraitSpread = [],
            this.render = e,
            this.app = t,
            this.currentPageIndex = 0,
            this.isShowCover = this.app.getSettings().showCover
        }
        destroy() {
            this.pages = []
        }
        createSpread() {
            this.landscapeSpread = [],
            this.portraitSpread = [];
            for (let t = 0; t < this.pages.length; t++)
                this.portraitSpread.push([t]);
            let t = 0;
            this.isShowCover && (this.pages[0].setDensity("hard"),
            this.landscapeSpread.push([t]),
            t++);
            for (let e = t; e < this.pages.length; e += 2)
                e < this.pages.length - 1 ? this.landscapeSpread.push([e, e + 1]) : (this.landscapeSpread.push([e]),
                this.pages[e].setDensity("hard"))
        }
        getSpread() {
            return "landscape" === this.render.getOrientation() ? this.landscapeSpread : this.portraitSpread
        }
        getSpreadIndexByPage(t) {
            const e = this.getSpread();
            for (let i = 0; i < e.length; i++)
                if (t === e[i][0] || t === e[i][1])
                    return i;
            return null
        }
        getPageCount() {
            return this.pages.length
        }
        getPages() {
            return this.pages
        }
        getPage(t) {
            if (t >= 0 && t < this.pages.length)
                return this.pages[t];
            throw new Error("Invalid page number")
        }
        nextBy(t) {
            const e = this.pages.indexOf(t);
            return e < this.pages.length - 1 ? this.pages[e + 1] : null
        }
        prevBy(t) {
            const e = this.pages.indexOf(t);
            return e > 0 ? this.pages[e - 1] : null
        }
        getFlippingPage(t) {
            const e = this.currentSpreadIndex;
            if ("portrait" === this.render.getOrientation())
                return 0 === t ? this.pages[e] : this.pages[e - 1];
            {
                const i = 0 === t ? this.getSpread()[e + 1] : this.getSpread()[e - 1];
                return 1 === i.length || 0 === t ? this.pages[i[0]] : this.pages[i[1]]
            }
        }
        getBottomPage(t) {
            const e = this.currentSpreadIndex;
            if ("portrait" === this.render.getOrientation())
                return 0 === t ? this.pages[e + 1] : this.pages[e - 1];
            {
                const i = 0 === t ? this.getSpread()[e + 1] : this.getSpread()[e - 1];
                return 1 === i.length ? this.pages[i[0]] : 0 === t ? this.pages[i[1]] : this.pages[i[0]]
            }
        }
        showNext() {
            this.currentSpreadIndex < this.getSpread().length && (this.currentSpreadIndex++,
            this.showSpread())
        }
        showPrev() {
            this.currentSpreadIndex > 0 && (this.currentSpreadIndex--,
            this.showSpread())
        }
        getCurrentPageIndex() {
            return this.currentPageIndex
        }
        show(t=null) {
            if (null === t && (t = this.currentPageIndex),
            t < 0 || t >= this.pages.length)
                return;
            const e = this.getSpreadIndexByPage(t);
            null !== e && (this.currentSpreadIndex = e,
            this.showSpread())
        }
        getCurrentSpreadIndex() {
            return this.currentSpreadIndex
        }
        setCurrentSpreadIndex(t) {
            if (!(t >= 0 && t < this.getSpread().length))
                throw new Error("Invalid page");
            this.currentSpreadIndex = t
        }
        showSpread() {
            const t = this.getSpread()[this.currentSpreadIndex];
            2 === t.length ? (this.render.setLeftPage(this.pages[t[0]]),
            this.render.setRightPage(this.pages[t[1]])) : "landscape" === this.render.getOrientation() && t[0] === this.pages.length - 1 ? (this.render.setLeftPage(this.pages[t[0]]),
            this.render.setRightPage(null)) : (this.render.setLeftPage(null),
            this.render.setRightPage(this.pages[t[0]])),
            this.currentPageIndex = t[0],
            this.app.updatePageIndex(this.currentPageIndex)
        }
    }
    class n extends s {
        constructor(t, e, i) {
            super(t, e),
            this.imagesHref = i
        }
        load() {
            for (const t of this.imagesHref) {
                const e = new i(this.render,t,"soft");
                e.load(),
                this.pages.push(e)
            }
            this.createSpread()
        }
    }
    class h {
        static GetDestinationFromTwoPoint(t, e) {
            return null === t || null === e ? 1 / 0 : Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
        }
        static GetSegmentLength(t) {
            return h.GetDestinationFromTwoPoint(t[0], t[1])
        }
        static GetAngleFromTwoLine(t, e) {
            const i = t[0].y - t[1].y
              , s = e[0].y - e[1].y
              , n = t[1].x - t[0].x
              , h = e[1].x - e[0].x;
            return Math.acos((i * s + n * h) / (Math.sqrt(i * i + n * n) * Math.sqrt(s * s + h * h)))
        }
        static PointInRect(t, e) {
            return null === e ? null : e.x >= t.left && e.x <= t.width + t.left && e.y >= t.top && e.y <= t.top + t.height ? e : null
        }
        static GetRotatedPoint(t, e, i) {
            return {
                x: t.x * Math.cos(i) + t.y * Math.sin(i) + e.x,
                y: t.y * Math.cos(i) - t.x * Math.sin(i) + e.y
            }
        }
        static GetIntersectByLineAndCircle(t, e, i) {
            if (h.GetDestinationFromTwoPoint(t, i) <= e)
                return i;
            const s = t.x
              , n = t.y
              , r = i.x
              , a = i.y;
            let o = Math.sqrt(Math.pow(e, 2) * Math.pow(s - r, 2) / (Math.pow(s - r, 2) + Math.pow(n - a, 2))) + s;
            i.x < 0 && (o *= -1);
            let l = (o - s) * (n - a) / (s - r) + n;
            return s - r + n === 0 && (l = e),
            {
                x: o,
                y: l
            }
        }
        static GetIntersectByTwoSegment(t, e, i) {
            return h.PointInRect(t, h.GetIntersectByTwoLine(e, i))
        }
        static GetIntersectByTwoLine(t, e) {
            const i = t[0].y - t[1].y
              , s = e[0].y - e[1].y
              , n = t[1].x - t[0].x
              , h = e[1].x - e[0].x
              , r = t[0].x * t[1].y - t[1].x * t[0].y
              , a = e[0].x * e[1].y - e[1].x * e[0].y
              , o = i * a - s * r
              , l = n * a - h * r
              , g = -(r * h - a * n) / (i * h - s * n)
              , d = -(i * a - s * r) / (i * h - s * n);
            if (isFinite(g) && isFinite(d))
                return {
                    x: g,
                    y: d
                };
            if (Math.abs(o - l) < .1)
                throw new Error("Segment included");
            return null
        }
        static GetCordsFromTwoPoint(t, e) {
            const i = Math.abs(t.x - e.x)
              , s = Math.abs(t.y - e.y)
              , n = Math.max(i, s)
              , h = [t];
            function r(t, e, i, s, n) {
                return e > t ? t + n * (i / s) : e < t ? t - n * (i / s) : t
            }
            for (let a = 1; a <= n; a++)
                h.push({
                    x: r(t.x, e.x, i, n, a),
                    y: r(t.y, e.y, s, n, a)
                });
            return h
        }
    }
    class r extends e {
        constructor(t, e, i) {
            super(t, i),
            this.copiedElement = null,
            this.isLoad = !1,
            this.element = e,
            this.element.classList.add("stf__item"),
            this.element.classList.add("--" + i)
        }
        draw(t) {
            const e = t || this.nowDrawingDensity
              , i = this.render.convertToGlobal(this.state.position)
              , s = this.render.getRect().pageWidth
              , n = this.render.getRect().height;
            this.element.classList.remove("--simple"),
            this.element.style.display = "block",
            this.element.style.left = "0",
            this.element.style.top = "0",
            this.element.style.width = s + "px",
            this.element.style.height = n + "px",
            "hard" === e ? this.drawHard() : this.drawSoft(i)
        }
        drawHard() {
            const t = this.render.getRect().left + this.render.getRect().width / 2;
            this.element.style.backfaceVisibility = "hidden",
            this.element.style.setProperty("-webkit-backface-visibility", "hidden");
            const e = this.state.hardDrawingAngle;
            0 === this.orientation ? (this.element.style.transformOrigin = this.render.getRect().pageWidth + "px 0",
            this.element.style.transform = "translate3d(0px, 0px, 0) rotateY(" + e + "deg)") : (this.element.style.transformOrigin = "0 0",
            this.element.style.transform = "translate3d(" + t + "px, 0px, 0) rotateY(" + e + "deg)"),
            this.element.style.clipPath = "none",
            this.element.style.setProperty("-webkit-clip-path", "none")
        }
        drawSoft(t) {
            this.element.style.transformOrigin = "0 0";
            let e = "polygon( ";
            for (const t of this.state.area)
                if (null !== t) {
                    let i = 1 === this.render.getDirection() ? {
                        x: -t.x + this.state.position.x,
                        y: t.y - this.state.position.y
                    } : {
                        x: t.x - this.state.position.x,
                        y: t.y - this.state.position.y
                    };
                    i = h.GetRotatedPoint(i, {
                        x: 0,
                        y: 0
                    }, this.state.angle),
                    e += i.x + "px " + i.y + "px, "
                }
            e = e.slice(0, -2),
            e += ")",
            this.render.isSafari() && 0 === this.state.angle ? this.element.style.transform = "translate(" + t.x + "px, " + t.y + "px)" : this.element.style.transform = "translate3d(" + t.x + "px, " + t.y + "px, 0) rotate(" + this.state.angle + "rad)",
            this.element.style.clipPath = e,
            this.element.style.setProperty("-webkit-clip-path", e)
        }
        simpleDraw(t) {
            if (this.element.classList.contains("--simple"))
                return;
            null === this.copiedElement && (this.copiedElement = this.element.cloneNode(!0),
            this.element.parentElement.appendChild(this.copiedElement));
            const e = this.render.getRect()
              , i = e.pageWidth
              , s = e.height
              , n = 1 === t ? e.left + e.pageWidth : e.left
              , h = e.top;
            this.element.classList.add("--simple"),
            this.copiedElement.style.cssText = "position: absolute; display: block; height: " + s + "px; left: " + n + "px; top: " + h + "px; width: " + i + "px; z-index: " + (this.render.getSettings().startZIndex + 1) + ";",
            this.element.style.cssText = "display: none"
        }
        clearSaved() {
            this.element.classList.remove("--simple"),
            null !== this.copiedElement && (this.copiedElement.remove(),
            this.copiedElement = null)
        }
        getElement() {
            return this.element
        }
        load() {
            this.isLoad = !0
        }
        setOrientation(t) {
            super.setOrientation(t),
            this.element.classList.remove("--left", "--right"),
            this.element.classList.add(1 === t ? "--right" : "--left")
        }
        setDrawingDensity(t) {
            this.element.classList.remove("--soft", "--hard"),
            this.element.classList.add("--" + t),
            super.setDrawingDensity(t)
        }
    }
    class a extends s {
        constructor(t, e, i, s) {
            super(t, e),
            this.element = i,
            this.pagesElement = s
        }
        load() {
            for (const t of this.pagesElement) {
                const e = new r(this.render,t,"hard" === t.dataset.density ? "hard" : "soft");
                e.load(),
                this.pages.push(e)
            }
            this.createSpread()
        }
    }
    class o {
        constructor(t, e, i, s) {
            this.direction = t,
            this.corner = e,
            this.topIntersectPoint = null,
            this.sideIntersectPoint = null,
            this.bottomIntersectPoint = null,
            this.pageWidth = parseInt(i, 10),
            this.pageHeight = parseInt(s, 10)
        }
        calc(t) {
            try {
                return this.position = this.preparePosition(t),
                this.calculateIntersectPoint(this.position),
                !0
            } catch (t) {
                return !1
            }
        }
        getPageRect(t) {
            return "top" === this.corner ? this.getRectFromBasePoint([{
                x: 0,
                y: 0
            }, {
                x: this.pageWidth,
                y: 0
            }, {
                x: 0,
                y: this.pageHeight
            }, {
                x: this.pageWidth,
                y: this.pageHeight
            }], t) : this.getRectFromBasePoint([{
                x: 0,
                y: -this.pageHeight
            }, {
                x: this.pageWidth,
                y: -this.pageHeight
            }, {
                x: 0,
                y: 0
            }, {
                x: this.pageWidth,
                y: 0
            }], t)
        }
        getRectFromBasePoint(t, e) {
            return {
                topLeft: this.getRotatedPoint(t[0], e),
                topRight: this.getRotatedPoint(t[1], e),
                bottomLeft: this.getRotatedPoint(t[2], e),
                bottomRight: this.getRotatedPoint(t[3], e)
            }
        }
        getRotatedPoint(t, e) {
            return {
                x: t.x * Math.cos(this.angle) + t.y * Math.sin(this.angle) + e.x,
                y: t.y * Math.cos(this.angle) - t.x * Math.sin(this.angle) + e.y
            }
        }
        updateAngleAndGeometry(t) {
            this.angle = this.calculateAngle(t),
            this.rect = this.getPageRect(t)
        }
        calculateIntersectPoint(t) {
            const e = {
                left: -1,
                top: -1,
                width: this.pageWidth + 2,
                height: this.pageHeight + 2
            };
            "top" === this.corner ? (this.topIntersectPoint = h.GetIntersectByTwoSegment(e, [t, this.rect.topRight], [{
                x: 0,
                y: 0
            }, {
                x: this.pageWidth,
                y: 0
            }]),
            this.sideIntersectPoint = h.GetIntersectByTwoSegment(e, [t, this.rect.bottomLeft], [{
                x: this.pageWidth,
                y: 0
            }, {
                x: this.pageWidth,
                y: this.pageHeight
            }]),
            this.bottomIntersectPoint = h.GetIntersectByTwoSegment(e, [this.rect.bottomLeft, this.rect.bottomRight], [{
                x: 0,
                y: this.pageHeight
            }, {
                x: this.pageWidth,
                y: this.pageHeight
            }])) : (this.topIntersectPoint = h.GetIntersectByTwoSegment(e, [this.rect.topLeft, this.rect.topRight], [{
                x: 0,
                y: 0
            }, {
                x: this.pageWidth,
                y: 0
            }]),
            this.sideIntersectPoint = h.GetIntersectByTwoSegment(e, [t, this.rect.topLeft], [{
                x: this.pageWidth,
                y: 0
            }, {
                x: this.pageWidth,
                y: this.pageHeight
            }]),
            this.bottomIntersectPoint = h.GetIntersectByTwoSegment(e, [this.rect.bottomLeft, this.rect.bottomRight], [{
                x: 0,
                y: this.pageHeight
            }, {
                x: this.pageWidth,
                y: this.pageHeight
            }]))
        }
        checkPositionAtCenterLine(t, e, i) {
            let s = t;
            const n = h.GetIntersectByLineAndCircle(e, this.pageWidth, s);
            s !== n && (s = n,
            this.updateAngleAndGeometry(s));
            const r = Math.sqrt(Math.pow(this.pageWidth, 2) + Math.pow(this.pageHeight, 2));
            let a = this.rect.bottomRight
              , o = this.rect.topLeft;
            if ("bottom" === this.corner && (a = this.rect.topRight,
            o = this.rect.bottomLeft),
            a.x <= 0) {
                const t = h.GetIntersectByLineAndCircle(i, r, o);
                t !== s && (s = t,
                this.updateAngleAndGeometry(s))
            }
            return s
        }
        preparePosition(t) {
            let e = t;
            if (this.updateAngleAndGeometry(e),
            e = "top" === this.corner ? this.checkPositionAtCenterLine(e, {
                x: 0,
                y: 0
            }, {
                x: 0,
                y: this.pageHeight
            }) : this.checkPositionAtCenterLine(e, {
                x: 0,
                y: this.pageHeight
            }, {
                x: 0,
                y: 0
            }),
            Math.abs(e.x - this.pageWidth) < 1 && Math.abs(e.y) < 1)
                throw new Error("Point is too small");
            return e
        }
        calculateAngle(t) {
            const e = this.pageWidth - t.x + 1
              , i = "bottom" === this.corner ? this.pageHeight - t.y : t.y;
            let s = 2 * Math.acos(e / Math.sqrt(i * i + e * e));
            i < 0 && (s = -s);
            const n = Math.PI - s;
            if (!isFinite(s) || n >= 0 && n < .003)
                throw new Error("The G point is too small");
            return "bottom" === this.corner && (s = -s),
            s
        }
        getAngle() {
            return 0 === this.direction ? -this.angle : this.angle
        }
        getRect() {
            return this.rect
        }
        getPosition() {
            return this.position
        }
        getActiveCorner() {
            return 0 === this.direction ? this.rect.topLeft : this.rect.topRight
        }
        getDirection() {
            return this.direction
        }
        getIntersectPoint() {
            return {
                top: this.topIntersectPoint,
                bottom: this.bottomIntersectPoint,
                side: this.sideIntersectPoint
            }
        }
        getSegmentToShadowLine() {
            const t = this.getShadowStartPoint();
            return [t, t !== this.sideIntersectPoint && null !== this.sideIntersectPoint ? this.sideIntersectPoint : this.bottomIntersectPoint]
        }
        getShadowStartPoint() {
            return "top" === this.corner ? this.topIntersectPoint : null !== this.sideIntersectPoint ? this.sideIntersectPoint : this.topIntersectPoint
        }
        getShadowAngle() {
            const t = h.GetAngleFromTwoLine(this.getSegmentToShadowLine(), [{
                x: 0,
                y: 0
            }, {
                x: this.pageWidth,
                y: 0
            }]);
            return 0 === this.direction ? t : Math.PI - t
        }
        getShadowLength() {
            return h.GetSegmentLength(this.getSegmentToShadowLine())
        }
        getFlippingProgress() {
            return Math.abs((this.position.x - this.pageWidth) / (2 * this.pageWidth) * 100)
        }
        getFlippingClipArea() {
            const t = [];
            let e = !1;
            return t.push(this.rect.topLeft),
            t.push(this.topIntersectPoint),
            null === this.sideIntersectPoint ? e = !0 : (t.push(this.sideIntersectPoint),
            null === this.bottomIntersectPoint && (e = !1)),
            t.push(this.bottomIntersectPoint),
            (e || "bottom" === this.corner) && t.push(this.rect.bottomLeft),
            t
        }
        getCorner() {
            return this.corner
        }
        getBottomClipArea() {
            const t = [];
            return t.push(this.topIntersectPoint),
            "top" === this.corner ? t.push({
                x: this.pageWidth,
                y: 0
            }) : (null !== this.topIntersectPoint && t.push({
                x: this.pageWidth,
                y: 0
            }),
            t.push({
                x: this.pageWidth,
                y: this.pageHeight
            })),
            null !== this.sideIntersectPoint ? h.GetDestinationFromTwoPoint(this.sideIntersectPoint, this.topIntersectPoint) >= 10 && t.push(this.sideIntersectPoint) : "top" === this.corner && t.push({
                x: this.pageWidth,
                y: this.pageHeight
            }),
            t.push(this.bottomIntersectPoint),
            t.push(this.topIntersectPoint),
            t
        }
        getBottomPagePosition() {
            return 1 === this.direction ? {
                x: this.pageWidth,
                y: 0
            } : {
                x: 0,
                y: 0
            }
        }
    }
    class l {
        constructor(t, e) {
            this.flippingPage = null,
            this.bottomPage = null,
            this.calc = null,
            this.state = "read",
            this.render = t,
            this.app = e
        }
        getCalculation() {
            return this.calc
        }
        getState() {
            return this.state
        }
        setState(t) {
            this.state !== t && (this.app.updateState(t),
            this.state = t)
        }
        start(t) {
            this.reset();
            const e = this.render.convertToBook(t)
              , i = this.getBoundsRect();
            let s = 0;
            "portrait" === this.render.getOrientation() ? e.x - i.pageWidth <= i.width / 5 && (s = 1) : e.x < i.width / 2 && (s = 1);
            const n = e.y >= i.height / 2 ? "bottom" : "top";
            if (!this.checkDirection(s))
                return !1;
            try {
                if (this.flippingPage = this.app.getPageCollection().getFlippingPage(s),
                this.bottomPage = this.app.getPageCollection().getBottomPage(s),
                !this.flippingPage || !this.bottomPage)
                    return !1;
                if ("landscape" === this.render.getOrientation())
                    if (1 === s) {
                        const t = this.app.getPageCollection().nextBy(this.flippingPage);
                        null !== t && this.flippingPage.getDensity() !== t.getDensity() && (this.flippingPage.setDrawingDensity("hard"),
                        t.setDrawingDensity("hard"))
                    } else {
                        const t = this.app.getPageCollection().prevBy(this.flippingPage);
                        null !== t && this.flippingPage.getDensity() !== t.getDensity() && (this.flippingPage.setDrawingDensity("hard"),
                        t.setDrawingDensity("hard"))
                    }
                return this.render.setDirection(s),
                this.calc = new o(s,n,i.pageWidth.toString(10),i.height.toString(10)),
                !0
            } catch (t) {
                return !1
            }
        }
        showCorner(t) {
            if (!this.checkState("read", "fold_corner"))
                return;
            const e = this.getBoundsRect()
              , i = e.pageWidth
              , s = Math.sqrt(Math.pow(i, 2) + Math.pow(e.height, 2)) / 5
              , n = this.render.convertToBook(t);
            if (n.x > 0 && n.y > 0 && n.x < e.width && n.y < e.height && (n.x < s || n.x > e.width - s) && (n.y < s || n.y > e.height - s))
                if (null === this.calc) {
                    if (!this.start(t))
                        return;
                    this.setState("fold_corner"),
                    this.calc.calc({
                        x: i - 1,
                        y: 1
                    });
                    const s = 50
                      , n = "bottom" === this.calc.getCorner() ? e.height - 1 : 1
                      , h = "bottom" === this.calc.getCorner() ? e.height - s : s;
                    this.animateFlippingTo({
                        x: i - 1,
                        y: n
                    }, {
                        x: i - s,
                        y: h
                    }, !1, !1)
                } else
                    this.do(this.render.convertToPage(t));
            else
                this.setState("read"),
                this.render.finishAnimation(),
                this.stopMove()
        }
        fold(t) {
            this.setState("user_fold"),
            null === this.calc && this.start(t),
            this.do(this.render.convertToPage(t))
        }
        flip(t) {
            if (null !== this.calc && this.render.finishAnimation(),
            !this.start(t))
                return;
            const e = this.getBoundsRect();
            this.setState("flipping");
            const i = e.height / 10
              , s = "bottom" === this.calc.getCorner() ? e.height - i : i
              , n = "bottom" === this.calc.getCorner() ? e.height : 0;
            this.calc.calc({
                x: e.pageWidth - i,
                y: s
            }),
            this.animateFlippingTo({
                x: e.pageWidth - i,
                y: s
            }, {
                x: -e.pageWidth,
                y: n
            }, !0)
        }
        flipToPage(t, e) {
            const i = this.app.getPageCollection().getCurrentSpreadIndex()
              , s = this.app.getPageCollection().getSpreadIndexByPage(t);
            try {
                s > i && (this.app.getPageCollection().setCurrentSpreadIndex(s - 1),
                this.flipNext(e)),
                s < i && (this.app.getPageCollection().setCurrentSpreadIndex(s + 1),
                this.flipPrev(e))
            } catch (t) {}
        }
        flipNext(t) {
            this.flip({
                x: this.render.getRect().left + 2 * this.render.getRect().pageWidth,
                y: "top" === t ? 1 : this.render.getRect().height - 2
            })
        }
        flipPrev(t) {
            this.flip({
                x: 10,
                y: "top" === t ? 1 : this.render.getRect().height - 2
            })
        }
        stopMove() {
            if (null === this.calc)
                return;
            const t = this.calc.getPosition()
              , e = this.getBoundsRect()
              , i = "bottom" === this.calc.getCorner() ? e.height : 0;
            t.x <= 0 ? this.animateFlippingTo(t, {
                x: -e.pageWidth,
                y: i
            }, !0) : this.animateFlippingTo(t, {
                x: e.pageWidth,
                y: i
            }, !1)
        }
        do(t) {
            if (null !== this.calc && this.calc.calc(t)) {
                const t = this.calc.getFlippingProgress();
                this.bottomPage.setArea(this.calc.getBottomClipArea()),
                this.bottomPage.setPosition(this.calc.getBottomPagePosition()),
                this.bottomPage.setAngle(0),
                this.bottomPage.setHardAngle(0),
                this.flippingPage.setArea(this.calc.getFlippingClipArea()),
                this.flippingPage.setPosition(this.calc.getActiveCorner()),
                this.flippingPage.setAngle(this.calc.getAngle()),
                0 === this.calc.getDirection() ? this.flippingPage.setHardAngle(90 * (200 - 2 * t) / 100) : this.flippingPage.setHardAngle(-90 * (200 - 2 * t) / 100),
                this.render.setPageRect(this.calc.getRect()),
                this.render.setBottomPage(this.bottomPage),
                this.render.setFlippingPage(this.flippingPage),
                this.render.drawShadow(this.calc.getShadowStartPoint(), this.calc.getShadowAngle(), t, this.calc.getDirection(), this.calc.getShadowLength())
            }
        }
        animateFlippingTo(t, e, i, s=!0) {
            const n = h.GetCordsFromTwoPoint(t, e)
              , r = [];
            for (const t of n)
                r.push(()=>this.do(t));
            const a = this.getAnimationDuration(n.length);
            this.render.startAnimation(r, a, ()=>{
                this.calc && (i && (1 === this.calc.getDirection() ? this.app.turnToPrevPage() : this.app.turnToNextPage()),
                s && (this.render.setBottomPage(null),
                this.render.setFlippingPage(null),
                this.render.clearShadow(),
                this.setState("read"),
                this.reset()))
            }
            )
        }
        getAnimationDuration(t) {
            const e = this.app.getSettings().flippingTime;
            return t >= 1e3 ? e : t / 1e3 * e
        }
        checkDirection(t) {
            return 0 === t ? this.app.getCurrentPageIndex() < this.app.getPageCount() - 1 : this.app.getCurrentPageIndex() >= 1
        }
        reset() {
            this.calc = null,
            this.flippingPage = null,
            this.bottomPage = null
        }
        getBoundsRect() {
            return this.render.getRect()
        }
        checkState(...t) {
            for (const e of t)
                if (this.state === e)
                    return !0;
            return !1
        }
    }
    class g {
        constructor(t, e) {
            this.leftPage = null,
            this.rightPage = null,
            this.flippingPage = null,
            this.bottomPage = null,
            this.shadow = null,
            this.pageRect = null,
            this.animation = null,
            this.timer = 0,
            this.direction = null,
            this.orientation = null,
            this.boundsRect = null,
            this.safari = !1,
            this.setting = e,
            this.app = t;
            const i = new RegExp("Version\\/[\\d\\.]+.*Safari/");
            this.safari = null !== i.exec(window.navigator.userAgent)
        }
        drawShadow(t, e, i, s, n) {
            if (!this.app.getSettings().drawShadow)
                return;
            const h = 100 * this.getSettings().maxShadowOpacity;
            this.shadow = {
                pos: t,
                angle: e,
                width: 3 * this.getRect().pageWidth / 4 * i / 100,
                opacity: (100 - i) * h / 100 / 100,
                direction: s,
                length: n,
                progress: 2 * i
            }
        }
        isSafari() {
            return this.safari
        }
        clearShadow() {
            this.shadow = null
        }
        setPageRect(t) {
            this.pageRect = t
        }
        getOrientation() {
            return this.orientation
        }
        startAnimation(t, e, i) {
            this.finishAnimation(),
            this.animation = {
                frames: t,
                duration: e,
                durationFrame: e / t.length,
                onAnimateEnd: i,
                startedAt: this.timer
            }
        }
        finishAnimation() {
            null !== this.animation && (this.animation.frames[this.animation.frames.length - 1](),
            null !== this.animation.onAnimateEnd && this.animation.onAnimateEnd()),
            this.animation = null
        }
        render(t) {
            if (null !== this.animation) {
                const e = Math.round((t - this.animation.startedAt) / this.animation.durationFrame);
                e < this.animation.frames.length ? this.animation.frames[e]() : (this.animation.onAnimateEnd(),
                this.animation = null)
            }
            this.timer = t,
            this.drawFrame(t)
        }
        getRect() {
            return null === this.boundsRect && this.calculateBoundsRect(),
            this.boundsRect
        }
        calculateBoundsRect() {
            let t = "landscape";
            const e = this.getBlockWidth()
              , i = e / 2
              , s = this.getBlockHeight() / 2
              , n = this.setting.width / this.setting.height;
            let h = this.setting.width
              , r = this.setting.height
              , a = i - h;
            return "stretch" === this.setting.size ? (e < 2 * this.setting.minWidth && this.app.getSettings().usePortrait && (t = "portrait"),
            h = "portrait" === t ? this.getBlockWidth() : this.getBlockWidth() / 2,
            h > this.setting.maxWidth && (h = this.setting.maxWidth),
            r = h / n,
            r > this.getBlockHeight() && (r = this.getBlockHeight(),
            h = r * n),
            a = "portrait" === t ? i - h / 2 - h : i - h) : e < 2 * h && this.app.getSettings().usePortrait && (t = "portrait",
            a = i - h / 2 - h),
            this.boundsRect = {
                left: a,
                top: s - r / 2,
                width: 2 * h,
                height: r,
                pageWidth: h
            },
            t
        }
        update() {
            this.boundsRect = null;
            const t = this.calculateBoundsRect();
            this.orientation !== t && (this.orientation = t,
            this.app.updateOrientation(t))
        }
        convertToBook(t) {
            const e = this.getRect();
            return {
                x: t.x - e.left,
                y: t.y - e.top
            }
        }
        convertToPage(t, e) {
            e || (e = this.direction);
            const i = this.getRect();
            return {
                x: 0 === e ? t.x - i.left - i.width / 2 : i.width / 2 - t.x + i.left,
                y: t.y - i.top
            }
        }
        convertToGlobal(t, e) {
            if (e || (e = this.direction),
            null == t)
                return null;
            const i = this.getRect();
            return {
                x: 0 === e ? t.x + i.left + i.width / 2 : i.width / 2 - t.x + i.left,
                y: t.y + i.top
            }
        }
        convertRectToGlobal(t, e) {
            return e || (e = this.direction),
            {
                topLeft: this.convertToGlobal(t.topLeft, e),
                topRight: this.convertToGlobal(t.topRight, e),
                bottomLeft: this.convertToGlobal(t.bottomLeft, e),
                bottomRight: this.convertToGlobal(t.bottomRight, e)
            }
        }
        start() {
            this.update();
            const t = e=>{
                this.render(e),
                requestAnimationFrame(t)
            }
            ;
            requestAnimationFrame(t)
        }
        setDirection(t) {
            this.direction = t
        }
        getDirection() {
            return this.direction
        }
        setRightPage(t) {
            null !== t && t.setOrientation(1),
            this.rightPage = t
        }
        setLeftPage(t) {
            null !== t && t.setOrientation(0),
            this.leftPage = t
        }
        setBottomPage(t) {
            null !== t && t.setOrientation(1 === this.direction ? 0 : 1),
            this.bottomPage = t
        }
        setFlippingPage(t) {
            null !== t && t.setOrientation(0 === this.direction && "portrait" !== this.orientation ? 0 : 1),
            this.flippingPage = t
        }
        getSettings() {
            return this.app.getSettings()
        }
    }
    class d extends g {
        constructor(t, e, i) {
            super(t, e),
            this.canvas = i,
            this.ctx = i.getContext("2d")
        }
        getBlockWidth() {
            return this.canvas.offsetWidth
        }
        getBlockHeight() {
            return this.canvas.offsetHeight
        }
        getContext() {
            return this.ctx
        }
        drawFrame(t) {
            this.clear(),
            "portrait" !== this.orientation && null != this.leftPage && this.leftPage.simpleDraw(0),
            null != this.rightPage && this.rightPage.simpleDraw(1),
            null != this.bottomPage && this.bottomPage.draw(),
            this.drawBookShadow(),
            null != this.flippingPage && this.flippingPage.draw(),
            null != this.shadow && (this.drawOuterShadow(),
            this.drawInnerShadow());
            const e = this.getRect();
            "portrait" === this.orientation && (this.ctx.beginPath(),
            this.ctx.rect(e.left + e.pageWidth, e.top, e.width, e.height),
            this.ctx.clip())
        }
        drawBookShadow() {
            const t = this.getRect();
            this.ctx.save(),
            this.ctx.beginPath();
            const e = t.width / 20;
            this.ctx.rect(t.left, t.top, t.width, t.height);
            const i = {
                x: t.left + t.width / 2 - e / 2,
                y: 0
            };
            this.ctx.translate(i.x, i.y);
            const s = this.ctx.createLinearGradient(0, 0, e, 0);
            s.addColorStop(0, "rgba(0, 0, 0, 0)"),
            s.addColorStop(.4, "rgba(0, 0, 0, 0.2)"),
            s.addColorStop(.49, "rgba(0, 0, 0, 0.1)"),
            s.addColorStop(.5, "rgba(0, 0, 0, 0.5)"),
            s.addColorStop(.51, "rgba(0, 0, 0, 0.4)"),
            s.addColorStop(1, "rgba(0, 0, 0, 0)"),
            this.ctx.clip(),
            this.ctx.fillStyle = s,
            this.ctx.fillRect(0, 0, e, 2 * t.height),
            this.ctx.restore()
        }
        drawOuterShadow() {
            const t = this.getRect();
            this.ctx.save(),
            this.ctx.beginPath(),
            this.ctx.rect(t.left, t.top, t.width, t.height);
            const e = this.convertToGlobal({
                x: this.shadow.pos.x,
                y: this.shadow.pos.y
            });
            this.ctx.translate(e.x, e.y),
            this.ctx.rotate(Math.PI + this.shadow.angle + Math.PI / 2);
            const i = this.ctx.createLinearGradient(0, 0, this.shadow.width, 0);
            0 === this.shadow.direction ? (this.ctx.translate(0, -100),
            i.addColorStop(0, "rgba(0, 0, 0, " + this.shadow.opacity + ")"),
            i.addColorStop(1, "rgba(0, 0, 0, 0)")) : (this.ctx.translate(-this.shadow.width, -100),
            i.addColorStop(0, "rgba(0, 0, 0, 0)"),
            i.addColorStop(1, "rgba(0, 0, 0, " + this.shadow.opacity + ")")),
            this.ctx.clip(),
            this.ctx.fillStyle = i,
            this.ctx.fillRect(0, 0, this.shadow.width, 2 * t.height),
            this.ctx.restore()
        }
        drawInnerShadow() {
            const t = this.getRect();
            this.ctx.save(),
            this.ctx.beginPath();
            const e = this.convertToGlobal({
                x: this.shadow.pos.x,
                y: this.shadow.pos.y
            })
              , i = this.convertRectToGlobal(this.pageRect);
            this.ctx.moveTo(i.topLeft.x, i.topLeft.y),
            this.ctx.lineTo(i.topRight.x, i.topRight.y),
            this.ctx.lineTo(i.bottomRight.x, i.bottomRight.y),
            this.ctx.lineTo(i.bottomLeft.x, i.bottomLeft.y),
            this.ctx.translate(e.x, e.y),
            this.ctx.rotate(Math.PI + this.shadow.angle + Math.PI / 2);
            const s = 3 * this.shadow.width / 4
              , n = this.ctx.createLinearGradient(0, 0, s, 0);
            0 === this.shadow.direction ? (this.ctx.translate(-s, -100),
            n.addColorStop(1, "rgba(0, 0, 0, " + this.shadow.opacity + ")"),
            n.addColorStop(.9, "rgba(0, 0, 0, 0.05)"),
            n.addColorStop(.7, "rgba(0, 0, 0, " + this.shadow.opacity + ")"),
            n.addColorStop(0, "rgba(0, 0, 0, 0)")) : (this.ctx.translate(0, -100),
            n.addColorStop(0, "rgba(0, 0, 0, " + this.shadow.opacity + ")"),
            n.addColorStop(.1, "rgba(0, 0, 0, 0.05)"),
            n.addColorStop(.3, "rgba(0, 0, 0, " + this.shadow.opacity + ")"),
            n.addColorStop(1, "rgba(0, 0, 0, 0)")),
            this.ctx.clip(),
            this.ctx.fillStyle = n,
            this.ctx.fillRect(0, 0, s, 2 * t.height),
            this.ctx.restore()
        }
        clear() {
            this.ctx.fillStyle = "white",
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }
    class p {
        constructor(t, e, i) {
            this.touchPoint = null,
            this.swipeTimeout = 250,
            this.swipeDistance = 80,
            this.preventTouch = !1,
            this.onResize = ()=>{
                this.update()
            }
            ,
            this.onMouseDown = t=>{
                const e = this.getMousePos(t.clientX, t.clientY);
                this.app.startUserTouch(e),
                t.preventDefault()
            }
            ,
            this.onTouchStart = t=>{
                if (t.changedTouches.length > 0) {
                    const e = t.changedTouches[0]
                      , i = this.getMousePos(e.clientX, e.clientY);
                    this.touchPoint = {
                        point: i,
                        time: Date.now()
                    },
                    setTimeout(()=>{
                        null !== this.touchPoint && this.app.startUserTouch(i)
                    }
                    , this.swipeTimeout),
                    this.app.getSettings().mobileScrollSupport || t.preventDefault()
                }
            }
            ,
            this.onMouseUp = t=>{
                const e = this.getMousePos(t.clientX, t.clientY);
                this.app.userStop(e)
            }
            ,
            this.onMouseMove = t=>{
                const e = this.getMousePos(t.clientX, t.clientY);
                this.app.userMove(e, !1)
            }
            ,
            this.onTouchMove = t=>{
                if (t.changedTouches.length > 0) {
                    const e = t.changedTouches[0]
                      , i = this.getMousePos(e.clientX, e.clientY);
                    this.app.getSettings().mobileScrollSupport ? (null !== this.touchPoint && (Math.abs(this.touchPoint.point.x - i.x) > 10 || "read" !== this.app.getState()) && t.cancelable && this.app.userMove(i, !0),
                    "read" !== this.app.getState() && t.preventDefault()) : this.app.userMove(i, !0)
                }
            }
            ,
            this.onTouchEnd = t=>{
                if (t.changedTouches.length > 0) {
                    const e = t.changedTouches[0]
                      , i = this.getMousePos(e.clientX, e.clientY);
                    let s = !1;
                    if (this.preventTouch = !1,
                    null !== this.touchPoint) {
                        const t = i.x - this.touchPoint.point.x
                          , e = Math.abs(i.y - this.touchPoint.point.y);
                        Math.abs(t) > this.swipeDistance && e < 2 * this.swipeDistance && Date.now() - this.touchPoint.time < this.swipeTimeout && (t > 0 ? this.app.flipPrev(this.touchPoint.point.y < this.app.getRender().getRect().height / 2 ? "top" : "bottom") : this.app.flipNext(this.touchPoint.point.y < this.app.getRender().getRect().height / 2 ? "top" : "bottom"),
                        s = !0),
                        this.touchPoint = null
                    }
                    this.app.userStop(i, s)
                }
            }
            ,
            t.classList.add("stf__parent"),
            t.insertAdjacentHTML("afterbegin", '<div class="stf__wrapper"></div>'),
            this.wrapper = t.querySelector(".stf__wrapper"),
            this.app = e;
            const s = this.app.getSettings().usePortrait ? 1 : 2;
            t.style.minWidth = i.minWidth * s + "px",
            t.style.minHeight = i.minHeight * s + "px",
            "fixed" === i.size && (t.style.minWidth = i.width * s + "px",
            t.style.minHeight = i.height * s + "px"),
            i.autoSize && (t.style.width = "100%",
            t.style.maxWidth = 2 * i.maxWidth + "px"),
            t.style.display = "block",
            window.addEventListener("resize", this.onResize, !1)
        }
        destroy() {
            this.removeHandlers(),
            this.distElement.remove(),
            this.wrapper.remove()
        }
        getDistElement() {
            return this.distElement
        }
        getWrapper() {
            return this.wrapper
        }
        setOrientationStyle(t) {
            this.wrapper.classList.remove("--portrait", "--landscape"),
            "portrait" === t ? (this.app.getSettings().autoSize && (this.wrapper.style.paddingBottom = this.app.getSettings().height / this.app.getSettings().width * 100 + "%"),
            this.wrapper.classList.add("--portrait")) : (this.app.getSettings().autoSize && (this.wrapper.style.paddingBottom = this.app.getSettings().height / (2 * this.app.getSettings().width) * 100 + "%"),
            this.wrapper.classList.add("--landscape")),
            this.update()
        }
        removeHandlers() {
            window.removeEventListener("resize", this.onResize),
            this.distElement.removeEventListener("mousedown", this.onMouseDown),
            this.distElement.removeEventListener("touchstart", this.onTouchStart),
            window.removeEventListener("mousemove", this.onMouseMove),
            window.removeEventListener("touchmove", this.onTouchMove),
            window.removeEventListener("mouseup", this.onMouseUp),
            window.removeEventListener("touchend", this.onTouchEnd)
        }
        setHandlers() {
            this.distElement.addEventListener("mousedown", this.onMouseDown),
            this.distElement.addEventListener("touchstart", this.onTouchStart),
            window.addEventListener("mousemove", this.onMouseMove),
            window.addEventListener("touchmove", this.onTouchMove, {
                passive: !this.app.getSettings().mobileScrollSupport
            }),
            window.addEventListener("mouseup", this.onMouseUp),
            window.addEventListener("touchend", this.onTouchEnd)
        }
        getMousePos(t, e) {
            const i = this.distElement.getBoundingClientRect();
            return {
                x: t - i.left,
                y: e - i.top
            }
        }
    }
    class c extends p {
        constructor(t, e, i, s) {
            super(t, e, i),
            this.wrapper.insertAdjacentHTML("afterbegin", '<div class="stf__block"></div>'),
            console.log(s);
            this.distElement = t.querySelector(".stf__block");
            for (const t of s)
                this.distElement.appendChild(t);
            this.setHandlers()
        }
        updateItems(t) {
            this.removeHandlers(),
            this.distElement.innerHTML = "";
            for (const e of t)
                this.distElement.appendChild(e);
            this.setHandlers()
        }
        update() {
            this.app.getRender().update()
        }
    }
    class u extends p {
        constructor(t, e, i) {
            super(t, e, i),
            this.wrapper.innerHTML = '<canvas class="stf__canvas"></canvas>',
            this.canvas = t.querySelectorAll("canvas")[0],
            this.distElement = this.canvas,
            this.resizeCanvas(),
            this.setHandlers()
        }
        resizeCanvas() {
            const t = getComputedStyle(this.canvas)
              , e = parseInt(t.getPropertyValue("width"), 10)
              , i = parseInt(t.getPropertyValue("height"), 10);
            this.canvas.width = e,
            this.canvas.height = i
        }
        getCanvas() {
            return this.canvas
        }
        update() {
            this.resizeCanvas(),
            this.app.getRender().update()
        }
    }
    class w extends g {
        constructor(t, e, i, s) {
            super(t, e),
            this.outerShadow = null,
            this.innerShadow = null,
            this.hardShadow = null,
            this.hardInnerShadow = null,
            this.element = i,
            this.items = s
        }
        getBlockWidth() {
            return this.element.offsetWidth
        }
        getBlockHeight() {
            return this.element.offsetHeight
        }
        clearShadow() {
            super.clearShadow(),
            this.outerShadow.remove(),
            this.innerShadow.remove(),
            this.hardShadow.remove(),
            this.hardInnerShadow.remove(),
            this.outerShadow = null,
            this.innerShadow = null,
            this.hardShadow = null,
            this.hardInnerShadow = null
        }
        drawShadow(t, e, i, s, n) {
            super.drawShadow(t, e, i, s, n),
            null === this.outerShadow && (this.element.insertAdjacentHTML("beforeend", '<div class="stf__outerShadow"></div>'),
            this.outerShadow = this.element.querySelector(".stf__outerShadow"),
            this.outerShadow.style.zIndex = (this.getSettings().startZIndex + 10).toString(10)),
            null === this.innerShadow && (this.element.insertAdjacentHTML("beforeend", '<div class="stf__innerShadow"></div>'),
            this.innerShadow = this.element.querySelector(".stf__innerShadow"),
            this.innerShadow.style.zIndex = (this.getSettings().startZIndex + 10).toString(10)),
            null === this.hardShadow && (this.element.insertAdjacentHTML("beforeend", '<div class="stf__hardShadow"></div>'),
            this.hardShadow = this.element.querySelector(".stf__hardShadow"),
            this.hardShadow.style.zIndex = (this.getSettings().startZIndex + 4).toString(10)),
            null === this.hardInnerShadow && (this.element.insertAdjacentHTML("beforeend", '<div class="stf__hardInnerShadow"></div>'),
            this.hardInnerShadow = this.element.querySelector(".stf__hardInnerShadow"),
            this.hardInnerShadow.style.zIndex = (this.getSettings().startZIndex + 4).toString(10))
        }
        drawHardInnerShadow() {
            const t = this.getRect()
              , e = this.shadow.progress > 100 ? 200 - this.shadow.progress : this.shadow.progress;
            let i = (100 - e) * (2.5 * t.pageWidth) / 100 + 20;
            i > t.pageWidth && (i = t.pageWidth),
            this.hardInnerShadow.style.width = i + "px",
            this.hardInnerShadow.style.height = t.height + "px",
            this.hardInnerShadow.style.background = "linear-gradient(to right, rgba(0, 0, 0, " + this.shadow.opacity * e / 100 + ") 5%, rgba(0, 0, 0, 0) 100% )",
            this.hardInnerShadow.style.left = t.left + t.width / 2 + "px",
            this.hardInnerShadow.style.transformOrigin = "0 0",
            this.hardInnerShadow.style.transform = 0 === this.getDirection() && this.shadow.progress > 100 || 1 === this.getDirection() && this.shadow.progress <= 100 ? this.hardInnerShadow.style.transform = "translate3d(0, 0, 0)" : this.hardInnerShadow.style.transform = "translate3d(0, 0, 0) rotateY(180deg)"
        }
        drawHardOuterShadow() {
            const t = this.getRect();
            let e = (100 - (this.shadow.progress > 100 ? 200 - this.shadow.progress : this.shadow.progress)) * (2.5 * t.pageWidth) / 100 + 20;
            e > t.pageWidth && (e = t.pageWidth),
            this.hardShadow.style.width = e + "px",
            this.hardShadow.style.height = t.height + "px",
            this.hardShadow.style.background = "linear-gradient(to left, rgba(0, 0, 0, " + this.shadow.opacity + ") 5%, rgba(0, 0, 0, 0) 100% )",
            this.hardShadow.style.left = t.left + t.width / 2 + "px",
            this.hardShadow.style.transformOrigin = "0 0",
            this.hardShadow.style.transform = 0 === this.getDirection() && this.shadow.progress > 100 || 1 === this.getDirection() && this.shadow.progress <= 100 ? this.hardShadow.style.transform = "translate3d(0, 0, 0) rotateY(180deg)" : this.hardShadow.style.transform = "translate3d(0, 0, 0)"
        }
        drawInnerShadow() {
            const t = this.getRect()
              , e = 3 * this.shadow.width / 4
              , i = 0 === this.getDirection() ? e : 0
              , s = 0 === this.getDirection() ? "to left" : "to right"
              , n = this.convertToGlobal(this.shadow.pos)
              , r = this.shadow.angle + 3 * Math.PI / 2;
            this.innerShadow.style.width = e + "px",
            this.innerShadow.style.height = 2 * t.height + "px",
            this.innerShadow.style.background = "linear-gradient(" + s + ", rgba(0, 0, 0, " + this.shadow.opacity + ") 5%, rgba(0, 0, 0, 0.05) 15%,rgba(0, 0, 0, " + this.shadow.opacity + ") 35%, rgba(0, 0, 0, 0) 100% )",
            this.innerShadow.style.transformOrigin = i + "px 100px",
            this.innerShadow.style.transform = "translate3d(" + (n.x - i) + "px, " + (n.y - 100) + "px, 0) rotate(" + r + "rad)";
            const a = [this.pageRect.topLeft, this.pageRect.topRight, this.pageRect.bottomRight, this.pageRect.bottomLeft];
            let o = "polygon( ";
            for (const t of a) {
                let e = 1 === this.getDirection() ? {
                    x: -t.x + this.shadow.pos.x,
                    y: t.y - this.shadow.pos.y
                } : {
                    x: t.x - this.shadow.pos.x,
                    y: t.y - this.shadow.pos.y
                };
                e = h.GetRotatedPoint(e, {
                    x: i,
                    y: 100
                }, r),
                o += e.x + "px " + e.y + "px, "
            }
            o = o.slice(0, -2),
            o += ")",
            this.innerShadow.style.clipPath = o,
            this.innerShadow.style.setProperty("-webkit-clip-path", o)
        }
        drawOuterShadow() {
            const t = this.getRect()
              , e = this.convertToGlobal({
                x: this.shadow.pos.x,
                y: this.shadow.pos.y
            })
              , i = this.shadow.angle + 3 * Math.PI / 2
              , s = 1 === this.getDirection() ? this.shadow.width : 0
              , n = 0 === this.getDirection() ? "to right" : "to left";
            this.outerShadow.style.width = this.shadow.width + "px",
            this.outerShadow.style.height = 2 * t.height + "px",
            this.outerShadow.style.background = "linear-gradient(" + n + ", rgba(0, 0, 0, " + this.shadow.opacity + "), rgba(0, 0, 0, 0))",
            this.outerShadow.style.transformOrigin = s + "px 100px",
            this.outerShadow.style.transform = "translate3d(" + (e.x - s) + "px, " + (e.y - 100) + "px, 0) rotate(" + i + "rad)";
            const r = [];
            r.push({
                x: 0,
                y: 0
            }, {
                x: t.pageWidth,
                y: 0
            }, {
                x: t.pageWidth,
                y: t.height
            }, {
                x: 0,
                y: t.height
            });
            let a = "polygon( ";
            for (const t of r)
                if (null !== t) {
                    let e = 1 === this.getDirection() ? {
                        x: -t.x + this.shadow.pos.x,
                        y: t.y - this.shadow.pos.y
                    } : {
                        x: t.x - this.shadow.pos.x,
                        y: t.y - this.shadow.pos.y
                    };
                    e = h.GetRotatedPoint(e, {
                        x: s,
                        y: 100
                    }, i),
                    a += e.x + "px " + e.y + "px, "
                }
            a = a.slice(0, -2),
            a += ")",
            this.outerShadow.style.clipPath = a,
            this.outerShadow.style.setProperty("-webkit-clip-path", a)
        }
        drawLeftPage() {
            null !== this.leftPage && ("portrait" !== this.orientation ? 1 === this.direction && null !== this.flippingPage && "hard" === this.flippingPage.getDrawingDensity() ? (this.leftPage.getElement().style.zIndex = (this.getSettings().startZIndex + 5).toString(10),
            this.flippingPage === this.bottomPage && this.leftPage.clearSaved(),
            this.leftPage.setHardDrawingAngle(180 + this.flippingPage.getHardAngle()),
            this.leftPage.draw(this.flippingPage.getDrawingDensity())) : this.leftPage.simpleDraw(0) : this.leftPage.clearSaved())
        }
        drawRightPage() {
            null !== this.rightPage && (0 === this.direction && null !== this.flippingPage && "hard" === this.flippingPage.getDrawingDensity() ? (this.rightPage.getElement().style.zIndex = (this.getSettings().startZIndex + 5).toString(10),
            this.flippingPage === this.bottomPage && this.rightPage.clearSaved(),
            this.rightPage.setHardDrawingAngle(180 + this.flippingPage.getHardAngle()),
            this.rightPage.draw(this.flippingPage.getDrawingDensity())) : this.rightPage.simpleDraw(1))
        }
        drawBottomPage() {
            if (null === this.bottomPage)
                return;
            const t = null != this.flippingPage ? this.flippingPage.getDrawingDensity() : null;
            "portrait" === this.orientation && 1 === this.direction || (this.bottomPage.getElement().style.zIndex = (this.getSettings().startZIndex + 3).toString(10),
            this.bottomPage.draw(t))
        }
        drawFrame(t) {
            this.clear(),
            this.drawLeftPage(),
            this.drawRightPage(),
            this.drawBottomPage(),
            null != this.flippingPage && (this.flippingPage.getElement().style.zIndex = (this.getSettings().startZIndex + 5).toString(10),
            this.flippingPage.draw()),
            null != this.shadow && null !== this.flippingPage && ("soft" === this.flippingPage.getDrawingDensity() ? (this.drawOuterShadow(),
            this.drawInnerShadow()) : (this.drawHardOuterShadow(),
            this.drawHardInnerShadow()))
        }
        clear() {
            const t = [];
            this.leftPage && t.push(this.leftPage.getElement()),
            this.rightPage && t.push(this.rightPage.getElement()),
            this.flippingPage && t.push(this.flippingPage.getElement()),
            this.bottomPage && t.push(this.bottomPage.getElement());
            for (const e of this.items)
                t.includes(e) || (e.style.display = "none",
                e.style.zIndex = (this.getSettings().startZIndex + 1).toString(10),
                e.style.transform = "")
        }
        setRightPage(t) {
            null !== this.rightPage && t !== this.rightPage && this.rightPage.clearSaved(),
            super.setRightPage(t)
        }
        setLeftPage(t) {
            null !== this.leftPage && t !== this.rightPage && this.leftPage.clearSaved(),
            super.setLeftPage(t)
        }
        update() {
            super.update(),
            null !== this.rightPage && (this.rightPage.setOrientation(1),
            this.rightPage.clearSaved()),
            null !== this.leftPage && (this.leftPage.setOrientation(0),
            this.leftPage.clearSaved())
        }
    }
    class m {
        constructor() {
            this._default = {
                startPage: 0,
                size: "fixed",
                width: 0,
                height: 0,
                minWidth: 0,
                maxWidth: 0,
                minHeight: 0,
                maxHeight: 0,
                drawShadow: !0,
                flippingTime: 1e3,
                usePortrait: !0,
                startZIndex: 0,
                autoSize: !0,
                maxShadowOpacity: 1,
                showCover: !1,
                mobileScrollSupport: !0
            }
        }
        getSettings(t) {
            const e = this._default;
            if (Object.assign(e, t),
            "stretch" !== e.size && "fixed" !== e.size)
                throw new Error('Invalid size type. Available only "fixed" and "stretch" value');
            if (e.width <= 0 || e.height <= 0)
                throw new Error("Invalid width or height");
            if (e.flippingTime <= 0)
                throw new Error("Invalid flipping time");
            return e.minWidth <= 0 && (e.minWidth = e.width),
            e.maxWidth < e.minWidth && (e.maxWidth = e.minWidth),
            e.minHeight <= 0 && (e.minHeight = e.height),
            e.maxHeight < e.minHeight && (e.maxHeight = e.minHeight),
            e
        }
    }
    !function(t, e) {
        void 0 === e && (e = {});
        var i = e.insertAt;
        if (t && "undefined" != typeof document) {
            var s = document.head || document.getElementsByTagName("head")[0]
              , n = document.createElement("style");
            n.type = "text/css",
            "top" === i && s.firstChild ? s.insertBefore(n, s.firstChild) : s.appendChild(n),
            n.styleSheet ? n.styleSheet.cssText = t : n.appendChild(document.createTextNode(t))
        }
    }(".stf__parent {\n  position: relative;\n  display: block;\n  box-sizing: border-box;\n  transform: translateZ(0);\n}\n\n.sft__wrapper {\n  position: relative;\n  width: 100%;\n  box-sizing: border-box;\n}\n\n.stf__parent canvas {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n}\n\n.stf__block {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  perspective: 2000px;\n}\n\n.stf__item {\n  display: none;\n  position: absolute;\n  transform-style: preserve-3d;\n\n}\n\n.stf__outerShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.stf__innerShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.stf__hardShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.stf__hardInnerShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}");
    t.PageFlip = class extends class {
        constructor() {
            this.events = {}
        }
        on(t, e) {
            return t in this.events ? this.events[t].push(e) : this.events[t] = [e],
            this
        }
        off(t) {
            delete this.events[t]
        }
        trigger(t, e, i=null) {
            t in this.events && this.events[t].forEach(t=>{
                t({
                    data: i,
                    object: e
                })
            }
            )
        }
    }
    {
        constructor(t, e) {
            super(),
            this.isUserTouch = !1,
            this.isUserMove = !1,
            this.setting = null,
            this.pages = null;
            try {
                this.setting = (new m).getSettings(e),
                this.block = t
            } catch (t) {
                console.log(t)
            }
        }
        destroy() {
            this.ui.destroy(),
            this.block.remove()
        }
        update() {
            this.render.update(),
            this.pages.show()
        }
        turnToPrevPage() {
            this.pages.showPrev()
        }
        turnToNextPage() {
            this.pages.showNext()
        }
        turnToPage(t) {
            this.pages.show(t)
        }
        flipNext(t="top") {
            this.flipController.flipNext(t)
        }
        flipPrev(t="top") {
            this.flipController.flipPrev(t)
        }
        flip(t, e="top") {
            this.flipController.flipToPage(t, e)
        }
        loadFromImages(t) {
            this.ui = new u(this.block,this,this.setting);
            const e = this.ui.getCanvas();
            this.render = new d(this,this.setting,e),
            this.flipController = new l(this.render,this),
            this.pages = new n(this,this.render,t),
            this.pages.load(),
            this.render.start(),
            this.pages.show(this.setting.startPage),
            setTimeout(()=>this.ui.update(), 1)
        }
        updateFromImages(t) {
            const e = this.pages.getCurrentPageIndex();
            this.pages.destroy(),
            this.pages = new n(this,this.render,t),
            this.pages.load(),
            this.pages.show(e)
        }
        loadFromHTML(t) {
            this.ui = new c(this.block,this,this.setting,t),
            this.render = new w(this,this.setting,this.ui.getDistElement(),t),
            this.flipController = new l(this.render,this),
            this.pages = new a(this,this.render,this.ui.getDistElement(),t),
            this.pages.load(),
            this.render.start(),
            this.pages.show(this.setting.startPage),
            setTimeout(()=>this.ui.update(), 1)
        }
        updateFromHtml(t) {
            const e = this.pages.getCurrentPageIndex();
            this.pages.destroy(),
            this.pages = new a(this,this.render,this.ui.getDistElement(),t),
            this.pages.load(),
            this.ui.updateItems(t),
            this.pages.show(e)
        }
        updateState(t) {
            this.trigger("changeState", this, t)
        }
        updatePageIndex(t) {
            this.trigger("flip", this, t)
        }
        updateOrientation(t) {
            this.ui.setOrientationStyle(t),
            this.update(),
            this.trigger("changeOrientation", this, t)
        }
        getPageCount() {
            return this.pages.getPageCount()
        }
        getCurrentPageIndex() {
            return this.pages.getCurrentPageIndex()
        }
        getPage(t) {
            return this.pages.getPage(t)
        }
        getRender() {
            return this.render
        }
        getFlipController() {
            return this.flipController
        }
        getOrientation() {
            return this.render.getOrientation()
        }
        getBoundsRect() {
            return this.render.getRect()
        }
        getSettings() {
            return this.setting
        }
        getUI() {
            return this.ui
        }
        getState() {
            return this.flipController.getState()
        }
        getPageCollection() {
            return this.pages
        }
        startUserTouch(t) {
            this.mousePosition = t,
            this.isUserTouch = !0,
            this.isUserMove = !1
        }
        userMove(t, e) {
            this.isUserTouch || e ? this.isUserTouch && h.GetDestinationFromTwoPoint(this.mousePosition, t) > 5 && (this.isUserMove = !0,
            this.flipController.fold(t)) : this.flipController.showCorner(t)
        }
        userStop(t, e=!1) {
            this.isUserTouch && (this.isUserTouch = !1,
            e || (this.isUserMove ? this.flipController.stopMove() : this.flipController.flip(t)))
        }
    }
    ,
    Object.defineProperty(t, "__esModule", {
        value: !0
    })
}
));
;
document.addEventListener('DOMContentLoaded', function() {
    const pageFlip = new St.PageFlip(document.getElementById("demoBookExample"), {
        width: 550,
        height: 733,
        size: "stretch",
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1350,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false
    });
    pageFlip.loadFromHTML(document.querySelectorAll("#library_detail .page"));
    var classn = document.querySelector("#start").dataset.pclass;
    var pname = document.querySelector("#start").className;
    document.querySelector("#start").className = pname + " " + classn;
    document.querySelector(".page-total").innerText = pageFlip.getPageCount();
    document.querySelector(".page-orientation").innerText = pageFlip.getOrientation();
    document.querySelector(".btn-prev").addEventListener("click", () => {
        pageFlip.flipPrev();
    });
    document.querySelector(".btn-next").addEventListener("click", () => {
        pageFlip.flipNext();
    });
    pageFlip.on("flip", (e) => {
        document.querySelector(".page-current").innerText = e.data + 1;
    });
    pageFlip.on("changeState", (e) => {
        document.querySelector(".page-state").innerText = e.data;
    });
    pageFlip.on("changeOrientation", (e) => {
        document.querySelector(".page-orientation").innerText = e.data;
    });
});