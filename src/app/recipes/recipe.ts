export class Recipie {
    public name:string;
    public description:string;
    public image:string;

    constructor(name:string, desc:string, img:string) {
        this.name = name;
        this.description = desc;
        this.image = img;
    }
}