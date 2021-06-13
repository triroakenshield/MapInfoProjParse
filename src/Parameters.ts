import { Description } from "./Descriptions";
import { Unit } from "./Units";

export class Parameter extends Description {
    ruName: string;
    wktName: string;
    value: any;

    constructor(id: number, epsg: number, name: string, ruName: string, wktName: string, projName: string) {
        super(id, epsg, projName, name);
        this.wktName = wktName;
        this.ruName = ruName;
    }

    toProj(): string {
        switch (this.id) {
            case 1:
            case 2:
                if (this.value != null) return this.value.toProj();
                return "";
            default:
                if (this.proj != null) return `${this.proj}=${this.value}`;
                else return "";
        }
    }

    static dict: Parameter[] = [
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
        new Parameter(11, null, "Range", "Охват", "", null)];
}

export class Affine {
    unit: Unit;
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;

    constructor(unit: Unit, a: number, b: number, c: number, d: number, e: number, f: number) {
        this.unit = unit;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
    }
}

export class Bound {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;

    constructor(minX: number, minY: number, maxX: number, maxY: number) {
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    }
}