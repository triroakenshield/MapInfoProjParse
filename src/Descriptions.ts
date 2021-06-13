export class Description {
    id: number;
    epsg: number;
    proj: string;
    name: string;

    constructor(id: number, epsg: number, proj: string, name: string) {
        this.id = id;
        this.epsg = epsg;
        this.name = name;
        this.proj = proj;
    }
}