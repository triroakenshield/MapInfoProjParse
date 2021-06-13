import { Datum, DatumExt } from "./Datums";
import { Projection } from "./Projections";
import { Affine, Bound } from "./Parameters";
import { Unit } from "./Units";

export class CoordinateReferenceSystemDescription {
    name: string;
    //datum: Datum;
    projection: Projection;
    affine: Affine;
    bound: Bound;

    private constructor(name: string) {
        this.name = name;
    }

    toProj(): string {
        if (this.projection === undefined) return "undefined";
        return this.projection.toProj();
    }

    static parse(desc: string): CoordinateReferenceSystemDescription {
        const lastIndex = desc.lastIndexOf("\"");
        const crsName = desc.substr(1, lastIndex - 1);
        const str2 = desc.substr(lastIndex + 2, desc.length - (lastIndex + 2));
        var paramArray = str2.split(",");
        const crs = new CoordinateReferenceSystemDescription(crsName);
        var idProjectionTypes = Number.parseInt(paramArray[0]);
        let isAffine = false;
        let isBounds = false;
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
        crs.projection = Projection.dict.find(p => p.id === idProjectionTypes);
        if (crs.projection === undefined) return crs;
        crs.projection.parameters.forEach(p => {
            switch (p.id) {
                case 1:
                    var idDatum = Number.parseInt(paramArray[kp]);
                    let wDatum: Datum = null;
                    switch (true) {
                        case idDatum < 999:
                            wDatum = Datum.dict.find(d => d.id === idDatum);
                            break;
                        case idDatum === 999:
                            wDatum = Datum.parse(idDatum, Number.parseInt(paramArray[kp + 1]), Number.parseFloat(paramArray[kp + 2]),
                                Number.parseFloat(paramArray[kp + 3]), Number.parseFloat(paramArray[kp + 4]));
                            kp += 4;
                            break;
                        case idDatum < 9999:
                            wDatum = DatumExt.dict.find(d => d.id === idDatum);
                            break;
                        case idDatum === 9999:
                            wDatum = DatumExt.parseExt(idDatum, Number.parseInt(paramArray[kp + 1]), Number.parseFloat(paramArray[kp + 2]),
                                Number.parseFloat(paramArray[kp + 3]), Number.parseFloat(paramArray[kp + 4]), Number.parseFloat(paramArray[kp + 5]),
                                Number.parseFloat(paramArray[kp + 6]), Number.parseFloat(paramArray[kp + 7]), Number.parseFloat(paramArray[kp + 8]),
                                Number.parseFloat(paramArray[kp + 9]));
                            kp += 9;
                            break;
                    }
                    p.value = wDatum;
                    break;
                case 2:
                    p.value = Unit.dict.find(u => u.id === Number.parseInt(paramArray[kp]));
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
            const aUnit = Unit.dict.find(u => u.id === au);
            kp += 1;
            crs.affine = new Affine(aUnit, Number.parseFloat(paramArray[kp]), Number.parseFloat(paramArray[kp + 1]),
                Number.parseFloat(paramArray[kp + 2]), Number.parseFloat(paramArray[kp + 3]),
                Number.parseFloat(paramArray[kp + 4]), Number.parseFloat(paramArray[kp + 5]));
            kp += 6;
        }
        if (isBounds) {
            crs.bound = new Bound(Number.parseFloat(paramArray[kp]), Number.parseFloat(paramArray[kp + 1]),
                Number.parseFloat(paramArray[kp + 2]), Number.parseFloat(paramArray[kp + 3]));
        }
        return crs;
    }
}