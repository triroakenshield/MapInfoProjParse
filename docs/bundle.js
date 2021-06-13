/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CoordinateReferenceSystemDescriptions.ts":
/*!******************************************************!*\
  !*** ./src/CoordinateReferenceSystemDescriptions.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CoordinateReferenceSystemDescription": () => (/* binding */ CoordinateReferenceSystemDescription)
/* harmony export */ });
/* harmony import */ var _Datums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Datums */ "./src/Datums.ts");
/* harmony import */ var _Projections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Projections */ "./src/Projections.ts");
/* harmony import */ var _Parameters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Parameters */ "./src/Parameters.ts");
/* harmony import */ var _Units__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Units */ "./src/Units.ts");




var CoordinateReferenceSystemDescription = /** @class */ (function () {
    function CoordinateReferenceSystemDescription(name) {
        this.name = name;
    }
    CoordinateReferenceSystemDescription.prototype.toProj = function () {
        if (this.projection === undefined)
            return "undefined";
        return this.projection.toProj();
    };
    CoordinateReferenceSystemDescription.parse = function (desc) {
        var lastIndex = desc.lastIndexOf("\"");
        var crsName = desc.substr(1, lastIndex - 1);
        var str2 = desc.substr(lastIndex + 2, desc.length - (lastIndex + 2));
        var paramArray = str2.split(",");
        var crs = new CoordinateReferenceSystemDescription(crsName);
        var idProjectionTypes = Number.parseInt(paramArray[0]);
        var isAffine = false;
        var isBounds = false;
        switch (true) {
            case idProjectionTypes > 2999:
                isAffine = true;
                isBounds = true;
                idProjectionTypes -= 3000;
                break;
            case idProjectionTypes > 1999:
                isBounds = true;
                idProjectionTypes -= 2000;
                break;
            case idProjectionTypes > 999:
                isAffine = true;
                idProjectionTypes -= 1000;
                break;
        }
        var kp = 1;
        crs.projection = _Projections__WEBPACK_IMPORTED_MODULE_1__.Projection.dict.find(function (p) { return p.id === idProjectionTypes; });
        if (crs.projection === undefined)
            return crs;
        crs.projection.parameters.forEach(function (p) {
            switch (p.id) {
                case 1:
                    var idDatum = Number.parseInt(paramArray[kp]);
                    var wDatum = null;
                    switch (true) {
                        case idDatum < 999:
                            wDatum = _Datums__WEBPACK_IMPORTED_MODULE_0__.Datum.dict.find(function (d) { return d.id === idDatum; });
                            break;
                        case idDatum === 999:
                            wDatum = _Datums__WEBPACK_IMPORTED_MODULE_0__.Datum.parse(idDatum, Number.parseInt(paramArray[kp + 1]), Number.parseFloat(paramArray[kp + 2]), Number.parseFloat(paramArray[kp + 3]), Number.parseFloat(paramArray[kp + 4]));
                            kp += 4;
                            break;
                        case idDatum < 9999:
                            wDatum = _Datums__WEBPACK_IMPORTED_MODULE_0__.DatumExt.dict.find(function (d) { return d.id === idDatum; });
                            break;
                        case idDatum === 9999:
                            wDatum = _Datums__WEBPACK_IMPORTED_MODULE_0__.DatumExt.parseExt(idDatum, Number.parseInt(paramArray[kp + 1]), Number.parseFloat(paramArray[kp + 2]), Number.parseFloat(paramArray[kp + 3]), Number.parseFloat(paramArray[kp + 4]), Number.parseFloat(paramArray[kp + 5]), Number.parseFloat(paramArray[kp + 6]), Number.parseFloat(paramArray[kp + 7]), Number.parseFloat(paramArray[kp + 8]), Number.parseFloat(paramArray[kp + 9]));
                            kp += 9;
                            break;
                    }
                    p.value = wDatum;
                    break;
                case 2:
                    p.value = _Units__WEBPACK_IMPORTED_MODULE_3__.Unit.dict.find(function (u) { return u.id === Number.parseInt(paramArray[kp]); });
                    break;
                case 11:
                default:
                    p.value = Number.parseFloat(paramArray[kp]);
                    break;
            }
            kp++;
        });
        if (isAffine) {
            var au = Number.parseInt(paramArray[kp]);
            var aUnit = _Units__WEBPACK_IMPORTED_MODULE_3__.Unit.dict.find(function (u) { return u.id === au; });
            kp += 1;
            crs.affine = new _Parameters__WEBPACK_IMPORTED_MODULE_2__.Affine(aUnit, Number.parseFloat(paramArray[kp]), Number.parseFloat(paramArray[kp + 1]), Number.parseFloat(paramArray[kp + 2]), Number.parseFloat(paramArray[kp + 3]), Number.parseFloat(paramArray[kp + 4]), Number.parseFloat(paramArray[kp + 5]));
            kp += 6;
        }
        if (isBounds) {
            crs.bound = new _Parameters__WEBPACK_IMPORTED_MODULE_2__.Bound(Number.parseFloat(paramArray[kp]), Number.parseFloat(paramArray[kp + 1]), Number.parseFloat(paramArray[kp + 2]), Number.parseFloat(paramArray[kp + 3]));
        }
        return crs;
    };
    return CoordinateReferenceSystemDescription;
}());



/***/ }),

/***/ "./src/Datums.ts":
/*!***********************!*\
  !*** ./src/Datums.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Datum": () => (/* binding */ Datum),
/* harmony export */   "DatumExt": () => (/* binding */ DatumExt)
/* harmony export */ });
/* harmony import */ var _Descriptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Descriptions */ "./src/Descriptions.ts");
/* harmony import */ var _Ellipsoids__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ellipsoids */ "./src/Ellipsoids.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Datum = /** @class */ (function (_super) {
    __extends(Datum, _super);
    function Datum(id, epsg, name, proj, ellipsoidId, x, y, z) {
        var _this = _super.call(this, id, epsg, proj, name) || this;
        _this.ellipsoid = _Ellipsoids__WEBPACK_IMPORTED_MODULE_1__.Ellipsoid.dict.find(function (e) { return e.id === ellipsoidId; });
        _this.x = x;
        _this.y = y;
        _this.z = z;
        return _this;
    }
    Datum.prototype.toProj = function () {
        if (this.proj == null)
            return this.ellipsoid.toProj() + " +towgs84=" + this.x + "," + this.y + "," + this.z;
        return "+datum=" + this.proj;
    };
    Datum.parse = function (id, ellipsoidId, x, y, z) {
        return new Datum(id, -1, "userDef", null, ellipsoidId, x, y, z);
    };
    Datum.dict = [
        new Datum(1, 6201, "Adindan", null, 6, -162, -12, 206),
        new Datum(2, 6205, "Afgooye", null, 3, -43, -163, 45),
        new Datum(3, 6204, "AinelAbd1970", null, 4, -150, -251, -2),
        new Datum(4, 6708, "Anna1Astro1965", null, 2, -491, -22, 435),
        new Datum(5, 6209, "Arc1950", null, 15, -143, -90, -294),
        new Datum(6, 6210, "Arc1960", null, 6, -160, -8, -300),
        new Datum(7, 6712, "AscensionIsland1958", null, 4, -207, 107, 52),
        new Datum(8, -1, "AstroBeacon \"E\"", null, 4, 145, 75, -272),
        new Datum(9, -1, "AstroB4SorolAtoll", null, 4, 114, -116, -333),
        new Datum(10, -1, "AstroDOS71/4", null, 4, -320, 550, -494),
        new Datum(11, -1, "AstronomicStation1952", null, 4, 124, -234, -25),
        new Datum(12, 6202, "AustralianGeodetic1966", null, 2, -133, -48, 148),
        new Datum(13, 6203, "AustralianGeodetic1984", null, 2, -134, -48, 149),
        new Datum(14, 6714, "Bellevue(IGN)", null, 4, -127, -769, 472),
        new Datum(15, 6216, "Bermuda1957", null, 7, -73, 213, 296),
        new Datum(16, -1, "BogotaObservatory", null, 4, 307, 304, -318),
        new Datum(17, 6221, "CampoInchauspe", null, 4, -148, 136, 90),
        new Datum(18, -1, "CantonAstro1966", null, 4, 298, -304, -375),
        new Datum(19, 6222, "Cape", null, 6, -136, -108, -292),
        new Datum(20, 6717, "CapeCanaveral", null, 7, -2, 150, 181),
        new Datum(21, 6223, "Carthage", "carthage", 6, -263, 6, 431),
        new Datum(22, 6672, "Chatham1971", null, 4, 175, -38, 113),
        new Datum(23, 6224, "ChuaAstro", null, 4, -134, 229, -29),
        new Datum(24, 1074, "CorregoAlegre", null, 4, -206, 172, -6),
        new Datum(25, 6813, "Djakarta(Batavia)", null, 10, -377, 681, -50),
        new Datum(26, -1, "DOS1968", null, 4, 230, -199, -752),
        new Datum(27, 6719, "EasterIsland1967", null, 4, 211, 147, 111),
        new Datum(28, 6230, "European1950", null, 4, -87, -98, -121),
        new Datum(29, 6668, "European1979", null, 4, -86, -98, -119),
        new Datum(30, 6685, "GandajikaBase", null, 4, -133, -321, 50),
        new Datum(31, -1, "GeodeticDatum1949", null, 4, 84, -22, 209),
        new Datum(32, -1, "GRS67", null, 21, 0, 0, 0),
        new Datum(33, -1, "GRS80", null, 0, 0, 0, 0),
        new Datum(34, 6675, "Guam1963", null, 7, -100, -248, 259),
        new Datum(35, -1, "GUX1Astro", null, 4, 252, -209, -751),
        new Datum(36, 6254, "HitoXVIII1963", null, 4, 16, 196, 93),
        new Datum(37, 6658, "Hjorsey1955", null, 4, -73, 46, -86),
        new Datum(38, 6738, "HongKong1963", null, 4, -156, -271, -189),
        new Datum(39, 6236, "Hu-Tzu-Shan", null, 4, -634, -549, -201),
        new Datum(40, -1, "Indian(Thailand/Vietnam)", null, 11, 214, 836, 303),
        new Datum(41, -1, "Indian(Bangladesh", null, 11, 289, 734, 257),
        new Datum(42, -1, "Ireland1965", null, 13, 506, -122, 611),
        new Datum(43, -1, "ISTS073Astro1969", null, 4, 208, -435, -229),
        new Datum(44, 6725, "JohnstonIsland1961", null, 4, 191, -77, -204),
        new Datum(45, 6244, "Kandawala", null, 11, -97, 787, 86),
        new Datum(46, -1, "KerguelenIsland", null, 4, 145, -187, 103),
        new Datum(47, 6751, "Kertau1948", null, 17, -11, 851, 5),
        new Datum(48, -1, "L.C.5Astro", null, 7, 42, 124, 147),
        new Datum(49, 6251, "Liberia1964", null, 6, -90, 40, 88),
        new Datum(50, -1, "Luzon(Philippines)", null, 7, -133, -77, -51),
        new Datum(51, -1, "Luzon(MindanaoIsland)", null, 7, -133, -79, -72),
        new Datum(52, 6256, "Mahe1971", null, 6, 41, -220, -134),
        new Datum(53, -1, "MarcoAstro", null, 4, -289, -124, 60),
        new Datum(54, 6262, "Massawa", null, 10, 639, 405, 60),
        new Datum(55, 6261, "Merchich", null, 16, 31, 146, 47),
        new Datum(56, 6727, "MidwayAstro1961", null, 4, 912, -58, 1227),
        new Datum(57, 6263, "Minna", null, 6, -92, -93, 122),
        new Datum(58, -1, "Nahrwan(MasirahIsland)", null, 6, -247, -148, 369),
        new Datum(59, -1, "Nahrwan(Un.ArabEmirates)", null, 6, -249, -156, 381),
        new Datum(60, -1, "Nahrwan(SaudiArabia)", null, 6, -231, -196, 482),
        new Datum(61, -1, "Naparima", null, 4, -2, 374, 172),
        new Datum(62, -1, "NAD27(ContinentalUS)", "NAD27", 7, -8, 160, 176),
        new Datum(63, -1, "NAD27(Alaska)", "NAD27", 7, -5, 135, 172),
        new Datum(64, -1, "NAD27(Bahamas)", "NAD27", 7, -4, 154, 178),
        new Datum(65, -1, "NAD27(SanSalvador)", "NAD27", 7, 1, 140, 165),
        new Datum(66, -1, "NAD27(Canada)", "NAD27", 7, -10, 158, 187),
        new Datum(67, -1, "NAD27(CanalZone)", "NAD27", 7, 0, 125, 201),
        new Datum(68, -1, "NAD27(Caribbean)", "NAD27", 7, -7, 152, 178),
        new Datum(69, -1, "NAD27(CentralAmerica)", "NAD27", 7, 0, 125, 194),
        new Datum(70, -1, "NAD27(Cuba)", "NAD27", 7, -9, 152, 178),
        new Datum(71, -1, "NAD27(Greenland)", "NAD27", 7, 11, 114, 195),
        new Datum(72, -1, "NAD27(Mexico)", "NAD27", 7, -12, 130, 190),
        new Datum(73, -1, "NAD27(Michigan)", "NAD27", 8, -8, 160, 176),
        new Datum(74, -1, "NAD83", "NAD83", 0, 0, 0, 0),
        new Datum(75, 6129, "Observatorio1966", null, 4, -425, -169, 81),
        new Datum(76, -1, "OldEgyptian", null, 22, -130, 110, -13),
        new Datum(77, 6135, "OldHawaiian", null, 7, 61, -285, -181),
        new Datum(78, -1, "Oman", null, 6, -346, -1, 224),
        new Datum(79, 5101, "OrdnanceSurveyGreatBrit.", null, 9, 375, -111, 431),
        new Datum(80, 6728, "PicodelasNieves", null, 4, -307, -92, 127),
        new Datum(81, 6729, "PitcairnAstro1967", null, 4, 185, 165, 42),
        new Datum(82, 6248, "ProvisionalSouthAmerican", null, 4, -288, 175, -376),
        new Datum(83, 6139, "PuertoRico", null, 7, 11, 72, -101),
        new Datum(84, 6614, "QatarNational", null, 4, -128, -283, 22),
        new Datum(85, 6287, "Qornoq", null, 4, 164, 138, -189),
        new Datum(86, 6626, "Reunion", null, 4, 94, -948, -1262),
        new Datum(87, -1, "Rome1940", null, 4, -225, -65, 9),
        new Datum(88, -1, "Santo(DOS)", null, 4, 170, 42, 84),
        new Datum(89, -1, "SaoBraz", null, 4, -203, 141, 53),
        new Datum(90, 6292, "SapperHill1943", null, 4, -355, 16, 74),
        new Datum(91, 6293, "Schwarzeck", null, 14, 616, 97, -251),
        new Datum(92, 6291, "SouthAmerican1969", null, 24, -57, 1, -41),
        new Datum(93, -1, "SouthAsia", null, 19, 7, -10, -26),
        new Datum(94, -1, "SoutheastBase", null, 4, -499, -249, 314),
        new Datum(95, -1, "SouthwestBase", null, 4, -104, 167, -38),
        new Datum(96, 6298, "Timbalai1948", null, 11, -689, 691, -46),
        new Datum(97, 6301, "Tokyo", null, 10, -128, 481, 664),
        new Datum(98, 6734, "TristanAstro1968", null, 4, -632, 438, -609),
        new Datum(99, 6731, "VitiLevu1916", null, 6, 51, 391, -36),
        new Datum(100, -1, "Wake-Eniwetok1960", null, 23, 101, 52, -39),
        new Datum(101, -1, "WGS60", null, 26, 0, 0, 0),
        new Datum(102, 6760, "WGS66", null, 27, 0, 0, 0),
        new Datum(103, 6322, "WGS72", null, 1, 0, 8, 10),
        new Datum(104, 6326, "WGS84", "WGS84", 28, 0, 0, 0),
        new Datum(105, 6309, "Yacare", null, 4, -155, 171, 37),
        new Datum(106, 6311, "Zanderij", null, 4, -265, 120, -358),
        new Datum(107, 6275, "NTF(Greenwichmeridian)", null, 30, -168, -60, 320),
        new Datum(108, 6231, "European1987", null, 4, -83, -96, -113),
        new Datum(109, -1, "NetherlandsBessel", null, 10, 593, 26, 478),
        new Datum(110, -1, "BelgiumHayford", null, 4, 81, 120, 129),
        new Datum(111, -1, "NWGL10", null, 1, -1, 15, 1),
        new Datum(112, -1, "RT90(Sweden)", null, 10, 498, -36, 568),
        new Datum(113, -1, "Lisboa(DLx)", null, 4, -303, -62, 105),
        new Datum(114, -1, "Melrica1973(D73)", null, 4, -223, 110, 37),
        new Datum(115, 6258, "EUREF89", null, 0, 0, 0, 0),
        new Datum(116, 6283, "GDA94", null, 0, 0, 0, 0),
        new Datum(117, 6167, "NZGD2000", null, 0, 0, 0, 0),
        new Datum(118, 6169, "AmericanSamoa", null, 7, -115, 118, 426),
        new Datum(119, 6601, "AntiguaIslandAstro1943", null, 6, -270, 13, 62),
        new Datum(120, 6713, "AyabelleLighthouse", null, 6, -79, -129, 145),
        new Datum(121, 6219, "BukitRimpah", null, 10, -384, 664, -48),
        new Datum(122, -1, "Estonia1937", null, 10, 374, 150, 588),
        new Datum(123, 6155, "Dabola", null, 6, -83, 37, 124),
        new Datum(124, 6736, "DeceptionIsland", null, 6, 260, 12, -147),
        new Datum(125, -1, "FortThomas1955", null, 6, -7, 215, 225),
        new Datum(126, -1, "GraciosaBaseSW1948", null, 4, -104, 167, -38),
        new Datum(127, 6255, "HeratNorth", null, 4, -333, -222, 114),
        new Datum(128, -1, "Hermannskogel", null, 10, 682, -203, 480),
        new Datum(129, -1, "Indian(Pakistan)", null, 50, 283, 682, 231),
        new Datum(130, 6239, "Indian1954", null, 11, 217, 823, 299),
        new Datum(131, 6131, "Indian1960", null, 11, 198, 881, 317),
        new Datum(132, 6240, "Indian1975", null, 11, 210, 814, 289),
        new Datum(133, 6238, "Indonesian1974", null, 41, -24, -15, 5),
        new Datum(134, -1, "ISTS061Astro1968", null, 4, -794, 119, -298),
        new Datum(135, 6735, "KusaieAstro1951", null, 4, 647, 1777, -1124),
        new Datum(136, 6250, "Leigon", null, 6, -130, 29, 364),
        new Datum(137, 6604, "MontserratIsl.Astro1958", null, 6, 174, 359, 365),
        new Datum(138, 6266, "M'Poraloko", null, 6, -74, -130, 42),
        new Datum(139, 6307, "NorthSahara1959", null, 6, -186, -93, 310),
        new Datum(140, -1, "ObservatorioMeteor.1939", null, 4, -425, -169, 81),
        new Datum(141, 6620, "Point58", null, 6, -106, -129, 165),
        new Datum(142, -1, "PointeNoire1948", null, 6, -148, 51, -291),
        new Datum(143, 6615, "PortoSanto1936", null, 4, -499, -249, 314),
        new Datum(144, 6616, "SelvagemGrande1938", null, 4, -289, -124, 60),
        new Datum(145, -1, "SierraLeone1960", null, 6, -88, 4, 101),
        new Datum(146, -1, "S-JTSK", null, 10, 589, 76, 480),
        new Datum(147, 6297, "TananariveObservatory1925", null, 4, -189, -242, -91),
        new Datum(148, 6304, "Voirol1874", null, 6, -73, -247, 227),
        new Datum(149, -1, "Voirol1960", null, 6, -123, -206, 219),
        new Datum(150, 6148, "Hartbeesthoek94", null, 28, 0, 0, 0),
        new Datum(151, 6122, "ATS77", null, 51, 0, 0, 0),
        new Datum(152, 6612, "JGD2000", null, 0, 0, 0, 0),
        new Datum(153, -1, "HGRS87", "GGRS87", 0, -199.87, 74.79, 246.62),
        new Datum(154, 6214, "Beijing 1954", null, 3, -31.4, 144.3, 81.2)
    ];
    return Datum;
}(_Descriptions__WEBPACK_IMPORTED_MODULE_0__.Description));

var DatumExt = /** @class */ (function (_super) {
    __extends(DatumExt, _super);
    function DatumExt(id, epsg, name, proj, ellipsoidId, x, y, z, rX, rY, rZ, sc, pM) {
        var _this = _super.call(this, id, epsg, name, proj, ellipsoidId, x, y, z) || this;
        _this.rotationX = rX;
        _this.rotationY = rY;
        _this.rotationZ = rZ;
        _this.scalePpm = sc;
        _this.primeMeridian = pM;
        return _this;
    }
    DatumExt.prototype.toProj = function () {
        if (this.proj == null) {
            var res = this.ellipsoid.toProj() + " +towgs84=" + this.x + "," + this.y + "," + this.z + ",\n" + this.rotationX * -1 + "," + this.rotationY * -1 + "," + this.rotationZ * -1 + "," + this.scalePpm;
            if (this.primeMeridian !== 0) {
                res = res + " +pm=" + this.primeMeridian;
            }
            return res;
        }
        return "+datum=" + this.proj;
    };
    DatumExt.parseExt = function (id, ellipsoidId, x, y, z, rX, rY, rZ, sc, pM) {
        return new DatumExt(id, -1, "userDef", null, ellipsoidId, x, y, z, rX, rY, rZ, sc, pM);
    };
    DatumExt.dict = [
        new DatumExt(1000, 6314, "DHDN (Potsdam/Rauenberg)", null, 10, 582, 105, 414, -1.04, -0.35, 3.08, 8.3, 0),
        new DatumExt(1001, 6284, "Pulkovo 1942", null, 3, 24, -123, -94, -0.02, 0.25, 0.13, 1.1, 0),
        new DatumExt(1002, 6807, "NTF (Paris meridian)", null, 30, -168, -60, 320, 0, 0, 0, 0, 2.33723),
        new DatumExt(1003, 6149, "CH 1903 (Switzerland)", null, 10, 660.077, 13.551, 369.344, 0.804816, 0.577692, 0.952236, 5.66, 0),
        new DatumExt(1004, 6237, "HD72 (Hungarian Datum of 1972)", null, 21, -56, 75.77, 15.31, -0.37, -0.2, -0.21, -1.01, 0),
        new DatumExt(1005, -1, "Cape (South Africa)", null, 28, -134.73, -110.92, -292.66, 0, 0, 0, 1, 0),
        new DatumExt(1006, -1, "Australia National (AGD84)", null, 2, -117.763, -51.51, 139.061, -0.292, -0.443, -0.277, -0.191, 0),
        new DatumExt(1007, -1, "Australia A.C.T. (AGD66)", null, 2, -129.193, -41.212, 130.73, -0.246, -0.374, -0.329, -2.955, 0),
        new DatumExt(1008, -1, "Australia Tasmania (AGD66)", null, 2, -120.271, -64.543, 161.632, -0.2175, 0.0672, 0.1291, 2.4985, 0),
        new DatumExt(1009, -1, "Australia Victoria/NSW (AGD66)", null, 2, -119.353, -48.301, 139.484, -0.415, -0.26, -0.437, -0.613, 0),
        new DatumExt(1010, 6272, "New Zealand Geodetic Datum 1949", "nzgd49", 4, 59.47, -5.04, 187.44, -0.47, 0.1, -1.024, -4.5993, 0),
        new DatumExt(1011, -1, "Sweden (RT 90)", null, 10, 419.384, 99.3335, 591.345, -0.850389, -1.81728, 7.86224, -0.99496, 0),
        new DatumExt(1012, -1, "Russia PZ90", null, 52, -1.08, -0.27, -0.9, 0, 0, -0.16, -0.12, 0),
        new DatumExt(1013, -1, "Russia SK42", null, 52, 23.92, -141.27, -80.9, 0, -0.35, -0.82, -0.12, 0),
        new DatumExt(1014, -1, "Russia SK95", null, 52, 24.82, -131.21, -82.66, 0, 0, -0.16, -0.12, 0),
        new DatumExt(1015, -1, "Tokyo97", null, 10, -146.414, 507.337, 680.507, 0, 0, 0, 0, 0),
        new DatumExt(1016, -1, "KKJ", null, 4, -96.062, -82.428, -121.754, -4.801, -0.345, 1.376, 1.496, 0),
        new DatumExt(1017, 6610, "Xian 1980", null, 53, 24, -123, -94, -0.02, -0.25, 0.13, 1.1, 0),
        new DatumExt(1018, -1, "Lithuanian Pulkovo 1942", null, 3, -40.5953, -18.5498, -69.3396, -2.508, -1.8319, 2.6114, -4.2991, 0),
        new DatumExt(1019, -1, "Belgian 1972 7 Parameter", null, 4, -99.059, 53.322, -112.486, -0.419, 0.83, -1.885, 0.999999, 0)
    ];
    return DatumExt;
}(Datum));



/***/ }),

/***/ "./src/Descriptions.ts":
/*!*****************************!*\
  !*** ./src/Descriptions.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Description": () => (/* binding */ Description)
/* harmony export */ });
var Description = /** @class */ (function () {
    function Description(id, epsg, proj, name) {
        this.id = id;
        this.epsg = epsg;
        this.name = name;
        this.proj = proj;
    }
    return Description;
}());



/***/ }),

/***/ "./src/Ellipsoids.ts":
/*!***************************!*\
  !*** ./src/Ellipsoids.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ellipsoid": () => (/* binding */ Ellipsoid)
/* harmony export */ });
/* harmony import */ var _Descriptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Descriptions */ "./src/Descriptions.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Ellipsoid = /** @class */ (function (_super) {
    __extends(Ellipsoid, _super);
    function Ellipsoid(id, epsg, name, proj, a, f1) {
        var _this = _super.call(this, id, epsg, proj, name) || this;
        _this.a = a;
        _this.f1 = f1;
        return _this;
    }
    Ellipsoid.prototype.toProj = function () {
        if (this.proj == null)
            return "+a=" + this.a + " +f=" + this.f1;
        return "+ellps=" + this.proj;
    };
    Ellipsoid.dict = [
        new Ellipsoid(0, 7019, "GRS 80", "GRS80", 6378137, 298.257222101),
        new Ellipsoid(1, 7043, "WGS 72", "WGS72", 6378135, 298.26),
        new Ellipsoid(2, 7003, "Australian", "aust_SA", 6378160, 298.25),
        new Ellipsoid(3, 7024, "Krassovsky", "krass", 6378245, 298.3),
        new Ellipsoid(4, 7022, "International 1924", "intl", 6378388, 297),
        new Ellipsoid(5, 7022, "Hayford", null, 6378388, 297),
        new Ellipsoid(6, 7012, "Clarke 1880", null, 6378249.145, 293.465),
        new Ellipsoid(7, 7008, "Clarke 1866", "clrk66", 6378206.4, 294.9786982),
        new Ellipsoid(8, 7009, "Clarke 1866 (modified for Michigan),", null, 6378450.04748448, 294.9786982),
        new Ellipsoid(9, 7001, "Airy 1930", "airy", 6377563.396, 299.3249646),
        new Ellipsoid(10, 7004, "Bessel 1841", "bessel", 6377397.155, 299.1528128),
        new Ellipsoid(11, 7015, "Everest 1830", "evrst30", 6377276.345, 300.8017),
        new Ellipsoid(12, 7035, "Sphere", "sphere", 6370997, 0),
        new Ellipsoid(13, 7002, "Airy 1930 (modified for Ireland 1965),", "mod_airy", 6377340.189, 299.3249646),
        new Ellipsoid(14, 7006, "Bessel 1841 (modified for Schwarzeck),", "bess_nam", 6377483.865, 299.1528128),
        new Ellipsoid(15, 7013, "Clarke 1880 (modified for Arc 1950),", "clrk80", 6378249.145326, 293.4663076),
        new Ellipsoid(16, 7014, "Clarke 1880 (modified for Merchich),", null, 6378249.2, 293.46598),
        new Ellipsoid(17, 7018, "Everest 1830 (modified for Kertau),", "evrst48", 6377304.063, 300.8017),
        new Ellipsoid(18, -1, "Fischer 1960", "fschr60", 6378166, 298.3),
        new Ellipsoid(19, -1, "Fischer 1960 (modified for South Asia),", "fschr60m", 6378155, 298.3),
        new Ellipsoid(20, -1, "Fischer 1968", "fschr68", 6378150, 298.3),
        new Ellipsoid(21, 7036, "GRS 67", "GRS67", 6378160, 298.247167427),
        new Ellipsoid(22, 7020, "Helmert 1906", "helmert", 6378200, 298.3),
        new Ellipsoid(23, 7053, "Hough", "hough", 6378270, 297),
        new Ellipsoid(24, 7050, "South American", null, 6378160, 298.25),
        new Ellipsoid(25, 7029, "War Office", null, 6378300.583, 296),
        new Ellipsoid(26, -1, "WGS 60", "WGS60", 6378165, 298.3),
        new Ellipsoid(27, 7025, "WGS 66", "WGS66", 6378145, 298.25),
        new Ellipsoid(28, 7030, "WGS 84", "WGS84", 6378137, 298.257223563),
        new Ellipsoid(30, 7011, "Clarke 1880 (modified for IGN),", "clrk80ign", 6378249.2, 293.4660213),
        new Ellipsoid(31, 7049, "IAG 75", "IAU76", 6378140, 298.257222),
        new Ellipsoid(32, -1, "MERIT 83", "MERIT", 6378137, 298.257),
        new Ellipsoid(33, -1, "New International 1967", "new_intl", 6378157.5, 298.25),
        new Ellipsoid(34, -1, "Walbeck", "walbeck", 6376896, 302.78),
        new Ellipsoid(35, 7005, "Bessel 1841 (modified for NGO 1948),", null, 6377492.0176, 299.15281),
        new Ellipsoid(36, 7007, "Clarke 1858", null, 6378293.639, 294.26068),
        new Ellipsoid(37, 7013, "Clarke 1880 (modified for Jamaica),", null, 6378249.136, 293.46631),
        new Ellipsoid(38, 7010, "Clarke 1880 (modified for Palestine),", null, 6378300.79, 293.46623),
        new Ellipsoid(39, 7016, "Everest 1830 (modified for Timbalai),", "evrstSS", 6377298.556, 300.8017),
        new Ellipsoid(40, 7044, "Everest 1830 (modified for Kalianpur),", "evrst56", 6377301.243, 300.80174),
        new Ellipsoid(41, 7021, "Indonesian", null, 6378160, 298.247),
        new Ellipsoid(42, 7025, "NWL 9D", "NWL9D", 6378145, 298.25),
        new Ellipsoid(43, 7043, "NWL 10D", null, 6378135, 298.26),
        new Ellipsoid(44, 7032, "OSU86F", null, 6378136.2, 298.25722),
        new Ellipsoid(45, 7033, "OSU91A", null, 6378136.3, 298.25722),
        new Ellipsoid(46, 7027, "Plessis 1817", "plessis", 6376523, 308.64),
        new Ellipsoid(47, 7028, "Struve 1860", null, 6378297, 294.73),
        new Ellipsoid(48, 7056, "Everest 1830 (modified for West Malaysia),", "evrst69", 6377295.664, 300.8017),
        new Ellipsoid(49, -1, "Irish (WOFO),", null, 6377542.178, 299.325),
        new Ellipsoid(50, -1, "Everest (Pakistan),", null, 6377309.613, 300.8017),
        new Ellipsoid(51, 7041, "ATS 77 (Average Terrestrial System 1977),", null, 6378135, 298.257),
        new Ellipsoid(52, 7054, "PZ90 (Russia),", null, 6378136, 298.257839303),
        new Ellipsoid(53, -1, "Xian 1980", null, 6378140, 298.25)
    ];
    return Ellipsoid;
}(_Descriptions__WEBPACK_IMPORTED_MODULE_0__.Description));



/***/ }),

/***/ "./src/Parameters.ts":
/*!***************************!*\
  !*** ./src/Parameters.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Parameter": () => (/* binding */ Parameter),
/* harmony export */   "Affine": () => (/* binding */ Affine),
/* harmony export */   "Bound": () => (/* binding */ Bound)
/* harmony export */ });
/* harmony import */ var _Descriptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Descriptions */ "./src/Descriptions.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Parameter = /** @class */ (function (_super) {
    __extends(Parameter, _super);
    function Parameter(id, epsg, name, ruName, wktName, projName) {
        var _this = _super.call(this, id, epsg, projName, name) || this;
        _this.wktName = wktName;
        _this.ruName = ruName;
        return _this;
    }
    Parameter.prototype.toProj = function () {
        switch (this.id) {
            case 1:
            case 2:
                if (this.value != null)
                    return this.value.toProj();
                return "";
            default:
                if (this.proj != null)
                    return this.proj + "=" + this.value;
                else
                    return "";
        }
    };
    Parameter.dict = [
        new Parameter(1, null, "Datum", "Датум", "Datum", "+datum"),
        new Parameter(2, null, "Unit", "Ед. измерения", "Units", "+units"),
        new Parameter(3, 8802, "Longitude of natural origin", "Нулевая долгота", "Central_Meridian", "+lon_0"),
        new Parameter(4, 8801, "Latitude of natural origin", "Нулевая широта", "Latitude_Of_Origin", "+lat_0"),
        new Parameter(5, 8823, "Latitude of 1st standard parallel", "Стандартная параллель 1", "Standard_Parallel_1", "+lat_1"),
        new Parameter(6, 8824, "Latitude of 2nd standard parallel", "Стандартная параллель 2", "Standard_Parallel_2", "+lat_2"),
        new Parameter(7, 8813, "Azimuth of initial line", "Азимут", "Azimuth", "+alpha"),
        new Parameter(8, 8805, "Scale factor at natural origin", "Масштабный множитель", "Scale_Factor", "+k_0"),
        new Parameter(9, 8806, "False easting", "Восточное смещение", "False_Easting", "+x_0"),
        new Parameter(10, 8807, "False northing", "Северное смещение", "False_Northing", "+y_0"),
        new Parameter(11, null, "Range", "Охват", "", null)
    ];
    return Parameter;
}(_Descriptions__WEBPACK_IMPORTED_MODULE_0__.Description));

var Affine = /** @class */ (function () {
    function Affine(unit, a, b, c, d, e, f) {
        this.unit = unit;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
    }
    return Affine;
}());

var Bound = /** @class */ (function () {
    function Bound(minX, minY, maxX, maxY) {
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    }
    return Bound;
}());



/***/ }),

/***/ "./src/Projections.ts":
/*!****************************!*\
  !*** ./src/Projections.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Projection": () => (/* binding */ Projection)
/* harmony export */ });
/* harmony import */ var _Descriptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Descriptions */ "./src/Descriptions.ts");
/* harmony import */ var _Parameters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Parameters */ "./src/Parameters.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Projection = /** @class */ (function (_super) {
    __extends(Projection, _super);
    function Projection(id, epsg, name, ruName, wktName, projName, params) {
        var _this = _super.call(this, id, epsg, projName, name) || this;
        _this.ruName = ruName;
        _this.wktName = wktName;
        _this.parameters = new Array();
        params.forEach(function (p) { return _this.setParameter(p); });
        return _this;
    }
    Projection.prototype.setParameter = function (parameterId) {
        this.parameters.push(_Parameters__WEBPACK_IMPORTED_MODULE_1__.Parameter.dict.find(function (p) { return p.id === parameterId; }));
    };
    Projection.prototype.toProj = function () {
        var res = "+proj=" + this.proj;
        this.parameters.forEach(function (p) { return res = res + " " + p.toProj(); });
        return res;
    };
    Projection.dict = [
        new Projection(1, 4326, "Longitude/Latitude", "Долгота-Широта", "", "lonlat", [1]),
        new Projection(2, 4326, "Cylindrical Equal-Area", "Равноплощадная цилиндрическая", "", "cea", [1, 2, 3, 5]),
        new Projection(3, 9801, "Lambert Conformal Conic", "Равноугольная коническая проекция Ламберта", "Lambert conformal conic", "lcc", [1, 2, 3, 4, 5, 6, 9, 10]),
        new Projection(4, 9820, "Lambert Azimuthal Equal-Area (polar aspect only)", "Равноплощадная азимутальная Ламберта (только в полярной области)", "", "laea", [1, 2, 3, 4, 11]),
        new Projection(5, 4326, "Azimuthal Equidistant (polar aspect only)", "Равнопромежуточная коническая (только для полярных областей)", "Azimuthal or Planar Projections ", "aeqd", [1, 2, 3, 4, 11]),
        new Projection(6, 54027, "Equidistant Conic, also known as Simple Conic", "Равнопромежуточная коническая", "", "eqdc", [1, 2, 3, 4, 5, 6, 9, 10]),
        new Projection(7, 9812, "Hotine Oblique Mercator", "Косая Меркатора – Хотина", "Oblique Mercator", "omerc", [1, 2, 3, 4, 7, 8, 9, 10]),
        new Projection(8, 9807, "Transverse Mercator, (also known as Gauss-Kruger)", "Поперечная Меркатора", "Gauss-Kruger, Transverse Mercator", "tmerc", [1, 2, 3, 4, 8, 9, 10]),
        new Projection(9, 9822, "Albers Equal-Area Conic", "Коническая равноплощадная Алберса", "Albers conic equal-area", "aea", [1, 2, 3, 4, 5, 6, 9, 10]),
        new Projection(10, 9804, "Mercator", "Меркатора", "Mercator", "merc", [1, 2, 3]),
        new Projection(11, 54003, "Miller Cylindrical", "Миллера", "", "mill", [1, 2, 3]),
        new Projection(12, 54030, "Robinson", "Робинсона", "", "robin", [1, 2, 3]),
        new Projection(13, 54009, "Mollweide", "Мольвейде", "", "moll", [1, 2, 3]),
        new Projection(14, 54012, "Eckert IV", "Эккерта IV", "", "eck4", [1, 2, 3]),
        new Projection(15, 54010, "Eckert VI", "Эккерта VI", "", "eck6", [1, 2, 3]),
        new Projection(16, 54008, "Sinusoidal", "Синусоидальная", "", "sinu ", [1, 2, 3]),
        new Projection(17, 54016, "Gall", "Галла", "", "gall", [1, 2, 3]),
        new Projection(18, 27200, "New Zealand Map Grid", "Новозеландская картографическая", "", "nzmg", [1, 2, 3, 4, 9, 10]),
        new Projection(19, null, "Lambert Conformal Conic (modified for Belgium 1972)", "Равноугольная коническая Ламберта (для Бельгии 1972)", "", "lcca", [1, 2, 3, 4, 5, 6, 9, 10]),
        new Projection(20, 54026, "Stereographic", "Стереографическая", "Stereographic", "stere", [1, 2, 3, 4, 8, 9, 10]),
        new Projection(21, null, "Transverse Mercator, (modified for Danish System 34 Jylland-Fyn)", "Поперечная Меркатора (для голландской системы 34 для района Юланд-Фин)", "", "tmerc", [1, 2, 3, 4, 8, 9, 10]),
        new Projection(22, null, "Transverse Mercator, (modified for Danish System 34 Sjaelland)", "Поперечная Меркатора (зона 34 Голландии Съеланд)", "", "tmerc", [1, 2, 3, 4, 8, 9, 10]),
        new Projection(23, null, "Transverse Mercator, (modified for Danish System 34/45 Bornholm)", "Поперечная Меркатора (34/35 зоны для Голландии: Борнхольм)", "", "tmerc", [1, 2, 3, 4, 8, 9, 10]),
        new Projection(24, null, "Transverse Mercator, (modified for Finnish KKJ)", "Поперечная проекция Меркатора (для Финляндии KKJ)", "", "tmerc", [1, 2, 3, 4, 8, 9, 10]),
        new Projection(25, 9815, "Swiss Oblique Mercator", "Косая Меркатора для Швейцарии", "", "somerc", [1, 2, 3, 4, 9, 10]),
        new Projection(26, null, "Regional Mercator", "Региональная Меркатора", "", "tmerc", [1, 2, 3, 5]),
        new Projection(27, 9818, "Polyconic", "Поликоническая", "American Polyconic ?", "poly ", [1, 2, 3, 4, 9, 10]),
        new Projection(28, 4326, "Azimuthal Equidistant (all origin latitudes)", "Равнопромежуточная коническая", "", "aeqd", [1, 2, 3, 4, 11]),
        new Projection(29, 9820, "Lambert Azimuthal Equal-Area", "Равноплощадная азимутальная Ламберта", "Lambert Azimuthal Equal Area", "laea", [1, 2, 3, 4, 11]),
        new Projection(30, 9806, "Cassini-Soldner", "Кассини-Солднера", "Cassini-Soldner", "cass", [1, 2, 3, 4, 9, 10]),
        new Projection(31, 9809, "Double Stereographic", "Двойная стереографическая", "Oblique stereographic", "sterea", [1, 2, 3, 4, 8, 9, 10]),
        new Projection(32, 9819, "Krovak Oblique Conformal Conic (JTSKc)", "Косая равноугольная коническая проекция Кровак (JTSKc)", "", "krovak", [1, 2, 3, 4, 5, 7, 9, 10]),
        new Projection(33, 9842, "Equidistant Cylindrical", "Равнопромежуточная цилиндрическая", "", "eqc", [1, 2, 3, 5, 9, 10])
    ];
    return Projection;
}(_Descriptions__WEBPACK_IMPORTED_MODULE_0__.Description));



/***/ }),

/***/ "./src/Units.ts":
/*!**********************!*\
  !*** ./src/Units.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Unit": () => (/* binding */ Unit)
/* harmony export */ });
/* harmony import */ var _Descriptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Descriptions */ "./src/Descriptions.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Unit = /** @class */ (function (_super) {
    __extends(Unit, _super);
    function Unit(id, epsg, proj, name, ruName, b, c, targetEpsg) {
        var _this = _super.call(this, id, epsg, proj, name) || this;
        _this.ruName = ruName;
        _this.b = b;
        _this.c = c;
        _this.targetEpsg = targetEpsg;
        return _this;
    }
    Unit.prototype.toProj = function () {
        return "+units=" + this.proj;
    };
    Unit.dict = [
        new Unit(0, 9035, "mi", "Miles", "мили", 63360, 39.37, 9001),
        new Unit(1, 9036, "km", "Kilometers", "Километры", 1000, 1, 9001),
        new Unit(2, -1, "in", "Inches", "Дюймы", 1, 39.37, 9001),
        new Unit(3, 9002, "ft", "Feet (also called International Feet)", "Фут (также называется международный фут) Один международный фут равен точно 30.48 см", 0.3048, 1, 9001),
        new Unit(4, 9096, "yd", "Yards", "ярд", 0.9144, 1, 9001),
        new Unit(5, 1025, "mm", "Millimeters", "миллиметры", 1, 1000, 9001),
        new Unit(6, 1033, "cm", "Centimeters", "Сантиметры", 1, 100, 9001),
        new Unit(7, 9001, "m", "Meters", "метры", 1, 1, 9001),
        new Unit(8, 9003, "us-ft", "US Survey Feet (used for 1927 State Plane)", "геодезический фут США (принятый для плановых систем штатов 1927) один геодезический фут США равен точно 12/39.37 метра или прблизительно 30.48006 см", 12, 39.37, 9001),
        new Unit(9, 9030, "kmi", "Nautical Miles", "морская миля (одна морская миля равно точно 1852 метрам)", 1852, 1, 9001),
        new Unit(30, 9098, "link", "Links", "линк", 20.1168, 100, 9001),
        new Unit(31, 9097, "ch", "Chains", "чейн", 20.1168, 1, 9001),
        new Unit(32, -1, "rod", "Rods", "род", 33, 2, 9003)
    ];
    return Unit;
}(_Descriptions__WEBPACK_IMPORTED_MODULE_0__.Description));



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CoordinateReferenceSystemDescriptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CoordinateReferenceSystemDescriptions */ "./src/CoordinateReferenceSystemDescriptions.ts");

window.onload = function () {
    var button = document.getElementById("mibutton");
    button === null || button === void 0 ? void 0 : button.addEventListener("click", getTrainingName);
    function getTrainingName() {
        var mitext = document.getElementById("mitext");
        var text = mitext.value;
        var proj4text = document.getElementById("proj4text");
        var cs = _CoordinateReferenceSystemDescriptions__WEBPACK_IMPORTED_MODULE_0__.CoordinateReferenceSystemDescription.parse(text);
        var proj_str = cs.toProj();
        proj4text.textContent = proj_str;
    }
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvQ29vcmRpbmF0ZVJlZmVyZW5jZVN5c3RlbURlc2NyaXB0aW9ucy50cyIsIndlYnBhY2s6Ly93ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvRGF0dW1zLnRzIiwid2VicGFjazovL3dlYnBhY2stc3RhcnRlci8uL3NyYy9EZXNjcmlwdGlvbnMudHMiLCJ3ZWJwYWNrOi8vd2VicGFjay1zdGFydGVyLy4vc3JjL0VsbGlwc29pZHMudHMiLCJ3ZWJwYWNrOi8vd2VicGFjay1zdGFydGVyLy4vc3JjL1BhcmFtZXRlcnMudHMiLCJ3ZWJwYWNrOi8vd2VicGFjay1zdGFydGVyLy4vc3JjL1Byb2plY3Rpb25zLnRzIiwid2VicGFjazovL3dlYnBhY2stc3RhcnRlci8uL3NyYy9Vbml0cy50cyIsIndlYnBhY2s6Ly93ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFjay1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTJDO0FBQ0E7QUFDRTtBQUNkO0FBRS9CO0lBT0ksOENBQW9CLElBQVk7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELHFEQUFNLEdBQU47UUFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUztZQUFFLE9BQU8sV0FBVyxDQUFDO1FBQ3RELE9BQU8sSUFBSSxDQUFDLFVB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Q0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDdEQsSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDakUsSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUM3RCxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDL0QsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUMzRCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDbkUsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQztRQUN0RSxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDO1FBQ3RFLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQzlELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUMxRCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQy9ELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBQzdELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUM5RCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ3RELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUMzRCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7UUFDNUQsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDO1FBQzFELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3pELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDbEUsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUN0RCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDL0QsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUM1RCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQzVELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFH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QyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBQ3RELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDO1FBQy9ELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDO1FBQ3BELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSx3QkFBd0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNyRSxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsMEJBQTBCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDdkUsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ25FLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ3BELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDbkUsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDNUQsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUM3RCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNoRSxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUM3RCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUM5RCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQy9ELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSx1QkFBdUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ25FLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQzFELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQy9ELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQzdELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDOUQsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDaEUsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUMxRCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUMzRCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO1FBQ2pELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ3hFLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUM7UUFDL0QsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBQy9ELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDekUsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ3hELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBQzdELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUN0RCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztRQUN4RCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUNyRCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztRQUNwRCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUM1RCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDMUQsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUMvRCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3JELElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDNUQsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMs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LEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDbkUsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDN0QsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQzFELElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQztRQUNyRCxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUMvRCxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQzNELElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNqRSxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUM1RCxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMs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RyxFQUFFLENBQUMsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztRQUMzRCxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUM7UUFDcEQsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzNFLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQzNELElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDMUQsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFELElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEQsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFF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LElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMxRixJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakcsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM5RixJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RGLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNuRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFD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LENBQUM7S0FBQyxDQUFDO0lBQzdELFdBQUM7Q0FBQSxDQWhDeUIsc0RBQVcsR0FnQ3BDO0FBaENnQjs7Ozs7OztVQ0ZqQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ04rRjtBQUUvRixNQUFNLENBQUMsTUFBTSxHQUFHO0lBQ1osSUFBTSxNQUFNLEdBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwRCxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBRW5ELFNBQVMsZUFBZTtRQUNwQixJQUFJLE1BQU0sR0FBd0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRSxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFckQsSUFBSSxFQUFFLEdBQUcsOEdBQTBDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUQsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzNCLFNBQVMsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFFO0lBQ3RDLENBQUM7QUFDTCxDQUFDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0dW0sIERhdHVtRXh0IH0gZnJvbSBcIi4vRGF0dW1zXCI7XHJcbmltcG9ydCB7IFByb2plY3Rpb24gfSBmcm9tIFwiLi9Qcm9qZWN0aW9uc1wiO1xyXG5pbXBvcnQgeyBBZmZpbmUsIEJvdW5kIH0gZnJvbSBcIi4vUGFyYW1ldGVyc1wiO1xyXG5pbXBvcnQgeyBVbml0IH0gZnJvbSBcIi4vVW5pdHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb29yZGluYXRlUmVmZXJlbmNlU3lzdGVtRGVzY3JpcHRpb24ge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgLy9kYXR1bTogRGF0dW07XHJcbiAgICBwcm9qZWN0aW9uOiBQcm9qZWN0aW9uO1xyXG4gICAgYWZmaW5lOiBBZmZpbmU7XHJcbiAgICBib3VuZDogQm91bmQ7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHRvUHJvaigpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLnByb2plY3Rpb24gPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwidW5kZWZpbmVkXCI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdGlvbi50b1Byb2ooKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcGFyc2UoZGVzYzogc3RyaW5nKTogQ29vcmRpbmF0ZVJlZmVyZW5jZVN5c3RlbURlc2NyaXB0aW9uIHtcclxuICAgICAgICBjb25zdCBsYXN0SW5kZXggPSBkZXNjLmxhc3RJbmRleE9mKFwiXFxcIlwiKTtcclxuICAgICAgICBjb25zdCBjcnNOYW1lID0gZGVzYy5zdWJzdHIoMSwgbGFzdEluZGV4IC0gMSk7XHJcbiAgICAgICAgY29uc3Qgc3RyMiA9IGRlc2Muc3Vic3RyKGxhc3RJbmRleCArIDIsIGRlc2MubGVuZ3RoIC0gKGxhc3RJbmRleCArIDIpKTtcclxuICAgICAgICB2YXIgcGFyYW1BcnJheSA9IHN0cjIuc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgIGNvbnN0IGNycyA9IG5ldyBDb29yZGluYXRlUmVmZXJlbmNlU3lzdGVtRGVzY3JpcHRpb24oY3JzTmFtZSk7XHJcbiAgICAgICAgdmFyIGlkUHJvamVjdGlvblR5cGVzID0gTnVtYmVyLnBhcnNlSW50KHBhcmFtQXJyYXlbMF0pO1xyXG4gICAgICAgIGxldCBpc0FmZmluZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpc0JvdW5kcyA9IGZhbHNlO1xyXG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICBjYXNlIGlkUHJvamVjdGlvblR5cGVzID4gMjk5OTpcclxuICAgICAgICAgICAgICAgIGlzQWZmaW5lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlzQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlkUHJvamVjdGlvblR5cGVzIC09IDMwMDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBpZFByb2plY3Rpb25UeXBlcyA+IDE5OTk6XHJcbiAgICAgICAgICAgICAgICBpc0JvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZFByb2plY3Rpb25UeXBlcyAtPSAyMDAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgaWRQcm9qZWN0aW9uVHlwZXMgPiA5OTk6XHJcbiAgICAgICAgICAgICAgICBpc0FmZmluZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZFByb2plY3Rpb25UeXBlcyAtPSAxMDAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBrcCA9IDE7XHJcbiAgICAgICAgY3JzLnByb2plY3Rpb24gPSBQcm9qZWN0aW9uLmRpY3QuZmluZChwID0+IHAuaWQgPT09IGlkUHJvamVjdGlvblR5cGVzKTtcclxuICAgICAgICBpZiAoY3JzLnByb2plY3Rpb24gPT09IHVuZGVmaW5lZCkgcmV0dXJuIGNycztcclxuICAgICAgICBjcnMucHJvamVjdGlvbi5wYXJhbWV0ZXJzLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocC5pZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpZERhdHVtID0gTnVtYmVyLnBhcnNlSW50KHBhcmFtQXJyYXlba3BdKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd0RhdHVtOiBEYXR1bSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgaWREYXR1bSA8IDk5OTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdEYXR1bSA9IERhdHVtLmRpY3QuZmluZChkID0+IGQuaWQgPT09IGlkRGF0dW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgaWREYXR1bSA9PT0gOTk5OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd0RhdHVtID0gRGF0dW0ucGFyc2UoaWREYXR1bSwgTnVtYmVyLnBhcnNlSW50KHBhcmFtQXJyYXlba3AgKyAxXSksIE51bWJlci5wYXJzZUZsb2F0KHBhcmFtQXJyYXlba3AgKyAyXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyLnBhcnNlRmxvYXQocGFyYW1BcnJheVtrcCArIDNdKSwgTnVtYmVyLnBhcnNlRmxvYXQocGFyYW1BcnJheVtrcCArIDRdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrcCArPSA0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgaWREYXR1bSA8IDk5OTk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3RGF0dW0gPSBEYXR1bUV4dC5kaWN0LmZpbmQoZCA9PiBkLmlkID09PSBpZERhdHVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGlkRGF0dW0gPT09IDk5OTk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3RGF0dW0gPSBEYXR1bUV4dC5wYXJzZUV4dChpZERhdHVtLCBOdW1iZXIucGFyc2VJbnQocGFyYW1BcnJheVtrcCArIDFdKSwgTnVtYmVyLnBhcnNlRmxvYXQocGFyYW1BcnJheVtrcCArIDJdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIucGFyc2VGbG9hdChwYXJhbUFycmF5W2twICsgM10pLCBOdW1iZXIucGFyc2VGbG9hdChwYXJhbUFycmF5W2twICsgNF0pLCBOdW1iZXIucGFyc2VGbG9hdChwYXJhbUFycmF5W2twICsgNV0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlci5wYXJzZUZsb2F0KHBhcmFtQXJyYXlba3AgKyA2XSksIE51bWJlci5wYXJzZUZsb2F0KHBhcmFtQXJyYXlba3AgKyA3XSksIE51bWJlci5wYXJzZUZsb2F0KHBhcmFtQXJyYXlba3AgKyA4XSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyLnBhcnNlRmxvYXQocGFyYW1BcnJheVtrcCArIDldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrcCArPSA5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHAudmFsdWUgPSB3RGF0dW07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgcC52YWx1ZSA9IFVuaXQuZGljdC5maW5kKHUgPT4gdS5pZCA9PT0gTnVtYmVyLnBhcnNlSW50KHBhcmFtQXJyYXlba3BdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDExOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBwLnZhbHVlID0gTnVtYmVyLnBhcnNlRmxvYXQocGFyYW1BcnJheVtrcF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGtwKys7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChpc0FmZmluZSkge1xyXG4gICAgICAgICAgICB2YXIgYXUgPSBOdW1iZXIucGFyc2VJbnQocGFyYW1BcnJheVtrcF0pO1xyXG4gICAgICAgICAgICBjb25zdCBhVW5pdCA9IFVuaXQuZGljdC5maW5kKHUgPT4gdS5pZCA9PT0gYXUpO1xyXG4gICAgICAgICAgICBrcCArPSAxO1xyXG4gICAgICAgICAgICBjcnMuYWZmaW5lID0gbmV3IEFmZmluZShhVW5pdCwgTnVtYmVyLnBhcnNlRmxvYXQocGFyYW1BcnJheVtrcF0pLCBOdW1iZXIucGFyc2VGbG9hdChwYXJhbUFycmF5W2twICsgMV0pLFxyXG4gICAgICAgICAgICAgICAgTnVtYmVyLnBhcnNlRmxvYXQocGFyYW1BcnJheVtrcCArIDJdKSwgTnVtYmVyLnBhcnNlRmxvYXQocGFyYW1BcnJheVtrcCArIDNdKSxcclxuICAgICAgICAgICAgICAgIE51bWJlci5wYXJzZUZsb2F0KHBhcmFtQXJyYXlba3AgKyA0XSksIE51bWJlci5wYXJzZUZsb2F0KHBhcmFtQXJyYXlba3AgKyA1XSkpO1xyXG4gICAgICAgICAgICBrcCArPSA2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNCb3VuZHMpIHtcclxuICAgICAgICAgICAgY3JzLmJvdW5kID0gbmV3IEJvdW5kKE51bWJlci5wYXJzZUZsb2F0KHBhcmFtQXJyYXlba3BdKSwgTnVtYmVyLnBhcnNlRmxvYXQocGFyYW1BcnJheVtrcCArIDFdKSxcclxuICAgICAgICAgICAgICAgIE51bWJlci5wYXJzZUZsb2F0KHBhcmFtQXJyYXlba3AgKyAyXSksIE51bWJlci5wYXJzZUZsb2F0KHBhcmFtQXJyYXlba3AgKyAzXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3JzO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRGVzY3JpcHRpb24gfSBmcm9tIFwiLi9EZXNjcmlwdGlvbnNcIjtcclxuaW1wb3J0IHsgRWxsaXBzb2lkIH0gZnJvbSBcIi4vRWxsaXBzb2lkc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdHVtIGV4dGVuZHMgRGVzY3JpcHRpb24ge1xyXG4gICAgZWxsaXBzb2lkOiBFbGxpcHNvaWQ7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICB6OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IG51bWJlciwgZXBzZzogbnVtYmVyLCBuYW1lOiBzdHJpbmcsIHByb2o6IHN0cmluZywgZWxsaXBzb2lkSWQ6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKGlkLCBlcHNnLCBwcm9qLCBuYW1lKTtcclxuICAgICAgICB0aGlzLmVsbGlwc29pZCA9IEVsbGlwc29pZC5kaWN0LmZpbmQoZSA9PiBlLmlkID09PSBlbGxpcHNvaWRJZCk7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMueiA9IHo7XHJcbiAgICB9XHJcblxyXG4gICAgdG9Qcm9qKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvaiA9PSBudWxsKSByZXR1cm4gYCR7dGhpcy5lbGxpcHNvaWQudG9Qcm9qKCl9ICt0b3dnczg0PSR7dGhpcy54fSwke3RoaXMueX0sJHt0aGlzLnp9YDtcclxuICAgICAgICByZXR1cm4gYCtkYXR1bT0ke3RoaXMucHJvan1gO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwYXJzZShpZDogbnVtYmVyLCBlbGxpcHNvaWRJZDogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogRGF0dW0ge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0dW0oaWQsIC0xLCBcInVzZXJEZWZcIiwgbnVsbCwgZWxsaXBzb2lkSWQsIHgsIHksIHopO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkaWN0OiBEYXR1bVtdID0gW1xyXG4gICAgICAgIG5ldyBEYXR1bSgxLCA2MjAxLCBcIkFkaW5kYW5cIiwgbnVsbCwgNiwgLTE2MiwgLTEyLCAyMDYpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgyLCA2MjA1LCBcIkFmZ29veWVcIiwgbnVsbCwgMywgLTQzLCAtMTYzLCA0NSksXHJcbiAgICAgICAgbmV3IERhdHVtKDMsIDYyMDQsIFwiQWluZWxBYmQxOTcwXCIsIG51bGwsIDQsIC0xNTAsIC0yNTEsIC0yKSxcclxuICAgICAgICBuZXcgRGF0dW0oNCwgNjcwOCwgXCJBbm5hMUFzdHJvMTk2NVwiLCBudWxsLCAyLCAtNDkxLCAtMjIsIDQzNSksXHJcbiAgICAgICAgbmV3IERhdHVtKDUsIDYyMDksIFwiQXJjMTk1MFwiLCBudWxsLCAxNSwgLTE0MywgLTkwLCAtMjk0KSxcclxuICAgICAgICBuZXcgRGF0dW0oNiwgNjIxMCwgXCJBcmMxOTYwXCIsIG51bGwsIDYsIC0xNjAsIC04LCAtMzAwKSxcclxuICAgICAgICBuZXcgRGF0dW0oNywgNjcxMiwgXCJBc2NlbnNpb25Jc2xhbmQxOTU4XCIsIG51bGwsIDQsIC0yMDcsIDEwNywgNTIpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg4LCAtMSwgXCJBc3Ryb0JlYWNvbiBcXFwiRVxcXCJcIiwgbnVsbCwgNCwgMTQ1LCA3NSwgLTI3MiksXHJcbiAgICAgICAgbmV3IERhdHVtKDksIC0xLCBcIkFzdHJvQjRTb3JvbEF0b2xsXCIsIG51bGwsIDQsIDExNCwgLTExNiwgLTMzMyksXHJcbiAgICAgICAgbmV3IERhdHVtKDEwLCAtMSwgXCJBc3Ryb0RPUzcxLzRcIiwgbnVsbCwgNCwgLTMyMCwgNTUwLCAtNDk0KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTEsIC0xLCBcIkFzdHJvbm9taWNTdGF0aW9uMTk1MlwiLCBudWxsLCA0LCAxMjQsIC0yMzQsIC0yNSksXHJcbiAgICAgICAgbmV3IERhdHVtKDEyLCA2MjAyLCBcIkF1c3RyYWxpYW5HZW9kZXRpYzE5NjZcIiwgbnVsbCwgMiwgLTEzMywgLTQ4LCAxNDgpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxMywgNjIwMywgXCJBdXN0cmFsaWFuR2VvZGV0aWMxOTg0XCIsIG51bGwsIDIsIC0xMzQsIC00OCwgMTQ5KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTQsIDY3MTQsIFwiQmVsbGV2dWUoSUdOKVwiLCBudWxsLCA0LCAtMTI3LCAtNzY5LCA0NzIpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxNSwgNjIxNiwgXCJCZXJtdWRhMTk1N1wiLCBudWxsLCA3LCAtNzMsIDIxMywgMjk2KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTYsIC0xLCBcIkJvZ290YU9ic2VydmF0b3J5XCIsIG51bGwsIDQsIDMwNywgMzA0LCAtMzE4KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTcsIDYyMjEsIFwiQ2FtcG9JbmNoYXVzcGVcIiwgbnVsbCwgNCwgLTE0OCwgMTM2LCA5MCksXHJcbiAgICAgICAgbmV3IERhdHVtKDE4LCAtMSwgXCJDYW50b25Bc3RybzE5NjZcIiwgbnVsbCwgNCwgMjk4LCAtMzA0LCAtMzc1KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTksIDYyMjIsIFwiQ2FwZVwiLCBudWxsLCA2LCAtMTM2LCAtMTA4LCAtMjkyKSxcclxuICAgICAgICBuZXcgRGF0dW0oMjAsIDY3MTcsIFwiQ2FwZUNhbmF2ZXJhbFwiLCBudWxsLCA3LCAtMiwgMTUwLCAxODEpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgyMSwgNjIyMywgXCJDYXJ0aGFnZVwiLCBcImNhcnRoYWdlXCIsIDYsIC0yNjMsIDYsIDQzMSksXHJcbiAgICAgICAgbmV3IERhdHVtKDIyLCA2NjcyLCBcIkNoYXRoYW0xOTcxXCIsIG51bGwsIDQsIDE3NSwgLTM4LCAxMTMpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgyMywgNjIyNCwgXCJDaHVhQXN0cm9cIiwgbnVsbCwgNCwgLTEzNCwgMjI5LCAtMjkpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgyNCwgMTA3NCwgXCJDb3JyZWdvQWxlZ3JlXCIsIG51bGwsIDQsIC0yMDYsIDE3MiwgLTYpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgyNSwgNjgxMywgXCJEamFrYXJ0YShCYXRhdmlhKVwiLCBudWxsLCAxMCwgLTM3NywgNjgxLCAtNTApLFxyXG4gICAgICAgIG5ldyBEYXR1bSgyNiwgLTEsIFwiRE9TMTk2OFwiLCBudWxsLCA0LCAyMzAsIC0xOTksIC03NTIpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgyNywgNjcxOSwgXCJFYXN0ZXJJc2xhbmQxOTY3XCIsIG51bGwsIDQsIDIxMSwgMTQ3LCAxMTEpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgyOCwgNjIzMCwgXCJFdXJvcGVhbjE5NTBcIiwgbnVsbCwgNCwgLTg3LCAtOTgsIC0xMjEpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgyOSwgNjY2OCwgXCJFdXJvcGVhbjE5NzlcIiwgbnVsbCwgNCwgLTg2LCAtOTgsIC0xMTkpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgzMCwgNjY4NSwgXCJHYW5kYWppa2FCYXNlXCIsIG51bGwsIDQsIC0xMzMsIC0zMjEsIDUwKSxcclxuICAgICAgICBuZXcgRGF0dW0oMzEsIC0xLCBcIkdlb2RldGljRGF0dW0xOTQ5XCIsIG51bGwsIDQsIDg0LCAtMjIsIDIwOSksXHJcbiAgICAgICAgbmV3IERhdHVtKDMyLCAtMSwgXCJHUlM2N1wiLCBudWxsLCAyMSwgMCwgMCwgMCksXHJcbiAgICAgICAgbmV3IERhdHVtKDMzLCAtMSwgXCJHUlM4MFwiLCBudWxsLCAwLCAwLCAwLCAwKSxcclxuICAgICAgICBuZXcgRGF0dW0oMzQsIDY2NzUsIFwiR3VhbTE5NjNcIiwgbnVsbCwgNywgLTEwMCwgLTI0OCwgMjU5KSxcclxuICAgICAgICBuZXcgRGF0dW0oMzUsIC0xLCBcIkdVWDFBc3Ryb1wiLCBudWxsLCA0LCAyNTIsIC0yMDksIC03NTEpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgzNiwgNjI1NCwgXCJIaXRvWFZJSUkxOTYzXCIsIG51bGwsIDQsIDE2LCAxOTYsIDkzKSxcclxuICAgICAgICBuZXcgRGF0dW0oMzcsIDY2NTgsIFwiSGpvcnNleTE5NTVcIiwgbnVsbCwgNCwgLTczLCA0NiwgLTg2KSxcclxuICAgICAgICBuZXcgRGF0dW0oMzgsIDY3MzgsIFwiSG9uZ0tvbmcxOTYzXCIsIG51bGwsIDQsIC0xNTYsIC0yNzEsIC0xODkpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgzOSwgNjIzNiwgXCJIdS1UenUtU2hhblwiLCBudWxsLCA0LCAtNjM0LCAtNTQ5LCAtMjAxKSxcclxuICAgICAgICBuZXcgRGF0dW0oNDAsIC0xLCBcIkluZGlhbihUaGFpbGFuZC9WaWV0bmFtKVwiLCBudWxsLCAxMSwgMjE0LCA4MzYsIDMwMyksXHJcbiAgICAgICAgbmV3IERhdHVtKDQxLCAtMSwgXCJJbmRpYW4oQmFuZ2xhZGVzaFwiLCBudWxsLCAxMSwgMjg5LCA3MzQsIDI1NyksXHJcbiAgICAgICAgbmV3IERhdHVtKDQyLCAtMSwgXCJJcmVsYW5kMTk2NVwiLCBudWxsLCAxMywgNTA2LCAtMTIyLCA2MTEpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg0MywgLTEsIFwiSVNUUzA3M0FzdHJvMTk2OVwiLCBudWxsLCA0LCAyMDgsIC00MzUsIC0yMjkpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg0NCwgNjcyNSwgXCJKb2huc3RvbklzbGFuZDE5NjFcIiwgbnVsbCwgNCwgMTkxLCAtNzcsIC0yMDQpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg0NSwgNjI0NCwgXCJLYW5kYXdhbGFcIiwgbnVsbCwgMTEsIC05NywgNzg3LCA4NiksXHJcbiAgICAgICAgbmV3IERhdHVtKDQ2LCAtMSwgXCJLZXJndWVsZW5Jc2xhbmRcIiwgbnVsbCwgNCwgMTQ1LCAtMTg3LCAxMDMpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg0NywgNjc1MSwgXCJLZXJ0YXUxOTQ4XCIsIG51bGwsIDE3LCAtMTEsIDg1MSwgNSksXHJcbiAgICAgICAgbmV3IERhdHVtKDQ4LCAtMSwgXCJMLkMuNUFzdHJvXCIsIG51bGwsIDcsIDQyLCAxMjQsIDE0NyksXHJcbiAgICAgICAgbmV3IERhdHVtKDQ5LCA2MjUxLCBcIkxpYmVyaWExOTY0XCIsIG51bGwsIDYsIC05MCwgNDAsIDg4KSxcclxuICAgICAgICBuZXcgRGF0dW0oNTAsIC0xLCBcIkx1em9uKFBoaWxpcHBpbmVzKVwiLCBudWxsLCA3LCAtMTMzLCAtNzcsIC01MSksXHJcbiAgICAgICAgbmV3IERhdHVtKDUxLCAtMSwgXCJMdXpvbihNaW5kYW5hb0lzbGFuZClcIiwgbnVsbCwgNywgLTEzMywgLTc5LCAtNzIpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg1MiwgNjI1NiwgXCJNYWhlMTk3MVwiLCBudWxsLCA2LCA0MSwgLTIyMCwgLTEzNCksXHJcbiAgICAgICAgbmV3IERhdHVtKDUzLCAtMSwgXCJNYXJjb0FzdHJvXCIsIG51bGwsIDQsIC0yODksIC0xMjQsIDYwKSxcclxuICAgICAgICBuZXcgRGF0dW0oNTQsIDYyNjIsIFwiTWFzc2F3YVwiLCBudWxsLCAxMCwgNjM5LCA0MDUsIDYwKSxcclxuICAgICAgICBuZXcgRGF0dW0oNTUsIDYyNjEsIFwiTWVyY2hpY2hcIiwgbnVsbCwgMTYsIDMxLCAxNDYsIDQ3KSxcclxuICAgICAgICBuZXcgRGF0dW0oNTYsIDY3MjcsIFwiTWlkd2F5QXN0cm8xOTYxXCIsIG51bGwsIDQsIDkxMiwgLTU4LCAxMjI3KSxcclxuICAgICAgICBuZXcgRGF0dW0oNTcsIDYyNjMsIFwiTWlubmFcIiwgbnVsbCwgNiwgLTkyLCAtOTMsIDEyMiksXHJcbiAgICAgICAgbmV3IERhdHVtKDU4LCAtMSwgXCJOYWhyd2FuKE1hc2lyYWhJc2xhbmQpXCIsIG51bGwsIDYsIC0yNDcsIC0xNDgsIDM2OSksXHJcbiAgICAgICAgbmV3IERhdHVtKDU5LCAtMSwgXCJOYWhyd2FuKFVuLkFyYWJFbWlyYXRlcylcIiwgbnVsbCwgNiwgLTI0OSwgLTE1NiwgMzgxKSxcclxuICAgICAgICBuZXcgRGF0dW0oNjAsIC0xLCBcIk5haHJ3YW4oU2F1ZGlBcmFiaWEpXCIsIG51bGwsIDYsIC0yMzEsIC0xOTYsIDQ4MiksXHJcbiAgICAgICAgbmV3IERhdHVtKDYxLCAtMSwgXCJOYXBhcmltYVwiLCBudWxsLCA0LCAtMiwgMzc0LCAxNzIpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg2MiwgLTEsIFwiTkFEMjcoQ29udGluZW50YWxVUylcIiwgXCJOQUQyN1wiLCA3LCAtOCwgMTYwLCAxNzYpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg2MywgLTEsIFwiTkFEMjcoQWxhc2thKVwiLCBcIk5BRDI3XCIsIDcsIC01LCAxMzUsIDE3MiksXHJcbiAgICAgICAgbmV3IERhdHVtKDY0LCAtMSwgXCJOQUQyNyhCYWhhbWFzKVwiLCBcIk5BRDI3XCIsIDcsIC00LCAxNTQsIDE3OCksXHJcbiAgICAgICAgbmV3IERhdHVtKDY1LCAtMSwgXCJOQUQyNyhTYW5TYWx2YWRvcilcIiwgXCJOQUQyN1wiLCA3LCAxLCAxNDAsIDE2NSksXHJcbiAgICAgICAgbmV3IERhdHVtKDY2LCAtMSwgXCJOQUQyNyhDYW5hZGEpXCIsIFwiTkFEMjdcIiwgNywgLTEwLCAxNTgsIDE4NyksXHJcbiAgICAgICAgbmV3IERhdHVtKDY3LCAtMSwgXCJOQUQyNyhDYW5hbFpvbmUpXCIsIFwiTkFEMjdcIiwgNywgMCwgMTI1LCAyMDEpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg2OCwgLTEsIFwiTkFEMjcoQ2FyaWJiZWFuKVwiLCBcIk5BRDI3XCIsIDcsIC03LCAxNTIsIDE3OCksXHJcbiAgICAgICAgbmV3IERhdHVtKDY5LCAtMSwgXCJOQUQyNyhDZW50cmFsQW1lcmljYSlcIiwgXCJOQUQyN1wiLCA3LCAwLCAxMjUsIDE5NCksXHJcbiAgICAgICAgbmV3IERhdHVtKDcwLCAtMSwgXCJOQUQyNyhDdWJhKVwiLCBcIk5BRDI3XCIsIDcsIC05LCAxNTIsIDE3OCksXHJcbiAgICAgICAgbmV3IERhdHVtKDcxLCAtMSwgXCJOQUQyNyhHcmVlbmxhbmQpXCIsIFwiTkFEMjdcIiwgNywgMTEsIDExNCwgMTk1KSxcclxuICAgICAgICBuZXcgRGF0dW0oNzIsIC0xLCBcIk5BRDI3KE1leGljbylcIiwgXCJOQUQyN1wiLCA3LCAtMTIsIDEzMCwgMTkwKSxcclxuICAgICAgICBuZXcgRGF0dW0oNzMsIC0xLCBcIk5BRDI3KE1pY2hpZ2FuKVwiLCBcIk5BRDI3XCIsIDgsIC04LCAxNjAsIDE3NiksXHJcbiAgICAgICAgbmV3IERhdHVtKDc0LCAtMSwgXCJOQUQ4M1wiLCBcIk5BRDgzXCIsIDAsIDAsIDAsIDApLFxyXG4gICAgICAgIG5ldyBEYXR1bSg3NSwgNjEyOSwgXCJPYnNlcnZhdG9yaW8xOTY2XCIsIG51bGwsIDQsIC00MjUsIC0xNjksIDgxKSxcclxuICAgICAgICBuZXcgRGF0dW0oNzYsIC0xLCBcIk9sZEVneXB0aWFuXCIsIG51bGwsIDIyLCAtMTMwLCAxMTAsIC0xMyksXHJcbiAgICAgICAgbmV3IERhdHVtKDc3LCA2MTM1LCBcIk9sZEhhd2FpaWFuXCIsIG51bGwsIDcsIDYxLCAtMjg1LCAtMTgxKSxcclxuICAgICAgICBuZXcgRGF0dW0oNzgsIC0xLCBcIk9tYW5cIiwgbnVsbCwgNiwgLTM0NiwgLTEsIDIyNCksXHJcbiAgICAgICAgbmV3IERhdHVtKDc5LCA1MTAxLCBcIk9yZG5hbmNlU3VydmV5R3JlYXRCcml0LlwiLCBudWxsLCA5LCAzNzUsIC0xMTEsIDQzMSksXHJcbiAgICAgICAgbmV3IERhdHVtKDgwLCA2NzI4LCBcIlBpY29kZWxhc05pZXZlc1wiLCBudWxsLCA0LCAtMzA3LCAtOTIsIDEyNyksXHJcbiAgICAgICAgbmV3IERhdHVtKDgxLCA2NzI5LCBcIlBpdGNhaXJuQXN0cm8xOTY3XCIsIG51bGwsIDQsIDE4NSwgMTY1LCA0MiksXHJcbiAgICAgICAgbmV3IERhdHVtKDgyLCA2MjQ4LCBcIlByb3Zpc2lvbmFsU291dGhBbWVyaWNhblwiLCBudWxsLCA0LCAtMjg4LCAxNzUsIC0zNzYpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg4MywgNjEzOSwgXCJQdWVydG9SaWNvXCIsIG51bGwsIDcsIDExLCA3MiwgLTEwMSksXHJcbiAgICAgICAgbmV3IERhdHVtKDg0LCA2NjE0LCBcIlFhdGFyTmF0aW9uYWxcIiwgbnVsbCwgNCwgLTEyOCwgLTI4MywgMjIpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg4NSwgNjI4NywgXCJRb3Jub3FcIiwgbnVsbCwgNCwgMTY0LCAxMzgsIC0xODkpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg4NiwgNjYyNiwgXCJSZXVuaW9uXCIsIG51bGwsIDQsIDk0LCAtOTQ4LCAtMTI2MiksXHJcbiAgICAgICAgbmV3IERhdHVtKDg3LCAtMSwgXCJSb21lMTk0MFwiLCBudWxsLCA0LCAtMjI1LCAtNjUsIDkpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg4OCwgLTEsIFwiU2FudG8oRE9TKVwiLCBudWxsLCA0LCAxNzAsIDQyLCA4NCksXHJcbiAgICAgICAgbmV3IERhdHVtKDg5LCAtMSwgXCJTYW9CcmF6XCIsIG51bGwsIDQsIC0yMDMsIDE0MSwgNTMpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg5MCwgNjI5MiwgXCJTYXBwZXJIaWxsMTk0M1wiLCBudWxsLCA0LCAtMzU1LCAxNiwgNzQpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg5MSwgNjI5MywgXCJTY2h3YXJ6ZWNrXCIsIG51bGwsIDE0LCA2MTYsIDk3LCAtMjUxKSxcclxuICAgICAgICBuZXcgRGF0dW0oOTIsIDYyOTEsIFwiU291dGhBbWVyaWNhbjE5NjlcIiwgbnVsbCwgMjQsIC01NywgMSwgLTQxKSxcclxuICAgICAgICBuZXcgRGF0dW0oOTMsIC0xLCBcIlNvdXRoQXNpYVwiLCBudWxsLCAxOSwgNywgLTEwLCAtMjYpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg5NCwgLTEsIFwiU291dGhlYXN0QmFzZVwiLCBudWxsLCA0LCAtNDk5LCAtMjQ5LCAzMTQpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg5NSwgLTEsIFwiU291dGh3ZXN0QmFzZVwiLCBudWxsLCA0LCAtMTA0LCAxNjcsIC0zOCksXHJcbiAgICAgICAgbmV3IERhdHVtKDk2LCA2Mjk4LCBcIlRpbWJhbGFpMTk0OFwiLCBudWxsLCAxMSwgLTY4OSwgNjkxLCAtNDYpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg5NywgNjMwMSwgXCJUb2t5b1wiLCBudWxsLCAxMCwgLTEyOCwgNDgxLCA2NjQpLFxyXG4gICAgICAgIG5ldyBEYXR1bSg5OCwgNjczNCwgXCJUcmlzdGFuQXN0cm8xOTY4XCIsIG51bGwsIDQsIC02MzIsIDQzOCwgLTYwOSksXHJcbiAgICAgICAgbmV3IERhdHVtKDk5LCA2NzMxLCBcIlZpdGlMZXZ1MTkxNlwiLCBudWxsLCA2LCA1MSwgMzkxLCAtMzYpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxMDAsIC0xLCBcIldha2UtRW5pd2V0b2sxOTYwXCIsIG51bGwsIDIzLCAxMDEsIDUyLCAtMzkpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxMDEsIC0xLCBcIldHUzYwXCIsIG51bGwsIDI2LCAwLCAwLCAwKSxcclxuICAgICAgICBuZXcgRGF0dW0oMTAyLCA2NzYwLCBcIldHUzY2XCIsIG51bGwsIDI3LCAwLCAwLCAwKSxcclxuICAgICAgICBuZXcgRGF0dW0oMTAzLCA2MzIyLCBcIldHUzcyXCIsIG51bGwsIDEsIDAsIDgsIDEwKSxcclxuICAgICAgICBuZXcgRGF0dW0oMTA0LCA2MzI2LCBcIldHUzg0XCIsIFwiV0dTODRcIiwgMjgsIDAsIDAsIDApLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxMDUsIDYzMDksIFwiWWFjYXJlXCIsIG51bGwsIDQsIC0xNTUsIDE3MSwgMzcpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxMDYsIDYzMTEsIFwiWmFuZGVyaWpcIiwgbnVsbCwgNCwgLTI2NSwgMTIwLCAtMzU4KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTA3LCA2Mjc1LCBcIk5URihHcmVlbndpY2htZXJpZGlhbilcIiwgbnVsbCwgMzAsIC0xNjgsIC02MCwgMzIwKSxcclxuICAgICAgICBuZXcgRGF0dW0oMTA4LCA2MjMxLCBcIkV1cm9wZWFuMTk4N1wiLCBudWxsLCA0LCAtODMsIC05NiwgLTExMyksXHJcbiAgICAgICAgbmV3IERhdHVtKDEwOSwgLTEsIFwiTmV0aGVybGFuZHNCZXNzZWxcIiwgbnVsbCwgMTAsIDU5MywgMjYsIDQ3OCksXHJcbiAgICAgICAgbmV3IERhdHVtKDExMCwgLTEsIFwiQmVsZ2l1bUhheWZvcmRcIiwgbnVsbCwgNCwgODEsIDEyMCwgMTI5KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTExLCAtMSwgXCJOV0dMMTBcIiwgbnVsbCwgMSwgLTEsIDE1LCAxKSxcclxuICAgICAgICBuZXcgRGF0dW0oMTEyLCAtMSwgXCJSVDkwKFN3ZWRlbilcIiwgbnVsbCwgMTAsIDQ5OCwgLTM2LCA1NjgpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxMTMsIC0xLCBcIkxpc2JvYShETHgpXCIsIG51bGwsIDQsIC0zMDMsIC02MiwgMTA1KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTE0LCAtMSwgXCJNZWxyaWNhMTk3MyhENzMpXCIsIG51bGwsIDQsIC0yMjMsIDExMCwgMzcpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxMTUsIDYyNTgsIFwiRVVSRUY4OVwiLCBudWxsLCAwLCAwLCAwLCAwKSxcclxuICAgICAgICBuZXcgRGF0dW0oMTE2LCA2MjgzLCBcIkdEQTk0XCIsIG51bGwsIDAsIDAsIDAsIDApLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxMTcsIDYxNjcsIFwiTlpHRDIwMDBcIiwgbnVsbCwgMCwgMCwgMCwgMCksXHJcbiAgICAgICAgbmV3IERhdHVtKDExOCwgNjE2OSwgXCJBbWVyaWNhblNhbW9hXCIsIG51bGwsIDcsIC0xMTUsIDExOCwgNDI2KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTE5LCA2NjAxLCBcIkFudGlndWFJc2xhbmRBc3RybzE5NDNcIiwgbnVsbCwgNiwgLTI3MCwgMTMsIDYyKSxcclxuICAgICAgICBuZXcgRGF0dW0oMTIwLCA2NzEzLCBcIkF5YWJlbGxlTGlnaHRob3VzZVwiLCBudWxsLCA2LCAtNzksIC0xMjksIDE0NSksXHJcbiAgICAgICAgbmV3IERhdHVtKDEyMSwgNjIxOSwgXCJCdWtpdFJpbXBhaFwiLCBudWxsLCAxMCwgLTM4NCwgNjY0LCAtNDgpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxMjIsIC0xLCBcIkVzdG9uaWExOTM3XCIsIG51bGwsIDEwLCAzNzQsIDE1MCwgNTg4KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTIzLCA2MTU1LCBcIkRhYm9sYVwiLCBudWxsLCA2LCAtODMsIDM3LCAxMjQpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxMjQsIDY3MzYsIFwiRGVjZXB0aW9uSXNsYW5kXCIsIG51bGwsIDYsIDI2MCwgMTIsIC0xNDcpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxMjUsIC0xLCBcIkZvcnRUaG9tYXMxOTU1XCIsIG51bGwsIDYsIC03LCAyMTUsIDIyNSksXHJcbiAgICAgICAgbmV3IERhdHVtKDEyNiwgLTEsIFwiR3JhY2lvc2FCYXNlU1cxOTQ4XCIsIG51bGwsIDQsIC0xMDQsIDE2NywgLTM4KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTI3LCA2MjU1LCBcIkhlcmF0Tm9ydGhcIiwgbnVsbCwgNCwgLTMzMywgLTIyMiwgMTE0KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTI4LCAtMSwgXCJIZXJtYW5uc2tvZ2VsXCIsIG51bGwsIDEwLCA2ODIsIC0yMDMsIDQ4MCksXHJcbiAgICAgICAgbmV3IERhdHVtKDEyOSwgLTEsIFwiSW5kaWFuKFBha2lzdGFuKVwiLCBudWxsLCA1MCwgMjgzLCA2ODIsIDIzMSksXHJcbiAgICAgICAgbmV3IERhdHVtKDEzMCwgNjIzOSwgXCJJbmRpYW4xOTU0XCIsIG51bGwsIDExLCAyMTcsIDgyMywgMjk5KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTMxLCA2MTMxLCBcIkluZGlhbjE5NjBcIiwgbnVsbCwgMTEsIDE5OCwgODgxLCAzMTcpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxMzIsIDYyNDAsIFwiSW5kaWFuMTk3NVwiLCBudWxsLCAxMSwgMjEwLCA4MTQsIDI4OSksXHJcbiAgICAgICAgbmV3IERhdHVtKDEzMywgNjIzOCwgXCJJbmRvbmVzaWFuMTk3NFwiLCBudWxsLCA0MSwgLTI0LCAtMTUsIDUpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxMzQsIC0xLCBcIklTVFMwNjFBc3RybzE5NjhcIiwgbnVsbCwgNCwgLTc5NCwgMTE5LCAtMjk4KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTM1LCA2NzM1LCBcIkt1c2FpZUFzdHJvMTk1MVwiLCBudWxsLCA0LCA2NDcsIDE3NzcsIC0xMTI0KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTM2LCA2MjUwLCBcIkxlaWdvblwiLCBudWxsLCA2LCAtMTMwLCAyOSwgMzY0KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTM3LCA2NjA0LCBcIk1vbnRzZXJyYXRJc2wuQXN0cm8xOTU4XCIsIG51bGwsIDYsIDE3NCwgMzU5LCAzNjUpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxMzgsIDYyNjYsIFwiTSdQb3JhbG9rb1wiLCBudWxsLCA2LCAtNzQsIC0xMzAsIDQyKSxcclxuICAgICAgICBuZXcgRGF0dW0oMTM5LCA2MzA3LCBcIk5vcnRoU2FoYXJhMTk1OVwiLCBudWxsLCA2LCAtMTg2LCAtOTMsIDMxMCksXHJcbiAgICAgICAgbmV3IERhdHVtKDE0MCwgLTEsIFwiT2JzZXJ2YXRvcmlvTWV0ZW9yLjE5MzlcIiwgbnVsbCwgNCwgLTQyNSwgLTE2OSwgODEpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxNDEsIDY2MjAsIFwiUG9pbnQ1OFwiLCBudWxsLCA2LCAtMTA2LCAtMTI5LCAxNjUpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxNDIsIC0xLCBcIlBvaW50ZU5vaXJlMTk0OFwiLCBudWxsLCA2LCAtMTQ4LCA1MSwgLTI5MSksXHJcbiAgICAgICAgbmV3IERhdHVtKDE0MywgNjYxNSwgXCJQb3J0b1NhbnRvMTkzNlwiLCBudWxsLCA0LCAtNDk5LCAtMjQ5LCAzMTQpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxNDQsIDY2MTYsIFwiU2VsdmFnZW1HcmFuZGUxOTM4XCIsIG51bGwsIDQsIC0yODksIC0xMjQsIDYwKSxcclxuICAgICAgICBuZXcgRGF0dW0oMTQ1LCAtMSwgXCJTaWVycmFMZW9uZTE5NjBcIiwgbnVsbCwgNiwgLTg4LCA0LCAxMDEpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxNDYsIC0xLCBcIlMtSlRTS1wiLCBudWxsLCAxMCwgNTg5LCA3NiwgNDgwKSxcclxuICAgICAgICBuZXcgRGF0dW0oMTQ3LCA2Mjk3LCBcIlRhbmFuYXJpdmVPYnNlcnZhdG9yeTE5MjVcIiwgbnVsbCwgNCwgLTE4OSwgLTI0MiwgLTkxKSxcclxuICAgICAgICBuZXcgRGF0dW0oMTQ4LCA2MzA0LCBcIlZvaXJvbDE4NzRcIiwgbnVsbCwgNiwgLTczLCAtMjQ3LCAyMjcpLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxNDksIC0xLCBcIlZvaXJvbDE5NjBcIiwgbnVsbCwgNiwgLTEyMywgLTIwNiwgMjE5KSxcclxuICAgICAgICBuZXcgRGF0dW0oMTUwLCA2MTQ4LCBcIkhhcnRiZWVzdGhvZWs5NFwiLCBudWxsLCAyOCwgMCwgMCwgMCksXHJcbiAgICAgICAgbmV3IERhdHVtKDE1MSwgNjEyMiwgXCJBVFM3N1wiLCBudWxsLCA1MSwgMCwgMCwgMCksXHJcbiAgICAgICAgbmV3IERhdHVtKDE1MiwgNjYxMiwgXCJKR0QyMDAwXCIsIG51bGwsIDAsIDAsIDAsIDApLFxyXG4gICAgICAgIG5ldyBEYXR1bSgxNTMsIC0xLCBcIkhHUlM4N1wiLCBcIkdHUlM4N1wiLCAwLCAtMTk5Ljg3LCA3NC43OSwgMjQ2LjYyKSxcclxuICAgICAgICBuZXcgRGF0dW0oMTU0LCA2MjE0LCBcIkJlaWppbmcgMTk1NFwiLCBudWxsLCAzLCAtMzEuNCwgMTQ0LjMsIDgxLjIpXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhdHVtRXh0IGV4dGVuZHMgRGF0dW0ge1xyXG4gICAgcm90YXRpb25YOiBudW1iZXI7XHJcbiAgICByb3RhdGlvblk6IG51bWJlcjtcclxuICAgIHJvdGF0aW9uWjogbnVtYmVyO1xyXG4gICAgc2NhbGVQcG06IG51bWJlcjtcclxuICAgIHByaW1lTWVyaWRpYW46IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLCBlcHNnOiBudW1iZXIsIG5hbWU6IHN0cmluZywgcHJvajogc3RyaW5nLCBlbGxpcHNvaWRJZDogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLFxyXG4gICAgICAgIHJYOiBudW1iZXIsIHJZOiBudW1iZXIsIHJaOiBudW1iZXIsIHNjOiBudW1iZXIsIHBNOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihpZCwgZXBzZywgbmFtZSwgcHJvaiwgZWxsaXBzb2lkSWQsIHgsIHksIHopO1xyXG4gICAgICAgIHRoaXMucm90YXRpb25YID0gclg7XHJcbiAgICAgICAgdGhpcy5yb3RhdGlvblkgPSByWTtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uWiA9IHJaO1xyXG4gICAgICAgIHRoaXMuc2NhbGVQcG0gPSBzYztcclxuICAgICAgICB0aGlzLnByaW1lTWVyaWRpYW4gPSBwTTtcclxuICAgIH1cclxuXHJcbiAgICB0b1Byb2ooKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9qID09IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIHJlcyA9IGAke3RoaXMuZWxsaXBzb2lkLnRvUHJvaigpfSArdG93Z3M4ND0ke3RoaXMueH0sJHt0aGlzLnl9LCR7dGhpcy56fSxcclxuJHt0aGlzLnJvdGF0aW9uWCAqIC0xfSwke3RoaXMucm90YXRpb25ZICogLTF9LCR7dGhpcy5yb3RhdGlvblogKiAtMX0sJHt0aGlzLnNjYWxlUHBtfWA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByaW1lTWVyaWRpYW4gIT09IDApIHsgcmVzID0gYCR7cmVzfSArcG09JHt0aGlzLnByaW1lTWVyaWRpYW59YDsgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGArZGF0dW09JHt0aGlzLnByb2p9YDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcGFyc2VFeHQoaWQ6IG51bWJlciwgZWxsaXBzb2lkSWQ6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgclg6IG51bWJlciwgclk6IG51bWJlciwgclo6IG51bWJlcixcclxuICAgICAgICBzYzogbnVtYmVyLCBwTTogbnVtYmVyKTogRGF0dW1FeHQge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0dW1FeHQoaWQsIC0xLCBcInVzZXJEZWZcIiwgbnVsbCwgZWxsaXBzb2lkSWQsIHgsIHksIHosIHJYLCByWSwgclosIHNjLCBwTSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRpY3Q6IERhdHVtRXh0W10gPSBbXHJcbiAgICAgICAgbmV3IERhdHVtRXh0KDEwMDAsIDYzMTQsIFwiREhETiAoUG90c2RhbS9SYXVlbmJlcmcpXCIsIG51bGwsIDEwLCA1ODIsIDEwNSwgNDE0LCAtMS4wNCwgLTAuMzUsIDMuMDgsIDguMywgMCksXHJcbiAgICAgICAgbmV3IERhdHVtRXh0KDEwMDEsIDYyODQsIFwiUHVsa292byAxOTQyXCIsIG51bGwsIDMsIDI0LCAtMTIzLCAtOTQsIC0wLjAyLCAwLjI1LCAwLjEzLCAxLjEsIDApLFxyXG4gICAgICAgIG5ldyBEYXR1bUV4dCgxMDAyLCA2ODA3LCBcIk5URiAoUGFyaXMgbWVyaWRpYW4pXCIsIG51bGwsIDMwLCAtMTY4LCAtNjAsIDMyMCwgMCwgMCwgMCwgMCwgMi4zMzcyMyksXHJcbiAgICAgICAgbmV3IERhdHVtRXh0KDEwMDMsIDYxNDksIFwiQ0ggMTkwMyAoU3dpdHplcmxhbmQpXCIsIG51bGwsIDEwLCA2NjAuMDc3LCAxMy41NTEsIDM2OS4zNDQsIDAuODA0ODE2LCAwLjU3NzY5MiwgMC45NTIyMzYsIDUuNjYsIDApLFxyXG4gICAgICAgIG5ldyBEYXR1bUV4dCgxMDA0LCA2MjM3LCBcIkhENzIgKEh1bmdhcmlhbiBEYXR1bSBvZiAxOTcyKVwiLCBudWxsLCAyMSwgLTU2LCA3NS43NywgMTUuMzEsIC0wLjM3LCAtMC4yLCAtMC4yMSwgLTEuMDEsIDApLFxyXG4gICAgICAgIG5ldyBEYXR1bUV4dCgxMDA1LCAtMSwgXCJDYXBlIChTb3V0aCBBZnJpY2EpXCIsIG51bGwsIDI4LCAtMTM0LjczLCAtMTEwLjkyLCAtMjkyLjY2LCAwLCAwLCAwLCAxLCAwKSxcclxuICAgICAgICBuZXcgRGF0dW1FeHQoMTAwNiwgLTEsIFwiQXVzdHJhbGlhIE5hdGlvbmFsIChBR0Q4NClcIiwgbnVsbCwgMiwgLTExNy43NjMsIC01MS41MSwgMTM5LjA2MSwgLTAuMjkyLCAtMC40NDMsIC0wLjI3NywgLTAuMTkxLCAwKSxcclxuICAgICAgICBuZXcgRGF0dW1FeHQoMTAwNywgLTEsIFwiQXVzdHJhbGlhIEEuQy5ULiAoQUdENjYpXCIsIG51bGwsIDIsIC0xMjkuMTkzLCAtNDEuMjEyLCAxMzAuNzMsIC0wLjI0NiwgLTAuMzc0LCAtMC4zMjksIC0yLjk1NSwgMCksXHJcbiAgICAgICAgbmV3IERhdHVtRXh0KDEwMDgsIC0xLCBcIkF1c3RyYWxpYSBUYXNtYW5pYSAoQUdENjYpXCIsIG51bGwsIDIsIC0xMjAuMjcxLCAtNjQuNTQzLCAxNjEuNjMyLCAtMC4yMTc1LCAwLjA2NzIsIDAuMTI5MSwgMi40OTg1LCAwKSxcclxuICAgICAgICBuZXcgRGF0dW1FeHQoMTAwOSwgLTEsIFwiQXVzdHJhbGlhIFZpY3RvcmlhL05TVyAoQUdENjYpXCIsIG51bGwsIDIsIC0xMTkuMzUzLCAtNDguMzAxLCAxMzkuNDg0LCAtMC40MTUsIC0wLjI2LCAtMC40MzcsIC0wLjYxMywgMCksXHJcbiAgICAgICAgbmV3IERhdHVtRXh0KDEwMTAsIDYyNzIsIFwiTmV3IFplYWxhbmQgR2VvZGV0aWMgRGF0dW0gMTk0OVwiLCBcIm56Z2Q0OVwiLCA0LCA1OS40NywgLTUuMDQsIDE4Ny40NCwgLTAuNDcsIDAuMSwgLTEuMDI0LCAtNC41OTkzLCAwKSxcclxuICAgICAgICBuZXcgRGF0dW1FeHQoMTAxMSwgLTEsIFwiU3dlZGVuIChSVCA5MClcIiwgbnVsbCwgMTAsIDQxOS4zODQsIDk5LjMzMzUsIDU5MS4zNDUsIC0wLjg1MDM4OSwgLTEuODE3MjgsIDcuODYyMjQsIC0wLjk5NDk2LCAwKSxcclxuICAgICAgICBuZXcgRGF0dW1FeHQoMTAxMiwgLTEsIFwiUnVzc2lhIFBaOTBcIiwgbnVsbCwgNTIsIC0xLjA4LCAtMC4yNywgLTAuOSwgMCwgMCwgLTAuMTYsIC0wLjEyLCAwKSxcclxuICAgICAgICBuZXcgRGF0dW1FeHQoMTAxMywgLTEsIFwiUnVzc2lhIFNLNDJcIiwgbnVsbCwgNTIsIDIzLjkyLCAtMTQxLjI3LCAtODAuOSwgMCwgLTAuMzUsIC0wLjgyLCAtMC4xMiwgMCksXHJcbiAgICAgICAgbmV3IERhdHVtRXh0KDEwMTQsIC0xLCBcIlJ1c3NpYSBTSzk1XCIsIG51bGwsIDUyLCAyNC44MiwgLTEzMS4yMSwgLTgyLjY2LCAwLCAwLCAtMC4xNiwgLTAuMTIsIDApLFxyXG4gICAgICAgIG5ldyBEYXR1bUV4dCgxMDE1LCAtMSwgXCJUb2t5bzk3XCIsIG51bGwsIDEwLCAtMTQ2LjQxNCwgNTA3LjMzNywgNjgwLjUwNywgMCwgMCwgMCwgMCwgMCksXHJcbiAgICAgICAgbmV3IERhdHVtRXh0KDEwMTYsIC0xLCBcIktLSlwiLCBudWxsLCA0LCAtOTYuMDYyLCAtODIuNDI4LCAtMTIxLjc1NCwgLTQuODAxLCAtMC4zNDUsIDEuMzc2LCAxLjQ5NiwgMCksXHJcbiAgICAgICAgbmV3IERhdHVtRXh0KDEwMTcsIDY2MTAsIFwiWGlhbiAxOTgwXCIsIG51bGwsIDUzLCAyNCwgLTEyMywgLTk0LCAtMC4wMiwgLTAuMjUsIDAuMTMsIDEuMSwgMCksXHJcbiAgICAgICAgbmV3IERhdHVtRXh0KDEwMTgsIC0xLCBcIkxpdGh1YW5pYW4gUHVsa292byAxOTQyXCIsIG51bGwsIDMsIC00MC41OTUzLCAtMTguNTQ5OCwgLTY5LjMzOTYsIC0yLjUwOCwgLTEuODMxOSwgMi42MTE0LCAtNC4yOTkxLCAwKSxcclxuICAgICAgICBuZXcgRGF0dW1FeHQoMTAxOSwgLTEsIFwiQmVsZ2lhbiAxOTcyIDcgUGFyYW1ldGVyXCIsIG51bGwsIDQsIC05OS4wNTksIDUzLjMyMiwgLTExMi40ODYsIC0wLjQxOSwgMC44MywgLTEuODg1LCAwLjk5OTk5OSwgMCldO1xyXG59IiwiZXhwb3J0IGNsYXNzIERlc2NyaXB0aW9uIHtcclxuICAgIGlkOiBudW1iZXI7XHJcbiAgICBlcHNnOiBudW1iZXI7XHJcbiAgICBwcm9qOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IG51bWJlciwgZXBzZzogbnVtYmVyLCBwcm9qOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLmVwc2cgPSBlcHNnO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5wcm9qID0gcHJvajtcclxuICAgIH1cclxufSIsImltcG9ydCB7IERlc2NyaXB0aW9uIH0gZnJvbSBcIi4vRGVzY3JpcHRpb25zXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRWxsaXBzb2lkIGV4dGVuZHMgRGVzY3JpcHRpb24ge1xyXG4gICAgYTogbnVtYmVyO1xyXG4gICAgZjE6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLCBlcHNnOiBudW1iZXIsIG5hbWU6IHN0cmluZywgcHJvajogc3RyaW5nLCBhOiBudW1iZXIsIGYxOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihpZCwgZXBzZywgcHJvaiwgbmFtZSk7XHJcbiAgICAgICAgdGhpcy5hID0gYTtcclxuICAgICAgICB0aGlzLmYxID0gZjE7XHJcbiAgICB9XHJcblxyXG4gICAgdG9Qcm9qKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvaiA9PSBudWxsKSByZXR1cm4gYCthPSR7dGhpcy5hfSArZj0ke3RoaXMuZjF9YDtcclxuICAgICAgICByZXR1cm4gYCtlbGxwcz0ke3RoaXMucHJvan1gO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkaWN0OiBFbGxpcHNvaWRbXSA9IFtcclxuICAgICAgICBuZXcgRWxsaXBzb2lkKDAsIDcwMTksIFwiR1JTIDgwXCIsIFwiR1JTODBcIiwgNjM3ODEzNywgMjk4LjI1NzIyMjEwMSksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCgxLCA3MDQzLCBcIldHUyA3MlwiLCBcIldHUzcyXCIsIDYzNzgxMzUsIDI5OC4yNiksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCgyLCA3MDAzLCBcIkF1c3RyYWxpYW5cIiwgXCJhdXN0X1NBXCIsIDYzNzgxNjAsIDI5OC4yNSksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCgzLCA3MDI0LCBcIktyYXNzb3Zza3lcIiwgXCJrcmFzc1wiLCA2Mzc4MjQ1LCAyOTguMyksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCg0LCA3MDIyLCBcIkludGVybmF0aW9uYWwgMTkyNFwiLCBcImludGxcIiwgNjM3ODM4OCwgMjk3KSxcclxuICAgICAgICBuZXcgRWxsaXBzb2lkKDUsIDcwMjIsIFwiSGF5Zm9yZFwiLCBudWxsLCA2Mzc4Mzg4LCAyOTcpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoNiwgNzAxMiwgXCJDbGFya2UgMTg4MFwiLCBudWxsLCA2Mzc4MjQ5LjE0NSwgMjkzLjQ2NSksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCg3LCA3MDA4LCBcIkNsYXJrZSAxODY2XCIsIFwiY2xyazY2XCIsIDYzNzgyMDYuNCwgMjk0Ljk3ODY5ODIpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoOCwgNzAwOSwgXCJDbGFya2UgMTg2NiAobW9kaWZpZWQgZm9yIE1pY2hpZ2FuKSxcIiwgbnVsbCwgNjM3ODQ1MC4wNDc0ODQ0OCwgMjk0Ljk3ODY5ODIpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoOSwgNzAwMSwgXCJBaXJ5IDE5MzBcIiwgXCJhaXJ5XCIsIDYzNzc1NjMuMzk2LCAyOTkuMzI0OTY0NiksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCgxMCwgNzAwNCwgXCJCZXNzZWwgMTg0MVwiLCBcImJlc3NlbFwiLCA2Mzc3Mzk3LjE1NSwgMjk5LjE1MjgxMjgpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoMTEsIDcwMTUsIFwiRXZlcmVzdCAxODMwXCIsIFwiZXZyc3QzMFwiLCA2Mzc3Mjc2LjM0NSwgMzAwLjgwMTcpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoMTIsIDcwMzUsIFwiU3BoZXJlXCIsIFwic3BoZXJlXCIsIDYzNzA5OTcsIDApLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoMTMsIDcwMDIsIFwiQWlyeSAxOTMwIChtb2RpZmllZCBmb3IgSXJlbGFuZCAxOTY1KSxcIiwgXCJtb2RfYWlyeVwiLCA2Mzc3MzQwLjE4OSwgMjk5LjMyNDk2NDYpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoMTQsIDcwMDYsIFwiQmVzc2VsIDE4NDEgKG1vZGlmaWVkIGZvciBTY2h3YXJ6ZWNrKSxcIiwgXCJiZXNzX25hbVwiLCA2Mzc3NDgzLjg2NSwgMjk5LjE1MjgxMjgpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoMTUsIDcwMTMsIFwiQ2xhcmtlIDE4ODAgKG1vZGlmaWVkIGZvciBBcmMgMTk1MCksXCIsIFwiY2xyazgwXCIsIDYzNzgyNDkuMTQ1MzI2LCAyOTMuNDY2MzA3NiksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCgxNiwgNzAxNCwgXCJDbGFya2UgMTg4MCAobW9kaWZpZWQgZm9yIE1lcmNoaWNoKSxcIiwgbnVsbCwgNjM3ODI0OS4yLCAyOTMuNDY1OTgpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoMTcsIDcwMTgsIFwiRXZlcmVzdCAxODMwIChtb2RpZmllZCBmb3IgS2VydGF1KSxcIiwgXCJldnJzdDQ4XCIsIDYzNzczMDQuMDYzLCAzMDAuODAxNyksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCgxOCwgLTEsIFwiRmlzY2hlciAxOTYwXCIsIFwiZnNjaHI2MFwiLCA2Mzc4MTY2LCAyOTguMyksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCgxOSwgLTEsIFwiRmlzY2hlciAxOTYwIChtb2RpZmllZCBmb3IgU291dGggQXNpYSksXCIsIFwiZnNjaHI2MG1cIiwgNjM3ODE1NSwgMjk4LjMpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoMjAsIC0xLCBcIkZpc2NoZXIgMTk2OFwiLCBcImZzY2hyNjhcIiwgNjM3ODE1MCwgMjk4LjMpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoMjEsIDcwMzYsIFwiR1JTIDY3XCIsIFwiR1JTNjdcIiwgNjM3ODE2MCwgMjk4LjI0NzE2NzQyNyksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCgyMiwgNzAyMCwgXCJIZWxtZXJ0IDE5MDZcIiwgXCJoZWxtZXJ0XCIsIDYzNzgyMDAsIDI5OC4zKSxcclxuICAgICAgICBuZXcgRWxsaXBzb2lkKDIzLCA3MDUzLCBcIkhvdWdoXCIsIFwiaG91Z2hcIiwgNjM3ODI3MCwgMjk3KSxcclxuICAgICAgICBuZXcgRWxsaXBzb2lkKDI0LCA3MDUwLCBcIlNvdXRoIEFtZXJpY2FuXCIsIG51bGwsIDYzNzgxNjAsIDI5OC4yNSksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCgyNSwgNzAyOSwgXCJXYXIgT2ZmaWNlXCIsIG51bGwsIDYzNzgzMDAuNTgzLCAyOTYpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoMjYsIC0xLCBcIldHUyA2MFwiLCBcIldHUzYwXCIsIDYzNzgxNjUsIDI5OC4zKSxcclxuICAgICAgICBuZXcgRWxsaXBzb2lkKDI3LCA3MDI1LCBcIldHUyA2NlwiLCBcIldHUzY2XCIsIDYzNzgxNDUsIDI5OC4yNSksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCgyOCwgNzAzMCwgXCJXR1MgODRcIiwgXCJXR1M4NFwiLCA2Mzc4MTM3LCAyOTguMjU3MjIzNTYzKSxcclxuICAgICAgICBuZXcgRWxsaXBzb2lkKDMwLCA3MDExLCBcIkNsYXJrZSAxODgwIChtb2RpZmllZCBmb3IgSUdOKSxcIiwgXCJjbHJrODBpZ25cIiwgNjM3ODI0OS4yLCAyOTMuNDY2MDIxMyksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCgzMSwgNzA0OSwgXCJJQUcgNzVcIiwgXCJJQVU3NlwiLCA2Mzc4MTQwLCAyOTguMjU3MjIyKSxcclxuICAgICAgICBuZXcgRWxsaXBzb2lkKDMyLCAtMSwgXCJNRVJJVCA4M1wiLCBcIk1FUklUXCIsIDYzNzgxMzcsIDI5OC4yNTcpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoMzMsIC0xLCBcIk5ldyBJbnRlcm5hdGlvbmFsIDE5NjdcIiwgXCJuZXdfaW50bFwiLCA2Mzc4MTU3LjUsIDI5OC4yNSksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCgzNCwgLTEsIFwiV2FsYmVja1wiLCBcIndhbGJlY2tcIiwgNjM3Njg5NiwgMzAyLjc4KSxcclxuICAgICAgICBuZXcgRWxsaXBzb2lkKDM1LCA3MDA1LCBcIkJlc3NlbCAxODQxIChtb2RpZmllZCBmb3IgTkdPIDE5NDgpLFwiLCBudWxsLCA2Mzc3NDkyLjAxNzYsIDI5OS4xNTI4MSksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCgzNiwgNzAwNywgXCJDbGFya2UgMTg1OFwiLCBudWxsLCA2Mzc4MjkzLjYzOSwgMjk0LjI2MDY4KSxcclxuICAgICAgICBuZXcgRWxsaXBzb2lkKDM3LCA3MDEzLCBcIkNsYXJrZSAxODgwIChtb2RpZmllZCBmb3IgSmFtYWljYSksXCIsIG51bGwsIDYzNzgyNDkuMTM2LCAyOTMuNDY2MzEpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoMzgsIDcwMTAsIFwiQ2xhcmtlIDE4ODAgKG1vZGlmaWVkIGZvciBQYWxlc3RpbmUpLFwiLCBudWxsLCA2Mzc4MzAwLjc5LCAyOTMuNDY2MjMpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoMzksIDcwMTYsIFwiRXZlcmVzdCAxODMwIChtb2RpZmllZCBmb3IgVGltYmFsYWkpLFwiLCBcImV2cnN0U1NcIiwgNjM3NzI5OC41NTYsIDMwMC44MDE3KSxcclxuICAgICAgICBuZXcgRWxsaXBzb2lkKDQwLCA3MDQ0LCBcIkV2ZXJlc3QgMTgzMCAobW9kaWZpZWQgZm9yIEthbGlhbnB1ciksXCIsIFwiZXZyc3Q1NlwiLCA2Mzc3MzAxLjI0MywgMzAwLjgwMTc0KSxcclxuICAgICAgICBuZXcgRWxsaXBzb2lkKDQxLCA3MDIxLCBcIkluZG9uZXNpYW5cIiwgbnVsbCwgNjM3ODE2MCwgMjk4LjI0NyksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCg0MiwgNzAyNSwgXCJOV0wgOURcIiwgXCJOV0w5RFwiLCA2Mzc4MTQ1LCAyOTguMjUpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoNDMsIDcwNDMsIFwiTldMIDEwRFwiLCBudWxsLCA2Mzc4MTM1LCAyOTguMjYpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoNDQsIDcwMzIsIFwiT1NVODZGXCIsIG51bGwsIDYzNzgxMzYuMiwgMjk4LjI1NzIyKSxcclxuICAgICAgICBuZXcgRWxsaXBzb2lkKDQ1LCA3MDMzLCBcIk9TVTkxQVwiLCBudWxsLCA2Mzc4MTM2LjMsIDI5OC4yNTcyMiksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCg0NiwgNzAyNywgXCJQbGVzc2lzIDE4MTdcIiwgXCJwbGVzc2lzXCIsIDYzNzY1MjMsIDMwOC42NCksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCg0NywgNzAyOCwgXCJTdHJ1dmUgMTg2MFwiLCBudWxsLCA2Mzc4Mjk3LCAyOTQuNzMpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoNDgsIDcwNTYsIFwiRXZlcmVzdCAxODMwIChtb2RpZmllZCBmb3IgV2VzdCBNYWxheXNpYSksXCIsIFwiZXZyc3Q2OVwiLCA2Mzc3Mjk1LjY2NCwgMzAwLjgwMTcpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoNDksIC0xLCBcIklyaXNoIChXT0ZPKSxcIiwgbnVsbCwgNjM3NzU0Mi4xNzgsIDI5OS4zMjUpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoNTAsIC0xLCBcIkV2ZXJlc3QgKFBha2lzdGFuKSxcIiwgbnVsbCwgNjM3NzMwOS42MTMsIDMwMC44MDE3KSxcclxuICAgICAgICBuZXcgRWxsaXBzb2lkKDUxLCA3MDQxLCBcIkFUUyA3NyAoQXZlcmFnZSBUZXJyZXN0cmlhbCBTeXN0ZW0gMTk3NyksXCIsIG51bGwsIDYzNzgxMzUsIDI5OC4yNTcpLFxyXG4gICAgICAgIG5ldyBFbGxpcHNvaWQoNTIsIDcwNTQsIFwiUFo5MCAoUnVzc2lhKSxcIiwgbnVsbCwgNjM3ODEzNiwgMjk4LjI1NzgzOTMwMyksXHJcbiAgICAgICAgbmV3IEVsbGlwc29pZCg1MywgLTEsIFwiWGlhbiAxOTgwXCIsIG51bGwsIDYzNzgxNDAsIDI5OC4yNSldO1xyXG59IiwiaW1wb3J0IHsgRGVzY3JpcHRpb24gfSBmcm9tIFwiLi9EZXNjcmlwdGlvbnNcIjtcclxuaW1wb3J0IHsgVW5pdCB9IGZyb20gXCIuL1VuaXRzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFyYW1ldGVyIGV4dGVuZHMgRGVzY3JpcHRpb24ge1xyXG4gICAgcnVOYW1lOiBzdHJpbmc7XHJcbiAgICB3a3ROYW1lOiBzdHJpbmc7XHJcbiAgICB2YWx1ZTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsIGVwc2c6IG51bWJlciwgbmFtZTogc3RyaW5nLCBydU5hbWU6IHN0cmluZywgd2t0TmFtZTogc3RyaW5nLCBwcm9qTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIGVwc2csIHByb2pOYW1lLCBuYW1lKTtcclxuICAgICAgICB0aGlzLndrdE5hbWUgPSB3a3ROYW1lO1xyXG4gICAgICAgIHRoaXMucnVOYW1lID0gcnVOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHRvUHJvaigpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5pZCkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlICE9IG51bGwpIHJldHVybiB0aGlzLnZhbHVlLnRvUHJvaigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9qICE9IG51bGwpIHJldHVybiBgJHt0aGlzLnByb2p9PSR7dGhpcy52YWx1ZX1gO1xyXG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRpY3Q6IFBhcmFtZXRlcltdID0gW1xyXG4gICAgICAgIG5ldyBQYXJhbWV0ZXIoMSwgbnVsbCwgXCJEYXR1bVwiLCBcItCU0LDRgtGD0LxcIiwgXCJEYXR1bVwiLCBcIitkYXR1bVwiKSxcclxuICAgICAgICBuZXcgUGFyYW1ldGVyKDIsIG51bGwsIFwiVW5pdFwiLCBcItCV0LQuINC40LfQvNC10YDQtdC90LjRj1wiLCBcIlVuaXRzXCIsIFwiK3VuaXRzXCIpLFxyXG4gICAgICAgIG5ldyBQYXJhbWV0ZXIoMywgODgwMiwgXCJMb25naXR1ZGUgb2YgbmF0dXJhbCBvcmlnaW5cIiwgXCLQndGD0LvQtdCy0LDRjyDQtNC+0LvQs9C+0YLQsFwiLCBcIkNlbnRyYWxfTWVyaWRpYW5cIiwgXCIrbG9uXzBcIiksXHJcbiAgICAgICAgbmV3IFBhcmFtZXRlcig0LCA4ODAxLCBcIkxhdGl0dWRlIG9mIG5hdHVyYWwgb3JpZ2luXCIsIFwi0J3Rg9C70LXQstCw0Y8g0YjQuNGA0L7RgtCwXCIsIFwiTGF0aXR1ZGVfT2ZfT3JpZ2luXCIsIFwiK2xhdF8wXCIpLFxyXG4gICAgICAgIG5ldyBQYXJhbWV0ZXIoNSwgODgyMywgXCJMYXRpdHVkZSBvZiAxc3Qgc3RhbmRhcmQgcGFyYWxsZWxcIiwgXCLQodGC0LDQvdC00LDRgNGC0L3QsNGPINC/0LDRgNCw0LvQu9C10LvRjCAxXCIsIFwiU3RhbmRhcmRfUGFyYWxsZWxfMVwiLCBcIitsYXRfMVwiKSxcclxuICAgICAgICBuZXcgUGFyYW1ldGVyKDYsIDg4MjQsIFwiTGF0aXR1ZGUgb2YgMm5kIHN0YW5kYXJkIHBhcmFsbGVsXCIsIFwi0KHRgtCw0L3QtNCw0YDRgtC90LDRjyDQv9Cw0YDQsNC70LvQtdC70YwgMlwiLCBcIlN0YW5kYXJkX1BhcmFsbGVsXzJcIiwgXCIrbGF0XzJcIiksXHJcbiAgICAgICAgbmV3IFBhcmFtZXRlcig3LCA4ODEzLCBcIkF6aW11dGggb2YgaW5pdGlhbCBsaW5lXCIsIFwi0JDQt9C40LzRg9GCXCIsIFwiQXppbXV0aFwiLCBcIithbHBoYVwiKSxcclxuICAgICAgICBuZXcgUGFyYW1ldGVyKDgsIDg4MDUsIFwiU2NhbGUgZmFjdG9yIGF0IG5hdHVyYWwgb3JpZ2luXCIsIFwi0JzQsNGB0YjRgtCw0LHQvdGL0Lkg0LzQvdC+0LbQuNGC0LXQu9GMXCIsIFwiU2NhbGVfRmFjdG9yXCIsIFwiK2tfMFwiKSxcclxuICAgICAgICBuZXcgUGFyYW1ldGVyKDksIDg4MDYsIFwiRmFsc2UgZWFzdGluZ1wiLCBcItCS0L7RgdGC0L7Rh9C90L7QtSDRgdC80LXRidC10L3QuNC1XCIsIFwiRmFsc2VfRWFzdGluZ1wiLCBcIit4XzBcIiksXHJcbiAgICAgICAgbmV3IFBhcmFtZXRlcigxMCwgODgwNywgXCJGYWxzZSBub3J0aGluZ1wiLCBcItCh0LXQstC10YDQvdC+0LUg0YHQvNC10YnQtdC90LjQtVwiLCBcIkZhbHNlX05vcnRoaW5nXCIsIFwiK3lfMFwiKSxcclxuICAgICAgICBuZXcgUGFyYW1ldGVyKDExLCBudWxsLCBcIlJhbmdlXCIsIFwi0J7RhdCy0LDRglwiLCBcIlwiLCBudWxsKV07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBZmZpbmUge1xyXG4gICAgdW5pdDogVW5pdDtcclxuICAgIGE6IG51bWJlcjtcclxuICAgIGI6IG51bWJlcjtcclxuICAgIGM6IG51bWJlcjtcclxuICAgIGQ6IG51bWJlcjtcclxuICAgIGU6IG51bWJlcjtcclxuICAgIGY6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih1bml0OiBVbml0LCBhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyLCBkOiBudW1iZXIsIGU6IG51bWJlciwgZjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy51bml0ID0gdW5pdDtcclxuICAgICAgICB0aGlzLmEgPSBhO1xyXG4gICAgICAgIHRoaXMuYiA9IGI7XHJcbiAgICAgICAgdGhpcy5jID0gYztcclxuICAgICAgICB0aGlzLmQgPSBkO1xyXG4gICAgICAgIHRoaXMuZSA9IGU7XHJcbiAgICAgICAgdGhpcy5mID0gZjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJvdW5kIHtcclxuICAgIG1pblg6IG51bWJlcjtcclxuICAgIG1pblk6IG51bWJlcjtcclxuICAgIG1heFg6IG51bWJlcjtcclxuICAgIG1heFk6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtaW5YOiBudW1iZXIsIG1pblk6IG51bWJlciwgbWF4WDogbnVtYmVyLCBtYXhZOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1pblggPSBtaW5YO1xyXG4gICAgICAgIHRoaXMubWluWSA9IG1pblk7XHJcbiAgICAgICAgdGhpcy5tYXhYID0gbWF4WDtcclxuICAgICAgICB0aGlzLm1heFkgPSBtYXhZO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRGVzY3JpcHRpb24gfSBmcm9tIFwiLi9EZXNjcmlwdGlvbnNcIjtcclxuaW1wb3J0IHsgUGFyYW1ldGVyIH0gZnJvbSBcIi4vUGFyYW1ldGVyc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByb2plY3Rpb24gZXh0ZW5kcyBEZXNjcmlwdGlvbiB7XHJcbiAgICBydU5hbWU6IHN0cmluZztcclxuICAgIHdrdE5hbWU6IHN0cmluZztcclxuXHJcbiAgICBwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLCBlcHNnOiBudW1iZXIsIG5hbWU6IHN0cmluZywgcnVOYW1lOiBzdHJpbmcsIHdrdE5hbWU6IHN0cmluZywgcHJvak5hbWU6IHN0cmluZywgcGFyYW1zOiBudW1iZXJbXSkge1xyXG4gICAgICAgIHN1cGVyKGlkLCBlcHNnLCBwcm9qTmFtZSwgbmFtZSk7XHJcbiAgICAgICAgdGhpcy5ydU5hbWUgPSBydU5hbWU7XHJcbiAgICAgICAgdGhpcy53a3ROYW1lID0gd2t0TmFtZTtcclxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMgPSBuZXcgQXJyYXk8UGFyYW1ldGVyPigpO1xyXG4gICAgICAgIHBhcmFtcy5mb3JFYWNoKHAgPT4gdGhpcy5zZXRQYXJhbWV0ZXIocCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBhcmFtZXRlcihwYXJhbWV0ZXJJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnB1c2goUGFyYW1ldGVyLmRpY3QuZmluZChwID0+IHAuaWQgPT09IHBhcmFtZXRlcklkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9Qcm9qKCk6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIHJlcyA9IGArcHJvaj0ke3RoaXMucHJvan1gO1xyXG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5mb3JFYWNoKHAgPT4gcmVzID0gYCR7cmVzfSAke3AudG9Qcm9qKCl9YCk7XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZGljdDogUHJvamVjdGlvbltdID0gW1xyXG4gICAgICAgIG5ldyBQcm9qZWN0aW9uKDEsIDQzMjYsIFwiTG9uZ2l0dWRlL0xhdGl0dWRlXCIsIFwi0JTQvtC70LPQvtGC0LAt0KjQuNGA0L7RgtCwXCIsIFwiXCIsIFwibG9ubGF0XCIsIFsxXSksXHJcbiAgICAgICAgbmV3IFByb2plY3Rpb24oMiwgNDMyNiwgXCJDeWxpbmRyaWNhbCBFcXVhbC1BcmVhXCIsIFwi0KDQsNCy0L3QvtC/0LvQvtGJ0LDQtNC90LDRjyDRhtC40LvQuNC90LTRgNC40YfQtdGB0LrQsNGPXCIsIFwiXCIsIFwiY2VhXCIsIFsxLCAyLCAzLCA1XSksXHJcbiAgICAgICAgbmV3IFByb2plY3Rpb24oMywgOTgwMSwgXCJMYW1iZXJ0IENvbmZvcm1hbCBDb25pY1wiLCBcItCg0LDQstC90L7Rg9Cz0L7Qu9GM0L3QsNGPINC60L7QvdC40YfQtdGB0LrQsNGPINC/0YDQvtC10LrRhtC40Y8g0JvQsNC80LHQtdGA0YLQsFwiLCBcIkxhbWJlcnQgY29uZm9ybWFsIGNvbmljXCIsIFwibGNjXCIsIFsxLCAyLCAzLCA0LCA1LCA2LCA5LCAxMF0pLFxyXG4gICAgICAgIG5ldyBQcm9qZWN0aW9uKDQsIDk4MjAsIFwiTGFtYmVydCBBemltdXRoYWwgRXF1YWwtQXJlYSAocG9sYXIgYXNwZWN0IG9ubHkpXCIsIFwi0KDQsNCy0L3QvtC/0LvQvtGJ0LDQtNC90LDRjyDQsNC30LjQvNGD0YLQsNC70YzQvdCw0Y8g0JvQsNC80LHQtdGA0YLQsCAo0YLQvtC70YzQutC+INCyINC/0L7Qu9GP0YDQvdC+0Lkg0L7QsdC70LDRgdGC0LgpXCIsIFwiXCIsIFwibGFlYVwiLCBbMSwgMiwgMywgNCwgMTFdKSxcclxuICAgICAgICBuZXcgUHJvamVjdGlvbig1LCA0MzI2LCBcIkF6aW11dGhhbCBFcXVpZGlzdGFudCAocG9sYXIgYXNwZWN0IG9ubHkpXCIsIFwi0KDQsNCy0L3QvtC/0YDQvtC80LXQttGD0YLQvtGH0L3QsNGPINC60L7QvdC40YfQtdGB0LrQsNGPICjRgtC+0LvRjNC60L4g0LTQu9GPINC/0L7Qu9GP0YDQvdGL0YUg0L7QsdC70LDRgdGC0LXQuSlcIiwgXCJBemltdXRoYWwgb3IgUGxhbmFyIFByb2plY3Rpb25zIFwiLCBcImFlcWRcIiwgWzEsIDIsIDMsIDQsIDExXSksXHJcbiAgICAgICAgbmV3IFByb2plY3Rpb24oNiwgNTQwMjcsIFwiRXF1aWRpc3RhbnQgQ29uaWMsIGFsc28ga25vd24gYXMgU2ltcGxlIENvbmljXCIsIFwi0KDQsNCy0L3QvtC/0YDQvtC80LXQttGD0YLQvtGH0L3QsNGPINC60L7QvdC40YfQtdGB0LrQsNGPXCIsIFwiXCIsIFwiZXFkY1wiLCBbMSwgMiwgMywgNCwgNSwgNiwgOSwgMTBdKSxcclxuICAgICAgICBuZXcgUHJvamVjdGlvbig3LCA5ODEyLCBcIkhvdGluZSBPYmxpcXVlIE1lcmNhdG9yXCIsIFwi0JrQvtGB0LDRjyDQnNC10YDQutCw0YLQvtGA0LAg4oCTINCl0L7RgtC40L3QsFwiLCBcIk9ibGlxdWUgTWVyY2F0b3JcIiwgXCJvbWVyY1wiLCBbMSwgMiwgMywgNCwgNywgOCwgOSwgMTBdKSxcclxuICAgICAgICBuZXcgUHJvamVjdGlvbig4LCA5ODA3LCBcIlRyYW5zdmVyc2UgTWVyY2F0b3IsIChhbHNvIGtub3duIGFzIEdhdXNzLUtydWdlcilcIiwgXCLQn9C+0L/QtdGA0LXRh9C90LDRjyDQnNC10YDQutCw0YLQvtGA0LBcIiwgXCJHYXVzcy1LcnVnZXIsIFRyYW5zdmVyc2UgTWVyY2F0b3JcIiwgXCJ0bWVyY1wiLCBbMSwgMiwgMywgNCwgOCwgOSwgMTBdKSxcclxuICAgICAgICBuZXcgUHJvamVjdGlvbig5LCA5ODIyLCBcIkFsYmVycyBFcXVhbC1BcmVhIENvbmljXCIsIFwi0JrQvtC90LjRh9C10YHQutCw0Y8g0YDQsNCy0L3QvtC/0LvQvtGJ0LDQtNC90LDRjyDQkNC70LHQtdGA0YHQsFwiLCBcIkFsYmVycyBjb25pYyBlcXVhbC1hcmVhXCIsIFwiYWVhXCIsIFsxLCAyLCAzLCA0LCA1LCA2LCA5LCAxMF0pLFxyXG4gICAgICAgIG5ldyBQcm9qZWN0aW9uKDEwLCA5ODA0LCBcIk1lcmNhdG9yXCIsIFwi0JzQtdGA0LrQsNGC0L7RgNCwXCIsIFwiTWVyY2F0b3JcIiwgXCJtZXJjXCIsIFsxLCAyLCAzXSksXHJcbiAgICAgICAgbmV3IFByb2plY3Rpb24oMTEsIDU0MDAzLCBcIk1pbGxlciBDeWxpbmRyaWNhbFwiLCBcItCc0LjQu9C70LXRgNCwXCIsIFwiXCIsIFwibWlsbFwiLCBbMSwgMiwgM10pLFxyXG4gICAgICAgIG5ldyBQcm9qZWN0aW9uKDEyLCA1NDAzMCwgXCJSb2JpbnNvblwiLCBcItCg0L7QsdC40L3RgdC+0L3QsFwiLCBcIlwiLCBcInJvYmluXCIsIFsxLCAyLCAzXSksXHJcbiAgICAgICAgbmV3IFByb2plY3Rpb24oMTMsIDU0MDA5LCBcIk1vbGx3ZWlkZVwiLCBcItCc0L7Qu9GM0LLQtdC50LTQtVwiLCBcIlwiLCBcIm1vbGxcIiwgWzEsIDIsIDNdKSxcclxuICAgICAgICBuZXcgUHJvamVjdGlvbigxNCwgNTQwMTIsIFwiRWNrZXJ0IElWXCIsIFwi0K3QutC60LXRgNGC0LAgSVZcIiwgXCJcIiwgXCJlY2s0XCIsIFsxLCAyLCAzXSksXHJcbiAgICAgICAgbmV3IFByb2plY3Rpb24oMTUsIDU0MDEwLCBcIkVja2VydCBWSVwiLCBcItCt0LrQutC10YDRgtCwIFZJXCIsIFwiXCIsIFwiZWNrNlwiLCBbMSwgMiwgM10pLFxyXG4gICAgICAgIG5ldyBQcm9qZWN0aW9uKDE2LCA1NDAwOCwgXCJTaW51c29pZGFsXCIsIFwi0KHQuNC90YPRgdC+0LjQtNCw0LvRjNC90LDRj1wiLCBcIlwiLCBcInNpbnUgXCIsIFsxLCAyLCAzXSksXHJcbiAgICAgICAgbmV3IFByb2plY3Rpb24oMTcsIDU0MDE2LCBcIkdhbGxcIiwgXCLQk9Cw0LvQu9CwXCIsIFwiXCIsIFwiZ2FsbFwiLCBbMSwgMiwgM10pLFxyXG4gICAgICAgIG5ldyBQcm9qZWN0aW9uKDE4LCAyNzIwMCwgXCJOZXcgWmVhbGFuZCBNYXAgR3JpZFwiLCBcItCd0L7QstC+0LfQtdC70LDQvdC00YHQutCw0Y8g0LrQsNGA0YLQvtCz0YDQsNGE0LjRh9C10YHQutCw0Y9cIiwgXCJcIiwgXCJuem1nXCIsIFsxLCAyLCAzLCA0LCA5LCAxMF0pLFxyXG4gICAgICAgIG5ldyBQcm9qZWN0aW9uKDE5LCBudWxsLCBcIkxhbWJlcnQgQ29uZm9ybWFsIENvbmljIChtb2RpZmllZCBmb3IgQmVsZ2l1bSAxOTcyKVwiLCBcItCg0LDQstC90L7Rg9Cz0L7Qu9GM0L3QsNGPINC60L7QvdC40YfQtdGB0LrQsNGPINCb0LDQvNCx0LXRgNGC0LAgKNC00LvRjyDQkdC10LvRjNCz0LjQuCAxOTcyKVwiLCBcIlwiLCBcImxjY2FcIiwgWzEsIDIsIDMsIDQsIDUsIDYsIDksIDEwXSksXHJcbiAgICAgICAgbmV3IFByb2plY3Rpb24oMjAsIDU0MDI2LCBcIlN0ZXJlb2dyYXBoaWNcIiwgXCLQodGC0LXRgNC10L7Qs9GA0LDRhNC40YfQtdGB0LrQsNGPXCIsIFwiU3RlcmVvZ3JhcGhpY1wiLCBcInN0ZXJlXCIsIFsxLCAyLCAzLCA0LCA4LCA5LCAxMF0pLFxyXG4gICAgICAgIG5ldyBQcm9qZWN0aW9uKDIxLCBudWxsLCBcIlRyYW5zdmVyc2UgTWVyY2F0b3IsIChtb2RpZmllZCBmb3IgRGFuaXNoIFN5c3RlbSAzNCBKeWxsYW5kLUZ5bilcIiwgXCLQn9C+0L/QtdGA0LXRh9C90LDRjyDQnNC10YDQutCw0YLQvtGA0LAgKNC00LvRjyDQs9C+0LvQu9Cw0L3QtNGB0LrQvtC5INGB0LjRgdGC0LXQvNGLIDM0INC00LvRjyDRgNCw0LnQvtC90LAg0K7Qu9Cw0L3QtC3QpNC40L0pXCIsIFwiXCIsIFwidG1lcmNcIiwgWzEsIDIsIDMsIDQsIDgsIDksIDEwXSksXHJcbiAgICAgICAgbmV3IFByb2plY3Rpb24oMjIsIG51bGwsIFwiVHJhbnN2ZXJzZSBNZXJjYXRvciwgKG1vZGlmaWVkIGZvciBEYW5pc2ggU3lzdGVtIDM0IFNqYWVsbGFuZClcIiwgXCLQn9C+0L/QtdGA0LXRh9C90LDRjyDQnNC10YDQutCw0YLQvtGA0LAgKNC30L7QvdCwIDM0INCT0L7Qu9C70LDQvdC00LjQuCDQodGK0LXQu9Cw0L3QtClcIiwgXCJcIiwgXCJ0bWVyY1wiLCBbMSwgMiwgMywgNCwgOCwgOSwgMTBdKSxcclxuICAgICAgICBuZXcgUHJvamVjdGlvbigyMywgbnVsbCwgXCJUcmFuc3ZlcnNlIE1lcmNhdG9yLCAobW9kaWZpZWQgZm9yIERhbmlzaCBTeXN0ZW0gMzQvNDUgQm9ybmhvbG0pXCIsIFwi0J/QvtC/0LXRgNC10YfQvdCw0Y8g0JzQtdGA0LrQsNGC0L7RgNCwICgzNC8zNSDQt9C+0L3RiyDQtNC70Y8g0JPQvtC70LvQsNC90LTQuNC4OiDQkdC+0YDQvdGF0L7Qu9GM0LwpXCIsIFwiXCIsIFwidG1lcmNcIiwgWzEsIDIsIDMsIDQsIDgsIDksIDEwXSksXHJcbiAgICAgICAgbmV3IFByb2plY3Rpb24oMjQsIG51bGwsIFwiVHJhbnN2ZXJzZSBNZXJjYXRvciwgKG1vZGlmaWVkIGZvciBGaW5uaXNoIEtLSilcIiwgXCLQn9C+0L/QtdGA0LXRh9C90LDRjyDQv9GA0L7QtdC60YbQuNGPINCc0LXRgNC60LDRgtC+0YDQsCAo0LTQu9GPINCk0LjQvdC70Y/QvdC00LjQuCBLS0opXCIsIFwiXCIsIFwidG1lcmNcIiwgWzEsIDIsIDMsIDQsIDgsIDksIDEwXSksXHJcbiAgICAgICAgbmV3IFByb2plY3Rpb24oMjUsIDk4MTUsIFwiU3dpc3MgT2JsaXF1ZSBNZXJjYXRvclwiLCBcItCa0L7RgdCw0Y8g0JzQtdGA0LrQsNGC0L7RgNCwINC00LvRjyDQqNCy0LXQudGG0LDRgNC40LhcIiwgXCJcIiwgXCJzb21lcmNcIiwgWzEsIDIsIDMsIDQsIDksIDEwXSksXHJcbiAgICAgICAgbmV3IFByb2plY3Rpb24oMjYsIG51bGwsIFwiUmVnaW9uYWwgTWVyY2F0b3JcIiwgXCLQoNC10LPQuNC+0L3QsNC70YzQvdCw0Y8g0JzQtdGA0LrQsNGC0L7RgNCwXCIsIFwiXCIsIFwidG1lcmNcIiwgWzEsIDIsIDMsIDVdKSxcclxuICAgICAgICBuZXcgUHJvamVjdGlvbigyNywgOTgxOCwgXCJQb2x5Y29uaWNcIiwgXCLQn9C+0LvQuNC60L7QvdC40YfQtdGB0LrQsNGPXCIsIFwiQW1lcmljYW4gUG9seWNvbmljID9cIiwgXCJwb2x5IFwiLCBbMSwgMiwgMywgNCwgOSwgMTBdKSxcclxuICAgICAgICBuZXcgUHJvamVjdGlvbigyOCwgNDMyNiwgXCJBemltdXRoYWwgRXF1aWRpc3RhbnQgKGFsbCBvcmlnaW4gbGF0aXR1ZGVzKVwiLCBcItCg0LDQstC90L7Qv9GA0L7QvNC10LbRg9GC0L7Rh9C90LDRjyDQutC+0L3QuNGH0LXRgdC60LDRj1wiLCBcIlwiLCBcImFlcWRcIiwgWzEsIDIsIDMsIDQsIDExXSksXHJcbiAgICAgICAgbmV3IFByb2plY3Rpb24oMjksIDk4MjAsIFwiTGFtYmVydCBBemltdXRoYWwgRXF1YWwtQXJlYVwiLCBcItCg0LDQstC90L7Qv9C70L7RidCw0LTQvdCw0Y8g0LDQt9C40LzRg9GC0LDQu9GM0L3QsNGPINCb0LDQvNCx0LXRgNGC0LBcIiwgXCJMYW1iZXJ0IEF6aW11dGhhbCBFcXVhbCBBcmVhXCIsIFwibGFlYVwiLCBbMSwgMiwgMywgNCwgMTFdKSxcclxuICAgICAgICBuZXcgUHJvamVjdGlvbigzMCwgOTgwNiwgXCJDYXNzaW5pLVNvbGRuZXJcIiwgXCLQmtCw0YHRgdC40L3QuC3QodC+0LvQtNC90LXRgNCwXCIsIFwiQ2Fzc2luaS1Tb2xkbmVyXCIsIFwiY2Fzc1wiLCBbMSwgMiwgMywgNCwgOSwgMTBdKSxcclxuICAgICAgICBuZXcgUHJvamVjdGlvbigzMSwgOTgwOSwgXCJEb3VibGUgU3RlcmVvZ3JhcGhpY1wiLCBcItCU0LLQvtC50L3QsNGPINGB0YLQtdGA0LXQvtCz0YDQsNGE0LjRh9C10YHQutCw0Y9cIiwgXCJPYmxpcXVlIHN0ZXJlb2dyYXBoaWNcIiwgXCJzdGVyZWFcIiwgWzEsIDIsIDMsIDQsIDgsIDksIDEwXSksXHJcbiAgICAgICAgbmV3IFByb2plY3Rpb24oMzIsIDk4MTksIFwiS3JvdmFrIE9ibGlxdWUgQ29uZm9ybWFsIENvbmljIChKVFNLYylcIiwgXCLQmtC+0YHQsNGPINGA0LDQstC90L7Rg9Cz0L7Qu9GM0L3QsNGPINC60L7QvdC40YfQtdGB0LrQsNGPINC/0YDQvtC10LrRhtC40Y8g0JrRgNC+0LLQsNC6IChKVFNLYylcIiwgXCJcIiwgXCJrcm92YWtcIiwgWzEsIDIsIDMsIDQsIDUsIDcsIDksIDEwXSksXHJcbiAgICAgICAgbmV3IFByb2plY3Rpb24oMzMsIDk4NDIsIFwiRXF1aWRpc3RhbnQgQ3lsaW5kcmljYWxcIiwgXCLQoNCw0LLQvdC+0L/RgNC+0LzQtdC20YPRgtC+0YfQvdCw0Y8g0YbQuNC70LjQvdC00YDQuNGH0LXRgdC60LDRj1wiLCBcIlwiLCBcImVxY1wiLCBbMSwgMiwgMywgNSwgOSwgMTBdKV07XHJcbn0iLCJpbXBvcnQgeyBEZXNjcmlwdGlvbiB9IGZyb20gXCIuL0Rlc2NyaXB0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVuaXQgZXh0ZW5kcyBEZXNjcmlwdGlvbiB7XHJcbiAgICBydU5hbWU6IHN0cmluZztcclxuICAgIGI6IG51bWJlcjtcclxuICAgIGM6IG51bWJlcjtcclxuICAgIHRhcmdldEVwc2c6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLCBlcHNnOiBudW1iZXIsIHByb2o6IHN0cmluZywgbmFtZTogc3RyaW5nLCBydU5hbWU6IHN0cmluZywgYjogbnVtYmVyLCBjOiBudW1iZXIsIHRhcmdldEVwc2c6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKGlkLCBlcHNnLCBwcm9qLCBuYW1lKTtcclxuICAgICAgICB0aGlzLnJ1TmFtZSA9IHJ1TmFtZTtcclxuICAgICAgICB0aGlzLmIgPSBiO1xyXG4gICAgICAgIHRoaXMuYyA9IGM7XHJcbiAgICAgICAgdGhpcy50YXJnZXRFcHNnID0gdGFyZ2V0RXBzZztcclxuICAgIH1cclxuXHJcbiAgICB0b1Byb2ooKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCt1bml0cz0ke3RoaXMucHJvan1gO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkaWN0OiBVbml0W10gPSBbXHJcbiAgICAgICAgbmV3IFVuaXQoMCwgOTAzNSwgXCJtaVwiLCBcIk1pbGVzXCIsIFwi0LzQuNC70LhcIiwgNjMzNjAsIDM5LjM3LCA5MDAxKSxcclxuICAgICAgICBuZXcgVW5pdCgxLCA5MDM2LCBcImttXCIsIFwiS2lsb21ldGVyc1wiLCBcItCa0LjQu9C+0LzQtdGC0YDRi1wiLCAxMDAwLCAxLCA5MDAxKSxcclxuICAgICAgICBuZXcgVW5pdCgyLCAtMSwgXCJpblwiLCBcIkluY2hlc1wiLCBcItCU0Y7QudC80YtcIiwgMSwgMzkuMzcsIDkwMDEpLFxyXG4gICAgICAgIG5ldyBVbml0KDMsIDkwMDIsIFwiZnRcIiwgXCJGZWV0IChhbHNvIGNhbGxlZCBJbnRlcm5hdGlvbmFsIEZlZXQpXCIsIFwi0KTRg9GCICjRgtCw0LrQttC1INC90LDQt9GL0LLQsNC10YLRgdGPINC80LXQttC00YPQvdCw0YDQvtC00L3Ri9C5INGE0YPRgikg0J7QtNC40L0g0LzQtdC20LTRg9C90LDRgNC+0LTQvdGL0Lkg0YTRg9GCINGA0LDQstC10L0g0YLQvtGH0L3QviAzMC40OCDRgdC8XCIsIDAuMzA0OCwgMSwgOTAwMSksXHJcbiAgICAgICAgbmV3IFVuaXQoNCwgOTA5NiwgXCJ5ZFwiLCBcIllhcmRzXCIsIFwi0Y/RgNC0XCIsIDAuOTE0NCwgMSwgOTAwMSksXHJcbiAgICAgICAgbmV3IFVuaXQoNSwgMTAyNSwgXCJtbVwiLCBcIk1pbGxpbWV0ZXJzXCIsIFwi0LzQuNC70LvQuNC80LXRgtGA0YtcIiwgMSwgMTAwMCwgOTAwMSksXHJcbiAgICAgICAgbmV3IFVuaXQoNiwgMTAzMywgXCJjbVwiLCBcIkNlbnRpbWV0ZXJzXCIsIFwi0KHQsNC90YLQuNC80LXRgtGA0YtcIiwgMSwgMTAwLCA5MDAxKSxcclxuICAgICAgICBuZXcgVW5pdCg3LCA5MDAxLCBcIm1cIiwgXCJNZXRlcnNcIiwgXCLQvNC10YLRgNGLXCIsIDEsIDEsIDkwMDEpLFxyXG4gICAgICAgIG5ldyBVbml0KDgsIDkwMDMsIFwidXMtZnRcIiwgXCJVUyBTdXJ2ZXkgRmVldCAodXNlZCBmb3IgMTkyNyBTdGF0ZSBQbGFuZSlcIiwgXCLQs9C10L7QtNC10LfQuNGH0LXRgdC60LjQuSDRhNGD0YIg0KHQqNCQICjQv9GA0LjQvdGP0YLRi9C5INC00LvRjyDQv9C70LDQvdC+0LLRi9GFINGB0LjRgdGC0LXQvCDRiNGC0LDRgtC+0LIgMTkyNykg0L7QtNC40L0g0LPQtdC+0LTQtdC30LjRh9C10YHQutC40Lkg0YTRg9GCINCh0KjQkCDRgNCw0LLQtdC9INGC0L7Rh9C90L4gMTIvMzkuMzcg0LzQtdGC0YDQsCDQuNC70Lgg0L/RgNCx0LvQuNC30LjRgtC10LvRjNC90L4gMzAuNDgwMDYg0YHQvFwiLCAxMiwgMzkuMzcsIDkwMDEpLFxyXG4gICAgICAgIG5ldyBVbml0KDksIDkwMzAsIFwia21pXCIsIFwiTmF1dGljYWwgTWlsZXNcIiwgXCLQvNC+0YDRgdC60LDRjyDQvNC40LvRjyAo0L7QtNC90LAg0LzQvtGA0YHQutCw0Y8g0LzQuNC70Y8g0YDQsNCy0L3QviDRgtC+0YfQvdC+IDE4NTIg0LzQtdGC0YDQsNC8KVwiLCAxODUyLCAxLCA5MDAxKSxcclxuICAgICAgICBuZXcgVW5pdCgzMCwgOTA5OCwgXCJsaW5rXCIsIFwiTGlua3NcIiwgXCLQu9C40L3QulwiLCAyMC4xMTY4LCAxMDAsIDkwMDEpLFxyXG4gICAgICAgIG5ldyBVbml0KDMxLCA5MDk3LCBcImNoXCIsIFwiQ2hhaW5zXCIsIFwi0YfQtdC50L1cIiwgMjAuMTE2OCwgMSwgOTAwMSksXHJcbiAgICAgICAgbmV3IFVuaXQoMzIsIC0xLCBcInJvZFwiLCBcIlJvZHNcIiwgXCLRgNC+0LRcIiwgMzMsIDIsIDkwMDMpXTtcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQ29vcmRpbmF0ZVJlZmVyZW5jZVN5c3RlbURlc2NyaXB0aW9uIH0gZnJvbSBcIi4vQ29vcmRpbmF0ZVJlZmVyZW5jZVN5c3RlbURlc2NyaXB0aW9uc1wiO1xyXG5cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGJ1dHRvbiA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pYnV0dG9uXCIpO1xyXG4gICAgYnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2V0VHJhaW5pbmdOYW1lKTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gZ2V0VHJhaW5pbmdOYW1lKHRoaXM6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IG1pdGV4dCA9PEhUTUxUZXh0QXJlYUVsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWl0ZXh0XCIpO1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSBtaXRleHQudmFsdWU7XHJcbiAgICAgICAgbGV0IHByb2o0dGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvajR0ZXh0XCIpO1xyXG4gICAgXHJcbiAgICAgICAgdmFyIGNzID0gQ29vcmRpbmF0ZVJlZmVyZW5jZVN5c3RlbURlc2NyaXB0aW9uLnBhcnNlKHRleHQpO1xyXG5cclxuICAgICAgICB2YXIgcHJval9zdHIgPSBjcy50b1Byb2ooKTtcclxuICAgICAgICBwcm9qNHRleHQudGV4dENvbnRlbnQgPSBwcm9qX3N0ciA7XHJcbiAgICB9XHJcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==