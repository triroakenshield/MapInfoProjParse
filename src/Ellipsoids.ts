import { Description } from "./Descriptions";

export class Ellipsoid extends Description {
    a: number;
    f1: number;

    constructor(id: number, epsg: number, name: string, proj: string, a: number, f1: number) {
        super(id, epsg, proj, name);
        this.a = a;
        this.f1 = f1;
    }

    toProj(): string {
        if (this.proj == null) return `+a=${this.a} +f=${this.f1}`;
        return `+ellps=${this.proj}`;
    }

    static dict: Ellipsoid[] = [
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
        new Ellipsoid(53, -1, "Xian 1980", null, 6378140, 298.25)];
}