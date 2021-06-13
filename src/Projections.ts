import { Description } from "./Descriptions";
import { Parameter } from "./Parameters";

export class Projection extends Description {
    ruName: string;
    wktName: string;

    parameters: Parameter[];

    constructor(id: number, epsg: number, name: string, ruName: string, wktName: string, projName: string, params: number[]) {
        super(id, epsg, projName, name);
        this.ruName = ruName;
        this.wktName = wktName;
        this.parameters = new Array<Parameter>();
        params.forEach(p => this.setParameter(p));
    }

    setParameter(parameterId: number): void {
        this.parameters.push(Parameter.dict.find(p => p.id === parameterId));
    }

    toProj(): string {
        var res = `+proj=${this.proj}`;
        this.parameters.forEach(p => res = `${res} ${p.toProj()}`);
        return res;
    }

    static dict: Projection[] = [
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
        new Projection(33, 9842, "Equidistant Cylindrical", "Равнопромежуточная цилиндрическая", "", "eqc", [1, 2, 3, 5, 9, 10])];
}