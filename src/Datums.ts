import { Description } from "./Descriptions";
import { Ellipsoid } from "./Ellipsoids";

export class Datum extends Description {
    ellipsoid: Ellipsoid;
    x: number;
    y: number;
    z: number;

    constructor(id: number, epsg: number, name: string, proj: string, ellipsoidId: number, x: number, y: number, z: number) {
        super(id, epsg, proj, name);
        this.ellipsoid = Ellipsoid.dict.find(e => e.id === ellipsoidId);
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toProj(): string {
        if (this.proj == null) return `${this.ellipsoid.toProj()} +towgs84=${this.x},${this.y},${this.z}`;
        return `+datum=${this.proj}`;
    }

    static parse(id: number, ellipsoidId: number, x: number, y: number, z: number): Datum {
        return new Datum(id, -1, "userDef", null, ellipsoidId, x, y, z);
    }

    static dict: Datum[] = [
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
        new Datum(154, 6214, "Beijing 1954", null, 3, -31.4, 144.3, 81.2)];
}

export class DatumExt extends Datum {
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    scalePpm: number;
    primeMeridian: number;

    constructor(id: number, epsg: number, name: string, proj: string, ellipsoidId: number, x: number, y: number, z: number,
        rX: number, rY: number, rZ: number, sc: number, pM: number) {
        super(id, epsg, name, proj, ellipsoidId, x, y, z);
        this.rotationX = rX;
        this.rotationY = rY;
        this.rotationZ = rZ;
        this.scalePpm = sc;
        this.primeMeridian = pM;
    }

    toProj(): string {
        if (this.proj == null) {
            var res = `${this.ellipsoid.toProj()} +towgs84=${this.x},${this.y},${this.z},
${this.rotationX * -1},${this.rotationY * -1},${this.rotationZ * -1},${this.scalePpm}`;
            if (this.primeMeridian !== 0) { res = `${res} +pm=${this.primeMeridian}`; }
            return res;
        }

        return `+datum=${this.proj}`;
    }

    static parseExt(id: number, ellipsoidId: number, x: number, y: number, z: number, rX: number, rY: number, rZ: number,
        sc: number, pM: number): DatumExt {
        return new DatumExt(id, -1, "userDef", null, ellipsoidId, x, y, z, rX, rY, rZ, sc, pM);
    }

    static dict: DatumExt[] = [
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
        new DatumExt(1019, -1, "Belgian 1972 7 Parameter", null, 4, -99.059, 53.322, -112.486, -0.419, 0.83, -1.885, 0.999999, 0)];
}