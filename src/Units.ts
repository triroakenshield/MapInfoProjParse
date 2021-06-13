import { Description } from "./Descriptions";

export class Unit extends Description {
    ruName: string;
    b: number;
    c: number;
    targetEpsg: number;

    constructor(id: number, epsg: number, proj: string, name: string, ruName: string, b: number, c: number, targetEpsg: number) {
        super(id, epsg, proj, name);
        this.ruName = ruName;
        this.b = b;
        this.c = c;
        this.targetEpsg = targetEpsg;
    }

    toProj(): string {
        return `+units=${this.proj}`;
    }

    static dict: Unit[] = [
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
        new Unit(32, -1, "rod", "Rods", "род", 33, 2, 9003)];
}